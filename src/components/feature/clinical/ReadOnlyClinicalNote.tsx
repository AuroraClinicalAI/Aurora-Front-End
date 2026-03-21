import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface ReadOnlyClinicalNoteProps {
  note: string;
}

export const ReadOnlyClinicalNote = ({ note }: ReadOnlyClinicalNoteProps) => {
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
          {note || "Sin historia clínica registrada."}
        </div>
      </CardContent>
    </Card>
  );
};
