// Scrappingtargets Controller
import { RequestHandler } from 'express';

import scrappingTargetsService from '../services/scrappingTargets.service';

import {
  CreateManyScrappingTargetPayload,
  CreateScrappingTargetPayload,
  UpdateScrappingTargetPayload,
} from '@/types/scrappingTargets';
import ApiResponse from '@/utils/apiResponse.util';

const getScrappingTargets: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const targets = await scrappingTargetsService.getScrappingTargets();
    return ApiResponse.success(res, targets);
  } catch (error) {
    return next(error);
  }
};

const createScrappingTarget: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { url } = req.getBody<CreateScrappingTargetPayload>();
    const target = await scrappingTargetsService.createScrappingTarget(url);
    return ApiResponse.success(res, target);
  } catch (error) {
    return next(error);
  }
};

const createManyScrappingTargets: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { items } = req.getBody<CreateManyScrappingTargetPayload>();
    const targets = await scrappingTargetsService.createManyScrappingTargets(items);
    return ApiResponse.success(res, targets);
  } catch (error) {
    return next(error);
  }
};

const updateScrappingTarget: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const { url, promptCategoryId } = req.getBody<UpdateScrappingTargetPayload>();
    const target = await scrappingTargetsService.updateScrappingTarget(id, url, promptCategoryId);
    return ApiResponse.success(res, target);
  } catch (error) {
    return next(error);
  }
};

const deleteScrappingTarget: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const target = await scrappingTargetsService.deleteScrappingTarget(id);
    return ApiResponse.success(res, target);
  } catch (error) {
    return next(error);
  }
};

const getScrappingTarget: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const target = await scrappingTargetsService.getScrappingTarget(id);
    return ApiResponse.success(res, target);
  } catch (error) {
    return next(error);
  }
};

export default {
  getScrappingTargets,
  createScrappingTarget,
  updateScrappingTarget,
  deleteScrappingTarget,
  getScrappingTarget,
  createManyScrappingTargets,
};
