import ApiResponse from "@/utils/apiResponse.util";
import { NextFunction, Request, Response } from "express";

export const adminAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("x-master-key");
  if (!apiKey) {
    return ApiResponse.unauthorized(res, "API key required");
  }

  // Verify API key
  if (!process.env.MASTER_KEY) {
    return ApiResponse.unauthorized(res, "Invalid API key");
  }

  if (apiKey !== process.env.MASTER_KEY) {
    return ApiResponse.unauthorized(res, "Invalid API key");
  }

  next();
};
