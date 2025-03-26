import { RequestHandler } from 'express';

import { fetchFullHtmlContent } from '@/scraping/html.scraping';
import ApiResponse from '@/utils/apiResponse.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newsStatusController: RequestHandler = (req, res, next) => {
  return ApiResponse.success(res, { status: process.env.NOTICIAS_STATUS === 'true' });
};

const scrapeNewsController: RequestHandler = async (req, res, _next) => {
  const html = await fetchFullHtmlContent(req.body.url as string);
  return ApiResponse.success(res, { html });
};

export default {
  newsStatusController,
  scrapeNewsController,
};
