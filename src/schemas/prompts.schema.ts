// src/validators/prompts.schema.ts
import { z } from 'zod';

export const promptIdParamSchema = z.object({
  id: z.string().min(1, { message: 'El id no puede estar vacío.' }),
});

export const promptCreateSchema = z.object({
  contentBase64: z
    .string()
    .min(1, { message: 'El contenido no puede estar vacío.' })
    .refine((value: string) => /^[A-Za-z0-9+/=]*$/.test(value), {
      message: 'El contenido debe ser un base64 válido.',
    }),
  promptCategoryId: z.string().min(1, { message: 'El id de la categoría no puede estar vacío.' }),
});

export const promptUpdateSchema = z.object({
  contentBase64: z
    .string()
    .min(1, { message: 'El contenido no puede estar vacío.' })
    .refine((value: string) => /^[A-Za-z0-9+/=]*$/.test(value), {
      message: 'El contenido debe ser un base64 válido.',
    })
    .optional(),
  promptCategoryId: z
    .string()
    .min(1, { message: 'El id de la categoría no puede estar vacío.' })
    .optional(),
});
