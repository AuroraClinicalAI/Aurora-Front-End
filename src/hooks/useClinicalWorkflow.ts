import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useServices } from "@/context/useServices";
import { useUser } from "@/hooks/useAuth";
import type { Diagnostico, Paciente, Reporte } from "@/types/BackendTypes";
import { UserRole } from "@/types/Roles";

export type WorkflowStep =
  | "START"
  | "PATIENT_SELECTION"
  | "DIAGNOSIS_FORM"
  | "REVIEW"
  | "CONFIRMATION";

interface WorkflowState {
  step: WorkflowStep;
  selectedPatient: Paciente | null;
  currentDiagnosis: Partial<Diagnostico> | null;
  generatedReport: Reporte | null;
  pdfUrl: string | null;
}

export const useClinicalWorkflow = () => {
  const { diagnosticosService, pacientesService } = useServices();
  const { usuario } = useUser();
  const userRole = usuario?.tipo_usuario as UserRole;

  const [state, setState] = useState<WorkflowState>({
    step: "START",
    selectedPatient: null,
    currentDiagnosis: null,
    generatedReport: null,
    pdfUrl: null,
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startWorkflow = useCallback(() => {
    if (userRole === UserRole.PRACTICANTE) {
      setState((prev) => ({ ...prev, step: "PATIENT_SELECTION" }));
    }
  }, [userRole]);

  const selectPatient = useCallback(
    (patient: Paciente) => {
      setState((prev) => ({
        ...prev,
        selectedPatient: patient,
        step: "DIAGNOSIS_FORM",
        currentDiagnosis: {
          id_paciente: patient.id_paciente,
          id_practicante: usuario?.id,
        },
      }));
    },
    [usuario?.id],
  );

  const createPatient = useCallback(
    async (patientData: Partial<Paciente>, autoSelect = true) => {
      setLoading(true);
      setError(null);
      try {
        const newPatient = await pacientesService.createPaciente(patientData);
        if (autoSelect) {
          selectPatient(newPatient);
        }
        return newPatient;
      } catch (err) {
        const error = err as Error;
        console.error("Error creating patient:", error);
        setError(error.message || "Error al crear paciente");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [pacientesService, selectPatient],
  );

  const submitDiagnosis = useCallback(
    async (diagnosisData: Partial<Diagnostico>) => {
      setLoading(true);
      setError(null);
      try {
        const patientId =
          diagnosisData.id_paciente ||
          stateRef.current.selectedPatient?.id_paciente;

        if (!patientId) {
          throw new Error("No hay paciente seleccionado");
        }
        const finalData = {
          ...stateRef.current.currentDiagnosis,
          ...diagnosisData,
          id_practicante: usuario?.id,
          id_paciente: patientId,
          fecha: new Date().toISOString(),
        };

        const newDiagnosis =
          await diagnosticosService.createDiagnostico(finalData);

        setState((prev) => ({
          ...prev,
          currentDiagnosis: newDiagnosis,
          step: "CONFIRMATION",
        }));
        return newDiagnosis;
      } catch (err) {
        const error = err as Error;
        console.error("Error submitting diagnosis:", error);
        setError(error.message || "Error al guardar el diagnóstico");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService, usuario?.id],
  );

  const updateDiagnosis = useCallback(
    async (diagnosticoId: number, diagnosisData: Partial<Diagnostico>) => {
      setLoading(true);
      setError(null);
      try {
        const updatedDiagnosis = await diagnosticosService.updateDiagnostico(
          diagnosticoId,
          diagnosisData,
        );
        setState((prev) => ({
          ...prev,
          currentDiagnosis: updatedDiagnosis,
        }));
        return updatedDiagnosis;
      } catch (err) {
        const error = err as Error;
        console.error("Error updating diagnosis:", error);
        setError(error.message || "Error al actualizar el diagnóstico");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const ejecutarAnalisisIA = useCallback(
    async (diagnosticoId: number) => {
      setLoading(true);
      setError(null);
      try {
        const clasificacion =
          await diagnosticosService.analizarIA(diagnosticoId);
        const updatedDiagnosis =
          await diagnosticosService.getDiagnosticoById(diagnosticoId);
        setState((prev) => ({
          ...prev,
          currentDiagnosis: updatedDiagnosis,
        }));
        return clasificacion;
      } catch (err) {
        const error = err as Error;
        console.error("Error running AI analysis:", error);
        setError(error.message || "Error al ejecutar análisis de IA");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const actualizarEstadoCaso = useCallback(
    async (diagnosticoId: number, id_estado: number) => {
      setLoading(true);
      setError(null);
      try {
        const updatedDiagnosis = await diagnosticosService.cambiarEstado(
          diagnosticoId,
          id_estado,
        );
        setState((prev) => ({
          ...prev,
          currentDiagnosis: updatedDiagnosis,
        }));
        return updatedDiagnosis;
      } catch (err) {
        const error = err as Error;
        console.error("Error changing status:", error);
        setError(error.message || "Error al cambiar estado");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const enviarRetroalimentacion = useCallback(
    async (
      diagnosticoId: number,
      titulo: string,
      comentario: string,
      feedbackId?: number,
    ) => {
      setLoading(true);
      setError(null);
      try {
        let feedback;
        if (feedbackId) {
          feedback = await diagnosticosService.updateRetroalimentacion(
            feedbackId,
            {
              titulo,
              comentario,
            },
          );
        } else {
          feedback = await diagnosticosService.createRetroalimentacion({
            diagnostico: diagnosticoId,
            titulo,
            comentario,
            supervisor: usuario?.id,
            tipo_interaccion: 1,
            estado: 7,
          });
        }

        const updatedDiagnosis =
          await diagnosticosService.getDiagnosticoById(diagnosticoId);
        setState((prev) => ({
          ...prev,
          currentDiagnosis: updatedDiagnosis,
        }));

        return feedback;
      } catch (err) {
        const error = err as Error;
        console.error("Error submitting feedback:", error);
        setError(error.message || "Error al enviar retroalimentación");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService, usuario?.id],
  );

  const descargarReportePDF = useCallback(
    async (diagnosticoId: number) => {
      setLoading(true);
      setError(null);
      try {
        const blob =
          await diagnosticosService.descargarReportePDF(diagnosticoId);
        const url = URL.createObjectURL(blob);
        setState((prev) => ({
          ...prev,
          pdfUrl: url,
        }));
        return url;
      } catch (err) {
        const error = err as Error;
        console.error("Error fetching PDF:", error);
        setError(error.message || "Error al generar PDF");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [diagnosticosService],
  );

  const setCurrentDiagnosis = useCallback((diagnosis: Partial<Diagnostico>) => {
    setState((prev) => ({
      ...prev,
      currentDiagnosis: diagnosis,
    }));
  }, []);

  const resetWorkflow = useCallback(() => {
    setState({
      step: "START",
      selectedPatient: null,
      currentDiagnosis: null,
      generatedReport: null,
      pdfUrl: null,
    });
  }, []);

  const actions = useMemo(
    () => ({
      startWorkflow,
      selectPatient,
      createPatient,
      submitDiagnosis,
      updateDiagnosis,
      ejecutarAnalisisIA,
      actualizarEstadoCaso,
      enviarRetroalimentacion,
      descargarReportePDF,
      setCurrentDiagnosis,
      resetWorkflow,
    }),
    [
      startWorkflow,
      selectPatient,
      createPatient,
      submitDiagnosis,
      updateDiagnosis,
      ejecutarAnalisisIA,
      actualizarEstadoCaso,
      enviarRetroalimentacion,
      descargarReportePDF,
      setCurrentDiagnosis,
      resetWorkflow,
    ],
  );

  return {
    state,
    loading,
    error,
    actions,
  };
};
