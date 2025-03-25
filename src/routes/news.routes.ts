import { Router } from 'express';

import newsController from '@/controllers/news.controller';
const router = Router();

router.get('/status', newsController.newsStatusController);

export default router;
