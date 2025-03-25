import prisma from '@/config/prisma';
import { generateApiKey } from '@/utils/crypto.util';

async function getApiKeysService() {
  return await prisma.apiKey.findMany();
}

async function createApiKeyService() {
  return await prisma.apiKey.create({
    data: {
      key: generateApiKey(),
    },
  });
}

async function reGenerateApiKeyService(id: string) {
  return await prisma.apiKey.update({
    where: {
      id,
    },
    data: {
      key: generateApiKey(),
    },
  });
}

async function deleteApiKeyService(id: string) {
  return await prisma.apiKey.delete({
    where: {
      id,
    },
  });
}

async function getApiKeyService(id: string) {
  return await prisma.apiKey.findUnique({
    where: {
      id,
    },
  });
}

export default {
  getApiKeysService,
  createApiKeyService,
  reGenerateApiKeyService,
  deleteApiKeyService,
  getApiKeyService,
};
