import { RequestHandler } from 'express';

import { logger } from '@/config/winston';
import apiKeyService from '@/services/apiKeys.service';
import ApiResponse from '@/utils/apiResponse.util';

const getApiKeysController: RequestHandler = async (req, res, next) => {
  try {
    const services = await apiKeyService.getApiKeysService();
    return ApiResponse.success(res, services);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

const createApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const apiKey = await apiKeyService.createApiKeyService();
    return ApiResponse.created(res, apiKey);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

const reGenerateApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiKey = await apiKeyService.reGenerateApiKeyService(id);
    return ApiResponse.accepted(res, apiKey);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

const deleteApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await apiKeyService.deleteApiKeyService(id);
    return ApiResponse.noContent(res);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

const getApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiKey = await apiKeyService.getApiKeyService(id);
    return ApiResponse.success(res, apiKey);
  } catch (err) {
    logger.error(err);
    return next(err);
  }
};

export default {
  getApiKeysController,
  createApiKeyController,
  reGenerateApiKeyController,
  deleteApiKeyController,
  getApiKeyController,
};
