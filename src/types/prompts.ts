interface CreatePromptPayload {
  contentBase64: string;
  promptCategoryId: string;
}
interface UpdatePromptPayload {
  contentBase64?: string;
  promptCategoryId?: string;
}

export type { CreatePromptPayload, UpdatePromptPayload };
