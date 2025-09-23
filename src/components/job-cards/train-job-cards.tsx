// src/components/job-cards/train-job-cards.tsx
"use client";

import { useState } from 'react';
import { initialTrains, currentJobCards, pastJobCards } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Train, Wrench } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import type { Train as TrainType } from '@/lib/types';

type FilterValue = 'all' | 'open' | 'none' | 'completed';

export function TrainJobCards() {
  const [filter, setFilter] = useState<FilterValue>('open');

  const getOpenJobsCount = (trainId: string) => {
    return currentJobCards.filter(job => job.trainId === trainId && job.status !== 'Completed').length;
  };
  
  const getCompletedJobsCount = (trainId: string) => {
      return pastJobCards.filter(job => job.trainId === trainId).length;
  }

  const getFilteredTrains = (): TrainType[] => {
    switch (filter) {
      case 'open':
        return initialTrains.filter(train => getOpenJobsCount(train.id) > 0);
      case 'none':
        return initialTrains.filter(train => getOpenJobsCount(train.id) === 0);
      case 'completed':
          return initialTrains.filter(train => getCompletedJobsCount(train.id) > 0);
      case 'all':
      default:
        return initialTrains;
    }
  };

  const filteredTrains = getFilteredTrains();

  return (
    <div className="space-y-6">
       <div className="flex items-center space-x-4">
        <Label htmlFor="status-filter" className="text-sm font-medium">Filter by Status:</Label>
        <Select value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
          <SelectTrigger id="status-filter" className="w-[200px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trains</SelectItem>
            <SelectItem value="open">With Open Jobs</SelectItem>
            <SelectItem value="none">No Open Jobs</SelectItem>
            <SelectItem value="completed">With Completed Jobs</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredTrains.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredTrains.map(train => {
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
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-16">
            <p className="font-semibold">No trains match the selected filter.</p>
        </div>
      )}
    </div>
  );
}