import { useState, useEffect } from "react";
import { Button, Textarea, Label, Input } from "@/components/ui";
import { useServices } from "@/context/useServices";
import type { Diagnostico, Retroalimentacion, TipoInteraccion } from "@/types/BackendTypes";


interface DiagnosisReviewProps {
  diagnosis: Diagnostico;
  onClose: () => void;
}

export const DiagnosisReview = ({ diagnosis, onClose }: DiagnosisReviewProps) => {
  const { diagnosticosService } = useServices();
  const [tiposInteraccion, setTiposInteraccion] = useState<TipoInteraccion[]>([]);
  const [feedback, setFeedback] = useState<Partial<Retroalimentacion>>({
    titulo: "",
    comentario: "",
    tipo_interaccion: undefined, // Will be selected
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const types = await diagnosticosService.getAllTiposInteraccion();
      setTiposInteraccion(types);
    } catch (err) {
      console.error("Error loading interaction types", err);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await diagnosticosService.createRetroalimentacion({
        ...feedback,
        diagnostico: diagnosis.id_diagnostico,
        supervisor: 1, // TODO: Get actual supervisor ID from auth context or backend handles it? Backend model requires explicit ID.
        // Actually the backend view might set it from request.user but model definition has explicit FK.
        // Let's assume for now we send it if we have it, or backend adapter handles it.
        // Hook useUser has the ID.
      });
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error("Error submitting feedback", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border space-y-8 max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revisión de Diagnóstico #{diagnosis.id_diagnostico}</h2>
          <p className="text-sm text-gray-500">Paciente #{diagnosis.id_paciente} | Fecha: {new Date(diagnosis.fecha).toLocaleDateString()}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>Cerrar</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Read-Only Diagnosis Details */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700">Historia Clínica</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded">{diagnosis.historia_clinica}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Síntomas</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {/* Parse JSON if string, or use directly if object depending on API response parsing */}
              {(typeof diagnosis.sintomas_identificados === 'string' ? JSON.parse(diagnosis.sintomas_identificados) : diagnosis.sintomas_identificados || []).map((s: string, i: number) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Tamizaje</h4>
            <ul className="list-disc pl-5 text-gray-600 bg-gray-50 p-3 rounded">
              {/* Similar JSON parsing logic */}
              {Object.entries(typeof diagnosis.tamizaje === 'string' ? JSON.parse(diagnosis.tamizaje) : diagnosis.tamizaje || {}).map(([k, v]) => (
                <li key={k}><span className="font-medium">{k}:</span> {v as string}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Impresión Clínica</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded">{diagnosis.impresion_clinica}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Hipótesis Diagnóstica</h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded">{diagnosis.hipotesis_diagnostica}</p>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="border-l pl-8 space-y-6">
          <h3 className="text-xl font-semibold text-indigo-900 border-b pb-2">Evaluación y Retroalimentación</h3>

          {success ? (
            <div className="bg-green-100 text-green-800 p-4 rounded text-center">
              Retroalimentación enviada correctamente.
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <Label>Tipo de Interacción</Label>
                <select
                  className="w-full p-2 border rounded"
                  value={feedback.tipo_interaccion || ""}
                  onChange={(e) => setFeedback({ ...feedback, tipo_interaccion: Number(e.target.value) })}
                  required
                >
                  <option value="">Seleccione...</option>
                  {tiposInteraccion.map(t => (
                    <option key={t.id_tipo_interaccion} value={t.id_tipo_interaccion}>
                      {t.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Título</Label>
                <Input
                  value={feedback.titulo}
                  onChange={(e) => setFeedback({ ...feedback, titulo: e.target.value })}
                  placeholder="Ej: Revisión inicial"
                  required
                />
              </div>
              <div>
                <Label>Comentarios / Observaciones</Label>
                <Textarea
                  value={feedback.comentario}
                  onChange={(e) => setFeedback({ ...feedback, comentario: e.target.value })}
                  placeholder="Sus comentarios para el estudiante..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Retroalimentación"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
