// src/app/(app)/trains/add/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const certificateSchema = z.object({
    certificateId: z.string().optional(),
    certificateNumber: z.string().optional(),
    issueDate: z.string().min(1, "Issue date is required."),
    expiryDate: z.string().min(1, "Expiry date is required."),
    status: z.enum(['ACTIVE', 'EXPIRED', 'PENDING']).default('ACTIVE'),
    isRenewal: z.boolean().default(false),
    department: z.enum(['ROLLING_STOCK', 'SIGNALING', 'OPERATIONS']),
    issuedBy: z.string().optional(),
    approvedBy: z.string().optional(),
    lastInspectionDate: z.string().min(1, "Last inspection date is required."),
    nextInspectionDue: z.string().min(1, "Next inspection date is required."),
    complianceNotes: z.string().optional(),
})

const trainSchema = z.object({
  id: z.string().min(1, "Train ID is required."),
  trainNumber: z.string().optional(),
  model: z.string().min(1, "Train Model is required."),
  manufacturingYear: z.coerce.number().int().min(1950, "Invalid year."),
  vendor: z.string().min(1, "Vendor is required."),
  serialNumber: z.string().optional(),
  
  coachCount: z.coerce.number().int().min(1, "Must have at least 1 coach."),
  capacity: z.object({
    seating: z.coerce.number().int().min(0),
    standing: z.coerce.number().int().min(0),
  }),
  doorsPerCoach: z.coerce.number().int().positive().optional(),

  maxSpeed: z.coerce.number().int().positive("Max speed must be positive."),
  accelerationRate: z.coerce.number().positive().optional(),
  brakingDistance: z.coerce.number().positive().optional(),
  engineType: z.string().optional(),
  energySource: z.string().optional(),

  powerOutput: z.string().optional(),
  batteryBackup: z.object({
      available: z.boolean().default(false),
      capacity: z.string().optional(),
  }).optional(),
  regenerativeBraking: z.boolean().default(false),
  avgEnergyConsumption: z.coerce.number().optional(),

  trainLength: z.coerce.number().positive().optional(),
  coachLength: z.coerce.number().positive().optional(),
  trainWidth: z.coerce.number().positive().optional(),
  trainHeight: z.coerce.number().positive().optional(),
  floorHeight: z.coerce.number().positive().optional(),

  depot: z.string().min(1, "Depot assignment is required."),
  inductionDate: z.string().min(1, "Induction date is required."),
  
  fitnessCertificate: certificateSchema,
  safetyCertificate: certificateSchema,

  nextMaintenanceDate: z.string().min(1, "Next maintenance date is required."),
  maintenanceInterval: z.object({
    distance: z.coerce.number().int().positive(),
    time: z.coerce.number().int().positive(),
  }),
  mileage: z.coerce.number().int().min(0).default(0),
  mileageThreshold: z.coerce.number().int().positive(),
  cleaningStatus: z.enum(["Cleaned", "Pending"]),
  brandingStatus: z.enum(["Yes", "No"]),
  assignedRoute: z.string().optional(),
  safetySystems: z.string().optional(),
  branding: z.object({
      contractId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      contractValue: z.coerce.number().optional(),
      hourlyRate: z.coerce.number().optional(),
      contractStatus: z.enum(["Active", "Expired", "Pending"]).optional(),
      advertiserName: z.string().optional(),
      brandingType: z.enum(["Full Wrap", "Partial Wrap", "Interior"]).optional(),
      brandingDescription: z.string().optional(),
      creativeContent: z.string().optional(),
      placementInstructions: z.string().optional(),
      requiredHours: z.coerce.number().optional(),
      minimumDailyHours: z.coerce.number().optional(),
      minimumWeeklyHours: z.coerce.number().optional(),
      slaRequirements: z.string().optional(),
      penaltyTerms: z.string().optional(),
      penaltyPercentage: z.coerce.number().optional(),
      contactPerson: z.string().optional(),
      contactEmail: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
      contactPhone: z.string().optional(),
  }).optional(),
});

type TrainFormValues = z.infer<typeof trainSchema>;

export default function AddTrainPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const today = new Date().toISOString().split('T')[0];
  const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
  const sixMonthsFromNow = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0];
  
  const form = useForm<TrainFormValues>({
    resolver: zodResolver(trainSchema),
    defaultValues: {
      manufacturingYear: new Date().getFullYear(),
      coachCount: 3,
      capacity: { seating: 150, standing: 650 },
      maxSpeed: 90,
      depot: "Muttom",
      inductionDate: today,
      fitnessCertificate: {
        issueDate: today,
        expiryDate: oneYearFromNow,
        department: 'ROLLING_STOCK',
        lastInspectionDate: today,
        nextInspectionDue: oneYearFromNow,
        status: 'ACTIVE',
      },
      safetyCertificate: {
        issueDate: today,
        expiryDate: oneYearFromNow,
        department: 'SIGNALING',
        lastInspectionDate: today,
        nextInspectionDue: oneYearFromNow,
        status: 'ACTIVE',
      },
      nextMaintenanceDate: sixMonthsFromNow,
      maintenanceInterval: { distance: 20000, time: 6 },
      mileage: 0,
      mileageThreshold: 150000,
      cleaningStatus: "Cleaned",
      brandingStatus: "No",
      accelerationRate: 1.1,
      brakingDistance: 200,
      engineType: '3-phase AC Traction',
      energySource: '750V DC Third Rail',
      powerOutput: '1.2 MW',
      batteryBackup: { available: true, capacity: '5 kWh' },
      regenerativeBraking: true,
      avgEnergyConsumption: 3.5,
      doorsPerCoach: 4,
      trainLength: 66.5,
      coachLength: 22.1,
      trainWidth: 2.9,
      trainHeight: 3.9,
      floorHeight: 1.1,
      safetySystems: 'CCTV, Fire Detection',
    },
  });

  const watchBrandingStatus = form.watch("brandingStatus");

  function onSubmit(data: TrainFormValues) {
    
    // This is a placeholder. In a real application, you would send this data
    // to your backend to be persisted. Since we are working with mock data,
    // this action doesn't actually add the train to the list on the server.
    // The data.ts file is re-evaluated on each server request, so changes are not persisted.
    
    console.log("New train data (not persisted):", data);

    toast({
      title: "Metro Added (Simulation)",
      description: `Metro ${data.id} would be added to the fleet. This is a simulation.`,
    });
    router.push('/all-trains');
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Metro</h1>
      </div>
       <p className="text-muted-foreground">
        Enter the details for the new metro to add it to the fleet.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8">
            
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Enter the detailed technical specifications for the new metro.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField control={form.control} name="id" render={({ field }) => ( <FormItem><FormLabel>Train ID / Number</FormLabel><FormControl><Input placeholder="e.g., T-026" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="trainNumber" render={({ field }) => ( <FormItem><FormLabel>Official Train Number</FormLabel><FormControl><Input placeholder="e.g., KMRL-026" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="model" render={({ field }) => ( <FormItem><FormLabel>Train Model / Type</FormLabel><FormControl><Input placeholder="e.g., Alstom Metropolis" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="manufacturingYear" render={({ field }) => ( <FormItem><FormLabel>Manufacturing Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="vendor" render={({ field }) => ( <FormItem><FormLabel>Vendor / Supplier</FormLabel><FormControl><Input placeholder="e.g., Alstom" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                   <FormField control={form.control} name="serialNumber" render={({ field }) => ( <FormItem><FormLabel>Serial Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
                <Separator />
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField control={form.control} name="maxSpeed" render={({ field }) => ( <FormItem><FormLabel>Maximum Speed (km/h)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="accelerationRate" render={({ field }) => ( <FormItem><FormLabel>Acceleration Rate (m/s²)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="brakingDistance" render={({ field }) => ( <FormItem><FormLabel>Braking Distance (m)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="engineType" render={({ field }) => ( <FormItem><FormLabel>Traction Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="energySource" render={({ field }) => ( <FormItem><FormLabel>Energy Source</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
                <Separator />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField control={form.control} name="powerOutput" render={({ field }) => ( <FormItem><FormLabel>Power Output</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="avgEnergyConsumption" render={({ field }) => ( <FormItem><FormLabel>Avg. Consumption (kWh/km)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="batteryBackup.capacity" render={({ field }) => ( <FormItem><FormLabel>Battery Capacity (kWh)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
                 <Separator />
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField control={form.control} name="coachCount" render={({ field }) => ( <FormItem><FormLabel>Number of Coaches</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="capacity.seating" render={({ field }) => ( <FormItem><FormLabel>Seating Capacity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="capacity.standing" render={({ field }) => ( <FormItem><FormLabel>Standing Capacity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                  <FormField control={form.control} name="doorsPerCoach" render={({ field }) => ( <FormItem><FormLabel>Doors per Coach</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
                 <Separator />
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                   <FormField control={form.control} name="trainLength" render={({ field }) => ( <FormItem><FormLabel>Train Length (m)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                   <FormField control={form.control} name="coachLength" render={({ field }) => ( <FormItem><FormLabel>Coach Length (m)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                   <FormField control={form.control} name="trainWidth" render={({ field }) => ( <FormItem><FormLabel>Train Width (m)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                   <FormField control={form.control} name="trainHeight" render={({ field }) => ( <FormItem><FormLabel>Train Height (m)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                   <FormField control={form.control} name="floorHeight" render={({ field }) => ( <FormItem><FormLabel>Floor Height (m)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
                <Separator />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <FormField control={form.control} name="safetySystems" render={({ field }) => ( <FormItem><FormLabel>Safety Systems</FormLabel><FormControl><Input placeholder="CCTV, Fire Detection..." {...field} /></FormControl><FormMessage /></FormItem> )}/>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Operational Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                 <FormField control={form.control} name="depot" render={({ field }) => (
                  <FormItem><FormLabel>Depot / Yard Assigned</FormLabel><FormControl><Input placeholder="e.g., Muttom" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="inductionDate" render={({ field }) => (
                  <FormItem><FormLabel>Date of Induction</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="assignedRoute" render={({ field }) => (
                  <FormItem><FormLabel>Assigned Route (Optional)</FormLabel><FormControl><Input placeholder="e.g., Aluva - Pettah" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Fitness Certificate</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <FormField control={form.control} name="fitnessCertificate.certificateId" render={({ field }) => (<FormItem><FormLabel>Certificate ID</FormLabel><FormControl><Input placeholder="FIT-T-026-2024" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.certificateNumber" render={({ field }) => (<FormItem><FormLabel>Certificate Number</FormLabel><FormControl><Input placeholder="IR/FIT/2024/123" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.issueDate" render={({ field }) => (<FormItem><FormLabel>Issue Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.expiryDate" render={({ field }) => (<FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.lastInspectionDate" render={({ field }) => (<FormItem><FormLabel>Last Inspection</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.nextInspectionDue" render={({ field }) => (<FormItem><FormLabel>Next Inspection Due</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.issuedBy" render={({ field }) => (<FormItem><FormLabel>Issued By</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.approvedBy" render={({ field }) => (<FormItem><FormLabel>Approved By</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="fitnessCertificate.complianceNotes" render={({ field }) => (<FormItem className="lg:col-span-4"><FormLabel>Compliance Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)}/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Safety & Signaling Certificate</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <FormField control={form.control} name="safetyCertificate.certificateId" render={({ field }) => (<FormItem><FormLabel>Certificate ID</FormLabel><FormControl><Input placeholder="SAFE-T-026-2024" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.certificateNumber" render={({ field }) => (<FormItem><FormLabel>Certificate Number</FormLabel><FormControl><Input placeholder="CMRS/SAFE/2024/123" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.issueDate" render={({ field }) => (<FormItem><FormLabel>Issue Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.expiryDate" render={({ field }) => (<FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.lastInspectionDate" render={({ field }) => (<FormItem><FormLabel>Last Inspection</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.nextInspectionDue" render={({ field }) => (<FormItem><FormLabel>Next Inspection Due</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.issuedBy" render={({ field }) => (<FormItem><FormLabel>Issued By</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.approvedBy" render={({ field }) => (<FormItem><FormLabel>Approved By</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="safetyCertificate.complianceNotes" render={({ field }) => (<FormItem className="lg:col-span-4"><FormLabel>Compliance Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)}/>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                 <FormField control={form.control} name="nextMaintenanceDate" render={({ field }) => (
                  <FormItem><FormLabel>Next Scheduled Maintenance</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="maintenanceInterval.distance" render={({ field }) => (
                  <FormItem><FormLabel>Interval (km)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="maintenanceInterval.time" render={({ field }) => (
                  <FormItem><FormLabel>Interval (months)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="mileage" render={({ field }) => (
                  <FormItem><FormLabel>Current Mileage</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="mileageThreshold" render={({ field }) => (
                  <FormItem><FormLabel>Mileage Threshold for Inspection</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Branding &amp; Advertising</CardTitle>
                <CardDescription>Does this metro have a branding contract?</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="brandingStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="No" />
                            </FormControl>
                            <FormLabel className="font-normal">No, this metro is not branded.</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes, add branding details below.</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {watchBrandingStatus === 'Yes' && (
              <>
                <Card>
                  <CardHeader><CardTitle>Branding: Contract Info</CardTitle></CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <FormField control={form.control} name="branding.contractId" render={({ field }) => (<FormItem><FormLabel>Contract ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.startDate" render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.endDate" render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.contractValue" render={({ field }) => (<FormItem><FormLabel>Contract Value ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.hourlyRate" render={({ field }) => (<FormItem><FormLabel>Hourly Rate ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                     <FormField control={form.control} name="branding.contractStatus" render={({ field }) => (
                        <FormItem><FormLabel>Contract Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Status"/></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Expired">Expired</SelectItem><SelectItem value="Pending">Pending</SelectItem></SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Branding: Creative Info</CardTitle></CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <FormField control={form.control} name="branding.advertiserName" render={({ field }) => (<FormItem><FormLabel>Advertiser Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.brandingType" render={({ field }) => (
                        <FormItem><FormLabel>Branding Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select Type"/></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="Full Wrap">Full Wrap</SelectItem><SelectItem value="Partial Wrap">Partial Wrap</SelectItem><SelectItem value="Interior">Interior</SelectItem></SelectContent>
                        </Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="branding.brandingDescription" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.creativeContent" render={({ field }) => (<FormItem><FormLabel>Creative Content (URL)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.placementInstructions" render={({ field }) => (<FormItem><FormLabel>Placement Instructions</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle>Branding: Performance & SLA</CardTitle></CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FormField control={form.control} name="branding.requiredHours" render={({ field }) => (<FormItem><FormLabel>Required Hours</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.minimumDailyHours" render={({ field }) => (<FormItem><FormLabel>Min. Daily Hours</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.minimumWeeklyHours" render={({ field }) => (<FormItem><FormLabel>Min. Weekly Hours</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.slaRequirements" render={({ field }) => (<FormItem className="md:col-span-3"><FormLabel>SLA Requirements</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle>Branding: Penalty & Compliance</CardTitle></CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <FormField control={form.control} name="branding.penaltyTerms" render={({ field }) => (<FormItem><FormLabel>Penalty Terms</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.penaltyPercentage" render={({ field }) => (<FormItem><FormLabel>Penalty Percentage (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle>Branding: Contact Info</CardTitle></CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <FormField control={form.control} name="branding.contactPerson" render={({ field }) => (<FormItem><FormLabel>Contact Person</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.contactEmail" render={({ field }) => (<FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="branding.contactPhone" render={({ field }) => (<FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)}/>
                  </CardContent>
                </Card>
              </>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField control={form.control} name="cleaningStatus" render={({ field }) => (
                  <FormItem><FormLabel>Cleaning Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent><SelectItem value="Cleaned">Cleaned</SelectItem><SelectItem value="Pending">Pending</SelectItem></SelectContent>
                  </Select>
                  <FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
             <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add Metro to Fleet"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
