export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: Date;
}

export interface FileMeta extends FileEntry {
  extension: string | null;
}

export interface FileContent {
  path: string;
  content: string;
}