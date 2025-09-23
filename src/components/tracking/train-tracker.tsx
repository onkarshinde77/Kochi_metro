// src/components/tracking/train-tracker.tsx
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
import { ArrowUpDown, ChevronDown, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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

function AddTrainForm({ onAddTrain }: { onAddTrain: (train: Train) => void }) {
  const [newTrain, setNewTrain] = React.useState({
    id: "",
    status: "Idle" as Train['status'],
    currentTrack: "",
    mileage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrain.id || !newTrain.currentTrack || !newTrain.mileage) {
        // Simple validation
        alert("Please fill all fields");
        return;
    }
    onAddTrain({
        ...newTrain,
        mileage: Number(newTrain.mileage),
        isElectric: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="id">Train ID</Label>
            <Input id="id" value={newTrain.id} onChange={(e) => setNewTrain({...newTrain, id: e.target.value})} placeholder="e.g., T-026" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={newTrain.status} onValueChange={(value) => setNewTrain({...newTrain, status: value as Train['status']})}>
                <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentTrack">Current Location</Label>
            <Input id="currentTrack" value={newTrain.currentTrack} onChange={(e) => setNewTrain({...newTrain, currentTrack: e.target.value})} placeholder="e.g., SL4" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input id="mileage" type="number" value={newTrain.mileage} onChange={(e) => setNewTrain({...newTrain, mileage: e.target.value})} placeholder="e.g., 50000" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Add Train</Button>
      </DialogFooter>
    </form>
  )
}


export function TrainTracker({ initialStatusFilter }: { initialStatusFilter: string | null }) {
  const [data, setData] = React.useState<Train[]>(initialTrains);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isAddTrainOpen, setIsAddTrainOpen] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    initialStatusFilter ? [{ id: 'status', value: [initialStatusFilter] }] : []
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

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
  });

  const handleStatusFilterChange = (value: string) => {
    if (value === 'all') {
      table.getColumn('status')?.setFilterValue(undefined);
    } else {
      table.getColumn('status')?.setFilterValue([value]);
    }
  };
  
  const handleAddTrain = (train: Train) => {
    setData(prevData => [...prevData, train]);
    setIsAddTrainOpen(false);
  }

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
                    <Dialog open={isAddTrainOpen} onOpenChange={setIsAddTrainOpen}>
                        <DialogTrigger asChild>
                             <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Train
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Train</DialogTitle>
                            </DialogHeader>
                            <AddTrainForm onAddTrain={handleAddTrain} />
                        </DialogContent>
                    </Dialog>
                   
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
