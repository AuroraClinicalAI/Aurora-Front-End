import { Card } from "@/components/ui";

const MetricBar = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-bold text-zinc-900">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-400 rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const ModelEvaluationView = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Metrics */}
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
          <h4 className="text-sm font-bold text-zinc-900 mb-8">Métricas del Modelo: [Nombre del Modelo]</h4>
          <div className="space-y-6">
            <MetricBar label="Precisión (Precision)" percentage={87.2} />
            <MetricBar label="Recall" percentage={82.1} />
            <MetricBar label="F1 Score" percentage={84.6} />
            <MetricBar label="Sensibilidad" percentage={85.9} />
          </div>
        </Card>

        {/* Hyperparameters */}
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
          <h4 className="text-sm font-bold text-zinc-900 mb-8">Ajuste de Hiperparámetros</h4>
          <p className="text-[10px] text-slate-400 font-medium mb-8">Configuración para nuevos experimentos</p>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-zinc-900">
                <span>Tasa de Aprendizaje: 0.001</span>
              </div>
              <div className="h-1 bg-indigo-400 rounded-full w-[60%]" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">BATCH SIZE</label>
              <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white">
                <option>Seleccionar una Opción</option>
                <option>32</option>
                <option>64</option>
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-zinc-900">
                <span>Épocas: 100</span>
              </div>
              <div className="h-1 bg-indigo-400 rounded-full w-[80%]" />
            </div>

            <button className="w-full py-2.5 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100 uppercase tracking-widest">
              Crear Nuevo Experimento
            </button>
          </div>
        </Card>
      </div>

      {/* History */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <h4 className="text-xl font-bold text-zinc-900 mb-8">Historial de Experimentos</h4>
        <div className="space-y-4">
          {[
            { id: 1, name: "Depression v2.1", date: "2024-01-15", f1: "0.846", precision: "0.873", status: "Completado" },
            { id: 2, name: "Depression v2.1", date: "2024-01-15", f1: "0.841", precision: "0.873", status: "Completado" },
            { id: 3, name: "Depression v2.1", date: "2024-01-15", f1: "0.846", precision: "0.873", status: "En Progreso" }
          ].map((exp) => (
            <div key={exp.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-zinc-50 hover:bg-zinc-50 transition-all gap-4">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-slate-400">{exp.id}</span>
                <div className="space-y-1">
                  <p className="text-[12px] font-bold text-zinc-900">{exp.name}</p>
                  <p className="text-[9px] text-slate-400 font-medium">{exp.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[9px] font-bold text-zinc-900 uppercase">F1: {exp.f1}</p>
                  <p className="text-[8px] text-slate-400 font-medium">Precision: {exp.precision}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${exp.status === 'En Progreso' ? 'border-zinc-100 text-zinc-400' : 'bg-black text-white border-black'}`}>
                  {exp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
