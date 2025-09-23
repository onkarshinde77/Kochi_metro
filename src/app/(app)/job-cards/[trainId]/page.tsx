// src/app/(app)/job-cards/[trainId]/page.tsx
import { currentJobCards, pastJobCards, initialTrains } from "@/lib/data";
import { JobCardsTable } from "@/components/job-cards/job-cards-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';

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

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Job Cards for Train <span className="text-primary">{train.id}</span>
        </h1>
      </div>
       <p className="text-muted-foreground">
        Detailed maintenance history for train {train.id}.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Open Jobs ({openJobs.length})</CardTitle>
            <CardDescription>Maintenance tasks that are currently pending, in progress, or blocked.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={openJobs} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Jobs ({completedJobs.length})</CardTitle>
            <CardDescription>A historical record of all completed maintenance tasks for this train.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={completedJobs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
