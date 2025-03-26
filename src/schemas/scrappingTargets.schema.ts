// src/validators/scrappingTargets.schema.ts
import { z } from 'zod';

export const createScrappingTargetSchema = z.object({
  url: z.string().url(),
  promptCategoryId: z.string(),
});

export const createManyScrappingTargetsSchema = z.object({
  items: z.array(createScrappingTargetSchema),
});

export const updateScrappingTargetSchema = z.object({
  url: z.string().url().optional(),
  promptCategoryId: z.string().optional(),
});

export const deleteScrappingTargetSchema = z.object({
  id: z.string(),
});

export const getScrappingTargetSchema = z.object({
  id: z.string(),
});

export const getManyScrappingTargetsSchema = z.object({
  ids: z.array(z.string()),
});

export const getScrappingTargetsSchema = z.object({
  promptCategoryId: z.string().optional(),
});
