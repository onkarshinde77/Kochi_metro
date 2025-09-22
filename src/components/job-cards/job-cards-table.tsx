import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { currentJobCards, pastJobCards } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import type { JobCard } from "@/lib/types";

export function JobCardsTable() {

  const getStatusBadge = (status: JobCard['status']) => {
    switch(status) {
        case 'Completed': return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
        case 'In Progress': return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
        case 'Pending': return <Badge variant="secondary">Pending</Badge>;
        case 'Blocked': return <Badge variant="destructive">Blocked</Badge>;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Cards</CardTitle>
        <CardDescription>
            Overview of all maintenance and repair tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentJobCards.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.trainId}</TableCell>
                    <TableCell>{job.task}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>{job.assignedTo}</TableCell>
                    <TableCell>{job.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="past">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastJobCards.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.id}</TableCell>
                    <TableCell>{job.trainId}</TableCell>
                    <TableCell>{job.task}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>{job.assignedTo}</TableCell>
                    <TableCell>{job.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
