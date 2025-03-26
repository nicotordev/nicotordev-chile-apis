import { Router } from 'express';

import apiKeyController from '@/controllers/apiKeys.controller';
import { validateRequestZod } from '@/middleware/validateRequestZod.middleware';
import { apiKeyIdParamSchema } from '@/schemas/apiKeys.schema';

const router = Router();

router.get('/', apiKeyController.getApiKeysController);

// POST: no requiere input porque la API key se genera automáticamente
router.post('/', apiKeyController.createApiKeyController);

// PATCH y DELETE requieren ID en params
router.patch(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.reGenerateApiKeyController
);

router.delete(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.deleteApiKeyController
);

// GET con :id también requiere validación
router.get(
  '/:id',
  validateRequestZod(apiKeyIdParamSchema, 'params'),
  apiKeyController.getApiKeyController
);

export default router;
