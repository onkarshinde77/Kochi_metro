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
  };
  safetyCertificateExpiry: string;

  // Maintenance
  nextMaintenanceDate: string;
  maintenanceInterval: {
    distance: number; // in km
    time: number; // in months
  };
  mileage: number; // Current Mileage
  mileageThreshold: number; // Mileage Threshold before Inspection

  // Other
  cleaningStatus: 'Cleaned' | 'Pending';
  brandingStatus: 'Yes' | 'No';
  isElectric: true;
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
