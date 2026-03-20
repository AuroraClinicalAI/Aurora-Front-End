import { Card } from "@/components/ui";
import { Users, Target, Activity, HeartPulse } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useState } from "react";
import type { ResearchSummary } from "@/services/AnalyticsService";

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  color?: string;
}

const StatCard = ({ label, value, subtext, icon, color = "indigo-400" }: StatCardProps) => (
  <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
      </div>
      <div className={`p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-${color}`}>
        {icon}
      </div>
    </div>
    <p className="text-[9px] font-bold text-green-500 uppercase tracking-tight">{subtext}</p>
  </Card>
);

export const ResearchStatsSummary = () => {
  const { getSummary, loading } = useAnalytics();
  const [summary, setSummary] = useState<ResearchSummary | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getSummary();
      setSummary(data);
    };
    fetchStats();
  }, [getSummary]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        label="Total Casos"
        value={loading ? "..." : (summary ? summary.total_cases.toString() : "0")}
        subtext="Casos anonimizados totales"
        icon={<Users className="w-5 h-5" />}
      />
      <StatCard
        label="Precisión del Modelo"
        value={loading ? "..." : (summary ? `${(summary.model_accuracy * 100).toFixed(1)}%` : "0%")}
        subtext="Evaluación Cross-Validation"
        icon={<Target className="w-5 h-5" />}
      />
      <StatCard
        label="Casos de Riesgo"
        value={loading ? "..." : (summary ? summary.risk_cases.toString() : "0")}
        subtext="Etiquetados severidad alta"
        icon={<Activity className="w-5 h-5" />}
        color="zinc-900"
      />
      <StatCard
        label="F1 Score"
        value={loading ? "..." : (summary ? summary.f1_score.toFixed(3) : "0")}
        subtext="Balance de métricas"
        icon={<HeartPulse className="w-5 h-5" />}
      />
    </div>
  );
};
