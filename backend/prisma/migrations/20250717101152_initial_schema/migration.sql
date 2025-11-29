-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "landlords" ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "password" DROP NOT NULL;
