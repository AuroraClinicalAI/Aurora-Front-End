import { RefreshCw, BarChart2, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Clasificacion } from "@/types/BackendTypes";

interface ModelResultMiniCardProps {
  clasificacion?: Clasificacion;
  onReprocess?: () => void;
  onViewDetails?: () => void;
  isLoading?: boolean;
}

export const ModelResultMiniCard = ({
  clasificacion,
  onReprocess,
  onViewDetails,
  isLoading
}: ModelResultMiniCardProps) => {
  if (isLoading && !clasificacion) {
    return (
      <Card className="rounded-2xl border-indigo-100 shadow-sm bg-white overflow-hidden p-8 flex flex-col items-center justify-center min-h-[300px] animate-pulse">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
        <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest text-center">Procesando Análisis...</p>
        <p className="text-[8px] text-slate-400 font-medium text-center mt-2 px-4 leading-relaxed">El sistema está utilizando inteligencia artificial para identificar patrones y síntomas.</p>
      </Card>
    );
  }

  if (!clasificacion) return null;
  const probability = (Number(clasificacion.probabilidad_certeza) * 100).toFixed(0);
  const symptomsArray = Array.isArray(clasificacion.ml_sintomas_identificados) ? clasificacion.ml_sintomas_identificados : [];
  const dsm5 = (clasificacion.ml_dsm5_evaluacion as Record<string, any>) || {};

  const getIntensityWidth = (intensity?: string) => {
    if (intensity === "Severo") return 100;
    if (intensity === "Moderado") return 66;
    if (intensity === "Leve") return 33;
    return 0;
  };

  return (
    <Card className={`rounded-2xl border-indigo-100 shadow-sm bg-white overflow-hidden p-8 relative ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center flex-col gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full shadow-sm">Actualizando...</span>
        </div>
      )}
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-sm font-bold text-zinc-900">Resultados del Modelo {clasificacion.modelo_usado}</CardTitle>
        <p className="text-[8px] text-slate-400 font-medium uppercase tracking-widest mt-1 italic">Análisis y sugerencias del sistema</p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-[#637bc4] text-white rounded-xl p-6 text-center shadow-lg shadow-indigo-100/50 mb-6 transition-all transform hover:scale-[1.02]">
          <h4 className="text-sm font-bold tracking-widest uppercase">{Number(probability) > 70 ? 'Alto Riesgo' : 'Evaluación Regular'}</h4>
          <p className="text-[9px] font-medium opacity-80 mt-1">Nivel de depresión detectado por la IA: {probability}%</p>
        </div>

        <div className="space-y-4">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest text-center">Síntomas y su Intensidad</h5>
          <div className="space-y-3">
            {symptomsArray.map((sym: any, i: number) => {
              const label = sym.symptom.replace(/_/g, " ");
              const width = getIntensityWidth(sym.intensity);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[9px] font-bold text-zinc-900 uppercase">
                    <span>{label}</span>
                    <span>{sym.intensity || 'Detectado'}</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-50 space-y-3">
          <div className="p-4 rounded-xl border border-zinc-100 flex flex-col items-center text-center mb-2">
            <span className="text-[9px] text-zinc-400 font-bold mb-1">Diagnóstico Sugerido</span>
            <span className="text-[10px] text-zinc-900 font-bold">{dsm5.meets_criterion_a || dsm5.meets_criteria ? 'Cumple Criterios Mayores de Depresión' : 'No cumple Criterios de manera concluyente'}</span>
          </div>

          <button
            onClick={onViewDetails}
            className="group w-full py-2.5 bg-zinc-900 text-white rounded-lg text-[9px] font-bold transition-all hover:bg-zinc-800 uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Ver Análisis de Caso
          </button>

          <button
            onClick={onReprocess}
            className="w-full py-2.5 bg-white border border-zinc-200 text-zinc-500 rounded-lg text-[9px] font-bold transition-all hover:border-zinc-300 hover:text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            Reprocesar Análisis
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
