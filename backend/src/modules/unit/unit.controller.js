// src/modules/unit/unit.controller.js

import { unitService } from "./unit.service.js";
import sendResponse from "../../utils/sendResponse.js";

export const createUnit = async (req, res, next) => {
  try {
    const unit = await unitService.createUnit(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "Unit created successfully",
      data: unit,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUnit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedUnit = await unitService.updateUnit(id, req.body, req.user);
    sendResponse(res, {
      message: "Unit updated successfully",
      data: updatedUnit,
    });
  } catch (error) {
    next(error);
  }
};
export const getUnitById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new AppError("Invalid unit ID", 400);
    }

    const unit = await unitService.getUnitById(id, req.user);

    sendResponse(res, {
      message: "Unit fetched successfully",
      data: unit,
    });
  } catch (error) {
    next(error);
  }
};

export const listUnits = async (req, res, next) => {
  try {
    const units = await unitService.listUnits(req.query, req.user);
    sendResponse(res, { message: "Units fetched successfully", data: units });
  } catch (error) {
    next(error);
  }
};

export const deleteUnit = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await unitService.deleteUnit(id, req.user);
    sendResponse(res, { message: "Unit deleted successfully" });
  } catch (error) {
    next(error);
  }
};
