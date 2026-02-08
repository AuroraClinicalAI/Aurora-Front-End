import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const ClinicalNoteSection = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-zinc-900">Viñeta Clínica</CardTitle>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Redacte la viñeta clínica incluyendo los principales síntomas, duración, antecedentes relevantes y cualquier detalle que considere importante para el análisis del caso.
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <textarea
          placeholder="Describa la presentación del caso, síntomas observados, contexto, antecedentes relevantes, etc..."
          className="w-full h-40 p-4 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none leading-relaxed"
        />
      </CardContent>
    </Card>
  );
};
