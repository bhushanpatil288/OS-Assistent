import { useEffect } from "react";
import { useFileExplorer } from "../../hooks/useFileExplorer";
import type { FileEntry } from "@shared/types/files.types";

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
};

const FileRow = ({
  entry,
  onClick,
}: {
  entry: FileEntry;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-[#313145] transition-colors"
  >
    <div className="flex items-center gap-3">
      <span>{entry.isDirectory ? "📁" : "📄"}</span>
      <span className="text-[#e2e2e2] text-sm">{entry.name}</span>
    </div>
    <span className="text-[#888] text-xs">
      {entry.isDirectory ? "—" : formatSize(entry.size)}
    </span>
  </div>
);

export const FileExplorer = () => {
  const { currentPath, entries, selectedFile, loading, error, navigate, openFile, goUp } =
    useFileExplorer();

  useEffect(() => {
    navigate(currentPath);
  }, []);

  return (
    <div className="flex gap-4 h-[600px]">
      {/* Left panel — directory listing */}
      <div className="w-1/2 bg-[#1e1e2e] border border-[#313145] rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#313145]">
          <button
            onClick={goUp}
            className="text-[#888] hover:text-[#e2e2e2] text-sm transition-colors"
          >
            ↑ Up
          </button>
          <span className="text-[#888] text-xs truncate">{currentPath}</span>
        </div>

        {/* Entries */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading && <p className="text-[#888] text-sm px-4 py-2">Loading...</p>}
          {error && <p className="text-red-400 text-sm px-4 py-2">{error}</p>}
          {!loading &&
            entries.map((entry) => (
              <FileRow
                key={entry.path}
                entry={entry}
                onClick={() =>
                  entry.isDirectory ? navigate(entry.path) : openFile(entry.path)
                }
              />
            ))}
        </div>
      </div>

      {/* Right panel — file content */}
      <div className="w-1/2 bg-[#1e1e2e] border border-[#313145] rounded-xl flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-[#313145]">
          <span className="text-[#888] text-xs">
            {selectedFile ? selectedFile.path : "Select a file to view"}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {selectedFile ? (
            <pre className="text-[#e2e2e2] text-xs whitespace-pre-wrap break-words font-mono">
              {selectedFile.content}
            </pre>
          ) : (
            <p className="text-[#888] text-sm">No file selected</p>
          )}
        </div>
      </div>
    </div>
  );
};