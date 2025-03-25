import { Router } from 'express';

import promptCategoriesController from '@/controllers/promptCategories.controller';

const router = Router();

router.get('/', promptCategoriesController.getPromptCategoriesController);
router.post('/', promptCategoriesController.createPromptCategoryController);
router.patch('/:id', promptCategoriesController.updatePromptCategoryController);
router.delete('/:id', promptCategoriesController.deletePromptCategoryController);
router.get('/:id', promptCategoriesController.getPromptCategoryByIdController);

export default router;
