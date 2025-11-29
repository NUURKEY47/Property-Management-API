// src/validation/userSchemas.js (or your validation folder)

import { z } from "zod";

export const updateSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  role: z.enum(["ADMIN", "LANDLORD", "TENANT"], "Invalid role - must be ADMIN, LANDLORD, or TENANT").optional(),
status: z.enum(["active", "inactive", "pending"], "Invalid status - must be active, inactive, or pending").optional(),
});