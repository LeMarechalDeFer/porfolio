-- CreateTable
CREATE TABLE "ProjectForm" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "sector" VARCHAR(255) NOT NULL,
    "budget" VARCHAR(255) NOT NULL,
    "timeline" VARCHAR(255) NOT NULL,
    "mainObjective" TEXT NOT NULL,
    "projectIdea" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "expectedResults" TEXT NOT NULL,
    "technicalPreferences" TEXT,
    "otherDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectForm_pkey" PRIMARY KEY ("id")
);
