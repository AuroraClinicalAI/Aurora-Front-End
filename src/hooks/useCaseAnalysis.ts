import { useState, useEffect } from "react";
import { useServices } from "@/context/useServices";

interface CaseData {
  id: string;
  lastConsultation: string;
  ageGroup: string;
  gender: string;
  clinicalVignette: string;
  analysis: {
    globalScore: number;
    maxScore: number;
    symptoms: { name: string; value: number }[];
  };
  criteria: {
    dsm5: { id: string; title: string; description: string }[];
    cie11: { id: string; title: string; description: string }[];
  };
}

export const useCaseAnalysis = (caseId?: string) => {
  const [data, setData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { diagnosticosService } = useServices();

  useEffect(() => {
    const fetchData = async () => {
      if (!caseId) return;

      setLoading(true);
      try {
        const realData = await diagnosticosService.getDiagnosticoById(
          Number(caseId),
        );

        // Map backend Diagnostico to frontend CaseData
        const diagnosis = realData;
        const mappedData: CaseData = {
          id: String(realData.id_diagnostico),
          lastConsultation: new Date(realData.fecha).toLocaleDateString(),
          ageGroup:
            diagnosis.paciente?.rango_edad === 1
              ? "Niño"
              : diagnosis.paciente?.rango_edad === 2
                ? "Adolescente"
                : "Adulto",
          gender: diagnosis.paciente?.sexo === 1 ? "Masculino" : "Femenino",
          clinicalVignette: realData.historia_clinica,
          analysis: {
            globalScore:
              (diagnosis.clasificacion?.probabilidad_certeza || 0) * 100,
            maxScore: 100,
            symptoms: (realData.sintomas_identificados || []).map((s) => ({
              name: s.name,
              value: s.intensity,
            })),
          },
          criteria: {
            dsm5:
              diagnosis.clasificacion?.ml_dsm5_evaluacion &&
              typeof diagnosis.clasificacion.ml_dsm5_evaluacion === "object" &&
              "major_criteria_details" in
                diagnosis.clasificacion.ml_dsm5_evaluacion
                ? Object.entries(
                    diagnosis.clasificacion.ml_dsm5_evaluacion
                      .major_criteria_details as Record<
                      string,
                      { status: string }
                    >,
                  ).map(([key, value]) => ({
                    id: key,
                    title: key.replace(/_/g, " ").toUpperCase(),
                    description: `Estado detectado: ${value.status === "detected" ? "PRESENTE" : "AUSENTE"}`,
                  }))
                : [],
            cie11: [],
          },
        };

        setData(mappedData);
      } catch (err: unknown) {
        console.error("Error fetching diagnosis analytics:", err);
        setError("Error al cargar los datos del caso");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [caseId, diagnosticosService]);

  return { data, loading, error };
};
