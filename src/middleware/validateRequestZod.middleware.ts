// src/middlewares/validateRequestZod.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateRequestZod = (
  schema: ZodSchema<any>,
  source: "body" | "params" | "query" = "body"
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const result = schema.safeParse(data);

    if (!result.success) {
      res.status(400).json(
        result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }))
      );
      return;
    }

    (req as any).validatedData = result.data;
    next();
    return;
  };
};
