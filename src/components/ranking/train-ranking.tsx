"use client";

import { useState, useTransition } from "react";
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

const initialTrains = [
  {
    trainId: "T-004",
    fitnessCertificateStatus: "Valid",
    jobCardStatus: "Completed",
    brandingPriority: 8,
    mileage: 12500,
    lastCleaningDate: "2024-07-25",
    stablingConstraints: "None",
  },
  {
    trainId: "T-011",
    fitnessCertificateStatus: "Valid",
    jobCardStatus: "Open",
    brandingPriority: 5,
    mileage: 8000,
    lastCleaningDate: "2024-07-28",
    stablingConstraints: "None",
  },
  {
    trainId: "T-002",
    fitnessCertificateStatus: "Expired",
    jobCardStatus: "Completed",
    brandingPriority: 7,
    mileage: 25000,
    lastCleaningDate: "2024-07-20",
    stablingConstraints: "Height restriction on track 5",
  },
  {
    trainId: "T-009",
    fitnessCertificateStatus: "Valid",
    jobCardStatus: "Completed",
    brandingPriority: 9,
    mileage: 500,
    lastCleaningDate: "2024-07-29",
    stablingConstraints: "None",
  },
];

type RankedTrain = {
  trainId: string;
  rank: number;
  reasoning: string;
};

export function TrainRanking() {
  const [isPending, startTransition] = useTransition();
  const [rankedTrains, setRankedTrains] = useState<RankedTrain[]>([]);

  const handleRanking = () => {
    startTransition(async () => {
      const result = await rankTrainsForInduction({ trains: initialTrains });
      setRankedTrains(result.rankedTrains);
    });
  };

  const getTrainDetails = (trainId: string) => {
    return initialTrains.find((t) => t.trainId === trainId);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Trains for Induction</CardTitle>
          <CardDescription>
            Current status of trains awaiting induction decision.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Train ID</TableHead>
                <TableHead>Fitness Cert.</TableHead>
                <TableHead>Branding Prio.</TableHead>
                <TableHead>Mileage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialTrains.map((train) => (
                <TableRow key={train.trainId}>
                  <TableCell className="font-medium">{train.trainId}</TableCell>
                  <TableCell>
                    <Badge variant={train.fitnessCertificateStatus === 'Valid' ? 'default' : 'destructive'} className={train.fitnessCertificateStatus === 'Valid' ? 'bg-green-600' : ''}>
                        {train.fitnessCertificateStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{train.brandingPriority}</TableCell>
                  <TableCell>{train.mileage.toLocaleString()} km</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleRanking} disabled={isPending} className="mt-4 w-full">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Induction Rank
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
                <div className="space-y-4">
                    {rankedTrains.map((train, index) => (
                         <div key={index} className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
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
                    <Sparkles className="h-10 w-10 mb-2"/>
                    <p className="font-semibold">Ranking results will appear here</p>
                    <p className="text-sm">Click the button to generate the ranking.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
