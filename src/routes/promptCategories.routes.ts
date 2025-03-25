import { Router } from 'express';

import promptCategoriesController from '@/controllers/promptCategories.controller';
import { validateRequestZod } from '@/middleware/validateRequestZod.middleware';
import {
  createPromptCategoryBodySchema,
  promptCategoryIdParamSchema,
  updatePromptCategoryBodySchema,
} from '@/schemas/promptCategories.schema';

const router = Router();

router.get('/', promptCategoriesController.getPromptCategoriesController);
router.post(
  '/',
  validateRequestZod(createPromptCategoryBodySchema, 'body'),
  promptCategoriesController.createPromptCategoryController
);
router.patch(
  '/:id',
  validateRequestZod(promptCategoryIdParamSchema, 'params'),
  validateRequestZod(updatePromptCategoryBodySchema, 'body'),
  promptCategoriesController.updatePromptCategoryController
);
router.delete(
  '/:id',
  validateRequestZod(promptCategoryIdParamSchema, 'params'),
  promptCategoriesController.deletePromptCategoryController
);
router.get(
  '/:id',
  validateRequestZod(promptCategoryIdParamSchema, 'params'),
  promptCategoriesController.getPromptCategoryByIdController
);

export default router;
