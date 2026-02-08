import { Card, CardHeader, CardTitle } from "@/components/ui";
import { Search } from "lucide-react";

export const PopulationAnalysisView = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 min-h-[300px] flex flex-col">
          <h4 className="text-sm font-bold text-zinc-900 mb-8">Tendencias Por Grupo Etario</h4>
          <div className="flex-grow flex items-center justify-center bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center px-10">Gráfico de tendencias por edad<br />Depresión, Ansiedad, Estrés</p>
          </div>
        </Card>

        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 min-h-[300px] flex flex-col">
          <h4 className="text-sm font-bold text-zinc-900 mb-8">Distribución Por Sexo</h4>
          <div className="flex-grow flex items-center justify-center bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center px-10">Gráfico de Pastel Sobre<br />Distribución demográfica</p>
          </div>
        </Card>
      </div>

      {/* Anonymized Cases Table */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-2xl font-bold text-zinc-900">Casos Anonimizados - Vista de Investigación</CardTitle>
          <p className="text-[10px] text-slate-400 font-medium">Acceso completo a casos agregados sin información identificable</p>
        </CardHeader>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por ID anónimo o grupo..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-50">
                <th className="pb-4 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">ID Anónimo</th>
                <th className="pb-4 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Grupo Etario</th>
                <th className="pb-4 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Sexo</th>
                <th className="pb-4 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Puntaje Depresión</th>
                <th className="pb-4 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Clasificación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {[
                { id: "ANX_001", age: "Adolescente", sex: "F", score: 18, class: "Moderado" },
                { id: "ANX_002", age: "Mayor", sex: "M", score: 12, class: "Leve" },
                { id: "ANX_003", age: "Adulto", sex: "F", score: 25, class: "Severo" },
                { id: "ANX_004", age: "Infante", sex: "M", score: 9, class: "Normal" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 text-[10px] font-bold text-zinc-900">{row.id}</td>
                  <td className="py-4 text-[10px] font-medium text-slate-500">{row.age}</td>
                  <td className="py-4 text-[10px] font-medium text-slate-500">{row.sex}</td>
                  <td className="py-4 text-[10px] font-bold text-zinc-900">{row.score}</td>
                  <td className="py-4 text-[10px] font-bold text-zinc-900">{row.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
