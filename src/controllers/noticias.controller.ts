import ApiResponse from "@/middleware/apiResponse.middleware";
import { RequestHandler } from "express";

const noticiasStatusController: RequestHandler = (req, res, next) => {
    return ApiResponse.success(
        res,
        { status: process.env.NOTICIAS_STATUS === "true" }
    );
};



export default {
    noticiasStatusController
}