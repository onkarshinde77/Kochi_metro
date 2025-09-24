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

export type CleaningDetails = {
  // Bay & Task Info
  bayId: string;
  cleaningType: 'DEEP_CLEAN' | 'ROUTINE' | 'QUICK_WASH';
  remarks?: string;

  // Schedule & Execution
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;

  // Progress Tracking
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PENDING';
  lastUpdated: string;
  
  // For backwards compatibility with older components
  lastCleaned: string;

  // Team & Authorization
  assignedTeamId: string;
  supervisorOverride: boolean;
};

export type CertificateDetails = {
  // Certificate Details
  certificateId: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  isRenewal: boolean;
  previousCertificateId?: string;
  
  // Department & Authority
  department: 'ROLLING_STOCK' | 'SIGNALING' | 'OPERATIONS';
  issuedBy: string;
  approvedBy: string;
  
  // Inspection & Compliance
  lastInspectionDate: string;
  nextInspectionDue: string;
  inspectionDetails?: string;
  complianceNotes?: string;
  
  // Additional Info
  remarks?: string;
  lastUpdated: string;
};

export type Train = {
  // Identification
  id: string; // Train ID / Number
  trainNumber: string;
  model: string; // Train Model / Type
  manufacturingYear: number;
  vendor: string;
  serialNumber: string;
  
  // Performance Specs
  maxSpeed: number; // in km/h
  accelerationRate: number; // m/s²
  brakingDistance: number; // in meters
  engineType: string; // AC Traction, etc.
  energySource: string;

  // Power & Energy
  powerOutput: string; // in kW or MW
  batteryBackup: {
    available: boolean;
    capacity?: string; // in kWh
  };
  regenerativeBraking: boolean;
  avgEnergyConsumption: number; // kWh per km

  // Capacity & Layout
  coachCount: number;
  capacity: {
    seating: number;
    standing: number;
  };
  doorsPerCoach: number;
  
  // Dimensions
  trainLength: number; // in meters
  coachLength: number; // in meters
  trainWidth: number; // in meters
  trainHeight: number; // in meters
  floorHeight: number; // in meters

  // Operational Details
  depot: string; // Depot / Yard Assigned
  inductionDate: string; // Date of Induction into Fleet
  status: 'Operational' | 'Maintenance' | 'Idle' | 'Washing';
  currentTrack: string; // Current location in depot/mainline
  assignedRoute?: string; // Assigned Route / Corridor
  
  // Certifications
  fitnessCertificate: CertificateDetails;
  safetyCertificate: CertificateDetails;

  // Maintenance
  nextMaintenanceDate: string;
  lastMaintenanceDate: string;
  maintenanceInterval: {
    distance: number; // in km
    time: number; // in months
  };
  mileage: number; // Current Mileage / Odometer Reading
  mileageThreshold: number; // Mileage Threshold for Inspection
  safetySystems: string[];

  // Other
  cleaning: CleaningDetails;
  branding: BrandingDetails;
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
