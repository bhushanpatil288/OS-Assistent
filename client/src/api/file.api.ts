import type { FileContent, FileEntry, FileMeta } from "@shared/types/files.types";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const listDirectory = async (path: string): Promise<FileEntry[]> => {
  const res = await fetch(`${BASE}/api/files/list?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
};

export const readFile = async (path: string): Promise<FileContent> => {
  const res = await fetch(`${BASE}/api/files/read?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export const getFileMeta = async (path: string): Promise<FileMeta> => {
  const res = await fetch(`${BASE}/api/files/meta?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}