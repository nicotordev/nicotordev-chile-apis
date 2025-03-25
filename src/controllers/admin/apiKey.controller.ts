import { logger } from "@/config/winston";
import { RequestHandler } from "express";

const getApiKeysController: RequestHandler = async (req, res, next) => {
  try {
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const createApiKeyController: RequestHandler = async (req, res, next) => {
  try {
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const reGenerateApiKeyController: RequestHandler = async (req, res, next) => {
  try {
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const deleteApiKeyController: RequestHandler = async (req, res, next) => {
  try {
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getApiKeyController: RequestHandler = async (req, res, next) => {
  try {
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
