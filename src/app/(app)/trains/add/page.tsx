// src/app/(app)/trains/add/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
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
import type { Train } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// This is a temporary prop to simulate adding a train
// In a real app, this would come from a layout context or a global state manager
interface AddTrainPageProps {
  onAddTrain: (train: Train) => void;
}

const trainSchema = z.object({
  id: z.string().min(1, "Train ID is required."),
  model: z.string().min(1, "Train Model is required."),
  manufacturingYear: z.coerce.number().int().min(1950, "Invalid year."),
  vendor: z.string().min(1, "Vendor is required."),
  coachCount: z.coerce.number().int().min(1, "Must have at least 1 coach."),
  capacity: z.object({
    seating: z.coerce.number().int().min(0),
    standing: z.coerce.number().int().min(0),
  }),
  maxSpeed: z.coerce.number().int().positive("Max speed must be positive."),
  depot: z.string().min(1, "Depot assignment is required."),
  inductionDate: z.string().min(1, "Induction date is required."),
  fitnessCertificate: z.object({
    validFrom: z.string().min(1, "Start date is required."),
    validUntil: z.string().min(1, "Expiry date is required."),
  }),
  safetyCertificateExpiry: z.string().min(1, "Expiry date is required."),
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
      contactEmail: z.string().email().optional(),
      contactPhone: z.string().optional(),
  }).optional(),
});

type TrainFormValues = z.infer<typeof trainSchema>;

export default function AddTrainPage({ onAddTrain }: AddTrainPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<TrainFormValues>({
    resolver: zodResolver(trainSchema),
    defaultValues: {
      manufacturingYear: new Date().getFullYear(),
      coachCount: 3,
      capacity: { seating: 150, standing: 650 },
      maxSpeed: 90,
      depot: "Muttom",
      inductionDate: new Date().toISOString().split('T')[0],
      fitnessCertificate: {
        validFrom: new Date().toISOString().split('T')[0],
        validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      },
      safetyCertificateExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      nextMaintenanceDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
      maintenanceInterval: { distance: 20000, time: 6 },
      mileage: 0,
      mileageThreshold: 150000,
      cleaningStatus: "Cleaned",
      brandingStatus: "No",
    },
  });

  const watchBrandingStatus = form.watch("brandingStatus");

  function onSubmit(data: TrainFormValues) {
    const newTrain: any = { // Using any to build up the object
      id: data.id,
      model: data.model,
      manufacturingYear: data.manufacturingYear,
      vendor: data.vendor,
      coachCount: data.coachCount,
      capacity: data.capacity,
      maxSpeed: data.maxSpeed,
      depot: data.depot,
      inductionDate: data.inductionDate,
      fitnessCertificate: {
          certificateId: `FIT-${data.id}-${new Date().getFullYear()}`,
          certificateNumber: `IR/FIT/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
          issueDate: data.fitnessCertificate.validFrom,
          expiryDate: data.fitnessCertificate.validUntil,
          status: 'ACTIVE',
          isRenewal: false,
          department: 'ROLLING_STOCK',
          issuedBy: 'System',
          approvedBy: 'System',
          lastInspectionDate: new Date().toISOString().split('T')[0],
          nextInspectionDue: data.fitnessCertificate.validUntil,
          lastUpdated: new Date().toISOString(),
      },
      safetyCertificate: {
          certificateId: `SAFE-${data.id}-${new Date().getFullYear()}`,
          certificateNumber: `CMRS/SAFE/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
          issueDate: new Date().toISOString().split('T')[0],
          expiryDate: data.safetyCertificateExpiry,
          status: 'ACTIVE',
          isRenewal: false,
          department: 'SIGNALING',
          issuedBy: 'System',
          approvedBy: 'System',
          lastInspectionDate: new Date().toISOString().split('T')[0],
          nextInspectionDue: data.safetyCertificateExpiry,
          lastUpdated: new Date().toISOString(),
      },
      nextMaintenanceDate: data.nextMaintenanceDate,
      lastMaintenanceDate: new Date().toISOString().split('T')[0],
      maintenanceInterval: data.maintenanceInterval,
      mileage: data.mileage,
      mileageThreshold: data.mileageThreshold,
      cleaning: {
          bayId: `Bay-0${(Math.floor(Math.random()*3)) + 1}`,
          cleaningType: 'ROUTINE',
          status: 'COMPLETED',
          lastUpdated: new Date().toISOString(),
          lastCleaned: new Date().toISOString().split('T')[0],
          scheduledStart: new Date().toISOString(),
          scheduledEnd: new Date().toISOString(),
          assignedTeamId: 'Team-A',
          supervisorOverride: false,
      },
      branding: {
        status: data.brandingStatus,
        ...(data.brandingStatus === "Yes" ? data.branding : {}),
      },
      status: "Idle",
      currentTrack: data.depot,
      isElectric: true,
      trainNumber: `KMRL-${data.id.split('-')[1] || 'XXX'}`,
      serialNumber: `${data.vendor.toUpperCase()}-KOC-${data.manufacturingYear}-${data.id.split('-')[1] || 'XXX'}`,
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
      safetySystems: ['CCTV', 'Fire Detection'],
    };
    
    // This is where you would typically send data to your backend/database.
    // For now, we'll use the onAddTrain prop to update the state in the layout.
    if(onAddTrain) {
      onAddTrain(newTrain as Train);
    }

    toast({
      title: "Metro Added",
      description: `Metro ${data.id} has been successfully added to the fleet.`,
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
                <CardTitle>Identification</CardTitle>
                <CardDescription>Basic identification details for the metro.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FormField control={form.control} name="id" render={({ field }) => (
                  <FormItem><FormLabel>Train ID / Number</FormLabel><FormControl><Input placeholder="e.g., T-026" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="model" render={({ field }) => (
                  <FormItem><FormLabel>Train Model / Type</FormLabel><FormControl><Input placeholder="e.g., Alstom Metropolis" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="manufacturingYear" render={({ field }) => (
                  <FormItem><FormLabel>Manufacturing Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="vendor" render={({ field }) => (
                  <FormItem><FormLabel>Vendor / Supplier</FormLabel><FormControl><Input placeholder="e.g., Alstom" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity & Performance</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FormField control={form.control} name="coachCount" render={({ field }) => (
                  <FormItem><FormLabel>Number of Coaches</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="capacity.seating" render={({ field }) => (
                  <FormItem><FormLabel>Seating Capacity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="capacity.standing" render={({ field }) => (
                  <FormItem><FormLabel>Standing Capacity</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="maxSpeed" render={({ field }) => (
                  <FormItem><FormLabel>Maximum Speed (km/h)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
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
                <CardTitle>Certificates & Validity</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <FormField control={form.control} name="fitnessCertificate.validFrom" render={({ field }) => (
                  <FormItem><FormLabel>Fitness Cert. Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="fitnessCertificate.validUntil" render={({ field }) => (
                  <FormItem><FormLabel>Fitness Cert. Expiry Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="safetyCertificateExpiry" render={({ field }) => (
                  <FormItem><FormLabel>Safety/Signaling Cert. Expiry</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
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
