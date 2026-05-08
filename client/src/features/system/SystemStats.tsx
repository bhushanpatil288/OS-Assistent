import { useSystemStats } from "../../hooks/useSystemStats";

const formatBytes = (bytes: number): string => {
  const gb = bytes / 1024 ** 3;
  return `${gb.toFixed(1)} GB`;
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#1e1e2e] border-[#313145] rounded-xl p-6 min-w-[160px]">
    <p className="text-[#888] text-sm mb-2">{label}</p>
    <p className="text-[#e2e2e2] text-2xl font-semibold">{value}</p>
  </div>
);

export const SystemStats = () => {
  const { stats, loading, error } = useSystemStats(2000);

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (error) return <p className="text-[#f87171]">Error: {error}</p>;
  if (!stats) return null;

  const memoryPercent = ((stats.usedMemory / stats.totalMemory) * 100).toFixed(1);

  return (
    <div className="flex gap-4 flex-wrap">
      <StatCard label="CPU Usage" value={`${stats.cpu.toFixed(1)}%`} />
      <StatCard label="Memory Used" value={formatBytes(stats.usedMemory)} />
      <StatCard label="Memory Total" value={formatBytes(stats.totalMemory)} />
      <StatCard label="Memory %" value={`${memoryPercent}%`} />
    </div>
  );
};