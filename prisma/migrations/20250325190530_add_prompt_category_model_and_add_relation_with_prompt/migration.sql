-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "promptCategoryId" TEXT;

-- CreateTable
CREATE TABLE "PromptCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromptCategory_name_key" ON "PromptCategory"("name");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_promptCategoryId_fkey" FOREIGN KEY ("promptCategoryId") REFERENCES "PromptCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
