// src/components/job-cards/train-job-cards.tsx
"use client";

import { useState } from 'react';
import { initialTrains, currentJobCards } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Train, Wrench } from 'lucide-react';

export function TrainJobCards() {
  const [showAll, setShowAll] = useState(false);

  const getOpenJobsCount = (trainId: string) => {
    return currentJobCards.filter(job => job.trainId === trainId && job.status !== 'Completed').length;
  };

  const trainsWithOpenJobs = initialTrains.filter(train => getOpenJobsCount(train.id) > 0);
  const trainsWithoutOpenJobs = initialTrains.filter(train => getOpenJobsCount(train.id) === 0);

  const visibleTrains = showAll ? initialTrains : trainsWithOpenJobs;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {visibleTrains.map(train => {
          const openJobsCount = getOpenJobsCount(train.id);
          return (
            <Link href={`/job-cards/${train.id}`} key={train.id}>
              <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold text-primary">{train.id}</CardTitle>
                  <Train className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  {openJobsCount > 0 ? (
                      <div className="flex items-center gap-2 text-destructive">
                          <Wrench className="h-5 w-5" />
                          <span className="font-bold text-lg">{openJobsCount}</span>
                          <span className="text-sm">Open Job(s)</span>
                      </div>
                  ) : (
                    <p className="text-sm text-green-600 font-semibold">No Open Jobs</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Click to view all job cards</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
         {showAll && trainsWithoutOpenJobs.map(train => (
            <Link href={`/job-cards/${train.id}`} key={train.id}>
              <Card className="hover:border-primary hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-bold text-primary">{train.id}</CardTitle>
                  <Train className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <p className="text-sm text-green-600 font-semibold">No Open Jobs</p>
                  <p className="text-xs text-muted-foreground mt-2">Click to view all job cards</p>
                </CardContent>
              </Card>
            </Link>
        ))}
      </div>
      {!showAll && trainsWithoutOpenJobs.length > 0 && (
        <div className="text-center mt-8">
          <Button onClick={() => setShowAll(true)}>Show All Trains ({initialTrains.length})</Button>
        </div>
      )}
    </div>
  );
}