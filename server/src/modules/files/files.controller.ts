import type { Request, Response } from "express";
import { pathSchema } from "./files.validators.js";
import { getFileMetaData, listDirectory, readFile } from "./files.service.js";

export const listDirectoryController = async (req: Request, res: Response) => {
  const result = pathSchema.safeParse(req.query);

  if(!result.success) {
    res.status(400).json({
      error: result.error.issues[0]?.message ?? "Invalid request"
    });
    return;
  }

  const entries = await listDirectory(result.data.path);
  res.json(entries);
}

export const readFileController = async (req: Request, res: Response) => {
  const result = pathSchema.safeParse(req.query);

  if(!result.success){
    res.status(400).json({
      error: result.error.issues[0]?.message ?? "Invalid request"
    });
    return;
  }

  const file = await readFile(result.data.path);
  res.json(file);
}

export const getFileMetaController = async (req: Request, res: Response) => {
  const result = pathSchema.safeParse(req.query);

  if(!result.success){
    res.status(400).json({
      error: result.error.issues[0]?.message ?? "Invalid request"
    });
    return;
  }

  const meta = await getFileMetaData(result.data.path);
  res.json(meta);
}
