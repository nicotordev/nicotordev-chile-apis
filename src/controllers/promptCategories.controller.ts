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
    return ApiResponse.success(res, promptCategories);
  } catch (err: unknown) {
    return next(err);
  }
};

const createPromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.getBody<CreatePromptCategoryPayload>();
    const promptCategory = await promptCategoryService.createPromptCategoryService(name);
    return ApiResponse.created(res, promptCategory);
  } catch (err: unknown) {
    return next(err);
  }
};

const updatePromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.getBody<UpdatePromptCategoryPayload>();
    const promptCategory = await promptCategoryService.updatePromptCategoryService(id, name);
    return ApiResponse.accepted(res, promptCategory);
  } catch (err: unknown) {
    return next(err);
  }
};

const deletePromptCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await promptCategoryService.deletePromptCategoryService(id);
    return ApiResponse.noContent(res);
  } catch (err: unknown) {
    return next(err);
  }
};

const getPromptCategoryByIdController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const promptCategory = await promptCategoryService.getPromptCategoryService(id);
    return ApiResponse.success(res, promptCategory);
  } catch (err: unknown) {
    return next(err);
  }
};

export default {
  getPromptCategoriesController,
  createPromptCategoryController,
  updatePromptCategoryController,
  deletePromptCategoryController,
  getPromptCategoryByIdController,
};
