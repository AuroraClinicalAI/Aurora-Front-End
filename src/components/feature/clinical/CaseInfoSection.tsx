import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useMemo } from "react";

interface CaseInfoSectionProps {
  ageGroup: string;
  gender: string;
  clinicalVignette: string;
  shapExplanation?: [string, number][];
}

export const CaseInfoSection = ({ ageGroup, gender, clinicalVignette, shapExplanation }: CaseInfoSectionProps) => {
  const highlightedText = useMemo(() => {
    if (!shapExplanation || shapExplanation.length === 0) return clinicalVignette;

    let result = clinicalVignette;
    // Sort features by length descending so that subset words don't replace longer matches prematurely
    const sortedFeatures = [...shapExplanation].sort((a, b) => b[0].length - a[0].length);

    sortedFeatures.forEach(([feature, weight]) => {
      // Escape feature for regex
      const safeFeature = feature.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Regex boundary for word mapping
      const regex = new RegExp(`\\b(${safeFeature})\\b`, 'gi');

      const bgColor = weight > 0 ? 'bg-red-100 text-red-900' : 'bg-emerald-100 text-emerald-900';
      result = result.replace(regex, `<span class="px-1.5 py-0.5 rounded-md font-bold ${bgColor} mx-0.5" title="Peso Predictivo: ${weight > 0 ? '+' : ''}${weight.toFixed(4)}">$1</span>`);
    });

    return result;
  }, [clinicalVignette, shapExplanation]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="md:col-span-1 rounded-xl shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Información del Caso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm font-semibold text-indigo-400">
            Grupo de Edad: <span className="text-slate-500 font-normal">{ageGroup}</span>
          </p>
          <p className="text-sm font-semibold text-indigo-400">
            Sexo: <span className="text-slate-500 font-normal">{gender}</span>
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 rounded-xl shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Viñeta Clínica</CardTitle>
          <p className="text-xs text-blue-400 font-medium italic">
            Texto analizado para la detección de patrones de depresión
          </p>
        </CardHeader>
        <CardContent>
          <p
            className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
