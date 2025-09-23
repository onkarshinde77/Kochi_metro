// src/app/(app)/job-cards/[trainId]/page.tsx
import { currentJobCards, pastJobCards, initialTrains } from "@/lib/data";
import { JobCardsTable } from "@/components/job-cards/job-cards-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import type { JobCard } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react";

export default function TrainDetailPage({ params }: { params: { trainId: string } }) {
  const trainId = params.trainId;
  const train = initialTrains.find(t => t.id === trainId);

  if (!train) {
    notFound();
  }

  const allJobs = [...currentJobCards, ...pastJobCards];
  const jobsForTrain = allJobs.filter(job => job.trainId === trainId);
  const openJobs = jobsForTrain.filter(job => job.status !== 'Completed');
  const completedJobs = jobsForTrain.filter(job => job.status === 'Completed');
  
  const criticalAlerts = openJobs.filter(
    (job) => job.priority === "High" && job.status === "Pending"
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Job Cards for Train <span className="text-primary">{train.id}</span>
        </h1>
      </div>
       <p className="text-muted-foreground">
        Detailed maintenance history for train {train.id}. Current Mileage: {train.mileage.toLocaleString()} km.
      </p>

      {criticalAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Pending Jobs</AlertTitle>
          <AlertDescription>
            This train has {criticalAlerts.length} high-priority job(s) pending.
            <ul>
                {criticalAlerts.map(job => <li key={job.id}>- {job.task}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Open Jobs ({openJobs.length})</CardTitle>
            <CardDescription>Maintenance tasks that are currently pending, in progress, or blocked.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={openJobs} trainMileage={train.mileage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Jobs ({completedJobs.length})</CardTitle>
            <CardDescription>A historical record of all completed maintenance tasks for this train.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={completedJobs} trainMileage={train.mileage} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
