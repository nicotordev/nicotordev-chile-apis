import { RequestHandler } from 'express';

import promptService from '@/services/prompt.service';
import { CreatePromptPayload, UpdatePromptPayload } from '@/types/prompts';
import ApiResponse from '@/utils/apiResponse.util';

const getPromptsController: RequestHandler = async (req, res, next) => {
  try {
    const prompts = await promptService.getPromptsService();
    return ApiResponse.success(res, prompts);
  } catch (err: unknown) {
    return next(err);
  }
};

const createPromptController: RequestHandler = async (req, res, next) => {
  try {
    const { contentBase64, promptCategoryId } = req.getBody<CreatePromptPayload>();
    const prompt = await promptService.createPromptService(contentBase64, promptCategoryId);
    return ApiResponse.created(res, prompt);
  } catch (err: unknown) {
    return next(err);
  }
};

const updatePromptController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contentBase64, promptCategoryId } = req.getBody<UpdatePromptPayload>();
    const prompt = await promptService.updatePromptService(id, contentBase64, promptCategoryId);
    return ApiResponse.accepted(res, prompt);
  } catch (err: unknown) {
    return next(err);
  }
};

const deletePromptController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await promptService.deletePromptService(id);
    return ApiResponse.noContent(res);
  } catch (err: unknown) {
    return next(err);
  }
};

export default {
  getPromptsController,
  createPromptController,
  updatePromptController,
  deletePromptController,
};
