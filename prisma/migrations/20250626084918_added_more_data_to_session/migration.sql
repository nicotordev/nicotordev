-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'EN_GB', 'ES', 'ES_CL', 'ES_ES', 'DE');

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN',
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'SYSTEM';
