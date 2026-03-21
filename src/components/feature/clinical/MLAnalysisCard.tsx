import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface AnalysisMetricProps {
  label: string;
  value: string;
  percentage: number;
}

const AnalysisMetric = ({ label, value, percentage }: AnalysisMetricProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[11px] font-bold text-zinc-900">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#7693cc] rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const MLAnalysisCard = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 h-fit mt-8">
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-xl font-bold text-zinc-900">Análisis ML</CardTitle>
        <p className="text-[10px] text-slate-800 font-bold uppercase tracking-wider mt-2">
          Resultados del modelo de diagnóstico
        </p>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-8">
        <div className="space-y-6">
          <AnalysisMetric label="Precisión del Modelo" value="67%" percentage={67} />
          <AnalysisMetric label="Casos Analizados" value="90%" percentage={90} />
          <AnalysisMetric label="Factores Identificados" value="80%" percentage={80} />
        </div>

        <button className="w-full mt-4 py-3 bg-[#7693cc] hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-100 text-[10px] font-bold transition-all uppercase tracking-widest">
          Ver Análisis Completo
        </button>
      </CardContent>
    </Card>
  );
};
