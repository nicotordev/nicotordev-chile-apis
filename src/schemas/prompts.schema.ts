// src/validators/prompts.schema.ts
import { z } from 'zod';

export const promptIdParamSchema = z.object({
  id: z.string().uuid({ message: 'El id debe ser un UUID válido.' }),
});

export const promptCreateSchema = z.object({
  contentBase64: z
    .string()
    .min(1, { message: 'El contenido no puede estar vacío.' })
    .refine((value: string) => /^[A-Za-z0-9+/=]*$/.test(value), {
      message: 'El contenido debe ser un base64 válido.',
    }),
  promptCategoryId: z.string().uuid({ message: 'El id debe ser un UUID válido.' }),
});

export const promptUpdateSchema = z.object({
  contentBase64: z
    .string()
    .min(1, { message: 'El contenido no puede estar vacío.' })
    .refine((value: string) => /^[A-Za-z0-9+/=]*$/.test(value), {
      message: 'El contenido debe ser un base64 válido.',
    })
    .optional(),
  promptCategoryId: z.string().uuid({ message: 'El id debe ser un UUID válido.' }).optional(),
});
