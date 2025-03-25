import { RequestHandler } from 'express';

import { logger } from '@/config/winston';
import apiKeyService from '@/services/admin/apiKey.service';
import ApiResponse from '@/utils/apiResponse.util';

const getApiKeysController: RequestHandler = async (req, res, next) => {
  try {
    const services = await apiKeyService.getApiKeysService();
    void ApiResponse.success(res, services);
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const createApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const apiKey = await apiKeyService.createApiKeyService();
    void ApiResponse.created(res, apiKey);
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const reGenerateApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiKey = await apiKeyService.reGenerateApiKeyService(id);
    void ApiResponse.accepted(res, apiKey);
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const deleteApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await apiKeyService.deleteApiKeyService(id);
    void ApiResponse.noContent(res);
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getApiKeyController: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apiKey = await apiKeyService.getApiKeyService(id);
    void ApiResponse.success(res, apiKey);
    return;
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

export default {
  getApiKeysController,
  createApiKeyController,
  reGenerateApiKeyController,
  deleteApiKeyController,
  getApiKeyController,
};
