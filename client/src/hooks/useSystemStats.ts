import { useState, useEffect } from "react";
import { getSocket } from "../services/socket";
import type { SystemStats } from "@shared/types/system.types";

interface UseSystemStatsResult {
  stats: SystemStats | null;
  connected: boolean;
}

export const useSystemStats = (): UseSystemStatsResult => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onStats = (data: SystemStats) => setStats(data);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("system:stats", onStats);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("system:stats", onStats);
    };
  }, []);

  return { stats, connected };
};