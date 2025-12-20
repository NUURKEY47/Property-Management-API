// import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";
import { propertyService } from "./property.service.js";
import sendResponse from "../../utils/sendResponse.js";

//create Property
// export const createProperty = async (req, res, next) => {
//   const data = { ...req.body };

//   if (req.user.role === "LANDLORD") {
//     data.landlordId = req.user.id; // Auto-set and override if passed
//   } else if (req.user.role === "ADMIN") {
//     if (!data.landlordId) {
//       return next(new AppError("Landlord ID is required for admins", 422));
//     }

//     const landlord = await prisma.user.findUnique({
//       where: { id: data.landlordId },
//     });

//     if (!landlord || landlord.role !== "LANDLORD") {
//       return next(new AppError("Invalid landlord ID", 400));
//     }
//   }

//   const category = await prisma.category.findUnique({
//     where: { id: data.categoryId },
//   });

//   if (!category) {
//     return next(new AppError("Category not found", 404));
//   }

//   const property = await prisma.property.create({
//     data,
//   });

//   res.status(201).json({
//     status: "success",
//     data: property,
//   });
// };

// export const updatePropertyById = async (req, res, next) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id) || id <= 0) {
//     return next(new AppError("Invalid property ID", 400));
//   }

//   const existingProperty = await prisma.property.findUnique({
//     where: { id },
//   });

//   if (!existingProperty) {
//     return next(new AppError("Property not found", 404));
//   }

//   if (
//     req.user.role === "LANDLORD" &&
//     existingProperty.landlordId !== req.user.id
//   ) {
//     return next(new AppError("You do not own this property", 403));
//   }

//   const data = { ...req.body };

//   if (data.categoryId) {
//     const category = await prisma.category.findUnique({
//       where: { id: data.categoryId },
//     });
//     if (!category) {
//       return next(new AppError("Category not found", 404));
//     }
//   }

//   const updatedProperty = await prisma.property.update({
//     where: { id },
//     data,
//     select: {
//       id: true,
//       name: true,
//       location: true,
//       categoryId: true,
//       description: true,
//       landlordId: true,
//     },
//   });

//   res.status(200).json({
//     status: "success",
//     data: updatedProperty,
//   });
// };

// List Properties (GET /properties)
// export const getProperty = async (req, res, next) => {
//   const { location, categoryId } = req.query;

//   const where = {};

//   if (req.user.role === "LANDLORD") {
//     where.landlordId = req.user.id; // Restrict to own for landlords
//   }

//   if (location) {
//     where.location = {
//       contains: location,
//       mode: "insensitive",
//     };
//   }

//   if (categoryId) {
//     const catId = parseInt(categoryId);
//     if (isNaN(catId)) {
//       return next(new AppError("Invalid category ID", 400));
//     }
//     where.categoryId = catId;
//   }

//   const properties = await prisma.property.findMany({
//     where,
//     include: {
//       category: true,
//     },
//   });

//   res.status(200).json({
//     status: "success",
//     data: properties,
//   });
// };
// -----------------------------------------------------------------------------------------------------
// export const getPropertyById = async (req, res, next) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id) || id <= 0) {
//     return next(new AppError("Invalid property ID", 400));
//   }

//   const property = await prisma.property.findUnique({
//     where: { id },
//     include: { category: true },
//   });

//   if (!property) {
//     return next(new AppError("Property not found", 404));
//   }

//   if (req.user.role === "LANDLORD" && property.landlordId !== req.user.id) {
//     return next(new AppError("You do not own this property", 403));
//   }

//   res.status(200).json({
//     status: "success",
//     data: property,
//   });
// };
// ---------------------------------------------------------------------------------------------------------

// Delete Property (DELETE /properties/:id)
// export const deletePropertyById = async (req, res, next) => {
//   const id = parseInt(req.params.id);

//   if (isNaN(id) || id <= 0) {
//     return next(new AppError("Invalid property ID", 400));
//   }

//   const existingProperty = await prisma.property.findUnique({
//     where: { id },
//   });

//   if (!existingProperty) {
//     return next(new AppError("Property not found", 404));
//   }

//   if (
//     req.user.role === "LANDLORD" &&
//     existingProperty.landlordId !== req.user.id
//   ) {
//     return next(new AppError("You do not own this property", 403));
//   }

//   // Optional: Check if has units
//   const unitCount = await prisma.unit.count({
//     where: { propertyId: id },
//   });

//   if (unitCount > 0) {
//     return next(
//       new AppError("Cannot delete property with associated units", 400)
//     );
//   }

//   await prisma.property.delete({
//     where: { id },
//   });

//   res.status(200).json({
//     status: "success",
//     message: "Property deleted successfully",
//   });
// };

//create Property;

// src/modules/property/property.controller.js

export const createProperty = async (req, res, next) => {
  try {
    const property = await propertyService.createProperty(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedProperty = await propertyService.updateProperty(
      id,
      req.body,
      req.user
    );
    sendResponse(res, {
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req, res, next) => {
  try {
    const properties = await propertyService.getProperties(req.query, req.user);
    sendResponse(res, {
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const property = await propertyService.getPropertyById(id, req.user);
    sendResponse(res, {
      message: "Property fetched successfully",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePropertyById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await propertyService.deleteProperty(id, req.user);
    sendResponse(res, { message: "Property deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// i want to use the controller->service->repository format
