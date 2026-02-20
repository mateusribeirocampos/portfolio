-- AlterTable: make ipAddress nullable in resume_downloads and page_views
ALTER TABLE "public"."resume_downloads" ALTER COLUMN "ipAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."page_views" ALTER COLUMN "ipAddress" DROP NOT NULL;
