/*
  Warnings:

  - You are about to drop the column `date` on the `payments` table. All the data in the column will be lost.
  - Added the required column `paymentDate` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "date",
ADD COLUMN     "method" TEXT,
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL;
