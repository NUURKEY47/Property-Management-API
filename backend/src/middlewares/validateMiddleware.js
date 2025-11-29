
import { z } from "zod";
import AppError from "../utils/AppError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next(); 
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`); 
      throw new AppError("Validation failed", 422, details); 
    }
    next(error);
  }
};