import type { Kpi, JobCard, Train, DepotLayout } from './types';

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

export const initialTrains: Train[] = Array.from({ length: 25 }, (_, i) => {
  const trainId = `T-${(i + 1).toString().padStart(3, '0')}`;
  const statusOptions: Train['status'][] = ['Operational', 'Maintenance', 'Idle', 'Washing'];
  const trackOptions = ['SL1', 'SL2', 'SL3', 'ML1', 'ML2', 'WL1', 'Main-N', 'Main-S'];
  const brandingStatus = i % 5 === 0 ? 'Yes' : 'No';

  return {
    id: trainId,
    model: 'Alstom Metropolis',
    manufacturingYear: 2018 + Math.floor(i / 5),
    vendor: 'Alstom',
    coachCount: 3,
    capacity: { seating: 150, standing: 650 },
    maxSpeed: 90,
    depot: 'Muttom',
    inductionDate: new Date(2019, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    status: statusOptions[i % statusOptions.length],
    currentTrack: trackOptions[i % trackOptions.length],
    assignedRoute: i % 4 === 0 ? 'Aluva - Pettah' : undefined,
    fitnessCertificate: {
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      issuer: 'Indian Railways',
    },
    safetyCertificate: {
      expiry: '2025-06-30',
      type: 'CBTC-A2',
    },
    nextMaintenanceDate: new Date(2024, 8 + Math.floor(i / 10), 15).toISOString().split('T')[0],
    lastMaintenanceDate: new Date(2024, 2 + Math.floor(i / 10), 15).toISOString().split('T')[0],
    maintenanceInterval: { distance: 20000, time: 6 },
    mileage: Math.floor(Math.random() * 200000) + 5000,
    mileageThreshold: 150000,
    cleaning: {
      status: i % 3 === 0 ? 'Pending' : 'Cleaned',
      lastCleaned: new Date(Date.now() - (Math.random() * 10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    },
    branding: {
      status: brandingStatus,
      contractUntil: brandingStatus === 'Yes' ? '2025-12-31' : undefined,
      agency: brandingStatus === 'Yes' ? 'Ad-Venture Inc.' : undefined,
    },
    isElectric: true,
    engineType: 'AC Traction',
  };
});


export const depotLayout: DepotLayout = {
  tracks: [
    { id: 'SL1', type: 'Stabling', length: 200, trains: initialTrains.filter(t => t.currentTrack === 'SL1').map(t => t.id) },
    { id: 'SL2', type: 'Stabling', length: 100, trains: initialTrains.filter(t => t.currentTrack === 'SL2').map(t => t.id) },
    { id: 'SL3', type: 'Stabling', length: 100, trains: initialTrains.filter(t => t.currentTrack === 'SL3').map(t => t.id) },
    { id: 'ML1', type: 'Maintenance', length: 100, trains: initialTrains.filter(t => t.currentTrack === 'ML1').map(t => t.id) },
    { id: 'ML2', type: 'Maintenance', length: 100, trains: initialTrains.filter(t => t.currentTrack === 'ML2').map(t => t.id) },
    { id: 'WL1', type: 'Washing', length: 100, trains: initialTrains.filter(t => t.currentTrack === 'WL1').map(t => t.id) },
    { id: 'Main-N', type: 'Mainline', length: 300, trains: initialTrains.filter(t => t.currentTrack === 'Main-N').map(t => t.id) },
    { id: 'Main-S', type: 'Mainline', length: 300, trains: initialTrains.filter(t => t.currentTrack === 'Main-S').map(t => t.id) },
  ],
};
