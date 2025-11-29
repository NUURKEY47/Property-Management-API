/*
  Warnings:

  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `landlords` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "landlords" ADD COLUMN     "role" TEXT,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT;
