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
  id: string;
  status: 'Operational' | 'Maintenance' | 'Idle' | 'Washing';
  currentTrack: string;
  mileage: number;
  isElectric: true;
  lat: number;
  lng: number;
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
