import { Card } from "@/components/ui";
import { Search, Filter, CheckCircle, Clock, XCircle, Check, Loader2 } from "lucide-react";
import { useReportVerification } from "@/hooks";

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
      <span className={`flex items-center gap-1.5 px-3 py-1 border rounded-full text-[9px] font-bold uppercase tracking-widest leading-none bg-zinc-50 border-zinc-100 text-zinc-900'
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
  </Card>
);

export const ReportValidationView = () => {
  const { verifyReports, loading, error, result, reports, loadingReports } = useReportVerification();

  const handleVerify = async () => {
    try {
      await verifyReports();
    } catch {
      // hook handles state
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Verification Action Card */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-900">Validación de Motor de Reportes</h3>
          <p className="text-xs text-slate-400 mt-1">Lanza un diagnóstico en memoria para probar la integridad de iteración PDF del backend</p>
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="px-6 py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
          Verificar Integridad
        </button>
      </Card>

      {error && (
        <Card className="rounded-2xl bg-red-50 border border-red-100 p-6 flex flex-col items-center justify-center animate-in fade-in">
          <XCircle className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-sm font-bold text-red-700">{error}</p>
        </Card>
      )}

      {result && (
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h4 className="text-lg font-bold text-zinc-900">Validación Exitosa</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 p-6 rounded-xl border border-zinc-100">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado General</p>
              <p className="text-sm font-bold text-zinc-900">{result.message}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Peso Verificado (Bytes)</p>
              <p className="text-sm font-bold text-indigo-600">{result.pdf_bytes.toLocaleString()} bytes</p>
            </div>
          </div>
        </Card>
      )}

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
          <h3 className="text-xl font-bold text-zinc-900">Reportes Históricos</h3>
          <span className="ml-2 text-[10px] text-slate-400 font-bold uppercase">{reports.length} reportes encontrados</span>
        </div>

        <div className="space-y-6">
          {loadingReports ? (
            <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>
          ) : (
            reports.map((r) => (
              <ReportCard
                key={r.id_reporte}
                id={`RPT-${String(r.id_reporte).padStart(3, '0')}`}
                caseId={`USR-${r.autor}`}
                type={r.nombre_reporte || "Desconocido"}
                format={r.ruta_archivo.endsWith('.pdf') ? 'PDF' : r.ruta_archivo.split('.').pop()?.toUpperCase() || 'DAT'}
                integrity={r.descripcion ? 'Completo' : 'Incompleto'}
                size="N/A"
                date={new Date(r.fecha_creacion).toLocaleString()}
                status="Activo"
              />
            ))
          )}
          {reports.length === 0 && !loadingReports && (
            <p className="text-sm text-zinc-500 bg-white p-8 rounded-xl border border-zinc-100 text-center">No hay reportes generados en el sistema.</p>
          )}
        </div>
      </div>
    </div>
  );
};
