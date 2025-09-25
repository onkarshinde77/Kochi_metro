import type { Kpi, JobCard, Train, DepotLayout, BrandingDetails, CleaningDetails, CertificateDetails } from './types';

export const kpis: Kpi[] = [
  {
    title: 'Total Trainsets',
    value: '25',
    change: '',
    changeType: 'increase',
    description: 'Total operational fleet size',
    filterValue: 'all',
  },
  {
    title: 'Ready for Service',
    value: '18',
    change: '+1',
    changeType: 'increase',
    description: 'Available for immediate deployment',
    filterValue: 'Operational',
  },
  {
    title: 'On Standby',
    value: '4',
    change: '-1',
    changeType: 'decrease',
    description: 'Ready but not scheduled',
    filterValue: 'Idle',
  },
  {
    title: 'In Maintenance',
    value: '3',
    change: '',
    changeType: 'increase',
    description: 'Currently undergoing maintenance',
    filterValue: 'Maintenance',
  },
   {
    title: 'Pending Clearance',
    value: '8%',
    change: '+2%',
    changeType: 'increase',
    description: 'Awaiting certificate clearance',
  },
  {
    title: 'Predicted Failures',
    value: '2',
    change: '+1',
    changeType: 'increase',
    description: 'In next 24 hours',
  },
];

export const currentJobCards: JobCard[] = [
  { id: 'JC-001', trainId: 'T-003', task: 'Pantograph inspection', status: 'In Progress', assignedTo: 'Rajesh Kumar', createdDate: '2024-07-28', priority: 'High', expectedCompletion: '2024-07-30', supervisor: 'Vikram Singh', attachments: ['hvac_report.pdf'] },
  { id: 'JC-002', trainId: 'T-007', task: 'Brake pad replacement', status: 'In Progress', assignedTo: 'Priya Singh', createdDate: '2024-07-28', priority: 'High', expectedCompletion: '2024-07-29', supervisor: 'Sunita Sharma', attachments: [] },
  { id: 'JC-003', trainId: 'T-001', task: 'Interior deep clean', status: 'Pending', assignedTo: 'Cleaning Crew', createdDate: '2024-07-29', priority: 'Low', expectedCompletion: '2024-07-30', supervisor: 'Anjali Sharma', attachments: [] },
  { id: 'JC-004', trainId: 'T-012', task: 'Diagnostic check', status: 'Blocked', assignedTo: 'Amit Patel', createdDate: '2024-07-27', priority: 'Medium', expectedCompletion: '2024-07-28', supervisor: 'Vikram Singh', attachments: ['diagnostic_log.txt'] },
  { id: 'JC-005', trainId: 'T-019', task: 'Pantograph inspection', status: 'In Progress', assignedTo: 'Priya Singh', createdDate: '2024-07-29', priority: 'High', expectedCompletion: '2024-07-31', supervisor: 'Sunita Sharma', attachments: [] },
  { id: 'JC-006', trainId: 'T-014', task: 'Wheel alignment', status: 'Pending', assignedTo: 'Amit Patel', createdDate: '2024-07-29', priority: 'Medium', expectedCompletion: '2024-08-01', supervisor: 'Vikram Singh', attachments: [] },
];

export const pastJobCards: JobCard[] = [
  { id: 'JC-101', trainId: 'T-005', task: 'Window seal replacement', status: 'Completed', assignedTo: 'Suresh Gupta', createdDate: '2024-07-25', priority: 'Medium', expectedCompletion: '2024-07-26', supervisor: 'Vikram Singh', attachments: [] },
  { id: 'JC-102', trainId: 'T-002', task: 'Pantograph inspection', status: 'Completed', assignedTo: 'Priya Singh', createdDate: '2024-07-24', priority: 'High', expectedCompletion: '2024-07-25', supervisor: 'Sunita Sharma', attachments: [] },
  { id: 'JC-103', trainId: 'T-009', task: 'Wheel alignment', status: 'Completed', assignedTo: 'Amit Patel', createdDate: '2024-07-23', priority: 'Medium', expectedCompletion: '2024-07-24', supervisor: 'Vikram Singh', attachments: [] },
  { id: 'JC-104', trainId: 'T-006', task: 'Software update', status: 'Completed', assignedTo: 'Anjali Sharma', createdDate: '2024-07-22', priority: 'Low', expectedCompletion: '2024-07-22', supervisor: 'Sunita Sharma', attachments: [] },
  { id: 'JC-105', trainId: 'T-001', task: 'Graffiti removal', status: 'Completed', assignedTo: 'Cleaning Crew', createdDate: '2024-07-20', priority: 'Low', expectedCompletion: '2024-07-21', supervisor: 'Anjali Sharma', attachments: [] },
  { id: 'JC-106', trainId: 'T-003', task: 'Door sensor calibration', status: 'Completed', assignedTo: 'Rajesh Kumar', createdDate: '2024-07-19', priority: 'Medium', expectedCompletion: '2024-07-20', supervisor: 'Vikram Singh', attachments: [] },
  { id: 'JC-107', trainId: 'T-007', task: 'Annual safety check', status: 'Completed', assignedTo: 'Priya Singh', createdDate: '2024-07-18', priority: 'High', expectedCompletion: '2024-07-19', supervisor: 'Sunita Sharma', attachments: [] },
  { id: 'JC-108', trainId: 'T-015', task: 'Battery replacement', status: 'Completed', assignedTo: 'Suresh Gupta', createdDate: '2024-07-21', priority: 'High', expectedCompletion: '2024-07-22', supervisor: 'Vikram Singh', attachments: [] },
];

const allTrainDetails: Omit<Train, 'id' | 'status' | 'currentTrack'>[] = Array.from({ length: 24 }, (_, i) => {
  const trainId = `T-${(i + 1).toString().padStart(3, '0')}`;
  const brandingStatus = i % 5 === 0 ? 'Yes' : 'No';

  let branding: BrandingDetails;
  if (brandingStatus === 'Yes') {
    branding = {
      status: 'Yes',
      contractId: `CTR-${2024 + i}`,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      contractValue: 50000 + Math.floor(Math.random() * 50000),
      hourlyRate: 150 + Math.floor(Math.random() * 100),
      contractStatus: 'Active',
      lastUpdated: new Date().toISOString().split('T')[0],
      advertiserName: `Ad-Venture Inc. #${i + 1}`,
      brandingType: ['Full Wrap', 'Partial Wrap', 'Interior'][i % 3] as 'Full Wrap' | 'Partial Wrap' | 'Interior',
      brandingDescription: `Campaign for client ${i+1}.`,
      creativeContent: 'https://example.com/creative.pdf',
      placementInstructions: 'Apply to all exterior surfaces, avoiding windows.',
      requiredHours: 1200,
      minimumDailyHours: 4,
      minimumWeeklyHours: 28,
      slaRequirements: 'Maintain 95% visibility, no peeling or fading.',
      penaltyTerms: '5% reduction in monthly fee for SLA breaches.',
      penaltyPercentage: 5,
      contactPerson: 'Alex Doe',
      contactEmail: `alex.doe${i+1}@ad-venture.com`,
      contactPhone: '+1-555-123-4567',
    };
  } else {
    branding = { status: 'No' };
  }

  const cleaningStatusOptions: CleaningDetails['status'][] = ['COMPLETED', 'PENDING', 'IN_PROGRESS'];
  const cleaningTypeOptions: CleaningDetails['cleaningType'][] = ['DEEP_CLEAN', 'ROUTINE', 'QUICK_WASH'];
  const now = new Date();
  const scheduledStart = new Date(now.getTime() - Math.random() * 5 * 24 * 60 * 60 * 1000);
  const scheduledEnd = new Date(scheduledStart.getTime() + (1 + Math.random()) * 60 * 60 * 1000); // 1-2 hours later

  const cleaning: CleaningDetails = {
      bayId: `Bay-0${(i%3) + 1}`,
      cleaningType: cleaningTypeOptions[i % cleaningTypeOptions.length],
      remarks: i % 7 === 0 ? "Extra attention to seat stains required." : undefined,
      scheduledStart: scheduledStart.toISOString(),
      scheduledEnd: scheduledEnd.toISOString(),
      actualStart: i % 2 === 0 ? new Date(scheduledStart.getTime() + Math.random() * 15 * 60 * 1000).toISOString() : undefined,
      actualEnd: i % 4 === 0 ? new Date(scheduledEnd.getTime() - Math.random() * 15 * 60 * 1000).toISOString() : undefined,
      status: cleaningStatusOptions[i % cleaningStatusOptions.length],
      lastUpdated: new Date(scheduledEnd.getTime() - Math.random() * 60 * 60 * 1000).toISOString(),
      lastCleaned: new Date(Date.now() - (Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      assignedTeamId: `Team-${['A', 'B', 'C'][i%3]}`,
      supervisorOverride: i % 10 === 0,
  }

  const fitnessCertificate: CertificateDetails = {
    certificateId: `FIT-${trainId}-${2024}`,
    certificateNumber: `IR/FIT/${2024}/${i+1}`,
    issueDate: '2024-01-01',
    expiryDate: '2024-12-31',
    status: 'ACTIVE',
    isRenewal: i > 5,
    previousCertificateId: i > 5 ? `FIT-${trainId}-${2023}` : undefined,
    department: 'ROLLING_STOCK',
    issuedBy: 'R. Mehra',
    approvedBy: 'S. K. Jain',
    lastInspectionDate: '2023-12-15',
    nextInspectionDue: '2024-11-15',
    inspectionDetails: 'Annual full-body inspection passed without remarks.',
    complianceNotes: 'Complies with all RDSO standards.',
    lastUpdated: new Date().toISOString(),
  };

  const safetyCertificate: CertificateDetails = {
    certificateId: `SAFE-${trainId}-${2024}`,
    certificateNumber: `CMRS/SAFE/${2024}/${i+1}`,
    issueDate: '2024-06-01',
    expiryDate: '2025-05-31',
    status: 'ACTIVE',
    isRenewal: i > 10,
    department: 'SIGNALING',
    issuedBy: 'P. Nair',
    approvedBy: 'A. Verma',
    lastInspectionDate: '2024-05-20',
    nextInspectionDue: '2025-04-20',
    complianceNotes: 'Compliant with CBTC-A2 signaling protocols.',
    lastUpdated: new Date().toISOString(),
  };

  return {
    trainNumber: `KMRL-${(i + 1).toString().padStart(3, '0')}`,
    model: 'Alstom Metropolis',
    manufacturingYear: 2018 + Math.floor(i / 5),
    vendor: 'Alstom',
    serialNumber: `ALSTOM-KOC-${2018 + Math.floor(i/5)}-${(i+1).toString().padStart(4, '0')}`,
    coachCount: 3,
    capacity: { seating: 150, standing: 650 },
    maxSpeed: 90,
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
    depot: 'Muttom',
    inductionDate: new Date(2019, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    assignedRoute: i % 4 === 0 ? 'Aluva - Pettah' : undefined,
    fitnessCertificate: fitnessCertificate,
    safetyCertificate: safetyCertificate,
    nextMaintenanceDate: new Date(2024, 8 + Math.floor(i / 10), 15).toISOString().split('T')[0],
    lastMaintenanceDate: new Date(2024, 2 + Math.floor(i / 10), 15).toISOString().split('T')[0],
    maintenanceInterval: { distance: 20000, time: 6 },
    mileage: Math.floor(Math.random() * 200000) + 5000,
    mileageThreshold: 150000,
    safetySystems: ['CCTV', 'Fire Detection', 'Emergency Brakes', 'Passenger Intercom'],
    cleaning: cleaning,
    branding: branding,
    isElectric: true,
  };
});

const depotAssignments = {
    'T-001': { currentTrack: 'SL1', status: 'Idle' },
    'T-002': { currentTrack: 'ML1', status: 'Maintenance' },
    'T-003': { currentTrack: 'WL1', status: 'Washing' },
    'T-004': { currentTrack: 'SL2', status: 'Idle' },
};

export const initialTrains: Train[] = allTrainDetails.map((details, i) => {
    const id = `T-${(i + 1).toString().padStart(3, '0')}`;
    const assignment = depotAssignments[id as keyof typeof depotAssignments];
    
    return {
        ...details,
        id: id,
        currentTrack: assignment ? assignment.currentTrack : 'Mainline',
        status: assignment ? assignment.status : 'Operational',
    };
}).filter(train => train.id !== 'T-025'); // Keep T-025 out for manual adding

export const depotLayout: DepotLayout = {
  tracks: [
    { id: 'SL1', type: 'Stabling', length: 200, trains: ['T-001'] },
    { id: 'SL2', type: 'Stabling', length: 100, trains: ['T-004'] },
    { id: 'SL3', type: 'Stabling', length: 100, trains: [] },
    { id: 'ML1', type: 'Maintenance', length: 100, trains: ['T-002'] },
    { id: 'ML2', type: 'Maintenance', length: 100, trains: [] },
    { id: 'WL1', type: 'Washing', length: 100, trains: ['T-003'] },
    { id: 'Main-N', type: 'Mainline', length: 300, trains: [] },
    { id: 'Main-S', type: 'Mainline', length: 300, trains: [] },
  ],
};
