import express from "express";
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import { createTenantSchema, assignToUnitSchema } from "../../validation/tenantSchemas.js";
import {
    createTenant,
    assignToUnit,
    listTenants,
    getTenantById,
    getTenantDashboard,
} from "./tenant.controller.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), validate(createTenantSchema), createTenant);
router.put("/:id/assign-unit", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), validate(assignToUnitSchema), assignToUnit);
router.get("/", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), listTenants);
router.get("/:id", verifyToken, authorizeRoles("ADMIN", "LANDLORD"), getTenantById);
router.get("/dashboard", verifyToken, authorizeRoles("TENANT"), getTenantDashboard);

export default router;