// src/modules/property/property.service.js

import { propertyRepository } from "./property.repository.js";
import AppError from "../../utils/AppError.js";
// import { createProperty } from "./property.controller.js";

export const propertyService = {
  createProperty: async (data, user) => {
    if (user.role === "LANDLORD") {
      data.landlordId = user.id; // Auto-set and override if passed
    } else if (user.role === "ADMIN") {
      if (!data.landlordId) {
        throw new AppError("Landlord ID is required for admins", 422);
      }

      const landlord = await propertyRepository.findUserById(data.landlordId);

      if (!landlord || landlord.role !== "LANDLORD") {
        throw new AppError("Invalid landlord ID", 400);
      }
    }

    const category = await propertyRepository.findCategoryById(data.categoryId);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    return await propertyRepository.createProperty(data);
  },

  updateProperty: async (id, data, user) => {
    const existingProperty = await propertyRepository.findPropertyById(id);

    if (!existingProperty) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && existingProperty.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    }

    if (data.categoryId) {
      const category = await propertyRepository.findCategoryById(
        data.categoryId
      );
      if (!category) {
        throw new AppError("Category not found", 404);
      }
    }

    return await propertyRepository.updateProperty(id, data);
  },

  getProperties: async (query, user) => {
    const where = {};

    if (user.role === "LANDLORD") {
      where.landlordId = user.id;
    }

    if (query.location) {
      where.location = {
        contains: query.location,
        mode: "insensitive",
      };
    }

    if (query.categoryId) {
      const catId = parseInt(query.categoryId);
      if (isNaN(catId)) {
        throw new AppError("Invalid category ID", 400);
      }
      where.categoryId = catId;
    }

    return await propertyRepository.findManyProperties(where);
  },

  getPropertyById: async (id, user) => {
    const property = await propertyRepository.findPropertyById(id);

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && property.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    }

    return property;
  },

  deleteProperty: async (id, user) => {
    const existingProperty = await propertyRepository.findPropertyById(id);

    if (!existingProperty) {
      throw new AppError("Property not found", 404);
    }

    if (user.role === "LANDLORD" && existingProperty.landlordId !== user.id) {
      throw new AppError("You do not own this property", 403);
    }

    const unitCount = await propertyRepository.countUnitsByPropertyId(id);

    if (unitCount > 0) {
      throw new AppError("Cannot delete property with associated units", 400);
    }

    await propertyRepository.deleteProperty(id);
  },
};


// i want to use the controller->service->repository format
