-- AlterTable
ALTER TABLE "ScrapingTarget" ADD COLUMN     "promptCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "ScrapingTarget" ADD CONSTRAINT "ScrapingTarget_promptCategoryId_fkey" FOREIGN KEY ("promptCategoryId") REFERENCES "PromptCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
