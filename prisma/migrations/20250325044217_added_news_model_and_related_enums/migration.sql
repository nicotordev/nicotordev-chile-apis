/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NewsCategory" AS ENUM ('POLITICS', 'TECHNOLOGY', 'BUSINESS', 'SPORTS', 'ENTERTAINMENT', 'SCIENCE', 'HEALTH', 'WORLD', 'LOCAL', 'OPINION', 'OTHER');

-- CreateEnum
CREATE TYPE "ExtractionMethod" AS ENUM ('RSS', 'SITEMAP', 'DIRECT_SCRAPE', 'API', 'OTHER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "NewsArticle" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "author" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "NewsCategory",
    "tags" TEXT[],
    "language" TEXT NOT NULL DEFAULT 'en',
    "country" TEXT,
    "thumbnailUrl" TEXT,
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
    "scraperName" TEXT,
    "extractionMethod" "ExtractionMethod",

    CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_externalId_key" ON "NewsArticle"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_url_key" ON "NewsArticle"("url");

-- CreateIndex
CREATE INDEX "NewsArticle_sourceDomain_idx" ON "NewsArticle"("sourceDomain");

-- CreateIndex
CREATE INDEX "NewsArticle_publishedAt_idx" ON "NewsArticle"("publishedAt");

-- CreateIndex
CREATE INDEX "NewsArticle_isProcessed_idx" ON "NewsArticle"("isProcessed");

-- CreateIndex
CREATE INDEX "NewsArticle_category_idx" ON "NewsArticle"("category");
