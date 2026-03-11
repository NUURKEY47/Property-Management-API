import prisma from "../../config/db.js";

export const propertyRepository = {
  findCategoryById: async (id) => {
    return await prisma.category.findUnique({ where: { id } });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  createProperty: async (data) => {
    return await prisma.property.create({ data });
  },

  findPropertyById: async (id) => {
    return await prisma.property.findUnique({ where: { id } });
  },

  updateProperty: async (id, data) => {
    return await prisma.property.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        location: true,
        categoryId: true,
        description: true,
        landlordId: true,
      },
    });
  },

  updatePropertyLandlordId: async (propertyId, landlordId) => {
    return await prisma.property.update({
      where: { id: propertyId },
      data: { landlordId },
      select: {
        id: true,
        name: true,
        location: true,
        categoryId: true,
        description: true,
        landlordId: true,
      },
    });
  },

  findManyProperties: async (where) => {
    return await prisma.property.findMany({ where });
  },

  countUnitsByPropertyId: async (propertyId) => {
    return await prisma.unit.count({ where: { propertyId } });
  },

  deleteProperty: async (id) => {
    return await prisma.property.delete({ where: { id } });
  },
};