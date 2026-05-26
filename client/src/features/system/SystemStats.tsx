import { useSystemStats } from "../../hooks/useSystemStats";

const formatBytes = (bytes: number): string =>
  `${(bytes / 1024 ** 3).toFixed(1)} GB`;

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#1e1e2e] border border-[#313145] rounded-xl p-6 min-w-40">
    <p className="text-[#888] text-sm mb-2">{label}</p>
    <p className="text-[#e2e2e2] text-2xl font-semibold">{value}</p>
  </div>
);

export const SystemStats = () => {
  const { stats, connected } = useSystemStats();

  return (
    <div>
      <p className={`text-sm mb-4 ${connected ? "text-green-800" : "text-red-500"}`}>
        {connected ? "● Live" : "○ Disconnected"}
      </p>

      {stats ? (
        <div className="flex gap-4 flex-wrap">
          <StatCard label="CPU Usage" value={`${stats.cpu.toFixed(1)}%`} />
          <StatCard label="Memory Used" value={formatBytes(stats.usedMemory)} />
          <StatCard label="Memory Total" value={formatBytes(stats.totalMemory)} />
          <StatCard
            label="Memory %"
            value={`${((stats.usedMemory / stats.totalMemory) * 100).toFixed(1)}%`}
          />
        </div>
      ) : (
        <p className="text-[#888]">Waiting for data...</p>
      )}
    </div>
  );
};