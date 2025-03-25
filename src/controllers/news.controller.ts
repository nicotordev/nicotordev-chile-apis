import { RequestHandler } from 'express';

import ApiResponse from '@/utils/apiResponse.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newsStatusController: RequestHandler = (req, res, next) => {
  return ApiResponse.success(res, { status: process.env.NOTICIAS_STATUS === 'true' });
};

export default {
  newsStatusController,
};
