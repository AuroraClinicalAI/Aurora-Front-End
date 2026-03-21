import { Users } from "lucide-react";
import { Card } from "@/components/ui";

interface MetricItemProps {
  label: string;
  value: string | number;
}

const MetricItem = ({ label, value }: MetricItemProps) => (
  <Card className="flex-1 rounded-2xl border border-zinc-100 shadow-sm p-6 bg-white overflow-hidden min-w-[200px]">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-slate-400">{label}</span>
      <Users className="w-5 h-5 text-zinc-900" />
    </div>
    <span className="text-3xl font-bold text-zinc-900">{value}</span>
  </Card>
);

export const ActivityMetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      <MetricItem label="Total de Actividades" value="50" />
      <MetricItem label="Completadas" value="17" />
      <MetricItem label="En Revisión" value="17" />
      <MetricItem label="Este Mes" value="3" />
    </div>
  );
};
