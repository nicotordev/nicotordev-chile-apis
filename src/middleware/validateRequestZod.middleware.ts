// src/middlewares/validateRequestZod.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';

interface CustomRequest extends Request {
  validatedData?: unknown;
}

export const validateRequestZod = (
  schema: ZodSchema<unknown>,
  source: 'body' | 'params' | 'query' = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    let data;
    if (source === 'body') {
      data = req.body as unknown;
    } else if (source === 'params') {
      data = req.params;
    } else {
      data = req.query;
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      res.status(400).json(
        result.error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }))
      );
      return;
    }

    (req as CustomRequest).validatedData = result.data;
    next();
    return;
  };
};
