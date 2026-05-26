import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

import systemRoutes from "./modules/system/system.routes.js";
import fileRoutes from "./modules/files/files.routes.js";

app.use("/api/system", systemRoutes);
app.use("/api/files", fileRoutes);


import errorHander from "./utils/errorHandler.js";
app.use(errorHander);

export default app;