import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  FilesPage,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/files" element={<FilesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;