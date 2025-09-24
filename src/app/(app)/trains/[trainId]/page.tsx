// src/app/(app)/trains/[trainId]/page.tsx
import { initialTrains } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { FileText, SprayCan, Hand, Wrench, FileArchive, GanttChartSquare, Target, AlertTriangle, User, Phone, Mail, CheckCircle2, Calendar, Clock, Users, Info, Building, Shield, FileSignature, CheckSquare, Search, History, MessageSquare, UserCheck, Settings, Power, Zap, Battery, Recycle, DoorOpen, StretchHorizontal, Square, ArrowRight, ArrowUp, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CertificateDetails } from "@/lib/types";

const isCertificateExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex justify-between items-start py-2 border-b text-sm">
        <span className="text-muted-foreground shrink-0 pr-4">{label}</span>
        <span className="font-medium text-right break-all">{value}</span>
    </div>
);

const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
}


export default function TrainDetailPage({ params }: { params: { trainId: string } }) {
  const trainId = params.trainId;
  const train = initialTrains.find(t => t.id === trainId);

  if (!train) {
    notFound();
  }

  const { branding, cleaning, fitnessCertificate, safetyCertificate } = train;

  const CertificateCard = ({ title, certificate, icon }: { title: string, certificate: CertificateDetails, icon: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">{icon}{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <DetailRow label="Certificate ID" value={certificate.certificateId} />
                <DetailRow label="Reference #" value={certificate.certificateNumber} />
                <DetailRow label="Issue Date" value={formatDate(certificate.issueDate)} />
                <DetailRow label="Expiry Date" value={
                    <span className={cn(isCertificateExpiringSoon(certificate.expiryDate) && "text-destructive")}>
                        {formatDate(certificate.expiryDate)}
                    </span>
                } />
                <DetailRow label="Status" value={<Badge variant={certificate.status === 'ACTIVE' ? 'default' : 'destructive'} className={cn(certificate.status === 'ACTIVE' && 'bg-green-600')}>{certificate.status}</Badge>} />
                <DetailRow label="Is Renewal" value={certificate.isRenewal ? 'Yes' : 'No'} />
            </div>
            
            <Card className="bg-muted/50">
                <CardHeader className="p-4"><CardTitle className="flex items-center gap-2 text-base"><Building className="h-4 w-4" />Authority & Dept.</CardTitle></CardHeader>
                <CardContent className="p-4 pt-0">
                    <DetailRow label="Department" value={certificate.department} />
                    <DetailRow label="Issued By" value={certificate.issuedBy} />
                    <DetailRow label="Approved By" value={certificate.approvedBy} />
                </CardContent>
            </Card>

            <Card className="bg-muted/50">
                <CardHeader className="p-4"><CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4" />Inspection</CardTitle></CardHeader>
                <CardContent className="p-4 pt-0">
                    <DetailRow label="Last Inspection" value={formatDate(certificate.lastInspectionDate)} />
                    <DetailRow label="Next Inspection Due" value={formatDate(certificate.nextInspectionDue)} />
                </CardContent>
            </Card>

            {certificate.complianceNotes && <p className="text-xs text-muted-foreground pt-2">{certificate.complianceNotes}</p>}

        </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            'text-base px-4 py-2 self-start sm:self-center'
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
                    <CardContent className="space-y-1">
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
                    <CardContent className="space-y-1">
                        <DetailRow label="Branding Type" value={branding.brandingType} />
                        <DetailRow label="Description" value={branding.brandingDescription} />
                        <DetailRow label="Creative Content" value={<a href={branding.creativeContent} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View PDF</a>} />
                        <DetailRow label="Placement" value={branding.placementInstructions} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Target className="h-4 w-4" />Performance & SLA</CardTitle></CardHeader>
                    <CardContent className="space-y-1">
                        <DetailRow label="Required Hours" value={`${branding.requiredHours} hrs`} />
                        <DetailRow label="Min. Daily Hours" value={`${branding.minimumDailyHours} hrs`} />
                        <DetailRow label="Min. Weekly Hours" value={`${branding.minimumWeeklyHours} hrs`} />
                        <DetailRow label="SLA Requirements" value={branding.slaRequirements} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><AlertTriangle className="h-4 w-4" />Penalty & Compliance</CardTitle></CardHeader>
                    <CardContent className="space-y-1">
                        <DetailRow label="Penalty Terms" value={branding.penaltyTerms} />
                        <DetailRow label="Penalty Percentage" value={`${branding.penaltyPercentage}%`} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><User className="h-4 w-4" />Contact Information</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
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


      <div className="grid gap-6 md:grid-cols-1">
        {/* Fitness Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Certificates & Validity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <CertificateCard title="Fitness Certificate" certificate={fitnessCertificate} icon={<CheckSquare className="h-4 w-4" />} />
            <CertificateCard title="Safety & Signaling Certificate" certificate={safetyCertificate} icon={<Shield className="h-4 w-4" />} />
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" />Technical Specifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-4 w-4" />Identity</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Train Number" value={train.trainNumber} />
                    <DetailRow label="Model Name" value={train.model} />
                    <DetailRow label="Manufacturer" value={train.vendor} />
                    <DetailRow label="Year of Manufacture" value={train.manufacturingYear} />
                    <DetailRow label="Serial Number" value={train.serialNumber} />
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Settings className="h-4 w-4" />Performance</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Max Speed" value={`${train.maxSpeed} km/h`} />
                    <DetailRow label="Acceleration Rate" value={`${train.accelerationRate} m/s²`} />
                    <DetailRow label="Braking Distance" value={`${train.brakingDistance} m`} />
                    <DetailRow label="Traction Type" value={train.engineType} />
                    <DetailRow label="Energy Source" value={train.energySource} />
                </CardContent>
             </Card>
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Power className="h-4 w-4" />Power & Energy</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Power Output" value={train.powerOutput} />
                    <DetailRow label="Battery Backup" value={train.batteryBackup.available ? `${train.batteryBackup.capacity}` : 'No'} />
                    <DetailRow label="Regen. Braking" value={train.regenerativeBraking ? <Zap className="h-5 w-5 text-green-600" /> : 'No'} />
                    <DetailRow label="Avg. Consumption" value={`${train.avgEnergyConsumption} kWh/km`} />
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Users className="h-4 w-4" />Capacity & Layout</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Coach Count" value={train.coachCount} />
                    <DetailRow label="Seating Capacity" value={train.capacity.seating} />
                    <DetailRow label="Standing Capacity" value={train.capacity.standing} />
                    <DetailRow label="Total Capacity" value={train.capacity.seating + train.capacity.standing} />
                    <DetailRow label="Doors per Coach" value={train.doorsPerCoach} />
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Ruler className="h-4 w-4" />Dimensions</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Train Length" value={`${train.trainLength} m`} />
                    <DetailRow label="Coach Length" value={`${train.coachLength} m`} />
                    <DetailRow label="Train Width" value={`${train.trainWidth} m`} />
                    <DetailRow label="Train Height" value={`${train.trainHeight} m`} />
                    <DetailRow label="Floor Height" value={`${train.floorHeight} m`} />
                </CardContent>
             </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Shield className="h-4 w-4" />Maintenance & Safety</CardTitle></CardHeader>
                <CardContent>
                    <DetailRow label="Odometer" value={`${train.mileage.toLocaleString()} km`} />
                    <DetailRow label="Maint. Interval (km)" value={`${train.maintenanceInterval.distance.toLocaleString()} km`} />
                    <DetailRow label="Last Maintenance" value={formatDate(train.lastMaintenanceDate)} />
                    <DetailRow label="Next Maintenance" value={formatDate(train.nextMaintenanceDate)} />
                    <DetailRow label="Safety Systems" value={train.safetySystems.join(', ')} />
                </CardContent>
             </Card>
          </CardContent>
        </Card>

       <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {/* Cleaning Information */}
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Hand className="h-5 w-5 text-primary" />Cleaning Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Info className="h-4 w-4" />Task Details</CardTitle></CardHeader>
                    <CardContent>
                        <DetailRow label="Status" value={<Badge variant={cleaning.status === 'COMPLETED' ? 'default' : 'secondary'} className={cleaning.status === 'COMPLETED' ? 'bg-green-600' : (cleaning.status === 'IN_PROGRESS' ? 'bg-yellow-500 text-yellow-900' : '')}>{cleaning.status}</Badge>} />
                        <DetailRow label="Bay ID" value={cleaning.bayId} />
                        <DetailRow label="Cleaning Type" value={cleaning.cleaningType.replace('_', ' ')} />
                        {cleaning.remarks && <DetailRow label="Remarks" value={cleaning.remarks} />}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Calendar className="h-4 w-4" />Schedule & Execution</CardTitle></CardHeader>
                    <CardContent>
                        <DetailRow label="Scheduled Start" value={formatDateTime(cleaning.scheduledStart)} />
                        <DetailRow label="Scheduled End" value={formatDateTime(cleaning.scheduledEnd)} />
                        <DetailRow label="Actual Start" value={formatDateTime(cleaning.actualStart)} />
                        <DetailRow label="Actual End" value={formatDateTime(cleaning.actualEnd)} />
                        <DetailRow label="Last Updated" value={formatDateTime(cleaning.lastUpdated)} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Users className="h-4 w-4" />Team & Authorization</CardTitle></CardHeader>
                    <CardContent>
                        <DetailRow label="Assigned Team" value={cleaning.assignedTeamId} />
                        <DetailRow label="Supervisor Override" value={cleaning.supervisorOverride ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <span className="text-muted-foreground">No</span>} />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
