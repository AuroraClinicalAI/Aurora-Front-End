import { Brain } from "lucide-react";

interface CaseHeaderProps {
  id: string;
  lastConsultation: string;
}

export const CaseHeader = ({ id, lastConsultation }: CaseHeaderProps) => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <div className="bg-blue-100 p-2 rounded-full w-fit">
        <Brain className="w-6 h-6 text-indigo-400" />
      </div>
      <h1 className="text-3xl font-bold text-zinc-900">Análisis de Caso</h1>
      <p className="text-slate-500 text-sm font-medium">
        ID: [{id}] • Última Consulta: {lastConsultation}
      </p>
    </div>
  );
};
