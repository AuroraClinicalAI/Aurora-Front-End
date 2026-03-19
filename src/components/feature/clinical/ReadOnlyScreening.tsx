import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import type { ScreeningData } from "./ScreeningScales";

const SCORING_LABELS = ['Nunca', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'];

const ReviewQuestion = ({ number, question, answer }: { number: number, question: string, answer: string }) => (
  <div className="space-y-3">
    <p className="text-[12px] font-bold text-zinc-900 leading-relaxed">
      {number}. {question}
    </p>
    <div>
      <span className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] font-bold text-zinc-900 leading-none">
        {answer}
      </span>
    </div>
  </div>
);

interface ReadOnlyScreeningProps {
  data: ScreeningData;
}

export const ReadOnlyScreening = ({ data }: ReadOnlyScreeningProps) => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Resultados de Escalas de Tamizaje</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium">Criterios predefinidos para evaluación sistemática</p>
      </CardHeader>

      <CardContent className="p-0 space-y-10">
        <ReviewQuestion
          number={1}
          question="¿Con qué frecuencia se ha sentido desanimado, deprimido o sin esperanzas?"
          answer={SCORING_LABELS[data.q1] || "---"}
        />
        <ReviewQuestion
          number={2}
          question="¿Con qué frecuencia ha tenido poco interés o placer en hacer cosas?"
          answer={SCORING_LABELS[data.q2] || "---"}
        />
        <ReviewQuestion
          number={3}
          question="¿Ha experimentado problemas para dormir o dormir demasiado?"
          answer={SCORING_LABELS[data.q3] || "---"}
        />
        <ReviewQuestion
          number={4}
          question="¿Se ha sentido cansado o con poca energía?"
          answer={SCORING_LABELS[data.q4] || "---"}
        />
      </CardContent>
    </Card>
  );
};
