import { Staff, Vehicle, StaffRole, ResourceType, DailyPlan } from './types';

export const STAFF_DB: Staff[] = [
  { id: '1', name: 'Gonzalo Yaurrechy', role: StaffRole.DRIVER, initials: 'GY' },
  { id: '2', name: 'Walberto Martiniano', role: StaffRole.HELPER, initials: 'WM' },
  { id: '3', name: 'Christian Montero', role: StaffRole.HELPER, initials: 'CM' },
  { id: '4', name: 'Adrian Suarez', role: StaffRole.DRIVER, initials: 'AS' },
  { id: '5', name: 'Oscar Conrad', role: StaffRole.DRIVER, initials: 'OC' },
  { id: '6', name: 'Diego Yanes', role: StaffRole.DRIVER, initials: 'DY' },
  { id: '7', name: 'Fabian Graña', role: StaffRole.HELPER, initials: 'FG' },
  { id: '8', name: 'Dario Chiribao', role: StaffRole.DRIVER, initials: 'DC' },
  { id: '9', name: 'Agustin Rial', role: StaffRole.DRIVER, initials: 'AR' },
  { id: '10', name: 'Alexis Andino', role: StaffRole.DRIVER, initials: 'AA' },
  { id: '11', name: 'Marcos Gandra', role: StaffRole.DRIVER, initials: 'MG' },
  { id: '12', name: 'Franco Choca', role: StaffRole.HELPER, initials: 'FC' },
  // Depot Staff
  { id: '20', name: 'Agustin Guerra', role: StaffRole.DEPOT_WORKER, initials: 'AG' },
  { id: '21', name: 'Juan Gastesi', role: StaffRole.DEPOT_WORKER, initials: 'JG' },
  { id: '22', name: 'Nelson Fernandez', role: StaffRole.DEPOT_WORKER, initials: 'NF' },
  { id: '23', name: 'Raul Gasco', role: StaffRole.DEPOT_WORKER, initials: 'RG' },
  { id: '24', name: 'Mauricio Arce', role: StaffRole.DEPOT_WORKER, initials: 'MA' },
  { id: '25', name: 'Gaston Morosini', role: StaffRole.DEPOT_WORKER, initials: 'GM' },
  { id: '26', name: 'Facundo Mederos', role: StaffRole.DEPOT_WORKER, initials: 'FM' },
  { id: '27', name: 'Jhonatan Suarez', role: StaffRole.DEPOT_WORKER, initials: 'JS' },
  { id: '28', name: 'Cesar Sagasta', role: StaffRole.DEPOT_WORKER, initials: 'CS' },
  // Car Staff
  { id: '40', name: 'Facundo Mederos', role: StaffRole.DRIVER, initials: 'FM' }, // Driver for Auto 1
  { id: '41', name: 'Cristian Vidal', role: StaffRole.DRIVER, initials: 'CV' },
  { id: '42', name: 'Jorge Montaldo', role: StaffRole.DRIVER, initials: 'JM' },
  { id: '43', name: 'Sebastian Motiño', role: StaffRole.PASSENGER, initials: 'SM' },
  { id: '44', name: 'Vanessa Recalde', role: StaffRole.PASSENGER, initials: 'VR' },
  { id: '45', name: 'Cristina Furtado', role: StaffRole.PASSENGER, initials: 'CF' },
  { id: '46', name: 'Dogomar Curbelo', role: StaffRole.PASSENGER, initials: 'DC' },
];

export const VEHICLES_DB: Vehicle[] = [
  { id: 'v1', name: 'VW', type: ResourceType.TRUCK },
  { id: 'v2', name: 'C83', type: ResourceType.TRUCK },
  { id: 'v3', name: 'C05', type: ResourceType.TRUCK },
  { id: 'v4', name: 'C02', type: ResourceType.TRUCK },
  { id: 'v5', name: 'C19', type: ResourceType.TRUCK },
  { id: 'v6', name: 'C38', type: ResourceType.TRUCK },
  { id: 'v7', name: 'JAC', type: ResourceType.TRUCK },
  { id: 'v8', name: 'VW SAN JOSE', type: ResourceType.TRUCK },
  { id: 'c1', name: 'AUTO 1', type: ResourceType.CAR },
  { id: 'c2', name: 'AUTO 2', type: ResourceType.CAR },
  { id: 'c3', name: 'AUTO 3', type: ResourceType.CAR },
];

export const MOCK_PLAN: DailyPlan = {
  date: '2025-12-24',
  truckAssignments: [
    {
      id: 'a1', vehicleId: 'v1', driverId: '1', crewIds: ['2', '3'], time: '06:00',
      note: 'CARGA EN SAN JOSE - SALE 5:15 PARA S.J', status: null
    },
    {
      id: 'a2', vehicleId: 'v2', driverId: '4', crewIds: [], time: '06:00',
      note: 'SALE DESDE SAYAGO CARGADO', status: 'CARGADO'
    },
    {
      id: 'a3', vehicleId: 'v3', driverId: '5', crewIds: [], time: '06:00',
      note: 'CARGA EN SAN JOSE - SALE 5:15 PARA S.J', status: null
    },
    {
      id: 'a4', vehicleId: 'v4', driverId: '6', crewIds: ['7'], time: '04:00',
      note: 'SALE DESDE SAYAGO CARGADO', status: 'CARGADO'
    },
    {
      id: 'a5', vehicleId: 'v5', driverId: '8', crewIds: [], time: '06:00',
      note: 'CARGA EN SAN JOSE - SALE 5:15 DESDE SAYAGO', status: null
    },
    {
      id: 'a6', vehicleId: 'v6', driverId: '9', crewIds: [], time: '05:00',
      note: 'SALE DESDE SAYAGO CARGADO', status: 'CARGADO'
    },
    {
      id: 'a7', vehicleId: 'v7', driverId: '10', crewIds: [], time: '06:00',
      note: 'CARGA EN SAN JOSE - SALE 5:15 DESDE SAYAGO', status: null
    },
    {
      id: 'a8', vehicleId: 'v8', driverId: '11', crewIds: ['12'], time: '06:00',
      note: 'CARGADO', status: 'CARGADO'
    },
  ],
  depotAssignments: [
    {
      id: 'd1', locationName: 'DEPÓSITO SAN JOSÉ', time: '06:00',
      staffIds: ['20', '21', '22', '23', '24', '25', '26', '27', '28']
    }
  ],
  carAssignments: [
    {
      id: 't1', vehicleId: 'c1', driverId: '40', crewIds: ['27', '21'], time: '05:15',
      note: 'SALEN 5:15 DE SAYAGO', isAuxiliary: true
    },
    {
      id: 't2', vehicleId: 'c2', driverId: '41', crewIds: ['43', '44', '45', '46'], time: '08:15',
      note: 'SALEN 8:15 DE SAYAGO', isAuxiliary: true
    },
    {
      id: 't3', vehicleId: 'c3', driverId: '42', crewIds: ['22', '23'], time: '05:15',
      note: 'SALEN 5:15 DE SAYAGO', isAuxiliary: true
    }
  ]
};