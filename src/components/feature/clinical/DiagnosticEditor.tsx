import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const DiagnosticEditor = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Editor de Diagnóstico</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-10">
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">DIAGNÓSTICO PRINCIPAL</label>
          <select className="w-full md:w-1/2 p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 bg-white">
            <option>Seleccionar una Opción</option>
            <option>Episodio Depresivo Leve</option>
            <option>Episodio Depresivo Moderado</option>
            <option>Trastorno de Ansiedad Generalizada</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">NOTAS CLÍNICAS</label>
          <textarea
            placeholder="Justificación del diagnóstico, observaciones clínicas adicionales..."
            className="w-full h-32 p-4 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">RECOMENDACIONES DE TRATAMIENTO</label>
          <textarea
            placeholder="Plan de Tratamiento, Intervenciones Recomendadas..."
            className="w-full h-32 p-4 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
          />
        </div>
      </CardContent>
    </Card>
  );
};
