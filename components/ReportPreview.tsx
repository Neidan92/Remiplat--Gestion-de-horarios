import React from 'react';
import { DailyPlan, Staff, Vehicle, VehicleAssignment } from '../types';
import { Truck, Clock, Users, Building2, Car } from 'lucide-react';

interface Props {
  plan: DailyPlan;
  id?: string;
  staffList: Staff[];
  vehicleList: Vehicle[];
}

// Formatting helper
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return "Miércoles, 24 de Diciembre de 2025"; 
};

export const ReportPreview: React.FC<Props> = ({ plan, id, staffList, vehicleList }) => {
  const getStaff = (staffId: string | null): Staff | undefined => staffList.find(s => s.id === staffId);
  const getVehicle = (vId: string): Vehicle | undefined => vehicleList.find(v => v.id === vId);

  return (
    <div id={id} className="w-[1000px] bg-gray-100 mx-auto min-h-screen pb-10">
      {/* Header Container */}
      <div className="bg-brand-700 text-white p-6 rounded-b-xl shadow-lg mb-6 mx-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-brand-200 mb-1">Planificación Diaria</h2>
            <h1 className="text-4xl font-display font-bold capitalize mb-4">
              {formatDate(plan.date)}
            </h1>
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter leading-none">REMIPLAT</h3>
                <p className="text-[10px] tracking-widest text-brand-200 uppercase">Logiflow System</p>
              </div>
            </div>
          </div>
          <div className="text-right">
             <div className="inline-block bg-black/20 px-4 py-2 rounded-lg border border-white/10">
                <p className="text-xs font-medium text-brand-100 uppercase">Personal de Repartos y Depósito</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 space-y-6">
        
        {/* SECTION 1: TRUCKS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-700" />
            <h3 className="text-brand-800 font-bold uppercase text-sm tracking-wide">Asignación de Camiones</h3>
          </div>
          
          <div className="p-4 grid gap-4">
            {plan.truckAssignments.map((assign) => {
              const vehicle = getVehicle(assign.vehicleId);
              const driver = getStaff(assign.driverId);
              
              const isLoaded = assign.status === 'CARGADO' || assign.note.toLowerCase().includes('cargado');
              const noteBg = isLoaded ? 'bg-blue-50 border-blue-100 text-blue-800' : 'bg-amber-50 border-amber-100 text-amber-900';
              
              return (
                <div key={assign.id} className="flex border border-gray-200 rounded-lg overflow-hidden h-32">
                  <div className="w-24 bg-gray-50 border-r border-gray-200 flex flex-col justify-center items-center p-2 shrink-0">
                    <span className="font-display text-3xl font-bold text-slate-700">{vehicle?.name}</span>
                    <div className="mt-2 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs font-mono font-bold text-gray-600">{assign.time}</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-1 p-3 grid grid-cols-2 gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12 text-right">Chofer</div>
                        <div className="font-semibold text-slate-800 truncate">{driver?.name || 'SIN ASIGNAR'}</div>
                      </div>

                      <div className="flex flex-col justify-center gap-1">
                         {assign.crewIds.length > 0 ? (
                           assign.crewIds.map(cid => {
                             const crew = getStaff(cid);
                             return (
                               <div key={cid} className="flex items-center gap-3">
                                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12 text-right">Reparto</div>
                                 <div className="text-sm text-slate-600 truncate">{crew?.name}</div>
                               </div>
                             );
                           })
                         ) : (
                           <div className="flex items-center gap-3 opacity-50">
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-12 text-right">Reparto</div>
                              <div className="text-sm text-slate-400 italic">Sin acompañantes</div>
                           </div>
                         )}
                      </div>
                    </div>

                    <div className={`px-4 py-1.5 border-t border-opacity-50 text-xs font-bold uppercase flex items-center gap-2 ${noteBg}`}>
                      <span className={`w-2 h-2 rounded-full ${isLoaded ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                      {assign.note}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: DEPOT */}
        {plan.depotAssignments.map(depot => (
          <div key={depot.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-700" />
                <h3 className="text-brand-800 font-bold uppercase text-sm tracking-wide">{depot.locationName}</h3>
              </div>
              <div className="flex">
                <div className="w-32 bg-gray-50 border-r border-gray-200 flex flex-col justify-center items-center p-4">
                   <Users className="w-8 h-8 text-gray-400 mb-2" />
                   <span className="font-bold text-gray-700">EQUIPO</span>
                   <span className="text-xs bg-gray-200 px-2 py-0.5 rounded mt-1 font-mono">{depot.time}</span>
                </div>
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-3 gap-y-2 gap-x-8">
                    {depot.staffIds.map(sid => {
                      const staff = getStaff(sid);
                      return (
                        <div key={sid} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-slate-700">{staff?.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
          </div>
        ))}

        {/* SECTION 3: CARS */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <Car className="w-5 h-5 text-brand-700" />
            <h3 className="text-brand-800 font-bold uppercase text-sm tracking-wide">Autos Auxiliares</h3>
          </div>
          <div className="divide-y divide-gray-100">
             {plan.carAssignments.map(assign => {
               const vehicle = getVehicle(assign.vehicleId);
               const driver = getStaff(assign.driverId);
               return (
                 <div key={assign.id} className="flex">
                   <div className="w-32 bg-gray-50/50 p-4 flex flex-col justify-center border-r border-gray-100">
                      <span className="font-bold text-lg text-slate-700">{vehicle?.name}</span>
                   </div>
                   <div className="flex-1 p-3 grid grid-cols-12 gap-4">
                      <div className="col-span-8">
                         <div className="flex gap-2">
                           <span className="text-[10px] font-bold text-gray-400 uppercase mt-1 w-16">Personal:</span>
                           <div className="space-y-0.5">
                              <div className="text-sm font-bold text-slate-800">{driver?.name} <span className="text-xs font-normal text-gray-400">(Chofer)</span></div>
                              {assign.crewIds.map(pid => (
                                <div key={pid} className="text-sm text-slate-600">{getStaff(pid)?.name}</div>
                              ))}
                           </div>
                         </div>
                      </div>
                      <div className="col-span-4 flex items-end justify-end">
                         <div className="bg-orange-50 border border-orange-100 text-orange-800 px-3 py-1.5 rounded text-xs font-bold uppercase">
                            {assign.note}
                         </div>
                      </div>
                   </div>
                 </div>
               )
             })}
          </div>
        </div>

        <div className="text-center text-[10px] text-gray-400 pt-4 pb-2">
          LogiFlow © 2025 - Reporte generado el 24/12/2025 a las 18:30
        </div>
      </div>
    </div>
  );
};