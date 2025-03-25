import { Router } from 'express';

import promptsController from '@/controllers/prompts.controller';
import { validateRequestZod } from '@/middleware/validateRequestZod.middleware';
import {
  promptIdParamSchema,
  promptUpdateSchema,
  promptCreateSchema,
} from '@/schemas/prompts.schema';

const router = Router();

router.get('/', promptsController.getPromptsController);
router.post(
  '/',
  validateRequestZod(promptCreateSchema, 'body'),
  promptsController.createPromptController
);
router.patch(
  '/:id',
  validateRequestZod(promptIdParamSchema, 'params'),
  validateRequestZod(promptUpdateSchema, 'body'),
  promptsController.updatePromptController
);
router.delete(
  '/:id',
  validateRequestZod(promptIdParamSchema, 'params'),
  promptsController.deletePromptController
);

export default router;
