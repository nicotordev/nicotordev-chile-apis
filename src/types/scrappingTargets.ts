interface CreateScrappingTargetPayload {
  url: string;
  promptCategoryId: string;
}

interface UpdateScrappingTargetPayload {
  url?: string;
  promptCategoryId?: string;
}

interface CreateManyScrappingTargetPayload {
  items: {
    url: string;
    promptCategoryId: string;
  }[];
}

export type {
  CreateScrappingTargetPayload,
  UpdateScrappingTargetPayload,
  CreateManyScrappingTargetPayload,
};
