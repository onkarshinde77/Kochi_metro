// src/app/(app)/all-trains/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
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
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';


export default function AllTrainsPage() {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  
  const filteredTrains = initialTrains.filter(train => {
    const statusMatch = statusFilter === 'all' || train.status === statusFilter;
    const searchMatch = train.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">All Metros</h1>
            <p className="text-muted-foreground mt-1">
                Real-time overview of the entire fleet's status and location.
            </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <Button asChild className="w-full sm:w-auto">
                <Link href="/trains/add">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Metro
                </Link>
            </Button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Input
                placeholder="Filter by Metro ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-xs"
                />
            </div>
             <div className="flex items-center gap-2 w-full sm:w-auto">
                <Label htmlFor="status-filter" className="sr-only">Status:</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="w-full sm:w-[180px]">
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
     
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredTrains.map(train => (
                <TrainCard key={train.id} train={train} />
            ))}
            </div>
            {filteredTrains.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
                <p className="font-semibold">No metros match the current filters.</p>
            </div>
            )}
        </>
    </div>
  );
}
