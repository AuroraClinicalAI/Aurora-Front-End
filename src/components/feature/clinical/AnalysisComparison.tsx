import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const AnalysisComparison = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-sm font-bold text-zinc-900">Comparación: Tu Análisis Vs El Sistema</CardTitle>
        <p className="text-[9px] text-slate-400 font-medium">Reflexiona sobre las diferencias y aciertos.</p>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-zinc-50/50 border border-zinc-100">
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Tu Gravedad De Caso</p>
            <p className="text-[10px] font-bold text-zinc-900">Moderado</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50/50 border border-zinc-100">
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Gravedad del Sistema</p>
            <p className="text-[10px] font-bold text-indigo-400">Moderado</p>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">Tus Síntomas Identificados</h5>
          <div className="w-full p-3 rounded-xl border border-dashed border-zinc-200 text-[10px] font-medium text-slate-400">
            Lista de Síntomas Identificados
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">Síntomas Identificados Por Machine Learning</h5>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[9px] font-bold text-zinc-400">Estado de Ánimo Deprimido</span>
            <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[9px] font-bold text-zinc-400">Pérdida De Interés</span>
            <span className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[9px] font-bold text-zinc-400">Dificultad Concentración</span>
          </div>
        </div>

        <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-4 flex gap-3">
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center border border-indigo-100 text-[8px] font-bold text-indigo-400 mt-1 italic">i</div>
          <p className="text-[9px] font-medium text-slate-500 leading-relaxed italic">
            <span className="font-bold">Reflexión:</span> ¿Qué similitudes y diferencias encuentras entre tu análisis y el del sistema? ¿Qué aspectos de las escalas de tamizaje fueron clave?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
