-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Active', 'Archived', 'Completed');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'Active';
