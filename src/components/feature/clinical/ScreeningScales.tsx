import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface QuestionProps {
  number: number;
  question: string;
  id: string;
}

const Question = ({ number, question, id }: QuestionProps) => (
  <div className="space-y-4">
    <p className="text-[11px] font-bold text-zinc-900 leading-relaxed">
      {number}. {question}
    </p>
    <div className="space-y-2">
      {['Nunca', 'Varios días', 'Más de la mitad de los días', 'Casi todos los días'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="radio"
              name={id}
              className="peer appearance-none w-4 h-4 border border-zinc-200 rounded-full checked:border-indigo-400 transition-all cursor-pointer"
            />
            <div className="absolute w-2 h-2 bg-indigo-400 rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
          </div>
          <span className="text-[10px] font-medium text-slate-500 group-hover:text-zinc-900 transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export const ScreeningScales = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Escalas de Tamizaje</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium">Criterios preliminares y síntomas detectados para el caso.</p>
      </CardHeader>

      <CardContent className="p-0 space-y-10">
        <Question
          number={1}
          question="¿Con qué frecuencia se ha sentido desanimado, deprimido o sin esperanza?*"
          id="q1"
        />
        <Question
          number={2}
          question="¿Con qué frecuencia ha tenido poco interés o placer en hacer cosas?*"
          id="q2"
        />
        <Question
          number={3}
          question="¿Ha experimentado problemas para dormir o dormir demasiado?*"
          id="q3"
        />
        <Question
          number={4}
          question="¿Se ha sentido cansado o con poca energía?*"
          id="q4"
        />
      </CardContent>
    </Card>
  );
};
