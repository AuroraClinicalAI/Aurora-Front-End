import { Card } from "@/components/ui";

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
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <h4 className="text-xl font-bold text-zinc-900 mb-2">Análisis Longitudinal por Cohortes</h4>
        <p className="text-[10px] text-slate-400 font-medium mb-12">Comparación entre diferentes períodos académicos</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CohortCard period="2024-I" cases="1.247" diff="15.2%" />
          <CohortCard period="2024-II" cases="1.247" diff="15.2%" />
          <CohortCard period="2024-I" cases="1.247" diff="15.2%" />
        </div>
      </Card>
    </div>
  );
};
