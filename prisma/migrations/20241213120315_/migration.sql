/*
  Warnings:

  - Made the column `user_id` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_user_id_fkey";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "registrations" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
