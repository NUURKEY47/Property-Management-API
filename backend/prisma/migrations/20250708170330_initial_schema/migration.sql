-- CreateTable
CREATE TABLE "admins" (
    "admin_id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "landlords" (
    "landlord_id" SERIAL NOT NULL,
    "admin_id" INTEGER,
    "name" TEXT,
    "id_number" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "landlords_pkey" PRIMARY KEY ("landlord_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "properties" (
    "property_id" SERIAL NOT NULL,
    "landlord_id" INTEGER,
    "category_id" INTEGER,
    "name" TEXT,
    "location" TEXT,
    "description" TEXT,
    "reg_date" DATE,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "units" (
    "unit_id" SERIAL NOT NULL,
    "property_id" INTEGER,
    "name" TEXT,
    "size" TEXT,
    "price" DECIMAL,
    "description" TEXT,
    "image_1" TEXT,
    "image_2" TEXT,
    "image_3" TEXT,
    "status" TEXT,
    "reg_date" DATE,

    CONSTRAINT "units_pkey" PRIMARY KEY ("unit_id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "tenant_id" SERIAL NOT NULL,
    "unit_id" INTEGER,
    "name" TEXT,
    "id_number" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "occupation" TEXT,
    "contract" TEXT,
    "status" TEXT,
    "reg_date" DATE,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("tenant_id")
);

-- AddForeignKey
ALTER TABLE "landlords" ADD CONSTRAINT "landlords_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("admin_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_landlord_id_fkey" FOREIGN KEY ("landlord_id") REFERENCES "landlords"("landlord_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("property_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("unit_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
