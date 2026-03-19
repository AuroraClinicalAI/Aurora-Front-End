import { useState, useEffect } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { CaseCard } from "@/components/feature/clinical/CaseCard";
import { Search, Plus, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/context/useServices";
import type { Diagnostico } from "@/types/BackendTypes";

export const CaseManagement = () => {
  const navigate = useNavigate();
  const { diagnosticosService } = useServices();
  const [cases, setCases] = useState<Diagnostico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await diagnosticosService.getAllDiagnosticos();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [diagnosticosService]);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id_paciente.toString().includes(searchTerm);
    const matchesStatus = filterStatus === "Todos" || (typeof c.estado === "object" && 'nombre' in c.estado ? c.estado.nombre : c.estado) === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-zinc-900">Historial de Casos</h1>
              <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">Gestión y Seguimiento de Diagnósticos Clínicos</p>
            </div>
            <button
              onClick={() => navigate("/clinical-diagnostic")}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-300 hover:bg-indigo-400 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100"
            >
              <Plus className="w-4 h-4" /> Nuevo Diagnóstico
            </button>
          </div>

          {/* Filters Area */}
          <div className="bg-white border border-zinc-100 rounded-[2rem] p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre de caso o ID de paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all bg-slate-50/50"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative min-w-[180px]">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 text-sm font-medium text-slate-600 bg-slate-50/50 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Todos">Todos los estados</option>
                  <option value="Registrada">Registradas</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Clasificada">Clasificadas</option>
                  <option value="Archivada">Archivada</option>
                  <option value="Rechazada">Rechazada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              <p className="text-slate-500 font-medium">Cargando historial de casos...</p>
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((c) => (
                <CaseCard
                  key={c.id_diagnostico}
                  caseData={c}
                  onView={(id) => navigate(`/clinical-diagnostic?id=${id}`)}
                  onMachineView={(id) => navigate(`/case-analysis?id=${id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-dashed border-zinc-200 rounded-[2.5rem] py-24 px-8 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <ClipboardList className="w-10 h-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-zinc-900">No se encontraron casos</h3>
                  <p className="text-sm text-slate-500">
                    No hay registros que coincidan con tu búsqueda o filtros actuales. Intenta ajustar los criterios.
                  </p>
                </div>
                <button
                  onClick={() => { setSearchTerm(""); setFilterStatus("Todos"); }}
                  className="text-indigo-600 font-bold text-sm hover:underline"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            </div>
          )}

          {/* Academic Disclaimer */}
          <div className="mt-20 bg-white border border-zinc-100 rounded-xl p-4">
            <p className="text-[10px] text-zinc-900 leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

// Helper for empty icon
const ClipboardList = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);
