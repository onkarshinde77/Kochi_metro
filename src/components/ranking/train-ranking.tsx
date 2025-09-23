
"use client";

import { useState, useTransition, useEffect } from "react";
import { rankTrainsForInduction } from "@/ai/flows/rank-trains-for-induction";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { initialTrains as allTrains } from "@/lib/data";
import type { Train } from "@/lib/types";

type TrainForRanking = {
    trainId: string;
    fitnessCertificateStatus: string;
    jobCardStatus: string;
    brandingPriority: number;
    mileage: number;
    lastCleaningDate: string;
    stablingConstraints: string;
    reliabilityScore: number;
}

type RankedTrain = {
  trainId: string;
  rank: number;
  reasoning: string;
};

export function TrainRanking() {
  const [isPending, startTransition] = useTransition();
  const [rankedTrains, setRankedTrains] = useState<RankedTrain[]>([]);
  const [trainsForRanking, setTrainsForRanking] = useState<TrainForRanking[]>([]);

  useEffect(() => {
    // Generate random data on the client side to prevent hydration errors
    const generatedTrains = allTrains.map(train => ({
        trainId: train.id,
        fitnessCertificateStatus: Math.random() > 0.2 ? "Valid" : "Expired",
        jobCardStatus: Math.random() > 0.5 ? "Completed" : "Open",
        brandingPriority: Math.floor(Math.random() * 10) + 1,
        mileage: train.mileage,
        lastCleaningDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        stablingConstraints: Math.random() > 0.8 ? "Platform length restriction" : "None",
        reliabilityScore: Math.floor(Math.random() * 11) + 90, // Random score between 90 and 100
    }));
    setTrainsForRanking(generatedTrains);
  }, []);


  const handleRanking = () => {
    startTransition(async () => {
      const result = await rankTrainsForInduction({ trains: trainsForRanking });
      setRankedTrains(result.rankedTrains);
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Trains for Induction</CardTitle>
          <CardDescription>
            Current status of all trains in the fleet awaiting induction decision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Train ID</TableHead>
                  <TableHead>Fitness Cert.</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead>Branding Prio.</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Cleaning</TableHead>
                  <TableHead>Accessibility</TableHead>
                  <TableHead>Reliability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainsForRanking.map((train) => (
                  <TableRow key={train.trainId}>
                    <TableCell className="font-medium">{train.trainId}</TableCell>
                    <TableCell>
                      <Badge variant={train.fitnessCertificateStatus === 'Valid' ? 'default' : 'destructive'} className={train.fitnessCertificateStatus === 'Valid' ? 'bg-green-600' : ''}>
                          {train.fitnessCertificateStatus}
                      </Badge>
                    </TableCell>
                     <TableCell>
                      <Badge variant={train.jobCardStatus === 'Completed' ? 'default' : 'secondary'} className={train.jobCardStatus === 'Completed' ? 'bg-green-600' : ''}>
                          {train.jobCardStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{train.brandingPriority}</TableCell>
                    <TableCell>{train.mileage.toLocaleString()} km</TableCell>
                    <TableCell>{train.lastCleaningDate}</TableCell>
                    <TableCell>{train.stablingConstraints}</TableCell>
                    <TableCell>{train.reliabilityScore}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button onClick={handleRanking} disabled={isPending || trainsForRanking.length === 0} className="mt-4 w-full">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Induction Rank for All Trains
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Induction Ranking</CardTitle>
          <CardDescription>
            Optimized ranking to maximize operational readiness.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {rankedTrains.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-auto pr-4">
                    {rankedTrains.map((train, index) => (
                         <div key={index} className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                                {train.rank}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-lg text-primary">{train.trainId}</p>
                                <p className="text-sm text-muted-foreground">{train.reasoning}</p>
                            </div>
                         </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border-2 border-dashed rounded-lg">
                    {trainsForRanking.length === 0 ? (
                      <Loader2 className="h-10 w-10 animate-spin mb-2" />
                    ) : (
                      <Sparkles className="h-10 w-10 mb-2"/>
                    )}
                    <p className="font-semibold">{trainsForRanking.length === 0 ? 'Generating train data...' : 'Ranking results will appear here'}</p>
                    <p className="text-sm">{trainsForRanking.length === 0 ? 'Please wait a moment.' : 'Click the button to generate the ranking.'}</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
