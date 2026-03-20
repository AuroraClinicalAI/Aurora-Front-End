import { Card } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useState } from "react";
import type { CohortData } from "@/services/AnalyticsService";

const CohortCard = ({ period, cases, diff }: { period: string, cases: string, diff: string }) => (
  <Card className="rounded-xl border border-zinc-100 p-6 flex flex-col items-center justify-center space-y-4 hover:shadow-md transition-all">
    <div className="space-y-1 text-center">
      <h5 className="text-lg font-bold text-zinc-900">{period}</h5>
      <p className="text-2xl font-bold text-zinc-900">{cases}</p>
    </div>
    <div className="space-y-0.5 text-center">
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">N-Riesgo IP.2%</p>
      <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">vs Anterior {diff}</p>
    </div>
  </Card>
);

export const CohortComparisonView = () => {
  const { getCohorts, loading } = useAnalytics();
  const [data, setData] = useState<CohortData[] | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const resp = await getCohorts();
      if (resp) setData(resp);
    };
    fetch();
  }, [getCohorts]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <h4 className="text-xl font-bold text-zinc-900 mb-2">Análisis Longitudinal por Cohortes</h4>
        <p className="text-[10px] text-slate-400 font-medium mb-12">Comparación mensual entre diferentes períodos generacionales</p>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {data.map((cohort, i) => (
            <CohortCard key={i} period={cohort.period} cases={cohort.cases.toString()} diff={cohort.diff} />
          ))}
          {data.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-slate-400">
              Aún no hay suficientes cortes transversales de casos
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
