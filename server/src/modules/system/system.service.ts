import si from "systeminformation";

export const getSystemStats = async () => {
  const cpu = await si.currentLoad();
  const memory = await si.mem();

  return {
    cpu: cpu.currentLoad,
    totalMemory: memory.total,
    usedMemory: memory.active
  }
};