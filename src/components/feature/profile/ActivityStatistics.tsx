import { Users, FileText, CheckCircle, Clock, BarChart3, Calendar } from "lucide-react";
import { Card } from "@/components/ui";
import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => (
  <Card className="rounded-2xl border border-zinc-100 shadow-sm p-6 bg-white overflow-hidden hover:shadow-md transition-shadow">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
        {icon}
      </div>
    </div>
    <span className="text-2xl font-bold text-zinc-900">{value}</span>
  </Card>
);

export const ActivityStatistics = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-zinc-900 mb-1">Estadísticas de Actividad</h3>
      <p className="text-sm text-slate-500 mb-6 font-light leading-relaxed">Resumen detallado de tu desempeño y contribución en la plataforma.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Diagnósticos Totales" value={24} icon={<FileText className="w-4 h-4" />} />
        <StatCard label="Casos Validados" value={18} icon={<CheckCircle className="w-4 h-4" />} />
        <StatCard label="Casos Pendientes" value={6} icon={<Clock className="w-4 h-4" />} />
        <StatCard label="Tasa de Certeza" value="92%" icon={<BarChart3 className="w-4 h-4" />} />
        <StatCard label="Colaboraciones" value={12} icon={<Users className="w-4 h-4" />} />
        <StatCard label="Última Actividad" value="Hoy" icon={<Calendar className="w-4 h-4" />} />
      </div>
    </div>
  );
};
