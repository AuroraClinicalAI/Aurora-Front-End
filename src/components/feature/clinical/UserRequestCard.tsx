import { Card } from "@/components/ui";
import { Clock, CheckCircle, ShieldAlert, Eye } from "lucide-react";

interface UserRequestCardProps {
  name: string;
  email: string;
  date: string;
  type: 'Bloqueo' | 'Desbloqueo';
  status: 'Pendiente' | 'Activo' | 'Bloqueado';
  reason: string;
}

export const UserRequestCard = ({ name, email, date, type, status, reason }: UserRequestCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'Pendiente': return <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-900 uppercase tracking-widest leading-none"><Clock className="w-3 h-3" /> Pendiente</span>;
      case 'Activo': return <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-900 uppercase tracking-widest leading-none"><CheckCircle className="w-3 h-3" /> Activo</span>;
      case 'Bloqueado': return <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-900 uppercase tracking-widest leading-none"><ShieldAlert className="w-3 h-3" /> Bloqueado</span>;
    }
  };

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 hover:shadow-md transition-all">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-zinc-900">{name}</h4>
            <p className="text-[10px] font-medium text-slate-400">{email}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Metadata */}
        <div className="space-y-3 mb-8 flex-grow">
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Fecha Solicitud:</span>
            <span className="font-bold text-zinc-900">{date}</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-slate-400 uppercase tracking-widest">Tipo:</span>
            <span className="font-bold text-zinc-900">{type}</span>
          </div>
          <div className="space-y-1 pt-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Motivo:</p>
            <p className="text-[10px] font-medium text-zinc-900 leading-relaxed italic">{reason}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 border border-zinc-100 rounded-lg text-zinc-900 text-[10px] font-bold hover:bg-zinc-50 transition-all">
              <Eye className="w-3.5 h-3.5" /> Ver
            </button>
            <button className="flex items-center justify-center gap-2 py-2 bg-black text-white rounded-lg text-[10px] font-bold hover:bg-zinc-800 transition-all">
              <CheckCircle className="w-3.5 h-3.5" /> Activar
            </button>
          </div>
          <button className="w-full py-2 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm shadow-indigo-100">
            Bloquear
          </button>
        </div>
      </div>
    </Card>
  );
};
