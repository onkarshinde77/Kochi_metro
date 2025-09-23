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
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

export function JobCardsTable({ jobs, trainMileage }: { jobs: JobCard[], trainMileage: number }) {

  const getStatusBadge = (status: JobCard['status']) => {
    switch(status) {
        case 'Completed': return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
        case 'In Progress': return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
        case 'Pending': return <Badge variant="secondary">Pending</Badge>;
        case 'Blocked': return <Badge variant="destructive">Blocked</Badge>;
    }
  }

   const getPriorityBadge = (priority: JobCard['priority']) => {
    switch(priority) {
        case 'High': return <Badge variant="destructive">High</Badge>;
        case 'Medium': return <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-600">Medium</Badge>;
        case 'Low': return <Badge variant="outline">Low</Badge>;
    }
  }
  
  if (jobs.length === 0) {
    return <div className="text-center text-muted-foreground p-4">No job cards to display.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Supervisor</TableHead>
          <TableHead>Expected Completion</TableHead>
          <TableHead>Attachments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id} className={cn(job.priority === 'High' && job.status !== 'Completed' ? 'bg-red-50 dark:bg-red-950/50' : '')}>
            <TableCell className="font-medium">{job.id}</TableCell>
            <TableCell>{job.task}</TableCell>
            <TableCell>{getPriorityBadge(job.priority)}</TableCell>
            <TableCell>{getStatusBadge(job.status)}</TableCell>
            <TableCell>{job.assignedTo}</TableCell>
            <TableCell>{job.supervisor}</TableCell>
            <TableCell>{job.expectedCompletion}</TableCell>
            <TableCell>
              {job.attachments.length > 0 ? (
                <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                  <Paperclip className="h-4 w-4" />
                  ({job.attachments.length})
                </a>
              ) : (
                <span className="text-muted-foreground">None</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
