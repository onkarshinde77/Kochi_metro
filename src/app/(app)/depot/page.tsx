import { DepotMap } from "@/components/depot/depot-map";

export default function DepotPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Depot Map</h1>
      </div>
      <p className="text-muted-foreground">
        Interactive visualization of the depot layout with real-time train locations. Drag and drop to simulate shunting.
      </p>
      <div className="mt-6">
        <DepotMap />
      </div>
    </div>
  );
}
