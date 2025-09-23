// src/components/all-trains/all-trains-table.tsx
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { initialTrains } from "@/lib/data";
import type { Train } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

const getStatusBadge = (status: Train['status']) => {
    switch (status) {
        case 'Operational': return <Badge className="bg-green-200 text-green-900 hover:bg-green-200/80">{status}</Badge>;
        case 'Maintenance': return <Badge className="bg-orange-200 text-orange-900 hover:bg-orange-200/80">{status}</Badge>;
        case 'Idle': return <Badge className="bg-blue-200 text-blue-900 hover:bg-blue-200/80">{status}</Badge>;
        case 'Washing': return <Badge className="bg-cyan-200 text-cyan-900 hover:bg-cyan-200/80">{status}</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
    }
};

const columns: ColumnDef<Train>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Button
        variant="ghost"
        onClick={() => table.getColumn("id")?.toggleSorting(table.getColumn("id")?.getIsSorted() === "asc")}
      >
        Train ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium pl-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "currentTrack",
    header: "Current Location",
    cell: ({ row }) => <div>{row.getValue("currentTrack")}</div>,
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mileage (km)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-right pr-4">{row.getValue<number>("mileage").toLocaleString()}</div>,
  },
];

const statusOptions: Train['status'][] = ['Operational', 'Maintenance', 'Idle', 'Washing'];

export function AllTrainsTable({ initialStatusFilter, extraTrains }: { initialStatusFilter: string | null, extraTrains: Train[] }) {
  const [data, setData] = React.useState<Train[]>([...initialTrains, ...extraTrains]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialStatusFilter ? [{ id: 'status', value: [initialStatusFilter] }] : []
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  React.useEffect(() => {
    setData(prevData => {
        const existingIds = new Set(prevData.map(t => t.id));
        const newTrains = extraTrains.filter(t => !existingIds.has(t.id));
        return [...prevData, ...newTrains];
    });
  }, [extraTrains]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    meta: {
        addRow: (newRow: Train) => {
            setData(prev => [...prev, newRow]);
        }
    }
  });

  const handleStatusFilterChange = (value: string) => {
    if (value === 'all') {
      table.getColumn('status')?.setFilterValue(undefined);
    } else {
      table.getColumn('status')?.setFilterValue([value]);
    }
  };
  
  const currentStatusFilter = (table.getColumn('status')?.getFilterValue() as string[] | undefined)?.[0] ?? 'all';

  return (
    <Card>
      <CardContent className="p-4">
        <div className="w-full">
            <div className="flex items-center py-4 gap-4">
                <Input
                  placeholder="Filter by Train ID..."
                  value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                      table.getColumn("id")?.setFilterValue(event.target.value)
                  }
                  className="max-w-xs"
                />
                <div className="flex items-center gap-2">
                  <Label htmlFor="status-filter">Status:</Label>
                  <Select value={currentStatusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger id="status-filter" className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                          Columns <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                              return (
                              <DropdownMenuCheckboxItem
                                  key={column.id}
                                  className="capitalize"
                                  checked={column.getIsVisible()}
                                  onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                  }
                              >
                                  {column.id === 'id' ? 'Train ID' : column.id}
                              </DropdownMenuCheckboxItem>
                              );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        );
                        })}
                    </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        >
                        No results.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                Showing {table.getFilteredRowModel().rows.length} of {data.length} trains.
                </div>
                <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
