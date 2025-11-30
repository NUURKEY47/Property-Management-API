import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";

// Create Unit (POST /units)
export const createUnit = async (req, res, next) => {
  const data = { ...req.body };

  const property = await prisma.property.findUnique({
    where: { id: data.propertyId },
  });

  if (!property) {
    return next(new AppError("Property not found", 404));
  }

  if (req.user.role === "LANDLORD" && property.landlordId !== req.user.id) {
    return next(new AppError("You do not own this property", 403));
  }

  const unit = await prisma.unit.create({
    data,
  });

  res.status(201).json({
    status: "success",
    data: unit,
  });
};

// Update Unit (PUT /units/:id)
export const updateUnit = async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid unit ID", 400));
  }

  const existingUnit = await prisma.unit.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!existingUnit) {
    return next(new AppError("Unit not found", 404));
  }

  if (
    req.user.role === "LANDLORD" &&
    existingUnit.property.landlordId !== req.user.id
  ) {
    return next(new AppError("You do not own this unit", 403));
  }

  const data = { ...req.body };

  const updatedUnit = await prisma.unit.update({
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

  res.status(200).json({
    status: "success",
    data: updatedUnit,
  });
};

// List Units (GET /units)
export const listUnits = async (req, res, next) => {
  const { propertyId, status } = req.query;

  const where = {};

  if (req.user.role === "LANDLORD") {
    where.property = { landlordId: req.user.id };
  }

  if (propertyId) {
    where.propertyId = parseInt(propertyId);
  }

  if (status) {
    where.status = status;
  }

  const units = await prisma.unit.findMany({
    where,
    include: { property: true },
  });

  res.status(200).json({
    status: "success",
    data: units,
  });
};

// Delete Unit (DELETE /units/:id)
export const deleteUnit = async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid unit ID", 400));
  }

  const existingUnit = await prisma.unit.findUnique({
    where: { id },
    include: { property: true },
  });

  if (!existingUnit) {
    return next(new AppError("Unit not found", 404));
  }

  if (
    req.user.role === "LANDLORD" &&
    existingUnit.property.landlordId !== req.user.id
  ) {
    return next(new AppError("You do not own this unit", 403));
  }

  if (existingUnit.status === "occupied") {
    return next(new AppError("Cannot delete occupied unit", 400));
  }

  await prisma.unit.delete({
    where: { id },
  });

  res.status(200).json({
    status: "success",
    message: "Unit deleted successfully",
  });
};
