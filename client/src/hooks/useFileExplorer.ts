import { useState, useCallback } from "react";
import { listDirectory, readFile } from "../api/file.api";
import type { FileContent, FileEntry } from "@shared/types/files.types";
import os from "os";

const HOME = import.meta.env.VITE_HOME_DIR ?? "/home";

interface UseFileExplorerResult {
  currentPath: string;
  entries: FileEntry[];
  selectedFile: FileContent | null;
  loading: boolean;
  error: string | null;
  navigate: (path: string) => void;
  openFile: (path: string) => void;
  goUp: () => void;
}

export const useFileExplorer = (): UseFileExplorerResult => {
  const [currentPath, setCurrentPath] = useState(HOME);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);
    setSelectedFile(null);
    try {
      const result = await listDirectory(path);
      setCurrentPath(path);
      setEntries(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load directory");
    } finally {
      setLoading(false);
    }
  }, []);

  const openFile = useCallback(async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await readFile(path);
      setSelectedFile(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to read file");
    } finally {
      setLoading(false);
    }
  }, []);

  const goUp = useCallback(() => {
    const parent = currentPath.split("/").slice(0, -1).join("/") || "/";
    navigate(parent);
  }, [currentPath, navigate]);

  return { currentPath, entries, selectedFile, loading, error, navigate, openFile, goUp };
};