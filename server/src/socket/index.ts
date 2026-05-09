import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { startSystemMonitoring } from "./system.socket.js";

export const initSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    },
  });

  startSystemMonitoring(io);

  return io;
};