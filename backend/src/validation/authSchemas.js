// Schema for user registration

import { z } from "zod";


export const registerSchema = z.object({
  name: z.string().min(1, "Name is required and cannot be empty"), // Ensures name is a string with at least 1 character
  email: z.string().email("Invalid email format"), // Checks if email is a valid email string
  password: z.string().min(6, "Password must be at least 6 characters long"), // String password with minimum length for security
  role: z.enum(["ADMIN", "LANDLORD", "TENANT"], "Invalid or missing role - must be ADMIN, LANDLORD, or TENANT"), // Restricts to specific allowed values
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"), // Same as above, valid email check
  password: z.string().min(6, "Password must be at least 6 characters long"), // Ensures password meets length requirement
});