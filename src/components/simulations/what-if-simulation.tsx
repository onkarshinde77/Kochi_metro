"use client";

import { useState, useTransition } from "react";
import { runWhatIfSimulation } from "@/ai/flows/run-what-if-simulation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap, AlertOctagon, Users, Route } from "lucide-react";

type SimulationOutput = {
  predictedScheduleImpact: string;
  resourceAllocationChanges: string;
  potentialDisruptions: string;
};

export function WhatIfSimulation() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    maintenanceDelays: "Train T-003 HVAC repair taking 2 hours longer",
    trackClosures: "Track SL2 closed for inspection from 2 PM to 4 PM",
    otherConditions: "Heavy rain expected in the afternoon",
  });
  const [result, setResult] = useState<SimulationOutput | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await runWhatIfSimulation(formData);
      setResult(res);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>What-If Scenario Builder</CardTitle>
          <CardDescription>
            Input conditions to simulate their impact on operations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maintenanceDelays">Maintenance Delays</Label>
            <Input
              id="maintenanceDelays"
              name="maintenanceDelays"
              value={formData.maintenanceDelays}
              onChange={handleChange}
              placeholder="e.g., 2-hour delay on T-007 brake replacement"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trackClosures">Track Closures</Label>
            <Input
              id="trackClosures"
              name="trackClosures"
              value={formData.trackClosures}
              onChange={handleChange}
              placeholder="e.g., Washing line 1 closed for 4 hours"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherConditions">Other Conditions</Label>
            <Input
              id="otherConditions"
              name="otherConditions"
              value={formData.otherConditions}
              onChange={handleChange}
              placeholder="e.g., VVIP movement, platform change"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            Run Simulation
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
          <CardDescription>
            AI-predicted outcomes based on your inputs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending ? (
             <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
             </div>
          ) : result ? (
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold flex items-center gap-2"><Route className="h-5 w-5 text-primary" />Predicted Schedule Impact</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.predictedScheduleImpact}</p>
                </div>
                 <div>
                    <h3 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Resource Allocation Changes</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.resourceAllocationChanges}</p>
                </div>
                 <div>
                    <h3 className="font-semibold flex items-center gap-2"><AlertOctagon className="h-5 w-5 text-destructive" />Potential Disruptions</h3>
                    <p className="text-sm text-muted-foreground mt-1">{result.potentialDisruptions}</p>
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg p-4">
                <Zap className="h-10 w-10 mb-2"/>
                <p className="font-semibold">Results will be displayed here</p>
                <p className="text-sm">Enter conditions and run the simulation.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
