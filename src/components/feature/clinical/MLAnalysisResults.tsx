import { Check, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface SymptomIntensityProps {
  label: string;
  intensity: number;
  highlight?: boolean;
}

const SymptomIntensity = ({ label, intensity, highlight }: SymptomIntensityProps) => (
  <div className="flex items-center justify-between gap-8 py-2">
    <div className="flex items-center gap-3 min-w-[180px]">
      {highlight ? (
        <AlertTriangle className="w-4 h-4 text-zinc-900" />
      ) : (
        <Check className="w-4 h-4 text-zinc-900" />
      )}
      <span className="text-[11px] font-bold text-zinc-900">{label}</span>
    </div>
    <div className="flex-grow flex items-center gap-4">
      <div className="h-1.5 w-full bg-indigo-50/50 rounded-full overflow-hidden border border-indigo-100/30">
        <div
          className="h-full bg-indigo-400 rounded-full"
          style={{ width: `${intensity}%` }}
        />
      </div>
      <span className="text-[9px] font-bold text-slate-300 w-8">{intensity}%</span>
    </div>
  </div>
);

export const MLAnalysisResults = () => {
  return (
    <Card className="rounded-2xl border-indigo-100/50 shadow-sm bg-white overflow-hidden p-8 mt-8 border-2">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-zinc-900">Análisis de Machine Learning</CardTitle>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        {/* Main Progression */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-900">
            <span>Nivel de Depresión</span>
            <span>75%</span>
          </div>
          <div className="h-2 w-full bg-indigo-50 rounded-full overflow-hidden border border-indigo-100">
            <div className="h-full bg-indigo-400 rounded-full w-[75%]" />
          </div>
        </div>

        {/* Symptoms Intensity List */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest mb-3">SÍNTOMAS DETECTADOS POR INTENSIDAD</h4>
          <SymptomIntensity label="Anhedonia" intensity={85} />
          <SymptomIntensity label="Fatiga Persistente" intensity={80} />
          <SymptomIntensity label="Alteraciones del Sueño" intensity={65} />
          <SymptomIntensity label="Dificultades de Concentración" intensity={70} />
          <SymptomIntensity label="Sentimientos de Culpa" intensity={50} highlight />
        </div>

        {/* Comparison Box */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 space-y-3">
          <h5 className="text-[10px] font-bold text-zinc-900 flex justify-between">
            Comparación con Criterios CIE-11
          </h5>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold">Criterio Sugerido:</p>
              <p className="text-[10px] text-zinc-900 font-bold">6A70 Episodio depresivo único</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold">Coincidencia:</p>
              <p className="text-[11px] text-zinc-900 font-bold">82%</p>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-[#637bc4] hover:bg-zinc-800 text-white rounded-lg shadow-lg shadow-indigo-100 text-[10px] font-bold transition-all uppercase tracking-widest">
          Ver Detalles de Análisis de Machine Learning
        </button>
      </CardContent>
    </Card>
  );
};
