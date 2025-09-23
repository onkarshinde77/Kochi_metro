// src/components/tracking/live-map.tsx
"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useCallback } from 'react';
import type { Train } from '@/lib/types';
import { Train as TrainIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Center the map on Kochi, Kerala
const center = {
  lat: 9.9312,
  lng: 76.2673
};

const getStatusColor = (status: Train['status']) => {
    switch (status) {
        case 'Operational': return '#22c55e'; // green-500
        case 'Maintenance': return '#f97316'; // orange-500
        case 'Idle': return '#3b82f6'; // blue-500
        case 'Washing': return '#06b6d4'; // cyan-500
        default: return '#64748b'; // slate-500
    }
}

export function LiveMap({ trains }: { trains: Train[] }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const onMarkerClick = useCallback((train: Train) => {
    setSelectedTrain(train);
  }, []);

  const onInfoWindowClose = useCallback(() => {
    setSelectedTrain(null);
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <div className="text-center text-muted-foreground p-4">
                <h3 className="font-semibold text-lg">Google Maps API Key is missing.</h3>
                <p className="text-sm">Please add your API key to the `.env.local` file to display the map.</p>
            </div>
        </div>
    );
  }
  
  if (!isLoaded) return <div className="flex items-center justify-center h-full">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      {trains.map((train) => (
        <Marker
          key={train.id}
          position={{ lat: train.lat, lng: train.lng }}
          title={train.id}
          onClick={() => onMarkerClick(train)}
          icon={{
            path: 'M-1.54,21.36V3.41a5.88,5.88,0,0,1,5.88-5.88h1a5.88,5.88,0,0,1,5.88,5.88v18m-12.72,0h12.72',
            fillColor: getStatusColor(train.status),
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            rotation: 0,
            scale: 1.5,
            anchor: new google.maps.Point(0, 15),
          }}
        />
      ))}

      {selectedTrain && (
        <InfoWindow
          position={{ lat: selectedTrain.lat, lng: selectedTrain.lng }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="p-1 space-y-1">
            <h4 className="font-bold text-primary">{selectedTrain.id}</h4>
            <p>Status: <Badge variant="secondary" style={{ backgroundColor: getStatusColor(selectedTrain.status), color: 'white' }}>{selectedTrain.status}</Badge></p>
            <p>Location: {selectedTrain.currentTrack}</p>
            <p>Mileage: {selectedTrain.mileage.toLocaleString()} km</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
