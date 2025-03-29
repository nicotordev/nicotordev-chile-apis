import { load } from 'cheerio';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { CookieJar } from 'tough-cookie';
import UserAgent from 'user-agents';

import { logger } from '@/config/winston';
import { decodeBase64 } from '@/utils/crypto.util';

const jar = new CookieJar();

export const fetchFullHtmlContent = async (url: string): Promise<string> => {
  const { got } = await import('got');
  const userAgent = new UserAgent().toString();

  const proxyAuth = process.env.BRD_PROXY_AUTH; // usuario:clave
  const proxyHost = process.env.BRD_PROXY_HOST;
  const proxyPort = process.env.BRD_PROXY_PORT;
  const ca = Buffer.from(decodeBase64(process.env.BRD_CRT_CA_BASE64));

  const proxyUrl = `http://${proxyAuth}@${proxyHost}:${proxyPort}`;
  const agent = new HttpsProxyAgent(proxyUrl, {
    ca,
    rejectUnauthorized: false,
  });

  try {
    const response = await got(url, {
      method: 'GET',
      agent: {
        https: agent,
      },
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        DNT: '1',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Referer: url,
      },
      cookieJar: jar,
      decompress: true,
      http2: false,
      timeout: {
        request: 15000,
      },
      followRedirect: true,
      retry: {
        limit: 2,
        methods: ['GET', 'POST'],
        statusCodes: [408, 413, 429, 500, 502, 503, 504],
      },
      https: {
        rejectUnauthorized: false,
      },
    });

    return response.body;
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
    }

    throw err;
  }
};

export const extractRelevantContentWithMetadata = (html: string): string => {
  const $ = load(html);

  // 1. METADATA
  const metadata = {
    title: $('title').text(),
    description: $('meta[name="description"]').attr('content') ?? '',
    ogTitle: $('meta[property="og:title"]').attr('content') ?? '',
    ogDescription: $('meta[property="og:description"]').attr('content') ?? '',
    canonicalUrl: $('link[rel="canonical"]').attr('href') ?? '',
    lang: $('html').attr('lang') ?? '',
  };

  // 2. LIMPIAR contenido irrelevante
  $(
    'script, style, noscript, header, footer, nav, aside, iframe, link, meta, svg, canvas, form, button, input, img, video, audio'
  ).remove();
  $('[class*="ad"], [id*="ad"], .sidebar, .cookie-banner').remove();

  // 3. TEXTO PRINCIPAL
  const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 16000);

  // 4. COMBINAR y FORMATEAR
  const combined = `
=== METADATA ===
Título: ${metadata.title}
Descripción: ${metadata.description}
OpenGraph Título: ${metadata.ogTitle}
OpenGraph Descripción: ${metadata.ogDescription}
URL Canónica: ${metadata.canonicalUrl}
Idioma: ${metadata.lang}

=== CONTENIDO ===
${text}
`.trim();

  return combined;
};
