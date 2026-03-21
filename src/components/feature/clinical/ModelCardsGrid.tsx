import { Share2 } from "lucide-react";

interface ModelCardProps {
  name: string;
  precision: number;
  isSelected?: boolean;
}

const ModelCard = ({ name, precision, isSelected }: ModelCardProps) => (
  <button className={`flex-1 rounded-2xl border p-6 transition-all text-left ${isSelected
      ? "bg-indigo-400 border-indigo-500 shadow-lg shadow-indigo-100 ring-4 ring-indigo-50"
      : "bg-indigo-50/30 border-indigo-100 hover:bg-indigo-50/50"
    }`}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${isSelected ? "bg-white/20" : "bg-zinc-900"}`}>
        <Share2 className="w-4 h-4 text-white" />
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-400"
        }`}>
        {isSelected ? "Principal" : "Pruebas"}
      </span>
    </div>
    <p className={`text-sm font-bold mb-1 ${isSelected ? "text-white" : "text-zinc-900"}`}>{name}</p>
    <div className="flex items-center justify-between">
      <span className={`text-[10px] font-medium ${isSelected ? "text-indigo-50" : "text-slate-400"}`}>Precisión</span>
      <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-zinc-900"}`}>{precision}%</span>
    </div>
    <div className={`h-1 w-full rounded-full mt-2 overflow-hidden ${isSelected ? "bg-white/20" : "bg-zinc-100"}`}>
      <div
        className={`h-full rounded-full transition-all duration-1000 ${isSelected ? "bg-white" : "bg-indigo-400"}`}
        style={{ width: `${precision}%` }}
      />
    </div>
  </button>
);

export const ModelCardsGrid = () => {
  return (
    <div className="flex gap-6 flex-col md:flex-row mb-10">
      <ModelCard name="Random Forest" precision={85} isSelected={true} />
      <ModelCard name="Red Neuronal" precision={82} />
      <ModelCard name="SVM" precision={72} />
      <ModelCard name="Ensemble" precision={90} />
    </div>
  );
};
