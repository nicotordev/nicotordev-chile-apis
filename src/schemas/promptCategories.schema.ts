// src/validators/promptCategories.schema.ts
import { z } from 'zod';

export const promptCategoryIdParamSchema = z.object({
  id: z.string().min(1, { message: 'El id no puede estar vacío.' }),
});

export const createPromptCategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'El nombre no puede estar vacío.' }),
});

export const updatePromptCategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'El nombre no puede estar vacío.' }),
});
