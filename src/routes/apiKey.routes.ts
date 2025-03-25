import { Router } from 'express';

import apiKeyController from '@/controllers/apiKey.controller';
import { validateRequestZod } from '@/middleware/validateRequestZod.middleware';
import { apiKeyIdParamSchema } from '@/schemas/apiKey.schema';

const router = Router();

router.get('/', apiKeyController.getApiKeysController);

// POST: no requiere input porque la API key se genera automáticamente
router.post('/', apiKeyController.getApiKeysController);

// PATCH y DELETE requieren ID en params
router.patch(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.getApiKeysController
);

router.delete(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.getApiKeysController
);

// GET con :id también requiere validación
router.get(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.getApiKeyController
);

export default router;
