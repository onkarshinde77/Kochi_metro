"use client";

import { useState } from 'react';
import { initialTrains, depotLayout as initialDepotLayout } from '@/lib/data';
import type { Train, Track } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Train as TrainIcon, Wrench, WashingMachine, Milestone, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function DepotMap() {
  const [trains, setTrains] = useState<Train[]>(initialTrains);
  const [depotLayout, setDepotLayout] = useState(initialDepotLayout);
  const [draggedTrainId, setDraggedTrainId] = useState<string | null>(null);

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
    if (sourceTrackId === targetTrackId) return; // No change

    // Update trains state
    setTrains(prevTrains =>
      prevTrains.map(t =>
        t.id === draggedTrainId ? { ...t, currentTrack: targetTrackId } : t
      )
    );

    // Update depotLayout state
    setDepotLayout(prevLayout => {
      const newTracks = prevLayout.tracks.map(track => {
        if (track.id === sourceTrackId) {
          return { ...track, trains: track.trains.filter(id => id !== draggedTrainId) };
        }
        if (track.id === targetTrackId) {
          return { ...track, trains: [...track.trains, draggedTrainId] };
        }
        return track;
      });
      return { ...prevLayout, tracks: newTracks };
    });

    setDraggedTrainId(null);
  };

  const trackIcons = {
    Stabling: <TrainIcon className="h-4 w-4" />,
    Maintenance: <Wrench className="h-4 w-4" />,
    Washing: <WashingMachine className="h-4 w-4" />,
    Mainline: <Milestone className="h-4 w-4" />,
  };
  
  const getTrainById = (id: string) => trains.find(t => t.id === id);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><TrainIcon className="h-4 w-4 text-blue-500" /> Stabling</div>
              <div className="flex items-center gap-1"><Wrench className="h-4 w-4 text-orange-500" /> Maintenance</div>
              <div className="flex items-center gap-1"><WashingMachine className="h-4 w-4 text-cyan-500" /> Washing</div>
              <div className="flex items-center gap-1"><Milestone className="h-4 w-4 text-green-500" /> Mainline</div>
          </div>
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
              <div className="flex-1 bg-muted rounded-lg h-16 p-2 border-2 border-dashed border-gray-300 flex items-center gap-2">
                {track.trains.map(trainId => {
                  const train = getTrainById(trainId);
                  if (!train) return null;
                  return (
                    <div
                      key={train.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, train.id)}
                      className={cn(
                        "p-2 rounded-md h-12 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing w-24 shadow-md",
                        train.status === 'Operational' && 'bg-green-200 text-green-900',
                        train.status === 'Maintenance' && 'bg-orange-200 text-orange-900',
                        train.status === 'Idle' && 'bg-blue-200 text-blue-900',
                        draggedTrainId === train.id && 'opacity-50'
                      )}
                    >
                      <span className="font-bold text-sm">{train.id}</span>
                      <span className="text-xs">{train.status}</span>
                    </div>
                  );
                })}
                 {track.trains.length === 0 && (
                    <div className="text-sm text-muted-foreground text-center w-full">Empty Track</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
