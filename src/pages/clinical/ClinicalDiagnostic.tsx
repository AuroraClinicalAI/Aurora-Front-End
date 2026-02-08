import { useState } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { CaseDataForm } from "@/components/feature/clinical/CaseDataForm";
import { ClinicalNoteSection } from "@/components/feature/clinical/ClinicalNoteSection";
import { MLAnalysisResults } from "@/components/feature/clinical/MLAnalysisResults";
import { DiagnosticEditor } from "@/components/feature/clinical/DiagnosticEditor";
import { DiagnosticSidebar } from "@/components/feature/clinical/DiagnosticSidebar";
import { ScreeningScales } from "@/components/feature/clinical/ScreeningScales";
import { PractitionerAnalysis } from "@/components/feature/clinical/PractitionerAnalysis";
import { PractitionerSidebar } from "@/components/feature/clinical/PractitionerSidebar";
import { ReviewHeader } from "@/components/feature/clinical/ReviewHeader";
import { ReadOnlyScreening } from "@/components/feature/clinical/ReadOnlyScreening";
import { ReadOnlyAnalysis } from "@/components/feature/clinical/ReadOnlyAnalysis";
import { ReviewSidebar } from "@/components/feature/clinical/ReviewSidebar";
import { ReadOnlyClinicalNote } from "@/components/feature/clinical/ReadOnlyClinicalNote";

type UserRole = 'PSICOLOGO' | 'PRACTICANTE';
type ClinicalMode = 'DIAGNOSTIC' | 'REVIEW';
type PractitionerPhase = 'input' | 'results';

export const ClinicalDiagnostic = () => {
  const [role, setRole] = useState<UserRole>('PSICOLOGO');
  const [mode, setMode] = useState<ClinicalMode>('REVIEW');
  const [phase, setPhase] = useState<PractitionerPhase>('input');

  const isPsychologist = role === 'PSICOLOGO';
  const isReviewMode = isPsychologist && mode === 'REVIEW';

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Main Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-zinc-900 transition-all">
                {isReviewMode ? 'Revisión Manual' : 'Diagnóstico Clínico'}
              </h1>
              {!isPsychologist && (
                <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase transition-all animate-in fade-in slide-in-from-left-2">Sistema de Práctica con Casos Simulados</p>
              )}
              {isReviewMode && (
                <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">Evaluación de Desempeño Estudiantil</p>
              )}
            </div>

            <div className="flex gap-4 items-center">
              {/* Complex Controller (Demo Only) */}
              <div className="flex bg-zinc-100 p-1 rounded-lg border border-zinc-200 gap-1">
                <button
                  onClick={() => { setRole('PSICOLOGO'); setMode('DIAGNOSTIC'); }}
                  className={`px-3 py-1.5 rounded-md text-[8px] font-bold transition-all ${role === 'PSICOLOGO' && mode === 'DIAGNOSTIC' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  PSI DX
                </button>
                <button
                  onClick={() => { setRole('PSICOLOGO'); setMode('REVIEW'); }}
                  className={`px-3 py-1.5 rounded-md text-[8px] font-bold transition-all ${role === 'PSICOLOGO' && mode === 'REVIEW' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  PSI REV
                </button>
                <button
                  onClick={() => { setRole('PRACTICANTE'); setMode('DIAGNOSTIC'); }}
                  className={`px-3 py-1.5 rounded-md text-[8px] font-bold transition-all ${role === 'PRACTICANTE' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                  PRACT
                </button>
              </div>

              {!isReviewMode && (
                <>
                  <button className="px-6 py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-indigo-100">
                    Guardar Caso
                  </button>
                  <button className="px-6 py-2.5 bg-[#7693cc] hover:bg-indigo-400 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-indigo-100">
                    Exportar Informe
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8 animate-in fade-in duration-500">
              {isReviewMode ? (
                <>
                  <ReviewHeader />
                  <ReadOnlyClinicalNote />
                  <ReadOnlyScreening />
                  <ReadOnlyAnalysis />
                </>
              ) : (
                <>
                  <CaseDataForm />
                  <ClinicalNoteSection />

                  {isPsychologist ? (
                    <>
                      <MLAnalysisResults />
                      <DiagnosticEditor />
                    </>
                  ) : (
                    <>
                      <ScreeningScales />
                      <PractitionerAnalysis />
                      {phase === 'input' && (
                        <div className="h-20 flex items-center justify-center border-t border-zinc-50">
                          <p className="text-[10px] text-slate-400 font-medium italic">Completa el análisis clínico antes de ejecutar el sistema.</p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              {isReviewMode ? (
                <ReviewSidebar />
              ) : (
                isPsychologist ? (
                  <DiagnosticSidebar />
                ) : (
                  <PractitionerSidebar
                    phase={phase}
                    onExecute={() => setPhase('results')}
                  />
                )
              )}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-16 bg-white border border-zinc-100 rounded-xl p-4 flex items-center justify-between">
            <p className="text-[10px] text-zinc-900 leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
