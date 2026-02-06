import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui";

interface Criterion {
  id: string;
  title: string;
  description: string;
}

interface DiagnosticCriteriaViewProps {
  dsm5: Criterion[];
  cie11: Criterion[];
}

export const DiagnosticCriteriaView = ({ dsm5, cie11 }: DiagnosticCriteriaViewProps) => {
  const [subTab, setSubTab] = useState<'dsm5' | 'cie11'>('dsm5');

  const activeCriteria = subTab === 'dsm5' ? dsm5 : cie11;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-zinc-200/50 p-1 rounded-lg mb-6 w-full md:w-fit ml-auto mr-auto md:ml-0">
        <button
          onClick={() => setSubTab('dsm5')}
          className={cn(
            "py-1.5 px-8 rounded-md font-bold text-xs transition-all",
            subTab === 'dsm5' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          DSM-5
        </button>
        <button
          onClick={() => setSubTab('cie11')}
          className={cn(
            "py-1.5 px-8 rounded-md font-bold text-xs transition-all",
            subTab === 'cie11' ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          CIE-11
        </button>
      </div>

      <Card className="rounded-xl shadow-sm border-zinc-200">
        <div className="p-6 border-b border-zinc-100">
          <CardTitle className="text-xl font-bold mb-1">
            {subTab === 'dsm5'
              ? "Criterios DSM-5 Para Trastorno Depresivo Mayor"
              : "Criterios CIE-11 Para Trastorno Depresivo"}
          </CardTitle>
          <p className="text-xs text-blue-500 font-medium">
            Se requieren al menos 5 síntomas durante un período de 2 semanas, incluyendo al menos uno de los dos primeros
          </p>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-100">
            {activeCriteria.map((criterion) => (
              <div key={criterion.id} className="p-5 hover:bg-zinc-50/50 transition-colors">
                <h4 className="text-sm font-bold text-blue-700 mb-1">{criterion.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{criterion.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
