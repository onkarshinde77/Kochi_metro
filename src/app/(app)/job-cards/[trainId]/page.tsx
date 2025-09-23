
// src/app/(app)/job-cards/[trainId]/page.tsx
import { initialTrains } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import { JobCardsTable } from "@/components/job-cards/job-cards-table";
import { currentJobCards, pastJobCards } from "@/lib/data";

export default function TrainJobCardsPage({ params }: { params: { trainId: string } }) {
  const trainId = params.trainId;
  const train = initialTrains.find(t => t.id === trainId);

  if (!train) {
    notFound();
  }

  const allJobs = [...currentJobCards, ...pastJobCards];
  const jobsForTrain = allJobs.filter(job => job.trainId === trainId);
  const openJobs = jobsForTrain.filter(job => job.status !== 'Completed');
  const completedJobs = jobsForTrain.filter(job => job.status === 'Completed');

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">
                Job Cards for Metro: <span className="text-primary">{train.id}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
                A complete maintenance history and all open jobs for this metro.
            </p>
        </div>
      </div>

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
