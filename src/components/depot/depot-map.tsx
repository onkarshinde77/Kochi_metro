// src/components/depot/depot-map.tsx
"use client";

import { useState, useEffect } from 'react';
import { initialTrains, depotLayout as initialDepotLayout } from '@/lib/data';
import type { Train, Track } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';


type PendingMove = {
    trainId: string;
    sourceTrackId: string;
    targetTrackId: string;
} | null;

type AlertInfo = {
    title: string;
    description: string;
} | null;

export function DepotMap() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [depotLayout, setDepotLayout] = useState(initialDepotLayout);
  const [draggedTrainId, setDraggedTrainId] = useState<string | null>(null);
  const [pendingMove, setPendingMove] = useState<PendingMove>(null);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>(null);
  const [newTrainId, setNewTrainId] = useState('');
  const [newTrainTrackId, setNewTrainTrackId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Ensure correct initial status for trains based on their track type
    const correctedTrains = initialTrains.map(train => {
      const track = initialDepotLayout.tracks.find(t => t.trains.includes(train.id));
      if (track) {
        let newStatus: Train['status'] = train.status;
        switch(track.type) {
            case 'Stabling':
                newStatus = 'Idle';
                break;
            case 'Maintenance':
                newStatus = 'Maintenance';
                break;
            case 'Washing':
                newStatus = 'Washing';
                break;
            case 'Mainline':
                newStatus = 'Operational';
                break;
        }
        return { ...train, status: newStatus, currentTrack: track.id };
      }
      return train;
    });
    setTrains(correctedTrains);
    if (initialDepotLayout.tracks.length > 0) {
      setNewTrainTrackId(initialDepotLayout.tracks[0].id);
    }
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, trainId: string) => {
    setDraggedTrainId(trainId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetTrackId: string) => {
    e.preventDefault();
    if (!draggedTrainId) return;

    const trainToMove = trains.find(t => t.id === draggedTrainId);
    if (!trainToMove) return;

    const sourceTrackId = trainToMove.currentTrack;
    if (sourceTrackId === targetTrackId) {
      setDraggedTrainId(null);
      return; 
    }

    setPendingMove({ trainId: draggedTrainId, sourceTrackId, targetTrackId });
  };
  
  const confirmMove = () => {
    if (!pendingMove) return;
    const { trainId, sourceTrackId, targetTrackId } = pendingMove;

    const targetTrack = depotLayout.tracks.find(t => t.id === targetTrackId);
    if (!targetTrack) return;
    
    let newStatus: Train['status'] = 'Idle';
    switch (targetTrack.type) {
        case 'Maintenance':
            newStatus = 'Maintenance';
            break;
        case 'Washing':
            newStatus = 'Washing';
            break;
        case 'Mainline':
            newStatus = 'Operational';
            break;
        case 'Stabling':
        default:
            newStatus = 'Idle';
            break;
    }

    // Update trains state
    setTrains(prevTrains =>
      prevTrains.map(t =>
        t.id === trainId ? { ...t, currentTrack: targetTrackId, status: newStatus } : t
      )
    );

    const newLayout = { ...depotLayout };
    const sourceTrackIndex = newLayout.tracks.findIndex(t => t.id === sourceTrackId);
    const targetTrackIndex = newLayout.tracks.findIndex(t => t.id === targetTrackId);

    if (sourceTrackIndex > -1) {
        newLayout.tracks[sourceTrackIndex] = {
            ...newLayout.tracks[sourceTrackIndex],
            trains: newLayout.tracks[sourceTrackIndex].trains.filter(id => id !== trainId)
        };
    }
    
    if (targetTrackIndex > -1) {
         newLayout.tracks[targetTrackIndex] = {
            ...newLayout.tracks[targetTrackIndex],
            trains: [...newLayout.tracks[targetTrackIndex].trains, trainId]
        };
    }
    
    setDepotLayout(newLayout);
    setDraggedTrainId(null);
    setPendingMove(null);
  }

  const cancelMove = () => {
    setDraggedTrainId(null);
    setPendingMove(null);
  }

  const handleAddTrain = () => {
    if (!newTrainId || !newTrainTrackId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter a train ID and select a track.",
      });
      return;
    }

    const trainExists = depotLayout.tracks.some(track => track.trains.includes(newTrainId));
    if (trainExists) {
        setAlertInfo({
            title: "Train Already Exists",
            description: `Train ${newTrainId} is already on a depot track. Please use a different ID.`
        });
        return;
    }
    
    const newTrainToAdd: Train = {
        id: newTrainId,
        model: 'Alstom Metropolis',
        status: 'Idle', // Default status
        currentTrack: newTrainTrackId,
        mileage: 0,
        nextMaintenanceDate: new Date().toISOString(),
        fitnessCertificate: {
            certificateId: '',
            certificateNumber: '',
            issueDate: '',
            expiryDate: '',
            status: 'PENDING',
            isRenewal: false,
            department: 'ROLLING_STOCK',
            issuedBy: '',
            approvedBy: '',
            lastInspectionDate: '',
            nextInspectionDue: '',
            lastUpdated: new Date().toISOString()
        },
        // Fill other required Train properties with defaults
        trainNumber: '',
        manufacturingYear: new Date().getFullYear(),
        vendor: '',
        serialNumber: '',
        coachCount: 3,
        capacity: { seating: 150, standing: 650 },
        maxSpeed: 90,
        depot: 'Muttom',
        inductionDate: new Date().toISOString(),
        safetyCertificate: {
            certificateId: '',
            certificateNumber: '',
            issueDate: '',
            expiryDate: '',
            status: 'PENDING',
            isRenewal: false,
            department: 'SIGNALING',
            issuedBy: '',
            approvedBy: '',
            lastInspectionDate: '',
            nextInspectionDue: '',
            lastUpdated: new Date().toISOString()
        },
        lastMaintenanceDate: '',
        maintenanceInterval: { distance: 20000, time: 6 },
        mileageThreshold: 150000,
        cleaning: {
            bayId: '',
            cleaningType: 'ROUTINE',
            status: 'PENDING',
            lastUpdated: new Date().toISOString(),
            lastCleaned: '',
            scheduledStart: '',
            scheduledEnd: '',
            assignedTeamId: '',
            supervisorOverride: false,
        },
        branding: { status: 'No'},
        isElectric: true,
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
        safetySystems: [],
    };

    setTrains(prev => [...prev, newTrainToAdd]);

    setDepotLayout(prevLayout => {
        const newTracks = prevLayout.tracks.map(track => {
            if (track.id === newTrainTrackId) {
                return { ...track, trains: [...track.trains, newTrainId] };
            }
            return track;
        });
        return { ...prevLayout, tracks: newTracks };
    });

    toast({
        title: "Train Added",
        description: `Train ${newTrainId} has been added to track ${newTrainTrackId}.`,
    });
    setNewTrainId('');
  }

  const getTrainById = (id: string) => trains.find(t => t.id === id);

  const getTrackBgColor = (type: Track['type']) => {
    switch (type) {
      case 'Stabling':
        return 'bg-blue-50';
      case 'Maintenance':
        return 'bg-orange-50';
      case 'Washing':
        return 'bg-cyan-50';
      case 'Mainline':
        return 'bg-green-50';
      default:
        return 'bg-muted';
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Add Train Manually
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 w-full sm:w-auto">
                    <Label htmlFor="new-train-id">Train ID</Label>
                    <Input 
                        id="new-train-id" 
                        placeholder="e.g., T-025" 
                        value={newTrainId} 
                        onChange={e => setNewTrainId(e.target.value.toUpperCase())} 
                    />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                    <Label htmlFor="new-train-track">Depot Line</Label>
                    <Select value={newTrainTrackId} onValueChange={setNewTrainTrackId}>
                        <SelectTrigger id="new-train-track">
                            <SelectValue placeholder="Select a track" />
                        </SelectTrigger>
                        <SelectContent>
                            {depotLayout.tracks.map(track => (
                                <SelectItem key={track.id} value={track.id}>{track.id} ({track.type})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAddTrain} className="w-full sm:w-auto">Add to Depot</Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {depotLayout.tracks.map(track => (
              <div
                key={track.id}
                className="flex items-center gap-4"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, track.id)}
              >
                <div className="w-32 text-right">
                  <p className="font-bold">{track.id}</p>
                  <p className="text-xs text-muted-foreground">{track.type}</p>
                </div>
                <div className={cn("flex-1 rounded-lg h-24 p-2 border-2 border-dashed border-gray-300 flex flex-wrap items-start gap-2 overflow-x-auto", getTrackBgColor(track.type))}>
                  {track.trains.map(trainId => {
                    const train = getTrainById(trainId);
                    if (!train) return null;
                    return (
                      <div
                        key={train.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, train.id)}
                        className={cn(
                          "p-2 rounded-md h-16 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing w-24 shadow-md shrink-0",
                          train.status === 'Operational' && 'bg-green-200 text-green-900',
                          train.status === 'Maintenance' && 'bg-orange-200 text-orange-900',
                          train.status === 'Idle' && 'bg-blue-200 text-blue-900',
                          train.status === 'Washing' && 'bg-cyan-200 text-cyan-900',
                          draggedTrainId === train.id && 'opacity-50'
                        )}
                      >
                        <span className="font-bold text-sm">{train.id}</span>
                        <span className="text-xs">{train.status}</span>
                      </div>
                    );
                  })}
                  {track.trains.length === 0 && (
                      <div className="text-sm text-muted-foreground text-center w-full self-center">Empty Track</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!pendingMove} onOpenChange={(open) => !open && cancelMove()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Train Move</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to move train <span className="font-bold">{pendingMove?.trainId}</span> from track <span className="font-bold">{pendingMove?.sourceTrackId}</span> to <span className="font-bold">{pendingMove?.targetTrackId}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelMove}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmMove}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!alertInfo} onOpenChange={() => setAlertInfo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertInfo?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertInfo?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertInfo(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
