import { Card } from "@/components/ui";
import { Search, Filter, CheckCircle, Clock, XCircle, Eye, Check } from "lucide-react";

interface ReportCardProps {
  id: string;
  caseId: string;
  type: string;
  format: string;
  integrity: string;
  size: string;
  date: string;
  status: 'Activo' | 'Pendiente' | 'Rechazado';
}

const ReportCard = ({ id, caseId, type, format, integrity, size, date, status }: ReportCardProps) => (
  <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-2">
      <div className="space-y-1">
        <h4 className="text-xl font-bold text-zinc-900">{id}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Caso: {caseId}</p>
      </div>
      <span className={`flex items-center gap-1.5 px-3 py-1 border rounded-full text-[9px] font-bold uppercase tracking-widest leading-none ${status === 'Activo' ? 'bg-zinc-50 border-zinc-100 text-zinc-900' :
          status === 'Pendiente' ? 'bg-zinc-50 border-zinc-100 text-zinc-900' : 'bg-zinc-50 border-zinc-100 text-zinc-900'
        }`}>
        {status === 'Activo' && <Check className="w-3 h-3" />}
        {status === 'Pendiente' && <Clock className="w-3 h-3" />}
        {status === 'Rechazado' && <XCircle className="w-3 h-3" />}
        {status}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 mb-8">
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tipo:</p>
        <p className="text-[10px] font-medium text-zinc-900">{type}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Formato:</p>
        <p className="text-[10px] font-medium text-zinc-900">{format}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Integridad:</p>
        <p className="text-[10px] font-medium text-zinc-900">{integrity}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tamaño:</p>
        <p className="text-[10px] font-medium text-zinc-900">{size}</p>
      </div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fecha:</p>
        <p className="text-[10px] font-medium text-zinc-900">{date}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-4 border-t border-zinc-50 pt-6">
      <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-900 hover:bg-zinc-50 transition-all">
        <Eye className="w-3.5 h-3.5" /> Ver Estructura
      </button>
      {status === 'Pendiente' && (
        <>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-900 hover:bg-zinc-50 transition-all">
            <CheckCircle className="w-3.5 h-3.5" /> Aprobar Formato
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-900 hover:bg-zinc-50 transition-all">
            <XCircle className="w-3.5 h-3.5" /> Rechazar
          </button>
        </>
      )}
    </div>
  </Card>
);

export const ReportValidationView = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Filters */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <div className="flex items-center gap-2 mb-8">
          <Filter className="w-4 h-4 text-zinc-900" />
          <h3 className="text-xl font-bold text-zinc-900">Filtros de Análisis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">BUSCAR</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="ID de Reporte o Paciente" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-100" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">ESTADO</label>
            <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white">
              <option>Todos los Estados</option>
              <option>Activo</option>
              <option>Pendiente</option>
              <option>Rechazado</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">TIPO DE EVALUACIÓN</label>
            <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white">
              <option>Todos los Tipos</option>
              <option>Análisis de Viñeta</option>
              <option>Evaluación PHQ-9</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-900" />
          <h3 className="text-xl font-bold text-zinc-900">Reportes para Validación</h3>
          <span className="ml-2 text-[10px] text-slate-400 font-bold uppercase">3 reportes encontrados</span>
        </div>

        <div className="space-y-6">
          <ReportCard
            id="RPT-001"
            caseId="PAT-2024-001"
            type="Análisis de Viñeta"
            format="Válido"
            integrity="Completo"
            size="2.4 KB"
            date="2024-01-15"
            status="Activo"
          />
          <ReportCard
            id="RPT-002"
            caseId="PAT-2024-002"
            type="Evaluación PHQ-9"
            format="Advertencia"
            integrity="Incompleto"
            size="1.8 KB"
            date="2024-01-14"
            status="Pendiente"
          />
          <ReportCard
            id="RPT-003"
            caseId="PAT-2024-003"
            type="Evaluación PHQ-9"
            format="Advertencia"
            integrity="Incompleto"
            size="3.2 KB"
            date="2024-01-13"
            status="Rechazado"
          />
        </div>
      </div>
    </div>
  );
};
