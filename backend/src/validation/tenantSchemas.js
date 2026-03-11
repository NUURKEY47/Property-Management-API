import { z } from "zod";

export const createTenantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateTenantSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 character").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export const assignToUnitSchema = z.object({
    unitId: z.number().int().positive("Unit ID must be a positive integer"),
});