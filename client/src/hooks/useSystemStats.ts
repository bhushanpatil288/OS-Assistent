import { useState, useEffect } from "react";
import type { SystemStats } from "../types/system.types";
import { fetchSystemStats } from "../api/system.api";

interface useSystemStatsResult {
  stats: SystemStats | null;
  loading: boolean;
  error: string | null;
}

export const useSystemStats = (pollInterval = 2000): useSystemStatsResult => {

}