/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `modules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "modules_id_key" ON "modules"("id");
