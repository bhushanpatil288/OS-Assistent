import si from "systeminformation";
import { Server } from "socket.io";

export const startSystemMonitoring = (io: Server) => {
  let interval: ReturnType<typeof setInterval> | null = null;
  let connectedClients = 0;

  const start = () => {
    if (interval) return;
    interval = setInterval(async () => {
      const cpu = await si.currentLoad();
      const memory = await si.mem();

      io.emit("system:stats", {
        cpu: cpu.currentLoad,
        totalMemory: memory.total,
        usedMemory: memory.active,
      });
    }, 2000);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  io.on("connection", (socket) => {
    connectedClients++;
    start();

    socket.on("disconnect", () => {
      connectedClients--;
      if (connectedClients === 0) stop();
    });
  });
};