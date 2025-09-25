// src/components/all-trains/all-trains-client.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';

interface AllTrainsClientProps {
  statusFilter: string;
  searchTerm: string;
}

export function AllTrainsClient({
  statusFilter,
  searchTerm: initialSearchTerm,
}: AllTrainsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearchTerm) {
      params.set('search', debouncedSearchTerm);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, router]);

  return (
    <>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Input
          placeholder="Filter by Metro ID..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-xs"
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Label htmlFor="status-filter" className="sr-only">
          Status:
        </Label>
        <Select value={statusFilter} onValueChange={handleStatusChange}>
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
    </>
  );
}
