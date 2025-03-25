import { Response } from 'express';
import ApiHttpStatus from '@/constants/api.constants';
import { logger } from '../config/winston'; // Adjust logger import as needed

export default class ApiResponse {
  static success<T = null>(res: Response, data: T, message = 'Success'): void | Promise<void> {
    return res.status(ApiHttpStatus.SUCCESS).json({
      data: data || null,
      meta: {
        message,
        status: ApiHttpStatus.SUCCESS,
        ok: true,
      }
    }) as unknown as void | Promise<void>;
  }

  static created<T = null>(res: Response, data: T, message = 'Resource Created'): void | Promise<void> {
    return res.status(ApiHttpStatus.CREATED).json({
      data: data || null,
      meta: {
        message,
        status: ApiHttpStatus.CREATED,
        ok: true,
      }
    }) as unknown as void | Promise<void>;
  }

  static accepted<T = null>(res: Response, data: T, message = 'Request Accepted'): void | Promise<void> {
    return res.status(ApiHttpStatus.ACCEPTED).json({
      data: data || null,
      meta: {
        message,
        status: ApiHttpStatus.ACCEPTED,
        ok: true,
      }
    }) as unknown as void | Promise<void>;
  }

  static noContent(res: Response, message = 'No Content'): void | Promise<void> {
    return res.status(ApiHttpStatus.NO_CONTENT).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.NO_CONTENT,
        ok: true,
      }
    }) as unknown as void | Promise<void>;
  }

  static badRequest(res: Response, message = 'Bad Request', errors: string[] = []): void | Promise<void> {
    return res.status(ApiHttpStatus.BAD_REQUEST).json({
      data: errors,
      meta: {
        message,
        status: ApiHttpStatus.BAD_REQUEST,
        ok: false,
      }
    }) as unknown as void | Promise<void>;
  }

  static unauthorized(res: Response, message = 'Unauthorized'): void | Promise<void> {
    return res.status(ApiHttpStatus.UNAUTHORIZED).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.UNAUTHORIZED,
        ok: false,
      }
    }) as unknown as void | Promise<void>;
  }

  static forbidden(res: Response, message = 'Forbidden'): void | Promise<void> {
    return res.status(ApiHttpStatus.FORBIDDEN).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.FORBIDDEN,
        ok: false,
      }
    }) as unknown as void | Promise<void>;
  }

  static notFound(res: Response, message = 'Not Found'): void | Promise<void> {
    return res.status(ApiHttpStatus.NOT_FOUND).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.NOT_FOUND,
        ok: false,
      }
    }) as unknown as void | Promise<void>;
  }

  static internalServerError(
    res: Response,
    message = 'Internal Server Error',
    error?: unknown,
    errorPrefix?: string
  ): void | Promise<void> {
    if (errorPrefix && error) {
      logger.error(`${errorPrefix}`, error);
    }

    return res.status(ApiHttpStatus.INTERNAL_SERVER_ERROR).json({
      data: null,
      meta: {
        message,
        status: ApiHttpStatus.INTERNAL_SERVER_ERROR,
        ok: false,
      }
    }) as unknown as void | Promise<void>;
  }
}