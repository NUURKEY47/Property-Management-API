/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `properties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "properties_name_key" ON "properties"("name");
