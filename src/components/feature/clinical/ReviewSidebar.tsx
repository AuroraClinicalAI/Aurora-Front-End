import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Eye } from "lucide-react";

const GuidedReviewComment = ({ question }: { question: string }) => (
  <div className="p-4 rounded-xl border border-zinc-50 hover:bg-zinc-50 transition-all flex gap-3">
    <Eye className="w-4 h-4 text-zinc-900 mt-0.5" />
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{question}</p>
  </div>
);

export const ReviewSidebar = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* ML Summary Card */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 text-center">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-xl font-bold text-zinc-900">Análisis De Machine Learning</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-6">
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
            <p className="text-[10px] text-zinc-900 font-medium leading-relaxed">
              <span className="font-bold">Coincidencia:</span> El análisis del estudiante coincide en un 82% con la predicción del modelo.
            </p>
          </div>
          <div className="space-y-3">
            <button className="w-full py-2 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all">Ver Análisis</button>
            <p className="text-[9px] text-indigo-400 font-bold cursor-pointer hover:underline">Ver Comparación de Modelos</p>
          </div>
          <button className="w-full py-2 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all">Generar Informe PDF</button>
        </CardContent>
      </Card>

      {/* Guided Comments */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-md font-bold text-zinc-900 text-center">Comentarios Guiados</CardTitle>
          <p className="text-[8px] text-indigo-400 font-bold text-center uppercase mt-1">Preguntas para reflexión académica</p>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          <GuidedReviewComment question="¿El estudiante identificó que los síntomas persisten por más de 2 semanas?" />
          <GuidedReviewComment question="¿Cómo se relacionaron los síntomas identificados con los criterios del DSM-5?" />
          <GuidedReviewComment question="¿Se consideró el diagnóstico diferencial correspondiente a este cuadro?" />
          <GuidedReviewComment question="¿Qué tan acertada fue la evaluación de riesgo suicida?" />
        </CardContent>
      </Card>

      {/* Supervisor Feedback Form */}
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-md font-bold text-zinc-900 text-center">Retroalimentación del Supervisor</CardTitle>
          <p className="text-[8px] text-indigo-400 font-bold text-center uppercase mt-1">Preguntas para reflexión académica</p>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">TÍTULO DE LA RETROALIMENTACIÓN</label>
            <input type="text" placeholder="Ingrese el título de la Retroalimentación Aquí" className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400" />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">COMENTARIOS DETALLADOS</label>
            <textarea
              placeholder="Proporcione retroalimentación específica sobre el análisis del estudiante, fortalezas identificadas y áreas de mejora"
              className="w-full h-32 p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 resize-none leading-relaxed"
            />
          </div>

          <button className="w-full py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100">
            Guardar Retroalimentación
          </button>
        </CardContent>
      </Card>

      {/* Review Actions */}
      <div className="space-y-4 pt-4 border-t border-zinc-100">
        <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Acciones de Revisión</h4>
        <div className="space-y-3">
          <button className="w-full py-3 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-100">
            Aprobar Caso
          </button>
          <button className="w-full py-3 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-50">
            Solicitar Revisión
          </button>
        </div>
      </div>
    </div>
  );
};
