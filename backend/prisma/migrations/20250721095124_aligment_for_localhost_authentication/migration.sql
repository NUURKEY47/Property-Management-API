-- DropForeignKey
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_unit_id_fkey";

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("unit_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
