import { cn } from "@/lib/utils";

interface AnalysisTabsProps {
  activeTab: 'analysis' | 'criteria';
  setActiveTab: (tab: 'analysis' | 'criteria') => void;
}

export const AnalysisTabs = ({ activeTab, setActiveTab }: AnalysisTabsProps) => {
  return (
    <div className="flex bg-zinc-200/50 p-1.5 rounded-xl mb-8 w-full">
      <button
        onClick={() => setActiveTab('analysis')}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200",
          activeTab === 'analysis'
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30"
        )}
      >
        Análisis
      </button>
      <button
        onClick={() => setActiveTab('criteria')}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all duration-200",
          activeTab === 'criteria'
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/30"
        )}
      >
        Criterios Diagnósticos
      </button>
    </div>
  );
};
