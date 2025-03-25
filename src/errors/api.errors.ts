export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
  }

  static badRequest(message: string) {
    return new ApiError(message, 400);
  }

  static unauthorized(message: string) {
    return new ApiError(message, 401);
  }

  static forbidden(message: string) {
    return new ApiError(message, 403);
  }

  static notFound(message: string) {
    return new ApiError(message, 404);
  }

  static conflict(message: string) {
    return new ApiError(message, 409);
  }

  static tooManyRequests(message: string) {
    return new ApiError(message, 429);
  }

  static internalServerError(message: string) {
    return new ApiError(message, 500);
  }
}
