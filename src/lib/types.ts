export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
  filterValue?: string;
};

export type JobCard = {
  id: string;
  trainId: string;
  task: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Blocked';
  assignedTo: string;
  createdDate: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedCompletion: string;
  supervisor: string;
  attachments: string[];
};

export type BrandingDetails = {
  status: 'Yes' | 'No';

  // Contract Info
  contractId?: string;
  startDate?: string;
  endDate?: string;
  contractValue?: number;
  hourlyRate?: number;
  contractStatus?: 'Active' | 'Expired' | 'Pending';
  lastUpdated?: string;

  // Branding Info
  advertiserName?: string;
  brandingType?: 'Full Wrap' | 'Partial Wrap' | 'Interior';
  brandingDescription?: string;
  creativeContent?: string; // URL or description
  placementInstructions?: string;

  // Performance & SLA
  requiredHours?: number;
  minimumDailyHours?: number;
  minimumWeeklyHours?: number;
  slaRequirements?: string;

  // Penalty & Compliance
  penaltyTerms?: string;
  penaltyPercentage?: number;

  // Contact Info
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
};


export type Train = {
  // Identification
  id: string; // Train ID / Number
  model: string; // Train Model / Type
  manufacturingYear: number;
  vendor: string;
  
  // Capacity & Performance
  coachCount: number;
  capacity: {
    seating: number;
    standing: number;
  };
  maxSpeed: number; // in km/h

  // Operational Details
  depot: string; // Depot / Yard Assigned
  inductionDate: string; // Date of Induction into Fleet
  status: 'Operational' | 'Maintenance' | 'Idle' | 'Washing';
  currentTrack: string; // Current location in depot/mainline
  assignedRoute?: string; // Assigned Route / Corridor
  
  // Certifications
  fitnessCertificate: {
    validFrom: string;
    validUntil: string;
    issuer: string;
  };
  safetyCertificate: {
    expiry: string;
    type: string;
  };

  // Maintenance
  nextMaintenanceDate: string;
  lastMaintenanceDate: string;
  maintenanceInterval: {
    distance: number; // in km
    time: number; // in months
  };
  mileage: number; // Current Mileage
  mileageThreshold: number; // Mileage Threshold before Inspection

  // Other
  cleaning: {
    status: 'Cleaned' | 'Pending';
    lastCleaned: string;
  };
  branding: BrandingDetails;
  isElectric: true;
  engineType: string;
};

export type Track = {
  id: string;
  type: 'Stabling' | 'Washing' | 'Maintenance' | 'Mainline';
  length: number; // in meters
  trains: string[];
};

export type DepotLayout = {
  tracks: Track[];
};
