import type { Request, Response } from "express";
import { getSystemStats } from "./system.service.js";

export const systemStatsController = async (
  req: Request,
  res: Response
) => {
  const stats = await getSystemStats();

  res.json(stats);
}