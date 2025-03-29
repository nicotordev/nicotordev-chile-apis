import { RequestHandler } from 'express';

import prisma from '@/config/prisma';
import generativeAI from '@/lib/@google-generative-ai';
import { extractRelevantContentWithMetadata, fetchFullHtmlContent } from '@/scraping/html.scraping';
import ApiResponse from '@/utils/apiResponse.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newsStatusController: RequestHandler = (req, res, next) => {
  return ApiResponse.success(res, { status: process.env.NOTICIAS_STATUS === 'true' });
};

const scrapeNewsController: RequestHandler = async (req, res, _next) => {
  const html = await fetchFullHtmlContent(req.body.url as string);

  const prompt = await prisma.prompt.findUnique({
    where: {
      id: 'cm8p3ge4j0003ys0uhgbus5bi',
    },
  });

  if (!prompt) {
    return ApiResponse.internalServerError(res, 'Prompt not found');
  }

  const newPrompt = prompt.content.replace('{{HTML}}', html);

  const relevantContent = extractRelevantContentWithMetadata(newPrompt);

  const result = await generativeAI.sendPrompt(relevantContent);

  const jsonResult = extractValidJSON<NewsArticle>(result);

  return ApiResponse.success(res, { jsonResult });
};

export default {
  newsStatusController,
  scrapeNewsController,
};
