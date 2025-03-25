import prisma from '@/config/prisma';
import { ApiError } from '@/errors/api.errors';
import { decodeBase64 } from '@/utils/crypto.util';

async function getPromptsService() {
  return await prisma.prompt.findMany({});
}

async function createPromptService(contentBase64: string, promptCategoryId: string) {
  const promptCategoryExist = await prisma.promptCategory.findUnique({
    where: {
      id: promptCategoryId,
    },
  });

  if (!promptCategoryExist) {
    throw ApiError.notFound('La categoría de prompt no existe.');
  }

  const content = decodeBase64(contentBase64);

  return await prisma.prompt.create({
    data: {
      content,
      promptCategoryId,
    },
  });
}

async function updatePromptService(id: string, contentBase64?: string, promptCategoryId?: string) {
  const contentQuery = contentBase64
    ? {
        content: decodeBase64(contentBase64),
      }
    : null;

  const promptCategoryQuery = promptCategoryId
    ? {
        promptCategoryId,
      }
    : null;

  if (!contentQuery && !promptCategoryQuery) {
    return;
  }

  if (promptCategoryQuery) {
    const promptCategoryExist = await prisma.promptCategory.findUnique({
      where: {
        id: promptCategoryId,
      },
    });

    if (!promptCategoryExist) {
      throw ApiError.notFound('La categoría de prompt no existe.');
    }
  }

  return await prisma.prompt.update({
    where: {
      id,
    },
    data: {
      ...contentQuery,
      ...promptCategoryQuery,
    },
  });
}

async function deletePromptService(id: string) {
  const promptExist = await prisma.prompt.findUnique({
    where: {
      id,
    },
  });

  if (!promptExist) {
    throw ApiError.notFound('El prompt no existe.');
  }

  await prisma.prompt.delete({
    where: {
      id,
    },
  });
}

async function getPromptService(id: string) {
  const promptExist = await prisma.prompt.findUnique({
    where: {
      id,
    },
  });

  if (!promptExist) {
    throw ApiError.notFound('El prompt no existe.');
  }

  return await prisma.prompt.findUnique({
    where: {
      id,
    },
  });
}

export default {
  getPromptsService,
  createPromptService,
  getPromptService,
  deletePromptService,
  updatePromptService,
};
