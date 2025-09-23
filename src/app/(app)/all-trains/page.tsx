// src/app/(app)/all-trains/page.tsx
"use client";

import { AllTrainsTable } from "@/components/all-trains/all-trains-table";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Train } from "@/lib/types";

function AllTrainsPageContent({ extraTrains, onAddTrain }: { extraTrains?: Train[], onAddTrain: (train: Train) => void }) {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All Trains</h1>
      </div>
      <p className="text-muted-foreground">
        Real-time overview of the entire fleet's status and location.
      </p>
      <AllTrainsTable initialStatusFilter={status} extraTrains={extraTrains || []} onAddTrain={onAddTrain} />
    </div>
  );
}

export default function AllTrainsPage({ extraTrains, onAddTrain }: { extraTrains?: Train[], onAddTrain: (train: Train) => void }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllTrainsPageContent extraTrains={extraTrains} onAddTrain={onAddTrain} />
    </Suspense>
  );
}
