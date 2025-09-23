import type { Kpi, JobCard, Train, DepotLayout } from './types';

export const kpis: Kpi[] = [
  {
    title: 'Total Trainsets',
    value: '25',
    change: '',
    changeType: 'increase',
    description: 'Total operational fleet size',
  },
  {
    title: 'Ready for Service',
    value: '18',
    change: '+1',
    changeType: 'increase',
    description: 'Available for immediate deployment',
  },
  {
    title: 'On Standby',
    value: '4',
    change: '-1',
    changeType: 'decrease',
    description: 'Ready but not scheduled',
  },
  {
    title: 'In Maintenance',
    value: '3',
    change: '',
    changeType: 'increase',
    description: 'Currently undergoing maintenance',
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

export const initialTrains: Train[] = [
  { id: 'T-001', status: 'Idle', currentTrack: 'SL1', mileage: 120500, isElectric: true },
  { id: 'T-002', status: 'Idle', currentTrack: 'SL1', mileage: 85200, isElectric: true },
  { id: 'T-003', status: 'Maintenance', currentTrack: 'ML1', mileage: 150300, isElectric: true },
  { id: 'T-004', status: 'Idle', currentTrack: 'SL2', mileage: 45100, isElectric: true },
  { id: 'T-005', status: 'Operational', currentTrack: 'Main-N', mileage: 210000, isElectric: true },
  { id: 'T-006', status: 'Idle', currentTrack: 'SL3', mileage: 95000, isElectric: true },
  { id: 'T-007', status: 'Maintenance', currentTrack: 'ML2', mileage: 180000, isElectric: true },
  { id: 'T-008', status: 'Operational', currentTrack: 'Main-S', mileage: 225000, isElectric: true },
  { id: 'T-009', status: 'Washing', currentTrack: 'WL1', mileage: 12500, isElectric: true },
  { id: 'T-010', status: 'Idle', currentTrack: 'SL1', mileage: 75000, isElectric: true },
  { id: 'T-011', status: 'Idle', currentTrack: 'SL2', mileage: 8000, isElectric: true },
  { id: 'T-012', status: 'Idle', currentTrack: 'SL2', mileage: 130000, isElectric: true },
  { id: 'T-013', status: 'Idle', currentTrack: 'SL3', mileage: 145000, isElectric: true },
  { id: 'T-014', status: 'Maintenance', currentTrack: 'ML1', mileage: 99000, isElectric: true },
  { id: 'T-015', status: 'Idle', currentTrack: 'SL3', mileage: 165000, isElectric: true },
  { id: 'T-016', status: 'Washing', currentTrack: 'WL1', mileage: 42000, isElectric: true },
  { id: 'T-017', status: 'Idle', currentTrack: 'SL1', mileage: 110000, isElectric: true },
  { id: 'T-018', status: 'Idle', currentTrack: 'SL2', mileage: 62000, isElectric: true },
  { id: 'T-019', status: 'Maintenance', currentTrack: 'ML2', mileage: 195000, isElectric: true },
  { id: 'T-020', status: 'Idle', currentTrack: 'SL3', mileage: 88000, isElectric: true },
  { id: 'T-021', status: 'Operational', currentTrack: 'Main-N', mileage: 235000, isElectric: true },
  { id: 'T-022', status: 'Idle', currentTrack: 'SL1', mileage: 54000, isElectric: true },
  { id: 'T-023', status: 'Idle', currentTrack: 'SL2', mileage: 78000, isElectric: true },
  { id: 'T-024', status: 'Washing', currentTrack: 'WL1', mileage: 33000, isElectric: true },
  { id: 'T-025', status: 'Idle', currentTrack: 'SL3', mileage: 92000, isElectric: true },
];

export const depotLayout: DepotLayout = {
  tracks: [
    { id: 'SL1', type: 'Stabling', length: 200, trains: ['T-001', 'T-002', 'T-010', 'T-017', 'T-022'] },
    { id: 'SL2', type: 'Stabling', length: 100, trains: ['T-004', 'T-011', 'T-012', 'T-018', 'T-023'] },
    { id: 'SL3', type: 'Stabling', length: 100, trains: ['T-006', 'T-013', 'T-015', 'T-020', 'T-025'] },
    { id: 'ML1', type: 'Maintenance', length: 100, trains: ['T-003', 'T-014'] },
    { id: 'ML2', type: 'Maintenance', length: 100, trains: ['T-007', 'T-019'] },
    { id: 'WL1', type: 'Washing', length: 100, trains: ['T-009', 'T-016', 'T-024'] },
    { id: 'Main-N', type: 'Mainline', length: 300, trains: ['T-005', 'T-021'] },
    { id: 'Main-S', type: 'Mainline', length: 300, trains: ['T-008'] },
  ],
};
