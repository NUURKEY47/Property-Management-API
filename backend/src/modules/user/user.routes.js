import {getAllUsers, getUserById,updateUserById, deleteUserById } from "./user.controller.js"
import { verifyToken, authorizeRoles } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validateMiddleware.js";
import {updateSchema} from "../../validation/userSchemas.js"
import catchAsync from "../../utils/catchAsync.js";
import express from "express";

const router = express.Router();

router.get('/', verifyToken , authorizeRoles("ADMIN"), catchAsync(getAllUsers))
router.get("/:id", verifyToken, authorizeRoles("ADMIN") , catchAsync(getUserById))
router.put("/:id", verifyToken, authorizeRoles("ADMIN"), validate(updateSchema), catchAsync(updateUserById ));
router.delete("/:id", verifyToken, authorizeRoles("ADMIN"), catchAsync(deleteUserById));

export default router;

