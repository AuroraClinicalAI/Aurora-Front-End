import { DefaultLayout } from "@/layout/DefaultLayout";
import { TrendingUp } from "lucide-react";
import { ModelCardsGrid } from "@/components/feature/clinical/ModelCardsGrid";
import { ModelStatsDetail } from "@/components/feature/clinical/ModelStatsDetail";
import { InteractiveTest } from "@/components/feature/clinical/InteractiveTest";
import { ModelComparison } from "@/components/feature/clinical/ModelComparison";

export const PredictiveAnalysis = () => {
  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="bg-indigo-100 p-4 rounded-full w-fit">
              <TrendingUp className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900">Análisis Predictivo</h1>
            <p className="text-slate-500 text-sm font-medium">
              Gestión y monitoreo de modelos de inteligencia artificial para la prevención clínica.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {/* Exploration Section */}
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-900">Exploración de Modelos</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Descubre los diferentes modelos de machine learning implementados para el análisis predictivo de trastornos depresivos.
                </p>
              </div>
              <ModelCardsGrid />
              <ModelStatsDetail />
            </div>

            {/* Interactive Section */}
            <InteractiveTest />

            {/* Comparison Section */}
            <ModelComparison />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
