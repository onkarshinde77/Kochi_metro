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
  { id: 'JC-001', trainId: 'T-003', task: 'HVAC unit repair', status: 'In Progress', assignedTo: 'Rajesh Kumar', createdDate: '2024-07-28' },
  { id: 'JC-002', trainId: 'T-007', task: 'Brake pad replacement', status: 'In Progress', assignedTo: 'Priya Singh', createdDate: '2024-07-28' },
  { id: 'JC-003', trainId: 'T-001', task: 'Interior deep clean', status: 'Pending', assignedTo: 'Cleaning Crew', createdDate: '2024-07-29' },
  { id: 'JC-004', trainId: 'T-012', task: 'Diagnostic check', status: 'Blocked', assignedTo: 'Amit Patel', createdDate: '2024-07-27' },
];

export const pastJobCards: JobCard[] = [
  { id: 'JC-101', trainId: 'T-005', task: 'Window seal replacement', status: 'Completed', assignedTo: 'Suresh Gupta', createdDate: '2024-07-25' },
  { id: 'JC-102', trainId: 'T-002', task: 'Pantograph inspection', status: 'Completed', assignedTo: 'Priya Singh', createdDate: '2024-07-24' },
  { id: 'JC-103', trainId: 'T-009', task: 'Wheel alignment', status: 'Completed', assignedTo: 'Amit Patel', createdDate: '2024-07-23' },
  { id: 'JC-104', trainId: 'T-006', task: 'Software update', status: 'Completed', assignedTo: 'Anjali Sharma', createdDate: '2024-07-22' },
];

export const initialTrains: Train[] = [
  { id: 'T-001', status: 'Idle', currentTrack: 'SL1' },
  { id: 'T-002', status: 'Idle', currentTrack: 'SL1' },
  { id: 'T-003', status: 'Maintenance', currentTrack: 'ML1' },
  { id: 'T-004', status: 'Idle', currentTrack: 'SL2' },
  { id: 'T-005', status: 'Operational', currentTrack: 'Main-N' },
  { id: 'T-006', status: 'Idle', currentTrack: 'SL3' },
  { id: 'T-007', status: 'Maintenance', currentTrack: 'ML2' },
  { id: 'T-008', status: 'Operational', currentTrack: 'Main-S' },
  { id: 'T-009', status: 'Washing', currentTrack: 'WL1' },
  { id: 'T-010', status: 'Idle', currentTrack: 'SL1' },
  { id: 'T-011', status: 'Idle', currentTrack: 'SL2' },
  { id: 'T-012', status: 'Idle', currentTrack: 'SL2' },
  { id: 'T-013', status: 'Idle', currentTrack: 'SL3' },
  { id: 'T-014', status: 'Maintenance', currentTrack: 'ML1' },
  { id: 'T-015', status: 'Idle', currentTrack: 'SL3' },
  { id: 'T-016', status: 'Washing', currentTrack: 'WL1' },
  { id: 'T-017', status: 'Idle', currentTrack: 'SL1' },
  { id: 'T-018', status: 'Idle', currentTrack: 'SL2' },
  { id: 'T-019', status: 'Maintenance', currentTrack: 'ML2' },
  { id: 'T-020', status: 'Idle', currentTrack: 'SL3' },
  { id: 'T-021', status: 'Operational', currentTrack: 'Main-N' },
  { id: 'T-022', status: 'Idle', currentTrack: 'SL1' },
  { id: 'T-023', status: 'Idle', currentTrack: 'SL2' },
  { id: 'T-024', status: 'Washing', currentTrack: 'WL1' },
  { id: 'T-025', status: 'Idle', currentTrack: 'SL3' },
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
