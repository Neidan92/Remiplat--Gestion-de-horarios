import React, { useRef, useState, useEffect } from 'react';
import { MOCK_PLAN, STAFF_DB, VEHICLES_DB } from './constants';
import { ReportPreview } from './components/ReportPreview';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Share2, 
  Settings, 
  LayoutDashboard, 
  Users, 
  Truck as TruckIcon, 
  Plus, 
  Search,
  Pencil,
  X
} from 'lucide-react';
import { StaffRole, ResourceType, Staff, Vehicle } from './types';

type View = 'planning' | 'config';

export default function App() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<View>('planning');
  const [isExporting, setIsExporting] = useState(false);
  const [configTab, setConfigTab] = useState<'staff' | 'fleet'>('staff');
  
  // Dynamic lists
  const [staffList, setStaffList] = useState<Staff[]>(STAFF_DB);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>(VEHICLES_DB);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Staff | Vehicle | null>(null);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<StaffRole>(StaffRole.HELPER);
  const [newVehicleType, setNewVehicleType] = useState<ResourceType>(ResourceType.TRUCK);

  // Synchronize form fields when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setNewName(editingItem.name);
      if ('role' in editingItem) {
        setNewRole(editingItem.role);
      } else {
        setNewVehicleType(editingItem.type);
      }
    } else {
      setNewName('');
      setNewRole(StaffRole.HELPER);
      setNewVehicleType(ResourceType.TRUCK);
    }
  }, [editingItem]);

  const handleExport = async () => {
    if (reportRef.current === null) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 100));
      const dataUrl = await toPng(reportRef.current, { 
        cacheBust: true,
        backgroundColor: '#f3f4f6',
        quality: 1.0,
        pixelRatio: 2,
        filter: (node) => {
          const tagName = (node as HTMLElement).tagName;
          return tagName !== 'SCRIPT' && tagName !== 'LINK';
        }
      });
      const link = document.createElement('a');
      link.download = `planificacion-remiplat-${MOCK_PLAN.date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert('Hubo un error al generar la imagen.');
    } finally {
      setIsExporting(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    if (configTab === 'staff') {
      if (editingItem && 'role' in editingItem) {
        setStaffList(prev => prev.map(s => s.id === editingItem.id ? { 
          ...s, 
          name: newName, 
          role: newRole, 
          initials: getInitials(newName) 
        } : s));
      } else {
        const newStaff: Staff = {
          id: Math.random().toString(36).substr(2, 9),
          name: newName,
          role: newRole,
          initials: getInitials(newName)
        };
        setStaffList(prev => [...prev, newStaff]);
      }
    } else {
      if (editingItem && 'type' in editingItem) {
        setVehicleList(prev => prev.map(v => v.id === editingItem.id ? { 
          ...v, 
          name: newName, 
          type: newVehicleType 
        } : v));
      } else {
        const newVehicle: Vehicle = {
          id: Math.random().toString(36).substr(2, 9),
          name: newName,
          type: newVehicleType
        };
        setVehicleList(prev => [...prev, newVehicle]);
      }
    }

    // Reset and Close
    setEditingItem(null);
    setShowAddModal(false);
  };

  const openEditModal = (item: Staff | Vehicle) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const renderConfigView = () => (
    <div className="max-w-6xl mx-auto w-full p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Configuración del Sistema</h1>
        <p className="text-slate-400">Gestiona los recursos de la empresa para la planificación diaria.</p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-slate-800 pb-px">
        <button 
          onClick={() => setConfigTab('staff')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative ${
            configTab === 'staff' ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users size={18} />
          Personal
          {configTab === 'staff' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 shadow-[0_0_8px_rgba(230,63,102,0.5)]" />}
        </button>
        <button 
          onClick={() => setConfigTab('fleet')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all relative ${
            configTab === 'fleet' ? 'text-brand-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TruckIcon size={18} />
          Flota de Vehículos
          {configTab === 'fleet' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 shadow-[0_0_8px_rgba(230,63,102,0.5)]" />}
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
           <input 
             type="text" 
             placeholder="Buscar..." 
             className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-brand-500 transition-colors"
           />
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
        >
          <Plus size={16} />
          Agregar {configTab === 'staff' ? 'Personal' : 'Vehículo'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configTab === 'staff' ? (
          staffList.map(person => (
            <div 
              key={person.id} 
              onClick={() => openEditModal(person)}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-600 cursor-pointer transition-all group active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-brand-400 font-bold">
                  {person.initials}
                </div>
                <div>
                  <h4 className="text-white font-medium">{person.name}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{person.role}</span>
                </div>
              </div>
              <Pencil className="text-slate-700 group-hover:text-brand-400 transition-colors" size={16} />
            </div>
          ))
        ) : (
          vehicleList.map(vehicle => (
            <div 
              key={vehicle.id} 
              onClick={() => openEditModal(vehicle)}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-600 cursor-pointer transition-all group active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-brand-400">
                  {vehicle.type === ResourceType.TRUCK ? <TruckIcon size={20} /> : <Users size={20} />}
                </div>
                <div>
                  <h4 className="text-white font-bold font-display text-lg">{vehicle.name}</h4>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{vehicle.type}</span>
                </div>
              </div>
              <Pencil className="text-slate-700 group-hover:text-brand-400 transition-colors" size={16} />
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col fixed h-full z-30">
        <div className="p-6 flex items-center gap-3">
           <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
             <span className="font-display font-bold text-lg text-white">L</span>
           </div>
           <span className="font-display font-bold text-xl hidden lg:block tracking-tight">LogiFlow</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setCurrentView('planning')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              currentView === 'planning' ? 'bg-brand-900/20 text-brand-400 border border-brand-900/50' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
             <LayoutDashboard size={20} />
             <span className="hidden lg:block font-medium">Planificación</span>
          </button>
          <button 
            onClick={() => setCurrentView('config')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
              currentView === 'config' ? 'bg-brand-900/20 text-brand-400 border border-brand-900/50' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
             <Settings size={20} />
             <span className="hidden lg:block font-medium">Configuración</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900 mt-auto">
           <div className="bg-slate-900/50 rounded-lg p-3 hidden lg:block">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Usuario</p>
              <p className="text-sm font-medium text-slate-300">Admin Remiplat</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 relative overflow-hidden flex flex-col">
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
             <h2 className="text-white font-medium">
               {currentView === 'planning' ? 'Vista Previa del Reporte' : 'Panel de Control'}
             </h2>
           </div>
           
           <div className="flex items-center gap-3">
             {currentView === 'planning' && (
               <>
                 <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors border border-slate-700">
                   <Share2 size={16} />
                   Compartir
                 </button>
                 <button 
                   onClick={handleExport}
                   disabled={isExporting}
                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-lg shadow-lg shadow-brand-900/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                   <Download size={16} />
                   {isExporting ? 'Generando...' : 'Exportar Imagen'}
                 </button>
               </>
             )}
           </div>
        </header>

        <div className="flex-1 overflow-auto bg-slate-900 flex justify-center custom-scrollbar">
           {currentView === 'planning' ? (
             <div className="p-8">
               <div ref={reportRef} className="origin-top scale-[0.85] xl:scale-100 transition-transform duration-300">
                  <ReportPreview 
                    plan={MOCK_PLAN} 
                    staffList={staffList} 
                    vehicleList={vehicleList} 
                  />
               </div>
             </div>
           ) : (
             renderConfigView()
           )}
        </div>
      </main>

      {/* MODAL AGREGAR / EDITAR */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-display font-bold text-white">
                  {editingItem ? 'Editar' : 'Agregar'} {configTab === 'staff' ? 'Personal' : 'Vehículo'}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
             </div>
             <form onSubmit={handleSaveItem} className="p-6 space-y-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre / Identificador</label>
                   <input 
                      autoFocus
                      required
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={configTab === 'staff' ? "Ej. Juan Perez" : "Ej. C42"}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-brand-500 outline-none"
                   />
                </div>

                {configTab === 'staff' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Rol</label>
                    <select 
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as StaffRole)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-brand-500 outline-none appearance-none"
                    >
                      {Object.values(StaffRole).map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tipo</label>
                    <select 
                      value={newVehicleType}
                      onChange={(e) => setNewVehicleType(e.target.value as ResourceType)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-brand-500 outline-none appearance-none"
                    >
                      <option value={ResourceType.TRUCK}>Camión</option>
                      <option value={ResourceType.CAR}>Auto de Traslado</option>
                    </select>
                  </div>
                )}

                <div className="pt-4">
                   <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-brand-900/40">
                      {editingItem ? 'Guardar Cambios' : `Guardar ${configTab === 'staff' ? 'Empleado' : 'Vehículo'}`}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}