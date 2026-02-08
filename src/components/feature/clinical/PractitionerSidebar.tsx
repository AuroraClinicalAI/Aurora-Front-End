import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Eye } from "lucide-react";
import { ModelResultMiniCard } from "./ModelResultMiniCard";
import { AnalysisComparison } from "./AnalysisComparison";
import { SupervisorFeedback } from "./SupervisorFeedback";

interface GuidedCommentProps {
  question: string;
}

const GuidedComment = ({ question }: GuidedCommentProps) => (
  <div className="p-4 rounded-xl border border-zinc-50 hover:bg-zinc-50 transition-all flex gap-3">
    <Eye className="w-4 h-4 text-zinc-900 mt-0.5" />
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{question}</p>
  </div>
);

interface PractitionerSidebarProps {
  phase: 'input' | 'results';
  onExecute: () => void;
}

export const PractitionerSidebar = ({ phase, onExecute }: PractitionerSidebarProps) => {
  if (phase === 'results') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
        <ModelResultMiniCard />
        <AnalysisComparison />
        <SupervisorFeedback />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Phase 1: Input Controls */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <CardHeader className="p-0 mb-6 text-center">
          <CardTitle className="text-md font-bold text-zinc-900">Acciones</CardTitle>
          <p className="text-[8px] text-slate-400 font-medium uppercase tracking-widest mt-1 italic leading-relaxed">Este caso se guardará automáticamente al momento de ejecutar el análisis de Machine Learning</p>
        </CardHeader>

        <CardContent className="p-0 space-y-8">
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-zinc-900 text-center uppercase tracking-widest leading-loose">ANÁLISIS DE MACHINE LEARNING</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-900 uppercase tracking-wider">SELECCIONAR MODELO</label>
                <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
                  <option>Seleccionar una Opción</option>
                  <option>Random Forest (Recomendado)</option>
                  <option>Neural Network</option>
                </select>
              </div>

              <div className="bg-yellow-50/50 border border-yellow-100 rounded-lg p-3">
                <p className="text-[9px] font-medium text-zinc-800 leading-relaxed">
                  <span className="font-bold">💡 Recomendación:</span> Random Forest ofrece el mejor equilibrio entre precisión y velocidad para casos generales.
                </p>
              </div>

              <button
                onClick={onExecute}
                className="w-full py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100 active:scale-95"
              >
                Ejecutar Análisis
              </button>
              <p className="text-[9px] text-indigo-400 font-bold text-center cursor-pointer hover:underline">Ver Comparación de Modelos</p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-100">
            <button className="w-full py-2.5 bg-[#7693cc] hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100">
              Generar Informe PDF
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Guided Questions */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-md font-bold text-zinc-900 text-center">Comentarios Guiados</CardTitle>
          <p className="text-[8px] text-indigo-400 font-bold text-center uppercase mt-1">Preguntas para reflexionar sobre el caso</p>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <GuidedComment question="¿Qué síntomas observas que son más prominentes en este caso?" />
          <GuidedComment question="¿Cómo se relacionan los criterios identificados con los criterios de la CIE-11?" />
          <GuidedComment question="¿Qué factores de riesgo podrían estar contribuyendo a este cuadro?" />
          <GuidedComment question="¿Qué aspectos del caso requieren mayor exploración?" />
        </CardContent>
      </Card>
    </div>
  );
};
