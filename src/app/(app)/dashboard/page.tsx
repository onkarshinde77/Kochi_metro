import { KpiCard } from "@/components/dashboard/kpi-card";
import { kpis } from "@/lib/data";
import { FleetUtilizationChart } from "@/components/dashboard/fleet-utilization-chart";
import { MaintenanceBacklogChart } from "@/components/dashboard/maintenance-backlog-chart";
import { PredictiveAlerts } from "@/components/dashboard/predictive-alerts";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-12 lg:col-span-4">
            <FleetUtilizationChart />
        </div>
        <div className="col-span-12 lg:col-span-3">
            <MaintenanceBacklogChart />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <PredictiveAlerts />
      </div>
    </div>
  );
}
