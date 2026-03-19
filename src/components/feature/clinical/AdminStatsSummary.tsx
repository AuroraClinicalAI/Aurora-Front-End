import { useEffect } from "react";
import { Card } from "@/components/ui";
import { Users, CheckCircle, LogOut, Clock, Loader2 } from "lucide-react";
import { useAdminStats } from "@/hooks/useAdminStats";

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
  const { stats, getAdminStats, loading } = useAdminStats();

  useEffect(() => {
    getAdminStats();
  }, [getAdminStats]);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 flex items-center justify-center h-28">
            <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
          </Card>
        ))}
      </div>
    );
  }

  const porcentajeBloqueados = stats.total_usuarios > 0
    ? Math.round((stats.usuarios_bloqueados / stats.total_usuarios) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <AdminStatCard
        label="Total Usuarios"
        value={String(stats.total_usuarios)}
        icon={<Users className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Usuarios Activos"
        value={String(stats.usuarios_activos)}
        icon={<CheckCircle className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Usuarios Bloqueados"
        value={String(stats.usuarios_bloqueados)}
        subtext={`${porcentajeBloqueados}% del Total`}
        icon={<LogOut className="w-5 h-5" />}
      />
      <AdminStatCard
        label="Solicitudes Pendientes"
        value={String(stats.solicitudes_pendientes)}
        icon={<Clock className="w-5 h-5" />}
      />
    </div>
  );
};
