import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { CaseDataForm } from "@/components/feature/clinical/CaseDataForm";
import { ClinicalNoteSection } from "@/components/feature/clinical/ClinicalNoteSection";
import { MLAnalysisResults } from "@/components/feature/clinical/MLAnalysisResults";
import { DiagnosticEditor } from "@/components/feature/clinical/DiagnosticEditor";
import { DiagnosticSidebar } from "@/components/feature/clinical/DiagnosticSidebar";
import { ScreeningScales, type ScreeningData } from "@/components/feature/clinical/ScreeningScales";
import { PractitionerAnalysis, type AnalysisData } from "@/components/feature/clinical/PractitionerAnalysis";
import { PractitionerSidebar } from "@/components/feature/clinical/PractitionerSidebar";
import { ReviewHeader } from "@/components/feature/clinical/ReviewHeader";
import { ReadOnlyScreening } from "@/components/feature/clinical/ReadOnlyScreening";
import { ReadOnlyAnalysis } from "@/components/feature/clinical/ReadOnlyAnalysis";
import { ReviewSidebar } from "@/components/feature/clinical/ReviewSidebar";
import { ReadOnlyClinicalNote } from "@/components/feature/clinical/ReadOnlyClinicalNote";
import { useUser } from "@/hooks/useAuth";
import { useServices } from "@/context/useServices";
import { UserRole } from "@/types/Roles";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui";
import { PatientSelector } from "@/components/feature/clinical/PatientSelector";
import { useClinicalWorkflow } from "@/hooks/useClinicalWorkflow";
import { InformedConsent } from "@/components/feature/legal/InformedConsent";
import type { Diagnostico } from "@/types/BackendTypes";

type ClinicalMode = 'DIAGNOSTIC' | 'REVIEW';
type PractitionerPhase = 'input' | 'results';

export const ClinicalDiagnostic = () => {
  const { usuario } = useUser();
  const { diagnosticosService, pacientesService } = useServices();
  const userRole = usuario?.tipo_usuario as UserRole;
  const { actions, loading, error } = useClinicalWorkflow(); // To get createPatient action
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('id');

  // Form States
  const [caseData, setCaseData] = useState({
    nombre: "",
    rango_edad: "" as number | "",
    sexo: "" as number | "",
    fecha_consulta: new Date().toISOString().split('T')[0]
  });
  const [clinicalNote, setClinicalNote] = useState("");
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    impresion: "",
    sintomas: [],
    factoresRiesgo: "",
    hipotesis: ""
  });
  const [screeningData, setScreeningData] = useState<ScreeningData>({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0
  });

  // Role Logic based on Real User
  const isPsychologist = ([UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.EVALUADOR] as UserRole[]).includes(userRole);

  // Mode Logic (Psychologist can switch between Diagnostic and Review, Student is always Diagnostic)
  // Default to REVIEW for Psychologist, DIAGNOSTIC for Student
  const [mode, setMode] = useState<ClinicalMode>('REVIEW');
  const [phase, setPhase] = useState<PractitionerPhase>('input');

  useEffect(() => {
    if (userRole === UserRole.PRACTICANTE) {
      setMode('DIAGNOSTIC');
    } else if (isPsychologist && reviewId) {
      setMode('REVIEW');
      // If entering via review link, bypass consent
      setIsConsentOpen(false);
      setHasAcceptedConsent(true);

      const fetchDiagnosis = async () => {
        try {
          const id = Number(reviewId);
          if (isNaN(id)) return;

          const diagnosis = await diagnosticosService.getDiagnosticoById(id);
          if (diagnosis) {
            // Populate fields
            setClinicalNote(diagnosis.historia_clinica || "");
            setAnalysisData({
              impresion: diagnosis.impresion_clinica || "",
              sintomas: diagnosis.sintomas_identificados || [],
              factoresRiesgo: "", // backend type might not have this, leave empty or map if added later
              hipotesis: diagnosis.hipotesis_diagnostica || ""
            });
            // Cast tamizaje to ScreeningData, assuming structure matches or backend returns congruent JSON
            setScreeningData(diagnosis.tamizaje as unknown as ScreeningData || { q1: 0, q2: 0, q3: 0, q4: 0 });

            // Fetch patient data to populate caseData header
            if (diagnosis.id_paciente) {
              try {
                const patient = await pacientesService.getPacienteById(diagnosis.id_paciente);
                setCaseData({
                  nombre: diagnosis.nombre,
                  rango_edad: patient.rango_edad,
                  sexo: patient.sexo,
                  fecha_consulta: diagnosis.fecha ? diagnosis.fecha.split('T')[0] : new Date().toISOString().split('T')[0]
                });
                // We also set selectedPatientId so if they switch back to managing it works,
                // though in Review mode usually read-only.
                setSelectedPatientId(diagnosis.id_paciente);
              } catch (err) {
                console.error("Error fetching patient:", err);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching diagnosis for review:", error);
          alert("Error al cargar el diagnóstico para revisión.");
        }
      };

      fetchDiagnosis();
    }
  }, [userRole, reviewId, isPsychologist, diagnosticosService, pacientesService]);

  const isReviewMode = isPsychologist && mode === 'REVIEW';

  // Patient Management State
  const [isManagingPatients, setIsManagingPatients] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [isConsentOpen, setIsConsentOpen] = useState(true);
  const [hasAcceptedConsent, setHasAcceptedConsent] = useState(false);

  const handleSaveCase = async () => {
    if (!hasAcceptedConsent) {
      alert("Debe aceptar el consentimiento informado para proceder.");
      setIsConsentOpen(true);
      return;
    }
    try {
      let patientId = selectedPatientId;

      // If it's a student and no patient selected, create one implicitly
      if (!isPsychologist && !patientId) {
        if (!caseData.rango_edad || !caseData.sexo) {
          alert("Por favor complete los datos del paciente (Rango de edad y Sexo).");
          return;
        }
        const newPatient = await actions.createPatient({
          sexo: Number(caseData.sexo),
          rango_edad: Number(caseData.rango_edad)
        }, true); // autoSelect=true ensures it's in the hook's state

        if (!newPatient) return;
        patientId = newPatient.id_paciente;
      }

      if (!patientId) {
        alert("Debe seleccionar o crear un paciente.");
        return;
      }

      // Construct Diagnosis Object
      const diagnosis: Partial<Diagnostico> = {
        nombre: caseData.nombre || `Caso - ${caseData.fecha_consulta}`,
        historia_clinica: clinicalNote,
        impresion_clinica: analysisData.impresion,
        hipotesis_diagnostica: analysisData.hipotesis,
        id_paciente: patientId,
        // Filter symptoms: only those with intensity > 0 are sent
        sintomas_identificados: analysisData.sintomas.filter(s => s.intensity > 0),
        tamizaje: screeningData,
        // Optional: add more fields or metadata if needed
      };

      await actions.submitDiagnosis(diagnosis);
      alert("Caso guardado exitosamente en la tabla de diagnósticos.");
    } catch (e) {
      console.error(e);
      alert("Error al guardar el caso.");
    }
  };


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
              {/* Feature: Patient Management (Only for Psychologists/Evaluators) */}
              {isPsychologist && (
                <button
                  onClick={() => setIsManagingPatients(true)}
                  className="px-4 py-2 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-md text-xs font-bold transition-all shadow-sm"
                >
                  Gestionar Pacientes
                </button>
              )}

              {!isReviewMode && (
                <>
                  <button
                    onClick={handleSaveCase}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-indigo-100 disabled:opacity-50"
                  >
                    {loading ? "Guardando..." : "Guardar Caso"}
                  </button>
                  <button className="px-6 py-2.5 bg-[#7693cc] hover:bg-indigo-400 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-indigo-100">
                    Exportar Informe
                  </button>
                </>
              )}
            </div>
          </div>

          <InformedConsent
            isOpen={isConsentOpen}
            onAccept={() => {
              setHasAcceptedConsent(true);
              setIsConsentOpen(false);
            }}
            onDecline={() => {
              setIsConsentOpen(false);
              navigate(-1);
            }}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Dialog for Patient Management */}
          <Dialog open={isManagingPatients} onOpenChange={setIsManagingPatients}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Gestión de Pacientes</DialogTitle>
                <DialogDescription>
                  Registre nuevos pacientes para el sistema o seleccione uno existente.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <PatientSelector
                  onSelect={(p) => {
                    actions.selectPatient(p); // Select in hook state
                    setSelectedPatientId(p.id_paciente);
                    setCaseData({
                      ...caseData,
                      sexo: p.sexo,
                      rango_edad: p.rango_edad
                    });
                    setIsManagingPatients(false);
                    alert(`Paciente #${p.id_paciente} seleccionado.`);
                  }}
                  onCreate={async (p) => {
                    try {
                      const newP = await actions.createPatient(p, true); // autoSelect=true
                      if (!newP) return;
                      alert("Paciente creado exitosamente.");
                      setSelectedPatientId(newP.id_paciente);
                      setCaseData({
                        ...caseData,
                        sexo: newP.sexo,
                        rango_edad: newP.rango_edad
                      });
                      setIsManagingPatients(false);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>

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
                  <CaseDataForm
                    data={caseData}
                    onChange={setCaseData}
                  />
                  <ClinicalNoteSection
                    value={clinicalNote}
                    onChange={setClinicalNote}
                  />

                  {isPsychologist ? (
                    <>
                      <MLAnalysisResults />
                      <DiagnosticEditor />
                    </>
                  ) : (
                    <>
                      <ScreeningScales
                        value={screeningData}
                        onChange={setScreeningData}
                      />
                      <PractitionerAnalysis
                        data={analysisData}
                        onChange={setAnalysisData}
                      />
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
