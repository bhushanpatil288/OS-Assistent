import { SystemStats } from "../features/system/SystemStats";

const DashboardPage = () => (
  <main className="p-10 font-sans">
    <h1 className="text-[#e2e2e2] mb-8">System Dashboard</h1>
    <SystemStats />
  </main>
);

export default DashboardPage;