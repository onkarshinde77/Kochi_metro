// src/app/(app)/job-cards/[trainId]/page.tsx
import { initialTrains } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldCheck, SprayCan, Thermometer, Calendar, Hand, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobCardsTable } from "@/components/job-cards/job-cards-table";
import { currentJobCards, pastJobCards } from "@/lib/data";

const isCertificateExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

export default function TrainDetailPage({ params }: { params: { trainId: string } }) {
  const trainId = params.trainId;
  const train = initialTrains.find(t => t.id === trainId);

  if (!train) {
    notFound();
  }

  const allJobs = [...currentJobCards, ...pastJobCards];
  const jobsForTrain = allJobs.filter(job => job.trainId === trainId);
  const openJobs = jobsForTrain.filter(job => job.status !== 'Completed');
  const completedJobs = jobsForTrain.filter(job => job.status === 'Completed');

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">
            Metro Details: <span className="text-primary">{train.id}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
                A comprehensive overview of the metro's status and history.
            </p>
        </div>
        <Badge className={cn(
            train.status === 'Operational' && 'bg-green-100 text-green-800 border-green-200',
            train.status === 'Maintenance' && 'bg-orange-100 text-orange-800 border-orange-200',
            train.status === 'Idle' && 'bg-blue-100 text-blue-800 border-blue-200',
            train.status === 'Washing' && 'bg-cyan-100 text-cyan-800 border-cyan-200',
            'text-base px-4 py-2'
        )}>{train.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Branding Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><SprayCan className="h-5 w-5 text-primary" />Branding & Advertising</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={train.branding.status === "Yes" ? "default" : "secondary"}>{train.branding.status}</Badge>
            </div>
            {train.branding.status === "Yes" && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agency</span>
                  <span className="font-medium">{train.branding.agency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Until</span>
                  <span className="font-medium">{train.branding.contractUntil}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Fitness Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Certificates & Validity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fitness Certificate</span>
               <span className={cn("font-medium", isCertificateExpiringSoon(train.fitnessCertificate.validUntil) && "text-destructive")}>
                Expires {new Date(train.fitnessCertificate.validUntil).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Certificate Issuer</span>
              <span className="font-medium">{train.fitnessCertificate.issuer}</span>
            </div>
             <div className="flex justify-between">
              <span className="text-muted-foreground">Safety Certificate</span>
               <span className={cn("font-medium", isCertificateExpiringSoon(train.safetyCertificate.expiry) && "text-destructive")}>
                Expires {new Date(train.safetyCertificate.expiry).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Cleaning Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Hand className="h-5 w-5 text-primary" />Cleaning Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant={train.cleaning.status === "Cleaned" ? "default" : "secondary"} className={train.cleaning.status === 'Cleaned' ? 'bg-green-600' : ''}>
                {train.cleaning.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Cleaned On</span>
              <span className="font-medium">{new Date(train.cleaning.lastCleaned).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" />Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Engine Type</span>
              <span className="font-medium">{train.engineType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Speed</span>
              <span className="font-medium">{train.maxSpeed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coach Count</span>
              <span className="font-medium">{train.coachCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mileage</span>
              <span className="font-medium">{train.mileage.toLocaleString()} km</span>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Open Jobs ({openJobs.length})</CardTitle>
            <CardDescription>Maintenance tasks that are currently pending, in progress, or blocked.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={openJobs} trainMileage={train.mileage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Jobs ({completedJobs.length})</CardTitle>
            <CardDescription>A historical record of all completed maintenance tasks for this train.</CardDescription>
          </CardHeader>
          <CardContent>
            <JobCardsTable jobs={completedJobs} trainMileage={train.mileage} />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
