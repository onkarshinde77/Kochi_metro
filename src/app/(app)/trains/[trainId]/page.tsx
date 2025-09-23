// src/app/(app)/trains/[trainId]/page.tsx
import { initialTrains } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { FileText, SprayCan, Hand, Wrench, FileArchive, GanttChartSquare, Target, AlertTriangle, User, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const isCertificateExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between py-2 border-b">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
    </div>
);


export default function TrainDetailPage({ params }: { params: { trainId: string } }) {
  const trainId = params.trainId;
  const train = initialTrains.find(t => t.id === trainId);

  if (!train) {
    notFound();
  }

  const { branding } = train;

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
        
      {/* Branding Section */}
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><SprayCan className="h-5 w-5 text-primary" />Branding & Advertising</CardTitle>
            <CardDescription>
                {branding.status === "Yes" ? `Details for contract with ${branding.advertiserName}.` : "This train does not currently have a branding contract."}
            </CardDescription>
          </CardHeader>
           {branding.status === "Yes" && branding.advertiserName && (
             <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><FileArchive className="h-4 w-4" />Contract Details</CardTitle></CardHeader>
                    <CardContent className="space-y-1 text-sm">
                        <DetailRow label="Contract ID" value={branding.contractId} />
                        <DetailRow label="Advertiser" value={branding.advertiserName} />
                        <DetailRow label="Start Date" value={branding.startDate ? new Date(branding.startDate).toLocaleDateString() : 'N/A'} />
                        <DetailRow label="End Date" value={branding.endDate ? new Date(branding.endDate).toLocaleDateString() : 'N/A'} />
                        <DetailRow label="Contract Value" value={branding.contractValue?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
                        <DetailRow label="Hourly Rate" value={branding.hourlyRate?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
                        <DetailRow label="Status" value={<Badge variant={branding.contractStatus === 'Active' ? 'default' : 'secondary'}>{branding.contractStatus}</Badge>} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><GanttChartSquare className="h-4 w-4" />Creative Information</CardTitle></CardHeader>
                    <CardContent className="space-y-1 text-sm">
                        <DetailRow label="Branding Type" value={branding.brandingType} />
                        <DetailRow label="Description" value={branding.brandingDescription} />
                        <DetailRow label="Creative Content" value={<a href={branding.creativeContent} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View PDF</a>} />
                        <DetailRow label="Placement" value={branding.placementInstructions} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Target className="h-4 w-4" />Performance & SLA</CardTitle></CardHeader>
                    <CardContent className="space-y-1 text-sm">
                        <DetailRow label="Required Hours" value={`${branding.requiredHours} hrs`} />
                        <DetailRow label="Min. Daily Hours" value={`${branding.minimumDailyHours} hrs`} />
                        <DetailRow label="Min. Weekly Hours" value={`${branding.minimumWeeklyHours} hrs`} />
                        <DetailRow label="SLA Requirements" value={branding.slaRequirements} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><AlertTriangle className="h-4 w-4" />Penalty & Compliance</CardTitle></CardHeader>
                    <CardContent className="space-y-1 text-sm">
                        <DetailRow label="Penalty Terms" value={branding.penaltyTerms} />
                        <DetailRow label="Penalty Percentage" value={`${branding.penaltyPercentage}%`} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><User className="h-4 w-4" />Contact Information</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-sm">
                       <div className="flex items-center gap-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{branding.contactPerson}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${branding.contactEmail}`} className="text-primary hover:underline">{branding.contactEmail}</a>
                        </div>
                        <div className="flex items-center gap-3">
                           <Phone className="h-4 w-4 text-muted-foreground" />
                           <span>{branding.contactPhone}</span>
                        </div>
                    </CardContent>
                </Card>
             </CardContent>
          )}
      </Card>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
