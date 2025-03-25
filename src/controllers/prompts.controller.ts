import { RequestHandler } from 'express';

import promptService from '@/services/prompt.service';
import { CreatePromptPayload, UpdatePromptPayload } from '@/types/prompts';
import ApiResponse from '@/utils/apiResponse.util';

const getPromptsController: RequestHandler = async (req, res, next) => {
  try {
    const prompts = await promptService.getPromptsService();
    ApiResponse.success(res, prompts);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const createPromptController: RequestHandler = async (req, res, next) => {
  try {
    const { contentBase64, promptCategoryId } = req.getBody<CreatePromptPayload>();
    const prompt = await promptService.createPromptService(contentBase64, promptCategoryId);
    ApiResponse.created(res, prompt);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const updatePromptController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { contentBase64, promptCategoryId } = req.getBody<UpdatePromptPayload>();
    const prompt = await promptService.updatePromptService(id, contentBase64, promptCategoryId);
    ApiResponse.accepted(res, prompt);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

const deletePromptController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await promptService.deletePromptService(id);
    ApiResponse.noContent(res);
    return;
  } catch (err: unknown) {
    next(err);
  }
};

export default {
  getPromptsController,
  createPromptController,
  updatePromptController,
  deletePromptController,
};
