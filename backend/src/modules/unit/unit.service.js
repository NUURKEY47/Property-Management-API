// src/modules/unit/unit.service.js

import { unitRepository } from "./unit.repository.js";
import AppError from "../../utils/AppError.js";

export const unitService = {
  // src/modules/unit/unit.service.js

  createUnit: async (data, user) => {
    let finalPropertyId = null;
    let property = null;

    if (user.role === "ADMIN") {
      // ADMIN: propertyId MUST be provided in body
      if (!data.propertyId) {
        throw new AppError("Property ID is required for admins", 400);
      }

      property = await unitRepository.findPropertyById(data.propertyId);
      if (!property) {
        throw new AppError("Property not found", 404);
      }
      // Optional extra check
      if (!property.landlordId) {
        throw new AppError("Property has no assigned landlord", 400);
      }

      finalPropertyId = data.propertyId;
    } else if (user.role === "LANDLORD") {
      // LANDLORD: propertyId optional
      if (data.propertyId) {
        // If provided, validate ownership
        property = await unitRepository.findPropertyById(data.propertyId);
        if (!property) {
          throw new AppError("Property not found", 404);
        }
        if (property.landlordId !== user.id) {
          throw new AppError("You do not own this property", 403);
        }
        finalPropertyId = data.propertyId;
      } else {
        // If NOT provided → auto-select one of landlord's properties
        const landlordProperties = await unitRepository.findLandlordProperties(
          user.id
        );

        if (landlordProperties.length === 0) {
          throw new AppError(
            "You have no properties yet. Create a property first.",
            400
          );
        }

        // Choose the first one (or you can change logic: latest, etc.)
        property = landlordProperties[0];
        finalPropertyId = property.id;
      }
    }

    // Now create the unit with the resolved propertyId
    const unitData = {
      ...data,
      propertyId: finalPropertyId, // Override or set the correct one
    };

    return await unitRepository.createUnit(unitData);
  },

  updateUnit: async (id, data, user) => {
    const existingUnit = await unitRepository.findUnitById(id, true);

    if (!existingUnit) {
      throw new AppError("Unit not found", 404);
    }

    if (
      user.role === "LANDLORD" &&
      existingUnit.property.landlordId !== user.id
    ) {
      throw new AppError("You do not own this unit", 403);
    }

    return await unitRepository.updateUnit(id, data);
  },

  getUnitById: async (id, user) => {
  const unit = await unitRepository.findUnitById(id, true); // include property

  if (!unit) {
    throw new AppError("Unit not found", 404);
  }

  // Authorization: Landlord can only view their own units
  if (user.role === "LANDLORD" && unit.property.landlordId !== user.id) {
    throw new AppError("You do not own this unit", 403);
  }

  return unit;
},

  listUnits: async (query, user) => {
    const where = {};

    if (user.role === "LANDLORD") {
      where.property = { landlordId: user.id };
    }

    if (query.propertyId) {
      const propId = parseInt(query.propertyId);
      if (isNaN(propId)) {
        throw new AppError("Invalid property ID", 400);
      }
      where.propertyId = propId;
    }

    if (query.status) { 
      where.status = query.status;
    }

    return await unitRepository.findManyUnits(where, true);

  },


  deleteUnit: async (id, user) => {
    const existingUnit = await unitRepository.findUnitById(id, true);

    if (!existingUnit) {
      throw new AppError("Unit not found", 404);
    }

    if (
      user.role === "LANDLORD" &&
      existingUnit.property.landlordId !== user.id
    ) {
      throw new AppError("You do not own this unit", 403);
    }

    if (existingUnit.status === "occupied") {
      throw new AppError("Cannot delete occupied unit", 400);
    }

    await unitRepository.deleteUnit(id);
  },
};
