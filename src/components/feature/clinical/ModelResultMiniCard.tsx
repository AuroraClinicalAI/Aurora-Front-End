import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const ModelResultMiniCard = () => {
  return (
    <Card className="rounded-2xl border-indigo-100 shadow-sm bg-white overflow-hidden p-8">
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-sm font-bold text-zinc-900">Resultados del Modelo Anxiety V.001</CardTitle>
        <p className="text-[8px] text-slate-400 font-medium uppercase tracking-widest mt-1 italic">Análisis y sugerencias del sistema</p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-[#637bc4] text-white rounded-xl p-6 text-center shadow-lg shadow-indigo-100/50 mb-6 transition-all transform hover:scale-[1.02]">
          <h4 className="text-sm font-bold tracking-widest uppercase">Moderado</h4>
          <p className="text-[9px] font-medium opacity-80 mt-1">Nivel de depresión detectado por la IA: 67%</p>
        </div>

        <div className="space-y-4">
          <h5 className="text-[9px] font-bold text-zinc-900 uppercase tracking-widest text-center">Síntomas y su Intensidad</h5>
          <div className="space-y-3">
            {[
              { label: "Fatiga de Ánimo deprimido", val: 82 },
              { label: "Fatiga o baja energía", val: 86 },
              { label: "Alteraciones del sueño", val: 56 },
              { label: "Fatiga", val: 67 },
              { label: "Dificultades de Concentración", val: 78 }
            ].map((s, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold text-zinc-900">
                  <span>{s.label}</span>
                  <span>{s.val}%</span>
                </div>
                <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${s.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-50 space-y-4">
          <div className="p-4 rounded-xl border border-zinc-100 flex flex-col items-center">
            <span className="text-[9px] text-zinc-400 font-bold mb-1">Criterio Sugerido CIE-11</span>
            <span className="text-[10px] text-zinc-900 font-bold">FEA - EPISODIO DEPRESIVO ÚNICO</span>
          </div>
          <button className="w-full py-2 bg-indigo-50 border border-indigo-100 text-indigo-400 rounded-lg text-[9px] font-bold transition-all hover:bg-indigo-100 uppercase tracking-widest">
            Ver Análisis de Caso
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
