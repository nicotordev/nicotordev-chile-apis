import newsController from "@/controllers/news.controller";
import { Router } from "express";
const router = Router();

router.get("/status", newsController.newsStatusController);

export default router;
