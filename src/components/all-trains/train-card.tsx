// src/components/all-trains/train-card.tsx
import * as React from 'react';
import type { Train } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Wrench, ParkingSquare, Waves, Gauge, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

const getStatusInfo = (status: Train['status']) => {
  switch (status) {
    case 'Operational':
      return { icon: <Rocket className="h-4 w-4" />, badgeClass: 'bg-green-100 text-green-800 border-green-200' };
    case 'Maintenance':
      return { icon: <Wrench className="h-4 w-4" />, badgeClass: 'bg-orange-100 text-orange-800 border-orange-200' };
    case 'Idle':
      return { icon: <ParkingSquare className="h-4 w-4" />, badgeClass: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'Washing':
        return { icon: <Waves className="h-4 w-4" />, badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
    default:
      return { icon: null, badgeClass: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
};

const isCertificateExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
}

const DetailRow = ({ label, value, icon, valueClassName }: { label: string; value: React.ReactNode; icon: React.ReactNode; valueClassName?: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-muted-foreground flex items-center gap-2">{icon} {label}</span>
        <span className={cn("font-medium text-right", valueClassName)}>{value}</span>
    </div>
);

export function TrainCard({ train }: { train: Train }) {
  const { icon, badgeClass } = getStatusInfo(train.status);

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-bold text-primary">{train.id}</CardTitle>
            <p className="text-sm text-muted-foreground">{train.model}</p>
          </div>
          <Badge className={cn('gap-1.5 shrink-0', badgeClass)}>
            {icon}
            {train.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 text-sm">
        <DetailRow 
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={train.currentTrack}
        />
        <DetailRow 
            icon={<Gauge className="h-4 w-4" />}
            label="Mileage"
            value={`${train.mileage.toLocaleString()} km`}
        />
        <DetailRow 
            icon={<Calendar className="h-4 w-4" />}
            label="Next Maintenance"
            value={new Date(train.nextMaintenanceDate).toLocaleDateString()}
        />
        <DetailRow 
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Fitness Cert."
            value={`Expires ${new Date(train.fitnessCertificate.expiryDate).toLocaleDateString()}`}
            valueClassName={cn(isCertificateExpiringSoon(train.fitnessCertificate.expiryDate) && "text-destructive")}
        />
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
            <Link href={`/trains/${train.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}