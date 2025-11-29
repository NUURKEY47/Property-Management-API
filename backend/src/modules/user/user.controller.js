import prisma from "../../config/db.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";

//getUsers
export const getAllUsers = async (req, res, next) => {
  const { role, email } = req.query;

  // Build the 'where' object for Prisma filtering.

  const where = {};

  if (role) {
    where.role = role; // Exact match for role
  }

  if (email) {
    where.email = {
      contains: email, // Partial match
      mode: "insensitive", // Case-insensitive
    };
  }
  // 'where' applies the filters built above.
  // 'select' specifies which fields to return (hides sensitive ones like password).

  const users = await prisma.user.findMany({
    where, // The dynamic filter object
    select: {
      // Select only these fields for security
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  res.status(200).json(users);
};

// ------------------------------------------------------------------

// GET USER BY ID - Admin only
export const getUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  // Handle invalid ID (like /users/abc or /users/-1)
  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid user ID", 400));
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

// -------------------------------------------------------------------------------------------------------------
export const updateUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  // Step 2: Parse and validate ID
  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid user ID", 400));
  }

  // Step 3: Find existing user
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    return next(new AppError("User not found", 404));
  }

  // Step 4: Prepare data from body
  const data = { ...req.body };

  // Added tenant assignment logic
  if (
    req.body.unitId &&
    (req.body.role === "TENANT" || existingUser.role === "TENANT")
  ) {
    const unitId = parseInt(req.body.unitId);
    if (isNaN(unitId)) {
      return next(new AppError("Invalid unit ID", 400));
    }

    const unit = await prisma.unit.findUnique({
      where: { id: unitId },
    });

    if (!unit) {
      return next(new AppError("Unit not found", 404));
    }

    if (unit.status !== "available") {
      return next(new AppError("Unit is not available for assignment", 400));
    }

    if (
      data.status &&
      !["active", "inactive", "pending"].includes(data.status)
    ) {
      return next(new AppError("Invalid status value", 422));
    }
    // Assign and update unit status
    data.unitId = unitId;
    await prisma.unit.update({
      where: { id: unitId },
      data: { status: "occupied" },
    });
  }

  // Step 5: Hash password if provided
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  // Step 6: Update user
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      unitId: true, // Added to confirm assignment in response
    },
  });

  // Step 7: Return response
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

// ------------------------------------------------------------------------------------------------------------------------
export const deleteUserById = async (req, res, next) => {
  const id = parseInt(req.params.id);

  // Step 2: Parse and validate ID
  if (isNaN(id) || id <= 0) {
    return next(new AppError("Invalid user ID", 400));
  }

  // Step 3: Delete user (Prisma throws if not found)
  await prisma.user.delete({
    where: { id },
  });

  // Step 4: Return response
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};
