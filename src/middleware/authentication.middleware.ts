import { NextFunction, Request, Response } from 'express';

import prisma from '@/config/prisma';
import ApiResponse from '@/utils/apiResponse.util';

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return ApiResponse.unauthorized(res, 'API key required');
  }

  // Verify API key
  const dbApiKey = await prisma.apiKey.findUnique({
    where: {
      key: apiKey,
    },
  });

  if (!dbApiKey) {
    return ApiResponse.unauthorized(res, 'Invalid API key');
  }

  next();
};
