-- AlterTable
ALTER TABLE "modules" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;
