import { Card, CardHeader, CardTitle } from "@/components/ui";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
  <div className="space-y-2">
    <h5 className="text-[11px] font-bold text-zinc-900">{question}</h5>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{answer}</p>
  </div>
);

export const ModelComparison = () => {
  const models = [
    { name: "Random Forest", acc: "85%", sens: "82%", spec: "83%", f1: "84%", time: "120ms", status: "Activo" },
    { name: "Red Neuronal", acc: "87%", sens: "85%", spec: "83%", f1: "86%", time: "180ms", status: "En Pruebas" },
    { name: "SVM", acc: "81%", sens: "82%", spec: "83%", f1: "83%", time: "90ms", status: "En Pruebas" },
    { name: "Ensemble", acc: "88%", sens: "91%", spec: "86%", f1: "90%", time: "250ms", status: "Experimental" },
  ];

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-10">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Comparación de Modelos</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium">Compara el rendimiento de los diferentes modelos implementados en el sistema.</p>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
              <th className="pb-4 pr-4">Modelo</th>
              <th className="pb-4 px-4">Precisión</th>
              <th className="pb-4 px-4">Sensibilidad</th>
              <th className="pb-4 px-4">Especificidad</th>
              <th className="pb-4 px-4">F1-Score</th>
              <th className="pb-4 px-4">Tiempo de Inferencia</th>
              <th className="pb-4 pl-4 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-medium text-slate-500">
            {models.map((m, i) => (
              <tr key={i} className="border-b last:border-0 border-zinc-50 hover:bg-zinc-50/50 transition-all">
                <td className="py-4 pr-4 font-bold text-zinc-900">{m.name}</td>
                <td className="py-4 px-4">{m.acc}</td>
                <td className="py-4 px-4">{m.sens}</td>
                <td className="py-4 px-4">{m.spec}</td>
                <td className="py-4 px-4">{m.f1}</td>
                <td className="py-4 px-4">{m.time}</td>
                <td className="py-4 pl-4 text-right">
                  <span className={`px-3 py-1 rounded-full border text-[9px] font-bold ${m.status === 'Activo' ? "bg-white border-zinc-200 text-zinc-900" : "bg-white border-zinc-100 text-zinc-400"
                    }`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 pt-8 border-t border-zinc-100 space-y-6">
        <h4 className="text-sm font-bold text-zinc-900">Preguntas Frecuentes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FAQItem
            question="¿Cuál es el mejor Modelo Para Usar?"
            answer="El modelo Random Forest es actualmente el recomendado para uso general debido a su equilibrio entre precisión y velocidad. Sin embargo, para casos complejos donde se requiere mayor sensibilidad, el modelo Ensemble puede ofrecer mejores resultados a costa de un tiempo de procesamiento ligeramente mayor."
          />
          <FAQItem
            question="¿Con Qué Frecuencia Se Actualizan Los Modelos?"
            answer="Los modelos se actualizan con diferentes frecuencias: Random Forest trimestralmente, Red Neuronal mensualmente, SVM semestralmente, y el modelo Ensemble se actualiza cuando hay mejoras significativas en los algoritmos base."
          />
          <FAQItem
            question="¿Cómo Interpretar Los Datos Del Análisis?"
            answer="Los resultados proporcionan una probabilidad de presencia de trastorno depresivo basada en los datos analizados. Es importante recordar que estos resultados son una herramienta de apoyo y no reemplazan el juicio clínico profesional. Se recomienda utilizar esta información como complemento al proceso de evaluación psicológica tradicional."
          />
          <FAQItem
            question="¿Qué Datos Se Utilizan Para Entrenar Los Modelos?"
            answer="Los modelos son entrenados con datos clínicos anonimizados recopilados de diversas fuentes, incluyendo historias clínicas, evaluaciones psicológicas estandarizadas y cuestionarios validados. Todos los datos utilizados cumplen con las normativas de protección de datos y han sido aprobados por comités de ética correspondientes."
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button className="flex-1 py-3 bg-indigo-50 border border-indigo-200 text-indigo-400 text-[10px] font-bold rounded-lg shadow-sm hover:bg-indigo-100 transition-all uppercase tracking-widest">
          Descargar Informe Comparativo
        </button>
        <button className="flex-1 py-3 bg-indigo-400 text-white text-[10px] font-bold rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all uppercase tracking-widest">
          Solicitar Acceso a Modelos Experimentales
        </button>
      </div>
    </Card>
  );
};
