// src/modules/auth/auth.service.js

import { authRepository } from "./auth.repository.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authService = {
  registry: async (data, currentUser) => {
    // If the person creating this user has an ID (i.e. is an Admin making a sub-admin/landlord), link them
    if (currentUser && currentUser.id) {
      data.managedById = currentUser.id;
    }

    data.password = await bcrypt.hash(data.password, 10);
    const user = await authRepository.createUser(data);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, managedById: user.managedById },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return { user, token };
  },

  login: async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AppError("Password is incorrect", 422);
    }
    const token = jwt.sign(
      {
        id: user.id, email: user.email, role: user.role,
        managedById: user.managedById   // ← ADD THIS LINE (or it stays undefined)
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return { user, token };
  },

  checkFirstAdmin: async (role, token) => {
    const allowedRoles = ["ADMIN", "LANDLORD", "TENANT"];
    if (!role || !allowedRoles.includes(role)) {
      throw new AppError("Invalid or missing role", 401);
    }

    if (role === "TENANT" || role === "LANDLORD") {
      return null; // No need for token
    }

    const adminCount = await authRepository.countAdmins();

    if (adminCount === 0) {
      return null; // First admin, no token
    }

    if (!token) {
      throw new AppError("Token required to create new admin", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      throw new AppError("Only admins can create new admins", 401);
    }

    return decoded;
  },
};
