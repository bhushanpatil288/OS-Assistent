import { SystemStats } from "../features/system/SystemStats";

const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-[#141414] text-2xl font-semibold mb-6">Dashboard</h1>
      <SystemStats />
    </div>
  );
};

export default DashboardPage;