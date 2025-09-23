// src/app/(app)/tracking/page.tsx
"use client";

import { TrainTracker } from "@/components/tracking/train-tracker";
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Train } from "@/lib/types";

const statusOptions: Train['status'][] = ['Operational', 'Maintenance', 'Idle', 'Washing'];

function AddTrainForm({ onAddTrain }: { onAddTrain: (train: Train) => void }) {
  const [newTrain, setNewTrain] = useState({
    id: "",
    status: "Idle" as Train['status'],
    currentTrack: "",
    mileage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrain.id || !newTrain.currentTrack || !newTrain.mileage) {
        // Simple validation
        alert("Please fill all fields");
        return;
    }
    onAddTrain({
        ...newTrain,
        mileage: Number(newTrain.mileage),
        isElectric: true
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="id">Train ID</Label>
            <Input id="id" value={newTrain.id} onChange={(e) => setNewTrain({...newTrain, id: e.target.value})} placeholder="e.g., T-026" />
        </div>
         <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={newTrain.status} onValueChange={(value) => setNewTrain({...newTrain, status: value as Train['status']})}>
                <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentTrack">Current Location</Label>
            <Input id="currentTrack" value={newTrain.currentTrack} onChange={(e) => setNewTrain({...newTrain, currentTrack: e.target.value})} placeholder="e.g., SL4" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input id="mileage" type="number" value={newTrain.mileage} onChange={(e) => setNewTrain({...newTrain, mileage: e.target.value})} placeholder="e.g., 50000" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Add Train</Button>
      </DialogFooter>
    </form>
  )
}

function TrackingPageContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const [trains, setTrains] = useState<Train[]>([]);
  const [isAddTrainOpen, setIsAddTrainOpen] = useState(false);

  const handleAddTrain = (train: Train) => {
    setTrains(prevTrains => [...prevTrains, train]);
    setIsAddTrainOpen(false);
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Track All Metros</h1>
        <Dialog open={isAddTrainOpen} onOpenChange={setIsAddTrainOpen}>
            <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Train
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Train</DialogTitle>
                </DialogHeader>
                <AddTrainForm onAddTrain={handleAddTrain} />
            </DialogContent>
        </Dialog>
      </div>
      <p className="text-muted-foreground">
        Real-time overview of the entire fleet's status and location.
      </p>
      <TrainTracker initialStatusFilter={status} extraTrains={trains} />
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackingPageContent />
    </Suspense>
  );
}
