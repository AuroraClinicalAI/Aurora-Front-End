import { Card } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect, useState } from "react";
import type { PatternsData } from "@/services/AnalyticsService";

const PatternBar = ({ label, cases, percentage }: { label: string, cases: number, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-bold">
      <span className="text-zinc-900">{label}</span>
      <span className="text-slate-400">{cases} casos</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
      <div
        className="h-full bg-indigo-300 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="text-right">
      <span className="text-[10px] font-bold text-zinc-900">{percentage}%</span>
    </div>
  </div>
);

export const SymptomPatternsView = () => {
  const { getPatterns, loading } = useAnalytics();
  const [data, setData] = useState<PatternsData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const resp = await getPatterns();
      if (resp) setData(resp);
    };
    fetch();
  }, [getPatterns]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in duration-700">
      <Card className="lg:col-span-2 rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <h4 className="text-sm font-bold text-zinc-900 mb-8 border-b border-zinc-50 pb-4">Patrones Más Frecuentes</h4>
        <div className="space-y-6">
          {data.top_patterns.map((pattern, i) => (
            <PatternBar key={i} label={pattern.label} cases={pattern.cases} percentage={pattern.percentage} />
          ))}
          {data.top_patterns.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">No hay patrones detectados suficientes</p>
          )}
        </div>
      </Card>

      <Card className="lg:col-span-3 rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 flex flex-col">
        <h4 className="text-sm font-bold text-zinc-900 mb-8 border-b border-zinc-50 pb-4">Correlaciones Sintomáticas Sintéticas</h4>
        <div className="flex-grow flex items-center justify-center bg-zinc-50 rounded-xl border border-dashed border-zinc-200 p-8">
          <div className="text-center w-full max-w-sm space-y-6">
            <p className="text-[12px] font-bold text-zinc-900 uppercase tracking-widest">Matriz de correlación Lineal Aproximada</p>
            <div className="space-y-3">
              {Object.entries(data.correlation_matrix).map(([pair, val]) => (
                <div key={pair} className="flex justify-between items-center text-[10px] font-medium p-2 bg-white rounded-md border border-zinc-100">
                  <span className="text-slate-600 font-bold">{pair}</span>
                  <span className="text-indigo-600 font-bold">{val.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
