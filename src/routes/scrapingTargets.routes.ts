// Scrappingtargets Route
import { Router } from 'express';

import scrappingTargetsController from '../controllers/scrappingTargets.controller';

const router = Router();

router.get('/', scrappingTargetsController.getScrappingTargets);
router.post('/', scrappingTargetsController.createScrappingTarget);
router.post('/bulk', scrappingTargetsController.createManyScrappingTargets);
router.put('/:id', scrappingTargetsController.updateScrappingTarget);
router.delete('/:id', scrappingTargetsController.deleteScrappingTarget);
router.get('/:id', scrappingTargetsController.getScrappingTarget);

export default router;
