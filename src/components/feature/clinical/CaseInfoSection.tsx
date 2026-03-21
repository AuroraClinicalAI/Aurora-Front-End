import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface CaseInfoSectionProps {
  ageGroup: string;
  gender: string;
  clinicalVignette: string;
}

export const CaseInfoSection = ({ ageGroup, gender, clinicalVignette }: CaseInfoSectionProps) => {
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
          <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
            {clinicalVignette}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
