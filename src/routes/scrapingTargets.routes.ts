// Scrappingtargets Route
import { Router } from 'express';

import scrappingTargetsController from '../controllers/scrappingTargets.controller';
import {
  createManyScrappingTargetsSchema,
  createScrappingTargetSchema,
  deleteScrappingTargetSchema,
  getScrappingTargetSchema,
  updateScrappingTargetSchema,
} from '../schemas/scrappingTargets.schema';

import { validateRequestZod } from '@/middleware/validateRequestZod.middleware';

const router = Router();

router.get('/', scrappingTargetsController.getScrappingTargets);
router.post(
  '/',
  validateRequestZod(createScrappingTargetSchema),
  scrappingTargetsController.createScrappingTarget
);
router.post(
  '/bulk',
  validateRequestZod(createManyScrappingTargetsSchema),
  scrappingTargetsController.createManyScrappingTargets
);
router.put(
  '/:id',
  validateRequestZod(updateScrappingTargetSchema),
  scrappingTargetsController.updateScrappingTarget
);
router.delete(
  '/:id',
  validateRequestZod(deleteScrappingTargetSchema),
  scrappingTargetsController.deleteScrappingTarget
);
router.get(
  '/:id',
  validateRequestZod(getScrappingTargetSchema),
  scrappingTargetsController.getScrappingTarget
);

export default router;
