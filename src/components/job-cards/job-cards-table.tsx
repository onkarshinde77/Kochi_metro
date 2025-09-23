import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { JobCard } from "@/lib/types";

export function JobCardsTable({ jobs }: { jobs: JobCard[] }) {

  const getStatusBadge = (status: JobCard['status']) => {
    switch(status) {
        case 'Completed': return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
        case 'In Progress': return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
        case 'Pending': return <Badge variant="secondary">Pending</Badge>;
        case 'Blocked': return <Badge variant="destructive">Blocked</Badge>;
    }
  }
  
  if (jobs.length === 0) {
    return <div className="text-center text-muted-foreground p-4">No job cards for this train.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.id}</TableCell>
            <TableCell>{job.task}</TableCell>
            <TableCell>{getStatusBadge(job.status)}</TableCell>
            <TableCell>{job.assignedTo}</TableCell>
            <TableCell>{job.createdDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
