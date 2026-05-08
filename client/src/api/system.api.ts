import type { SystemStats } from "../types/system.types";
import { envConfig } from "../utils/envConfig";

export const fetchSystemStats = async (): Promise<SystemStats> => {
  const response = await fetch(`${envConfig.BASE_URL}/api/system/stats`);

  if (!response.ok) {
    throw new Error(`Failed to fetch system stats: ${response.status}`);
  }

  return response.json();
}