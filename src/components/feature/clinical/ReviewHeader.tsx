import { Card } from "@/components/ui";
import { User, Calendar, FileText } from "lucide-react";
import type { Diagnostico } from "@/types/BackendTypes";

interface ReviewHeaderProps {
  diagnosis: Diagnostico | null;
}

export const ReviewHeader = ({ diagnosis }: ReviewHeaderProps) => {
  const caseNumber = diagnosis?.id_diagnostico ? `#${new Date(diagnosis.fecha).getFullYear()}-${String(diagnosis.id_diagnostico).padStart(3, '0')}` : "#----";
  const statusLabel = typeof diagnosis?.estado === 'object' ? diagnosis.estado.nombre : "Pendiente Revisión";
  const practitionerName = diagnosis?.practicante?.nombre || "Cargando...";
  const sendDate = diagnosis?.fecha ? new Date(diagnosis.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : "---";
  const caseId = diagnosis?.id_diagnostico ? `PH${String(diagnosis.id_diagnostico).padStart(4, '0')}` : "---";

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-zinc-900">Revisión del Caso Clínico {caseNumber}</h2>
            <span className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{statusLabel}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
            Sistema de Práctica para Casos Simulados · Evaluación Supervisada
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <User className="w-5 h-5 text-[#637bc4]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estudiante</p>
            <p className="text-[11px] font-bold text-zinc-900">{practitionerName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <Calendar className="w-5 h-5 text-[#637bc4]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Envío</p>
            <p className="text-[11px] font-bold text-zinc-900">{sendDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <FileText className="w-5 h-5 text-[#637bc4]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Caso ID</p>
            <p className="text-[11px] font-bold text-zinc-900">{caseId}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
