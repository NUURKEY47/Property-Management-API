// src/modules/unit/unit.repository.js

import prisma from "../../config/db.js";

export const unitRepository = {
  findPropertyById: async (id) => {
    return await prisma.property.findUnique({ where: { id } });
  },

  createUnit: async (data) => {
    return await prisma.unit.create({ data });
  },
  findLandlordProperties: async (landlordId) => {
    return await prisma.property.findMany({
      where: { landlordId },
    });
  },

  findUnitById: async (id, includeProperty = false) => {
    return await prisma.unit.findUnique({
      where: { id },
      include: { property: includeProperty },
    });
  },

  updateUnit: async (id, data) => {
    return await prisma.unit.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        size: true,
        description: true,
        propertyId: true,
      },
    });
  },

  findManyUnits: async (where, includeProperty = false) => {
    return await prisma.unit.findMany({
      where,
      include: { property: includeProperty },
    });
  },

  deleteUnit: async (id) => {
    return await prisma.unit.delete({ where: { id } });
  },
};
