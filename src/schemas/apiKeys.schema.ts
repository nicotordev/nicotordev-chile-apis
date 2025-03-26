// src/validators/apiKey.schema.ts
import { z } from 'zod';

export const apiKeyIdParamSchema = z.object({
  id: z.string().min(1, { message: 'El id no puede estar vacío.' }),
});
