import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import type { Clasificacion, SintomaIdentificado } from "@/types/BackendTypes";

interface AnalysisComparisonProps {
  clasificacion?: Clasificacion;
  userSymptoms?: SintomaIdentificado[];
}

export const AnalysisComparison = ({ clasificacion, userSymptoms = [] }: AnalysisComparisonProps) => {
  if (!clasificacion) return null;
  const sysProbability = (Number(clasificacion.probabilidad_certeza) * 100).toFixed(0);
  const mlSymptoms = clasificacion.ml_sintomas_identificados as Record<string, number> || {};

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
            <p className="text-[10px] font-bold text-zinc-900">En Evaluación</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50/50 border border-zinc-100">
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Gravedad del Sistema</p>
            <p className="text-[10px] font-bold text-indigo-400">{Number(sysProbability) > 70 ? 'Alto Riesgo' : 'Evaluación Regular'}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">Tus Síntomas Identificados</h5>
          <div className="w-full p-3 rounded-xl border border-dashed border-zinc-200 text-[10px] font-medium text-slate-500 flex flex-wrap gap-2">
            {userSymptoms.length > 0 ? userSymptoms.map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-zinc-100 rounded-md text-zinc-600">{s.name}</span>
            )) : 'Ninguno registrado'}
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">Síntomas Identificados Por Machine Learning</h5>
          <div className="flex flex-wrap gap-2">
            {Object.keys(mlSymptoms).map((lbl, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[9px] font-bold text-zinc-400">{lbl}</span>
            ))}
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
