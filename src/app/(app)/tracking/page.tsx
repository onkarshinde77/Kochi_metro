import { TrainTracker } from "@/components/tracking/train-tracker";

export default function TrackingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Track All Metros</h1>
      </div>
      <p className="text-muted-foreground">
        Real-time overview of the entire fleet's status and location.
      </p>
      <TrainTracker />
    </div>
  );
}
