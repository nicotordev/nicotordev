-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('WEB_DEVELOPMENT', 'MOBILE_APP', 'E_COMMERCE', 'SAAS_PLATFORM', 'PORTFOLIO', 'CONSULTING', 'OTHER');

-- CreateEnum
CREATE TYPE "Budget" AS ENUM ('UNDER_5K', 'RANGE_5K_15K', 'RANGE_15K_30K', 'RANGE_30K_50K', 'OVER_50K');

-- CreateEnum
CREATE TYPE "Timeline" AS ENUM ('ASAP', 'ONE_MONTH', 'ONE_TO_THREE_MONTHS', 'THREE_TO_SIX_MONTHS', 'OVER_SIX_MONTHS');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('DESIGN', 'PERFORMANCE', 'FUNCTIONALITY', 'SEO', 'USER_EXPERIENCE');

-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('EMAIL', 'PHONE', 'VIDEO_CALL');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'WON', 'LOST');

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(100) NOT NULL,
    "projectType" "ProjectType" NOT NULL,
    "budget" "Budget" NOT NULL,
    "timeline" "Timeline" NOT NULL,
    "priority" "Priority" NOT NULL,
    "message" TEXT NOT NULL,
    "contactPreference" "ContactPreference" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "source" TEXT DEFAULT 'contact_form',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "followUpDate" TIMESTAMP(3),
    "assignedTo" TEXT,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");
