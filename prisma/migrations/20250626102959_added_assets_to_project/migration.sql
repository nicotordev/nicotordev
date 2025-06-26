/*
  Warnings:

  - You are about to drop the column `blurDataUrl` on the `projects` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "blurDataUrl";

-- CreateTable
CREATE TABLE "assets" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "alt" VARCHAR(255),
    "width" INTEGER,
    "height" INTEGER,
    "blurDataUrl" VARCHAR(255),
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "AssetType" NOT NULL DEFAULT 'IMAGE',

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
