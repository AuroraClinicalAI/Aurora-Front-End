type TabType = 'poblacional' | 'modelos' | 'patrones' | 'cohortes';

interface ResearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ResearchTabs = ({ activeTab, onTabChange }: ResearchTabsProps) => {
  const tabs = [
    { id: 'poblacional', label: 'Análisis Poblacional' },
    { id: 'modelos', label: 'Evaluación de Modelos' },
    { id: 'patrones', label: 'Patrones Sintomáticos' },
    { id: 'cohortes', label: 'Comparación de Cohortes' },
  ];

  return (
    <div className="bg-zinc-200 p-1 rounded-xl flex flex-col sm:flex-row gap-1 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={`flex-grow py-3 px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id
              ? 'bg-white text-zinc-900 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100/50'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
