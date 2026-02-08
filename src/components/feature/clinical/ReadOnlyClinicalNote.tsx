import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const ReadOnlyClinicalNote = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-zinc-900">Viñeta Clínica</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          Descripción del caso presentada por el estudiante para análisis y diagnóstico
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full p-6 rounded-xl border border-zinc-50 bg-white text-[11px] font-medium text-slate-500 leading-relaxed italic">
          Paciente femenina de 28 años que acude a consulta refiriendo sentimientos persistentes de tristeza, pérdida de interés en actividades que antes disfrutaba, y dificultades para conciliar al sueño durante las últimas 8 semanas. Refiere fatiga constante, dificultades de concentración en el trabajo, y episodios de llanto sin motivo aparente. No presenta antecedentes psiquiátricos previos. Menciona que estos síntomas iniciaron después de una ruptura sentimental significativa.
        </div>
      </CardContent>
    </Card>
  );
};
