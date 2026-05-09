import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/index.js";

const PORT = process.env.PORT || 7070;

const httpServer = http.createServer(app);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})