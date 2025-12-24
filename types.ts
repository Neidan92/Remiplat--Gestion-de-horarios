export enum ResourceType {
  TRUCK = 'TRUCK',
  CAR = 'CAR',
  DEPOT = 'DEPOT'
}

export enum StaffRole {
  DRIVER = 'CHOFER',
  HELPER = 'REPARTO', // Acompañante
  DEPOT_WORKER = 'DEPOSITO',
  PASSENGER = 'PASAJERO'
}

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  initials: string;
}

export interface Vehicle {
  id: string;
  name: string; // e.g., "VW", "C83", "Auto 1"
  type: ResourceType;
  capacity?: string;
}

// The core "Row" in the planning report
export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  driverId: string | null;
  crewIds: string[]; // Can be Helpers (for trucks) or Passengers (for cars)
  time: string; // "06:00", "04:00"
  note: string; // Crucial: "Carga en San Jose..."
  status?: 'CARGADO' | 'VACIO' | null; // Mostly for trucks
  isAuxiliary?: boolean; // To separate Section 1 (Trucks) from Section 3 (Cars)
}

// Section 2: Depot Planning
export interface DepotAssignment {
  id: string;
  locationName: string; // "Depósito S.J."
  time: string;
  staffIds: string[];
}

export interface DailyPlan {
  date: string; // ISO Date
  truckAssignments: VehicleAssignment[];
  carAssignments: VehicleAssignment[];
  depotAssignments: DepotAssignment[];
}