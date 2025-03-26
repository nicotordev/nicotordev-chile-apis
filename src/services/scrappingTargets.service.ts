import prisma from '@/config/prisma';

const getScrappingTargets = async () => {
  return await prisma.scrapingTarget.findMany();
};

const createScrappingTarget = async (url: string) => {
  return await prisma.scrapingTarget.create({
    data: { url },
  });
};
const createManyScrappingTargets = async (items: { url: string; promptCategoryId: string }[]) => {
  return await prisma.scrapingTarget.createMany({
    data: items,
  });
};
const deleteScrappingTarget = async (id: string) => {
  return await prisma.scrapingTarget.delete({
    where: { id },
  });
};

const updateScrappingTarget = async (id: string, url?: string, promptCategoryId?: string) => {
  const data: { url?: string; promptCategoryId?: string } = {};
  if (url) data.url = url;
  if (promptCategoryId) data.promptCategoryId = promptCategoryId;

  return await prisma.scrapingTarget.update({
    where: { id },
    data,
  });
};

const getScrappingTarget = async (id: string) => {
  return await prisma.scrapingTarget.findUnique({
    where: { id },
  });
};

export default {
  getScrappingTargets,
  createScrappingTarget,
  deleteScrappingTarget,
  updateScrappingTarget,
  getScrappingTarget,
  createManyScrappingTargets,
};
