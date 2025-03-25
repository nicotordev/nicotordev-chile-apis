import { RequestHandler } from 'express';

import promptCategoryService from '@/services/promptCategory.service';
import {
  CreatePromptCategoryPayload,
  UpdatePromptCategoryPayload,
} from '@/types/promptsCategories';
import ApiResponse from '@/utils/apiResponse.util';

const getPromptCategoriesController: RequestHandler = async (req, res, next) => {
  try {
    const promptCategories = await promptCategoryService.getPromptCategoriesService();
    ApiResponse.success(res, promptCategories);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const createPromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.getBody<CreatePromptCategoryPayload>();
    const promptCategory = await promptCategoryService.createPromptCategoryService(name);
    ApiResponse.created(res, promptCategory);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const updatePromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.getBody<UpdatePromptCategoryPayload>();
    const promptCategory = await promptCategoryService.updatePromptCategoryService(id, name);
    ApiResponse.accepted(res, promptCategory);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const deletePromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await promptCategoryService.deletePromptCategoryService(id);
    ApiResponse.noContent(res);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const getPromptCategoryByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const promptCategory = await promptCategoryService.getPromptCategoryService(id);
    ApiResponse.success(res, promptCategory);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  getPromptCategoriesController,
  createPromptCategoryController,
  updatePromptCategoryController,
  deletePromptCategoryController,
  getPromptCategoryByIdController,
};
