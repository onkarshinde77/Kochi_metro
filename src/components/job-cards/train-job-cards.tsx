"use client";

import { useState } from 'react';
import { initialTrains, currentJobCards, pastJobCards } from '@/lib/data';
import type { Train, JobCard } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { JobCardsTable } from './job-cards-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '../ui/card';

export function TrainJobCards() {
  const allJobs = [...currentJobCards, ...pastJobCards];
  
  const getJobsForTrain = (trainId: string) => {
    return allJobs.filter(job => job.trainId === trainId);
  }

  const getOpenJobsCount = (trainId: string) => {
    return currentJobCards.filter(job => job.trainId === trainId).length;
  }

  return (
    <Card>
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {initialTrains.map(train => {
                const openJobsCount = getOpenJobsCount(train.id);
                const allTrainJobs = getJobsForTrain(train.id);

                return (
                <AccordionItem value={train.id} key={train.id} className="border-0">
                    <div className="bg-muted/50 rounded-lg">
                        <AccordionTrigger className="p-4 hover:no-underline rounded-t-lg data-[state=open]:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:rounded-b-none">
                            <div className="flex justify-between items-center w-full">
                                <span className="font-bold">{train.id}</span>
                                {openJobsCount > 0 && <Badge variant="destructive">{openJobsCount} Open</Badge>}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0 border-t-0 rounded-b-lg overflow-hidden">
                          <div className="bg-background">
                            <JobCardsTable jobs={allTrainJobs} />
                          </div>
                        </AccordionContent>
                    </div>
                </AccordionItem>
                )
            })}
            </div>
        </Accordion>
      </CardContent>
    </Card>
  );
}
