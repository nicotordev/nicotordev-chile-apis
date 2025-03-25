import ApiResponse from "@/utils/apiResponse.util";
import { RequestHandler } from "express";

const newsStatusController: RequestHandler = (req, res, next) => {
    return ApiResponse.success(
        res,
        { status: process.env.NOTICIAS_STATUS === "true" }
    );
};



export default {
    newsStatusController
}