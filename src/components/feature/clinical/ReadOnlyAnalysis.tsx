import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface AnalysisDisplayProps {
  label: string;
  content: string;
}

const AnalysisDisplay = ({ label, content }: AnalysisDisplayProps) => (
  <div className="space-y-3">
    <h4 className="text-[12px] font-bold text-zinc-900">{label}</h4>
    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
      {content}
    </p>
  </div>
);

export const ReadOnlyAnalysis = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Análisis Clínico del Estudiante</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium">Evaluación y conclusiones presentadas por el estudiante</p>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        <AnalysisDisplay
          label="Impresión Clínica General"
          content="La paciente presenta un cuadro compatible con episodio depresivo mayor de intensidad moderada, con síntomas neurovegetativos prominentes y deterioro funcional significativo."
        />
        <AnalysisDisplay
          label="Síntomas Identificados"
          content="Estado de ánimo deprimido, anhedonia, insomnio de conciliación, fatiga, dificultades de concentración, episodios de llanto, pérdida de interés en actividades placenteras."
        />
        <AnalysisDisplay
          label="Factores de Riesgo Observados"
          content="Evento estresante reciente (ruptura sentimental), ausencia de red de apoyo mencionada, síntomas con duración superior a 2 semanas."
        />
        <AnalysisDisplay
          label="Hipótesis Diagnóstica"
          content="F32.1 - Episodio depresivo moderado (CIE-10). Se recomienda evaluación adicional para descartar trastornos de adaptación y considerar intervención psicoterapéutica."
        />
      </CardContent>
    </Card>
  );
};
