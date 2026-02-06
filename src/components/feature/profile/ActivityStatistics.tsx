import { Users } from "lucide-react";
import { Card } from "@/components/ui";

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <Card className="flex-1 rounded-2xl border border-zinc-100 shadow-sm p-6 bg-white overflow-hidden">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-slate-400">{label}</span>
      <Users className="w-5 h-5 text-zinc-900" />
    </div>
    <span className="text-3xl font-bold text-zinc-900">{value}</span>
  </Card>
);

export const ActivityStatistics = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-zinc-900 mb-1">Estadísticas de Actividad</h3>
      <p className="text-sm text-slate-400 mb-6 font-medium">Resumen de tu impacto en la plataforma desde tu incorporación.</p>

      <div className="flex gap-6 flex-col sm:flex-row">
        <StatCard label="Diagnósticos Realizados" value={24} />
        <StatCard label="Diagnósticos Validados" value={32} />
      </div>
    </div>
  );
};
