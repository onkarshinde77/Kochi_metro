// src/app/(app)/tracking/page.tsx
"use client";

import { TrainTracker } from "@/components/tracking/train-tracker";
import { LiveMap } from "@/components/tracking/live-map";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { initialTrains } from "@/lib/data";
import { Card } from "@/components/ui/card";

function TrackingPageContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Track All Metros</h1>
      </div>
      <p className="text-muted-foreground">
        Real-time overview of the entire fleet's status and location.
      </p>
      <Card className="h-[400px] w-full">
         <LiveMap trains={initialTrains} />
      </Card>
      <TrainTracker initialStatusFilter={status} />
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingPageContent />
    </Suspense>
  );
}
