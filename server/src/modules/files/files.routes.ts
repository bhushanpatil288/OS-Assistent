import { Router } from "express";
import {
  getFileMetaController,
  listDirectoryController,
  readFileController,
} from "./files.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.get("/list", asyncHandler(listDirectoryController));
router.get("/read", asyncHandler(readFileController));
router.get("/meta", asyncHandler(getFileMetaController));

export default router;