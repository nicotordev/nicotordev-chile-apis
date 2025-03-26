import { CookieJar } from 'tough-cookie';
import UserAgent from 'user-agents';

import createTunnelAgent from '@/lib/tunnel';

const jar = new CookieJar();

export const fetchFullHtmlContent = async (url: string): Promise<string> => {
  const { got } = await import('got');
  const userAgent = new UserAgent().toString();

  try {
    const response = await got(url, {
      agent: {
        https: createTunnelAgent(),
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
    });

    return response.body;
  } catch (err: any) {
    console.error('🛑 Misión fallida:', err?.response?.statusCode ?? err.message);
    throw err;
  }
};
