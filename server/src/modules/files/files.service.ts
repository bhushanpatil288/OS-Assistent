import fs from "fs/promises";
import path from "path";
import type { FileContent, FileEntry, FileMeta } from "./files.types.js";

export const listDirectory = async (dirPath: string): Promise<FileEntry[]> => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const results = await Promise.all(
    entries.map(async(entry) => {
      const fullpath = path.join(dirPath, entry.name);
      const stat = await fs.stat(fullpath)

      return {
        name: entry.name,
        path: fullpath,
        isDirectory: entry.isDirectory(),
        size: stat.size,
        modified: stat.mtime,
      };
    })
  );

  // Directories first, then files, both alphabetal
  return results.sort((a,b) => {
    if(a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export const readFile = async (filePath: string): Promise<FileContent> => {
  const content = await fs.readFile(filePath, "utf-8");
  return { path: filePath, content };
}

export const getFileMetaData = async (filePath: string): Promise<FileMeta> => {
  const stat = await fs.stat(filePath);
  const ext = path.extname(filePath);

  return {
    name: path.basename(filePath),
    path: filePath,
    isDirectory: stat.isDirectory(),
    size: stat.size,
    modified: stat.mtime,
    extension: ext || null,
  };
};