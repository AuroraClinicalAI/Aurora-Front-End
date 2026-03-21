import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { ResearchFilters } from "@/components/feature/clinical/ResearchFilters";
import { ResearchStatsSummary } from "@/components/feature/clinical/ResearchStatsSummary";
import { ResearchTabs } from "@/components/feature/clinical/ResearchTabs";
import { DataExportSection } from "@/components/feature/clinical/DataExportSection";
import { PopulationAnalysisView } from "@/components/feature/clinical/PopulationAnalysisView";
import { ModelEvaluationView } from "@/components/feature/clinical/ModelEvaluationView";
import { SymptomPatternsView } from "@/components/feature/clinical/SymptomPatternsView";
import { CohortComparisonView } from "@/components/feature/clinical/CohortComparisonView";

import { useResearchAnalytics } from "@/hooks/useResearchAnalytics";

type TabType = 'poblacional' | 'modelos' | 'patrones' | 'cohortes';

export const ResearchingPanel = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'poblacional';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const {
    loading,
    summary,
    population,
    patterns,
    cohorts,
    filters,
    activeFilters,
    updateFilters,
    handleExport,
    exporting,
  } = useResearchAnalytics();

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType;
    if (tabParam && ['poblacional', 'modelos', 'patrones', 'cohortes'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const scrollToExport = () => {
    const element = document.getElementById('export-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'poblacional':
        return <PopulationAnalysisView data={population} loading={loading} />;
      case 'modelos':
        return <ModelEvaluationView />;
      case 'patrones':
        return <SymptomPatternsView data={patterns} loading={loading} />;
      case 'cohortes':
        return <CohortComparisonView data={cohorts} loading={loading} />;
      default:
        return <PopulationAnalysisView data={population} loading={loading} />;
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
            <ResearchFilters
              filters={filters}
              activeFilters={activeFilters}
              updateFilters={updateFilters}
            />
            <ResearchStatsSummary summary={summary} loading={loading} />

            <div className="space-y-12">
              <ResearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="min-h-[500px]">
                {renderActiveTab()}
              </div>
            </div>

            <DataExportSection
              handleExport={handleExport}
              exporting={exporting}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
