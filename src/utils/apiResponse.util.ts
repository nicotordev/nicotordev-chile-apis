import { Response } from 'express';

import { logger } from '../config/winston';

import transformObjectForSerialization from './serialization.utils';

import ApiHttpStatus from '@/constants/api.constants';

export default class ApiResponse {
  static success<T = null>(res: Response, data: T, message = 'Success'): void {
    return res.status(ApiHttpStatus.SUCCESS).json({
      data: data ? transformObjectForSerialization(data) : null,
      meta: {
        message,
        status: ApiHttpStatus.SUCCESS,
        ok: true,
      },
    }) as unknown as void;
  }

  static created<T = null>(res: Response, data: T, message = 'Resource Created'): void {
    return res.status(ApiHttpStatus.CREATED).json({
      data: data ? transformObjectForSerialization(data) : null,
      meta: {
        message,
        status: ApiHttpStatus.CREATED,
        ok: true,
      },
    }) as unknown as void;
  }

  static accepted<T = null>(res: Response, data: T, message = 'Request Accepted'): void {
    return res.status(ApiHttpStatus.ACCEPTED).json({
      data: data ? transformObjectForSerialization(data) : null,
      meta: {
        message,
        status: ApiHttpStatus.ACCEPTED,
        ok: true,
      },
    }) as unknown as void;
  }

  static noContent(res: Response, message = 'No Content'): void {
    return res.status(ApiHttpStatus.NO_CONTENT).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.NO_CONTENT,
        ok: true,
      },
    }) as unknown as void;
  }

  static badRequest(res: Response, message = 'Bad Request', errors: string[] = []): void {
    return res.status(ApiHttpStatus.BAD_REQUEST).json({
      data: errors,
      meta: {
        message,
        status: ApiHttpStatus.BAD_REQUEST,
        ok: false,
      },
    }) as unknown as void;
  }

  static unauthorized(res: Response, message = 'Unauthorized'): void {
    return res.status(ApiHttpStatus.UNAUTHORIZED).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.UNAUTHORIZED,
        ok: false,
      },
    }) as unknown as void;
  }

  static forbidden(res: Response, message = 'Forbidden'): void {
    return res.status(ApiHttpStatus.FORBIDDEN).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.FORBIDDEN,
        ok: false,
      },
    }) as unknown as void;
  }

  static notFound(res: Response, message = 'Not Found'): void {
    return res.status(ApiHttpStatus.NOT_FOUND).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.NOT_FOUND,
        ok: false,
      },
    }) as unknown as void;
  }

  static tooManyRequests(res: Response, message = 'Too Many Requests'): void {
    return res.status(ApiHttpStatus.TOO_MANY_REQUESTS).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.TOO_MANY_REQUESTS,
        ok: false,
      },
    }) as unknown as void;
  }

  static conflict(res: Response, message = 'Conflict'): void {
    return res.status(ApiHttpStatus.CONFLICT).json({
      data: null,
      meta: { message, status: ApiHttpStatus.CONFLICT, ok: false },
    }) as unknown as void;
  }

  static internalServerError(
    res: Response,
    message = 'Internal Server Error',
    error?: unknown,
    errorPrefix?: string
  ): void {
    if (errorPrefix && error) {
      logger.error(`${errorPrefix}`, error);
    }

    return res.status(ApiHttpStatus.INTERNAL_SERVER_ERROR).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.INTERNAL_SERVER_ERROR,
        ok: false,
      },
    }) as unknown as void;
  }
}
