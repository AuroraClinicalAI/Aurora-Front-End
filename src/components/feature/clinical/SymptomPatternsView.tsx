import { Card } from "@/components/ui";

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-in fade-in duration-700">
      {/* Most Frequent Patterns */}
      <Card className="lg:col-span-2 rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <h4 className="text-sm font-bold text-zinc-900 mb-8 border-b border-zinc-50 pb-4">Patrones Más Frecuentes</h4>
        <div className="space-y-6">
          <PatternBar label="Ansiedad + Depresión" cases={967} percentage={34} />
          <PatternBar label="Estrés Académico" cases={867} percentage={28} />
          <PatternBar label="Depresión Leve" cases={758} percentage={22} />
          <PatternBar label="Ansiedad Social" cases={456} percentage={16} />
        </div>
      </Card>

      {/* Correlation Matrix */}
      <Card className="lg:col-span-3 rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 flex flex-col">
        <h4 className="text-sm font-bold text-zinc-900 mb-8 border-b border-zinc-50 pb-4">Correlaciones Sintomáticas</h4>
        <div className="flex-grow flex items-center justify-center bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
          <div className="text-center space-y-4">
            <p className="text-[12px] font-bold text-zinc-900 uppercase tracking-widest">Matriz de correlación</p>
            <p className="text-[10px] font-medium text-slate-500 space-y-2">
              Depresión - Ansiedad: 0.73<br />
              Estrés - Ansiedad: 0.68<br />
              Depresión - Estrés: 0.61
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
