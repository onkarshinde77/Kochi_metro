// src/app/(app)/all-trains/page.tsx
import * as React from 'react';
import Link from 'next/link';
import { initialTrains } from '@/lib/data';
import { TrainCard } from '@/components/all-trains/train-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AllTrainsClient } from '@/components/all-trains/all-trains-client';

export default function AllTrainsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const statusFilter =
    typeof searchParams?.status === 'string' ? searchParams.status : 'all';
  const searchTerm =
    typeof searchParams?.search === 'string' ? searchParams.search : '';

  const filteredTrains = initialTrains.filter(train => {
    const statusMatch =
      statusFilter === 'all' ||
      train.status.toLowerCase() === statusFilter.toLowerCase();
    const searchMatch = train.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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
          <AllTrainsClient
            statusFilter={statusFilter}
            searchTerm={searchTerm}
          />
        </div>
      </div>

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
    </div>
  );
}
