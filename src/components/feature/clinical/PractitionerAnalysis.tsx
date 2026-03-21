import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { SymptomSelector } from "./SymptomSelector";
import type { SintomaIdentificado as Symptom } from "@/types/BackendTypes";

interface AnalysisFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const AnalysisField = ({ label, placeholder, value, onChange }: AnalysisFieldProps) => (
  <div className="space-y-3">
    <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-24 p-4 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
    />
  </div>
);

export interface AnalysisData {
  impresion: string;
  sintomas: Symptom[];
  factoresRiesgo: string;
  hipotesis: string;
}

interface PractitionerAnalysisProps {
  data: AnalysisData;
  onChange: (data: AnalysisData) => void;
}

export const PractitionerAnalysis = ({ data, onChange }: PractitionerAnalysisProps) => {
  const handleChange = (field: keyof AnalysisData, value: AnalysisData[keyof AnalysisData]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-zinc-900">Tu Análisis Clínico</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium">Registra tus observaciones e hipótesis clínicas antes de ver los resultados del sistema para un mejor aprendizaje.</p>
      </CardHeader>

      <CardContent className="p-0 space-y-8">
        <AnalysisField
          label="Impresión Clínica General"
          placeholder="¿Cuál es tu primera impresión de este caso? ¿Cuál es tu gravedad percibida?"
          value={data.impresion}
          onChange={(val) => handleChange('impresion', val)}
        />

        <SymptomSelector
          symptoms={data.sintomas}
          onChange={(s) => handleChange('sintomas', s)}
        />

        <AnalysisField
          label="Factores de Riesgo Observados"
          placeholder="¿Qué factores de riesgo identificaste en la descripción?"
          value={data.factoresRiesgo}
          onChange={(val) => handleChange('factoresRiesgo', val)}
        />
        <AnalysisField
          label="Hipótesis Diagnóstica"
          placeholder="¿Qué diagnóstico sugieres para este caso?"
          value={data.hipotesis}
          onChange={(val) => handleChange('hipotesis', val)}
        />

        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
          <p className="text-[9px] text-zinc-900 leading-relaxed">
            <span className="font-bold">Recuerda:</span> Estos ejercicios son herramientas de entrenamiento clínico. Comparar tu razonamiento con el del modelo basado en IA te ayudará a fortalecer tu juicio clínico objetivo.
          </p>
        </div>

        <div className="text-center pt-4">
          <p className="text-[9px] text-slate-400 font-medium italic">
            Completa tu análisis clínico antes de ejecutar el análisis del modelo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
