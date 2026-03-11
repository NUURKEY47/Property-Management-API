import { z } from "zod";

export const createLandlordSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateLandlordSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export const assignToPropertySchema = z.object({
  propertyId: z.number().int().positive("Property ID must be a positive integer"),
});