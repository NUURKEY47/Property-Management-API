import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

//create Property
export const createProperty = async (req, res, next) => {
  const data = { ...req.body };
  data.landlordId = req.user.id; // set id to authenticated user
  console.log(data.landlordId);
  

const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  // Create property
  const property = await prisma.property.create({
    data,
  });

  res.status(201).json({
    status: "success",
    data: property,
  });
};
export const updatePropertyById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid property ID", 400));
  }

  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });

  if (!existingProperty) {
    return next(new AppError("Property not found", 404));
  }

  if (
    req.user.role === "LANDLORD" &&
    existingProperty.landlordId !== req.user.id
  ) {
    return next(new AppError("You do not own this property", 403));
  }

  const data = { ...req.body };

  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      return next(new AppError("Category not found", 404));
    }
  }

  const updatedProperty = await prisma.property.update({
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

  res.status(200).json({
    status: "success",
    data: updatedProperty,
  });
};

// List Properties (GET /properties)
export const getProperty = async (req, res, next) => {
  const { location, categoryId } = req.query;

  const where = {};

  if (req.user.role === "LANDLORD") {
    where.landlordId = req.user.id;
  }

  if (location) {
    where.location = {
      contains: location,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    where.categoryId = parseInt(categoryId);
  }

  const properties = await prisma.property.findMany({
    where,
    include: {
      category: true,
    },
  });

  res.status(200).json({
    status: "success",
    data: properties,
  });
};

// Delete Property (DELETE /properties/:id)
export const deletePropertyById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid property ID", 400));
  }

  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });

  if (!existingProperty) {
    return next(new AppError("Property not found", 404));
  }

  if (
    req.user.role === "LANDLORD" &&
    existingProperty.landlordId !== req.user.id
  ) {
    return next(new AppError("You do not own this property", 403));
  }

  // Optional: Check if has units
  const unitCount = await prisma.unit.count({
    where: { propertyId: id },
  });

  if (unitCount > 0) {
    return next(
      new AppError("Cannot delete property with associated units", 400)
    );
  }

  await prisma.property.delete({
    where: { id },
  });

  res.status(200).json({
    status: "success",
    message: "Property deleted successfully",
  });
};
