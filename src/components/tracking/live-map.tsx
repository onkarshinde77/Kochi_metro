// src/components/tracking/live-map.tsx
"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useCallback } from 'react';
import type { Train } from '@/lib/types';
import { Train as TrainIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

// A simple placeholder map when API key is not available
const TemporaryMap = ({ trains }: { trains: Train[] }) => {
  const operationalTrains = trains.filter(t => t.status === 'Operational');
  const depotTrains = trains.filter(t => t.status !== 'Operational');

  return (
    <div className="h-full w-full bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
        <div className="w-full h-full relative">
            {/* Metro Line */}
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-primary rounded-full -translate-y-1/2"></div>
            
            {/* Stations */}
            <div className="absolute top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin className="h-5 w-5 text-primary-foreground fill-primary mx-auto" />
                <span className="text-xs font-semibold">Aluva</span>
            </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin className="h-5 w-5 text-primary-foreground fill-primary mx-auto" />
                <span className="text-xs font-semibold">Muttom Yard</span>
            </div>
             <div className="absolute top-1/2 right-[5%] -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin className="h-5 w-5 text-primary-foreground fill-primary mx-auto" />
                <span className="text-xs font-semibold">Thykoodam</span>
            </div>

            {/* Operational Trains */}
            {operationalTrains.map((train, index) => (
                <div key={train.id} className="absolute top-1/2 -translate-y-full transition-all duration-500" style={{ left: `${10 + (80 / (operationalTrains.length + 1)) * (index + 1)}%` }}>
                    <div className="flex flex-col items-center">
                        <TrainIcon className="h-8 w-8" style={{ color: getStatusColor(train.status) }} />
                        <Badge className="text-xs" style={{ backgroundColor: getStatusColor(train.status), color: 'white' }}>{train.id}</Badge>
                    </div>
                </div>
            ))}
        </div>
        <div className="w-full mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-bold text-center mb-2">Depot Status (Muttom Yard)</h4>
            <div className="flex flex-wrap gap-2 justify-center">
                 {depotTrains.map(train => (
                     <Badge key={train.id} className="text-xs" style={{ backgroundColor: getStatusColor(train.status), color: 'white' }}>{train.id}</Badge>
                 ))}
            </div>
        </div>
         <p className="text-xs text-muted-foreground mt-2 text-center w-full">This is a temporary visualization. Add a Google Maps API key for a live, interactive map.</p>
    </div>
  );
};


function MapComponent({ trains, apiKey }: { trains: Train[], apiKey: string }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

    const onMarkerClick = useCallback((train: Train) => {
        setSelectedTrain(train);
    }, []);

    const onInfoWindowClose = useCallback(() => {
        setSelectedTrain(null);
    }, []);

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


export function LiveMap({ trains }: { trains: Train[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <TemporaryMap trains={trains} />;
  }
  
  return <MapComponent trains={trains} apiKey={apiKey} />;
}
