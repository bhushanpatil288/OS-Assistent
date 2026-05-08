import { Router } from "express";
import { systemStatsController } from "./system.controller.js";

const router = Router();

router.get("/stats", systemStatsController);

export default router;