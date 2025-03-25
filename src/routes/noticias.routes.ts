import ApiResponse from '@/middleware/apiResponse.middleware';
import { NextFunction, Request, Response, Router } from 'express';
const router = Router();

router.get('/status', (req: Request, res: Response, next: NextFunction) => {
    return ApiResponse.success(
        res,
        { status: process.env.NOTICIAS_STATUS === "true" }
    );
});