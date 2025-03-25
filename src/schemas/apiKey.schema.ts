// src/validators/apiKey.schema.ts
import { z } from 'zod';

export const apiKeyIdParamSchema = z.object({
  id: z.string().uuid({ message: 'El id debe ser un UUID válido.' }),
});
