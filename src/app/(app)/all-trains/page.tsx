// src/app/(app)/all-trains/page.tsx
'use client';

import * as React from 'react';
import { initialTrains } from '@/lib/data';
import type { Train } from '@/lib/types';
import { TrainCard } from '@/components/all-trains/train-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AllTrainsPage({ extraTrains = [] }: { extraTrains?: Train[] }) {
  const [allTrains, setAllTrains] = React.useState<Train[]>([...initialTrains, ...extraTrains]);
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  React.useEffect(() => {
    setAllTrains(prevTrains => {
      const existingIds = new Set(prevTrains.map(t => t.id));
      const newTrains = extraTrains.filter(t => !existingIds.has(t.id));
      return [...prevTrains, ...newTrains];
    });
  }, [extraTrains]);
  
  const filteredTrains = allTrains.filter(train => {
    const statusMatch = statusFilter === 'all' || train.status === statusFilter;
    const searchMatch = train.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">All Trains</h1>
            <p className="text-muted-foreground mt-1">
                Real-time overview of the entire fleet's status and location.
            </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
            <Input
              placeholder="Filter by Train ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
             <div className="flex items-center gap-2">
                <Label htmlFor="status-filter" className="sr-only">Status:</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Idle">Idle</SelectItem>
                    <SelectItem value="Washing">Washing</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTrains.map(train => (
          <TrainCard key={train.id} train={train} />
        ))}
      </div>
      {filteredTrains.length === 0 && (
        <div className="text-center text-muted-foreground py-16">
            <p className="font-semibold">No trains match the current filters.</p>
        </div>
      )}
    </div>
  );
}
