import prisma from '@/config/prisma';
import aiConstants from '@/constants/ai.constants';

async function getPromptCategoriesService() {
  return await prisma.promptCategory.findMany({});
}

async function createPromptCategoryService(name: string) {
  return await prisma.promptCategory.create({
    data: {
      name,
    },
  });
}

async function updatePromptCategoryService(id: string, name: string) {
  return await prisma.promptCategory.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
}

async function deletePromptCategoryService(id: string) {
  const removedPromptsCategory = await prisma.promptCategory.upsert({
    where: {
      name: aiConstants.REMOVED_CATEGORY_PROMPS_NAME,
    },
    update: {
      name: aiConstants.REMOVED_CATEGORY_PROMPS_NAME,
    },
    create: {
      name: aiConstants.REMOVED_CATEGORY_PROMPS_NAME,
    },
  });

  await prisma.$transaction([
    prisma.prompt.updateMany({
      where: {
        promptCategoryId: id,
      },
      data: {
        promptCategoryId: removedPromptsCategory.id,
      },
    }),
    prisma.promptCategory.delete({
      where: {
        id,
      },
    }),
  ]);
}

async function getPromptCategoryService(id: string) {
  return await prisma.promptCategory.findUnique({
    where: {
      id,
    },
  });
}

export default {
  getPromptCategoriesService,
  createPromptCategoryService,
  deletePromptCategoryService,
  getPromptCategoryService,
  updatePromptCategoryService,
};
