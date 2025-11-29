/*
  Warnings:

  - You are about to drop the column `createdAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `payments` table. All the data in the column will be lost.
  - Added the required column `date` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "invoices_userId_idx";

-- DropIndex
DROP INDEX "payments_invoiceId_idx";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "description" TEXT,
ADD COLUMN     "regDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "units" ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contract" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "regDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;
