import { Card } from "@/components/ui";
import { Users, CheckCircle, LogOut, Clock } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: string;
  subtext?: string;
  icon: React.ReactNode;
}

const AdminStatCard = ({ label, value, subtext, icon }: AdminStatCardProps) => (
  <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
      </div>
      <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-900">
        {icon}
      </div>
    </div>
    {subtext && (
      <p className="text-[9px] font-bold text-green-500 uppercase tracking-tight">{subtext}</p>
    )}
  </Card>
);

export const AdminStatsSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <AdminStatCard
        label="Total Usuarios"
        value="5"
        icon={<Users className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Usuarios Activos"
        value="2"
        icon={<CheckCircle className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Usuarios Bloqueados"
        value="1"
        subtext="20% del Total"
        icon={<LogOut className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Solicitudes Pendientes"
        value="2"
        icon={<Clock className="w-5 h-5" />}
      />
    </div>
  );
};
