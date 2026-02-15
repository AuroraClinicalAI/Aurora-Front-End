import { Card } from "@/components/ui";
import { Users, Target, Youtube, HeartPulse } from "lucide-react";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        label="Total Casos"
        value="2.847"
        subtext="+12% vs mes anterior"
        icon={<Users className="w-5 h-5" />}
      />
      <StatCard
        label="Precisión del Modelo"
        value="2.847"
        subtext="+3.1% optimización"
        icon={<Target className="w-5 h-5" />}
      />
      <StatCard
        label="Casos de Riesgo"
        value="342"
        subtext="12% del Total"
        icon={<Youtube className="w-5 h-5" />} // Changed to AlertTriangle if available or similar
        color="zinc-900"
      />
      <StatCard
        label="F1 Score"
        value="0.84"
        subtext="Excelente balance"
        icon={<HeartPulse className="w-5 h-5" />}
      />
    </div>
  );
};
