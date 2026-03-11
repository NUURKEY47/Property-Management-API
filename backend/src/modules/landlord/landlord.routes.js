import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { updateLandlordSchema } from "../../validation/landlordSchemas.js";
import {
  updateLandlord,
  deleteLandlord,
  listLandlords,
  getLandlordById,
  getLandlordDashboard,
} from "./landlord.controller.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), listLandlords);
router.get("/:id", verifyToken, authorizeRoles("LANDLORD", "ADMIN"), getLandlordById);
router.get("/dashboard", verifyToken, authorizeRoles("LANDLORD"), getLandlordDashboard);

// Update & Delete — admin-only (sub-admins restricted via service)
router.put("/:id", verifyToken, authorizeRoles("ADMIN"), validate(updateLandlordSchema), updateLandlord);
router.delete("/:id", verifyToken, authorizeRoles("ADMIN"), deleteLandlord);

export default router;