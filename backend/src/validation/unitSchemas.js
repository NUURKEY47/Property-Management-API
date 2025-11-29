// src/validation/unitSchemas.js (or your validation folder)

import { z } from "zod";

export const createUnitSchema = z.object({
  name: z.string().min(1, "Name is required and must be at least 1 character"),
  price: z.number().positive("Price must be a positive number"),
  propertyId: z.number().int().positive("Property ID must be a positive integer"),
  status: z.enum(["available", "occupied"], "Status must be available or occupied"),
  size: z.string().optional(),
  description: z.string().optional(),
});

export const updateUnitSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  status: z.enum(["available", "occupied"], "Status must be available or occupied").optional(),
  size: z.string().optional(),
  description: z.string().optional(),
});