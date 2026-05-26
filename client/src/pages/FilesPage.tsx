import { FileExplorer } from "../features/files/FileExplorer";

const FilesPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-[#e2e2e2] text-2xl font-semibold mb-6">File Explorer</h1>
      <FileExplorer />
    </div>
  );
};

export default FilesPage;