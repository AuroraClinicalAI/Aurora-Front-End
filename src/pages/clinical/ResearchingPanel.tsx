import { useState } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { ResearchFilters } from "@/components/feature/clinical/ResearchFilters";
import { ResearchStatsSummary } from "@/components/feature/clinical/ResearchStatsSummary";
import { ResearchTabs } from "@/components/feature/clinical/ResearchTabs";
import { DataExportSection } from "@/components/feature/clinical/DataExportSection";
import { PopulationAnalysisView } from "@/components/feature/clinical/PopulationAnalysisView";
import { ModelEvaluationView } from "@/components/feature/clinical/ModelEvaluationView";
import { SymptomPatternsView } from "@/components/feature/clinical/SymptomPatternsView";
import { CohortComparisonView } from "@/components/feature/clinical/CohortComparisonView";

type TabType = 'poblacional' | 'modelos' | 'patrones' | 'cohortes';

export const ResearchingPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>('poblacional');

  const scrollToExport = () => {
    const element = document.getElementById('export-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'poblacional': return <PopulationAnalysisView />;
      case 'modelos': return <ModelEvaluationView />;
      case 'patrones': return <SymptomPatternsView />;
      case 'cohortes': return <CohortComparisonView />;
      default: return <PopulationAnalysisView />;
    }
  };

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-zinc-900">Panel de Investigación</h1>
              <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">Análisis Poblacional y Modelos de Machine Learning</p>
            </div>

            <button
              onClick={scrollToExport}
              className="px-8 py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-indigo-100 uppercase tracking-widest"
            >
              Exportar Datos
            </button>
          </div>

          {/* Core Dashboard Content */}
          <div className="space-y-8">
            <ResearchFilters />
            <ResearchStatsSummary />

            <div className="space-y-12">
              <ResearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="min-h-[500px]">
                {renderActiveTab()}
              </div>
            </div>

            <DataExportSection />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
