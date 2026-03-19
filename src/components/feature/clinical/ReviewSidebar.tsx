import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Eye, Loader2, Edit3 } from "lucide-react";
import type { Clasificacion, Retroalimentacion } from "@/types/BackendTypes";

const GuidedReviewComment = ({ question }: { question: string }) => (
  <div className="p-4 rounded-xl border border-zinc-50 hover:bg-zinc-50 transition-all flex gap-3">
    <Eye className="w-4 h-4 text-zinc-900 mt-0.5" />
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{question}</p>
  </div>
);

interface ReviewSidebarProps {
  clasificacion: Clasificacion | null;
  retroalimentaciones?: Retroalimentacion[];
  userId?: number;
  onSaveFeedback: (title: string, comment: string, feedbackId?: number) => Promise<void>;
  onApprove?: () => void;
  onReject?: () => void;
  onReport?: () => void;
  onViewDetails?: () => void;
  onDownloadPDF?: () => void;
  onViewModelComparison?: () => void;
  currentStatusId?: number | null;
  loading?: boolean;
}

export const ReviewSidebar = ({
  clasificacion,
  retroalimentaciones = [],
  userId,
  onSaveFeedback,
  onApprove,
  onReject,
  onReport,
  onViewDetails,
  onDownloadPDF,
  onViewModelComparison,
  currentStatusId,
  loading
}: ReviewSidebarProps) => {
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFeedbackId, setEditingFeedbackId] = useState<number | undefined>();

  const myFeedback = retroalimentaciones.find(f => f.supervisor === userId);
  const otherFeedbacks = retroalimentaciones.filter(f => f.supervisor !== userId);

  const handleAction = (action: (() => void) | undefined, actionId: number) => {
    if (!action) return;

    if (currentStatusId && currentStatusId !== actionId) {
      const confirmChange = window.confirm(
        "Este caso ya tiene una revisión realizada. ¿Está seguro que desea alterar la revisión actual?"
      );
      if (!confirmChange) return;
    }

    action();
  };

  const handleSaveFeedback = async () => {
    if (!feedbackTitle || !feedbackComment) {
      alert("Por favor complete el título y el comentario de la retroalimentación.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSaveFeedback(feedbackTitle, feedbackComment, editingFeedbackId || myFeedback?.id);
      setFeedbackTitle("");
      setFeedbackComment("");
      setEditingFeedbackId(undefined);
      alert("Retroalimentación guardada exitosamente.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMyFeedback = () => {
    if (myFeedback) {
      setFeedbackTitle(myFeedback.titulo);
      setFeedbackComment(myFeedback.comentario);
      setEditingFeedbackId(myFeedback.id);
    }
  };

  const certainty = clasificacion ? Math.round((clasificacion.probabilidad_certeza as number) * 100) : null;

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
              <span className="font-bold">Coincidencia:</span> {certainty !== null ? `El análisis de IA tiene un ${certainty}% de certeza.` : "Análisis de IA no disponible todavía."}
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={onViewDetails}
              className="w-full py-2 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all">Ver Análisis</button>
            <p
              onClick={onViewModelComparison}
              className="text-[9px] text-indigo-400 font-bold text-center cursor-pointer hover:underline"
            >
              Ver Comparación de Modelos
            </p>
          </div>
          <button
            onClick={onDownloadPDF}
            className="w-full py-2 bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg text-[10px] font-bold transition-all">Generar Informe PDF</button>
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
            <input
              type="text"
              placeholder="Ingrese el título de la Retroalimentación Aquí"
              className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest">COMENTARIOS DETALLADOS</label>
            <textarea
              placeholder="Proporcione retroalimentación específica sobre el análisis del estudiante, fortalezas identificadas y áreas de mejora"
              className="w-full h-32 p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 resize-none leading-relaxed"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
          </div>

          <button
            onClick={handleSaveFeedback}
            disabled={isSubmitting}
            className="w-full py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2">
            {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
            {isSubmitting ? "Guardando..." : (editingFeedbackId || myFeedback ? "Actualizar Retroalimentación" : "Guardar Retroalimentación")}
          </button>
        </CardContent>
      </Card>

      {/* Existing Feedbacks Section */}
      {(myFeedback || otherFeedbacks.length > 0) && (
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest px-2">Comentarios Recibidos</h4>

          {myFeedback && (
            <Card className="rounded-2xl border-indigo-100 shadow-sm bg-indigo-50/30 overflow-hidden p-6 border-l-4 border-l-indigo-400">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-indigo-600 uppercase">Tu Retroalimentación</p>
                  <h5 className="text-xs font-bold text-zinc-900">{myFeedback.titulo}</h5>
                </div>
                {!editingFeedbackId && (
                  <button
                    onClick={handleEditMyFeedback}
                    className="p-1.5 hover:bg-indigo-100 rounded-md transition-all text-indigo-600"
                    title="Editar mi retroalimentación"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed italic">"{myFeedback.comentario}"</p>
              <p className="text-[8px] text-slate-400 mt-2 font-medium uppercase tracking-tighter">
                {new Date(myFeedback.fecha).toLocaleDateString()}
              </p>
            </Card>
          )}

          {otherFeedbacks.map((f) => (
            <Card key={f.id} className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6">
              <div className="space-y-1 mb-3">
                <p className="text-[10px] font-bold text-zinc-500 uppercase">{f.supervisor_nombre || "Supervisor"}</p>
                <h5 className="text-xs font-bold text-zinc-900">{f.titulo}</h5>
              </div>
              <p className="text-[10px] text-slate-600 leading-relaxed">"{f.comentario}"</p>
              <p className="text-[8px] text-slate-400 mt-2 font-medium uppercase tracking-tighter">
                {new Date(f.fecha).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Review Actions */}
      <div className="space-y-4 pt-4 border-t border-zinc-100">
        <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-widest">Acciones de Revisión</h4>
        <div className="space-y-3">
          <button
            onClick={() => handleAction(onApprove, 8)}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-xs font-bold transition-all shadow-md disabled:opacity-50 ${currentStatusId === 8
              ? "bg-green-500 hover:bg-green-600 text-white ring-2 ring-green-100"
              : "bg-[#637bc4] hover:bg-indigo-500 text-white shadow-indigo-100"
              }`}>
            {currentStatusId === 8 ? "Caso Aprobado" : "Aprobar Caso"}
          </button>
          <button
            onClick={() => handleAction(onReject, 18)}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-xs font-bold transition-all shadow-md disabled:opacity-50 ${currentStatusId === 18
              ? "bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-100"
              : "bg-indigo-300 hover:bg-indigo-400 text-white shadow-indigo-50"
              }`}>
            {currentStatusId === 18 ? "Caso Rechazado" : "Rechazar Caso"}
          </button>
          <button
            onClick={() => handleAction(onReport, 9)}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-xs font-bold transition-all shadow-md mt-4 disabled:opacity-50 ${currentStatusId === 9
              ? "bg-red-600 hover:bg-red-700 text-white ring-2 ring-red-100"
              : "bg-red-400 hover:bg-red-500 text-white shadow-indigo-50"
              }`}>
            {currentStatusId === 9 ? "Caso Reportado" : "Reportar Caso"}
          </button>
        </div>
      </div>
    </div>
  );
};
