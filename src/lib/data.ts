import type { Kpi, JobCard, Train, DepotLayout } from './types';

export const kpis: Kpi[] = [
  {
    title: 'Fleet Utilization',
    value: '82%',
    change: '+2.5%',
    changeType: 'increase',
    description: 'Compared to last month',
  },
  {
    title: 'On-Time Performance',
    value: '96.3%',
    change: '-0.2%',
    changeType: 'decrease',
    description: 'Compared to last week',
  },
  {
    title: 'Maintenance Backlog',
    value: '14 trains',
    change: '-2',
    changeType: 'decrease',
    description: 'Awaiting scheduled maintenance',
  },
  {
    title: 'Avg. Turnaround Time',
    value: '4.5 hours',
    change: '+15 min',
    changeType: 'increase',
    description: 'From arrival to departure',
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
  { id: 'T-009', status: 'Idle', currentTrack: 'WL1' },
];

export const depotLayout: DepotLayout = {
  tracks: [
    { id: 'SL1', type: 'Stabling', length: 200, trains: ['T-001', 'T-002'] },
    { id: 'SL2', type: 'Stabling', length: 100, trains: ['T-004'] },
    { id: 'SL3', type: 'Stabling', length: 100, trains: ['T-006'] },
    { id: 'ML1', type: 'Maintenance', length: 100, trains: ['T-003'] },
    { id: 'ML2', type: 'Maintenance', length: 100, trains: ['T-007'] },
    { id: 'WL1', type: 'Washing', length: 100, trains: ['T-009'] },
    { id: 'Main-N', type: 'Mainline', length: 300, trains: ['T-005'] },
    { id: 'Main-S', type: 'Mainline', length: 300, trains: ['T-008'] },
  ],
};
