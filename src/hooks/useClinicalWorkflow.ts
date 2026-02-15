import { useState, useCallback } from "react";
import { useServices } from "@/context/useServices"; // Assuming this exists from previous refactor
import { useUser } from "@/hooks/useAuth"; // Assuming useUser exists
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Actions ---

  const startWorkflow = useCallback(() => {
    // If student, go to patient selection. If evaluator, might go to list (handled by component usually)
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
          id_practicante: usuario?.id, // Assuming user id is available
        },
      }));
    },
    [usuario],
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
          diagnosisData.id_paciente || state.selectedPatient?.id_paciente;

        if (!patientId) {
          throw new Error("No hay paciente seleccionado");
        }
        // Combine initial data with form data
        const finalData = {
          ...state.currentDiagnosis,
          ...diagnosisData,
          id_practicante: usuario?.id, // Ensure ID is present
          id_paciente: patientId,
          fecha: new Date().toISOString(), // Or let backend handle it
        };

        const newDiagnosis =
          await diagnosticosService.createDiagnostico(finalData);

        setState((prev) => ({
          ...prev,
          currentDiagnosis: newDiagnosis,
          step: "CONFIRMATION", // Or REVIEW
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
    [
      state.selectedPatient,
      state.currentDiagnosis,
      diagnosticosService,
      usuario,
    ],
  );

  const resetWorkflow = useCallback(() => {
    setState({
      step: "START",
      selectedPatient: null,
      currentDiagnosis: null,
      generatedReport: null,
    });
  }, []);

  return {
    state,
    loading,
    error,
    actions: {
      startWorkflow,
      selectPatient,
      createPatient,
      submitDiagnosis,
      resetWorkflow,
    },
  };
};
