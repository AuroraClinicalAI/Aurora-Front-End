import { useState, useEffect } from "react";

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

  useEffect(() => {
    // Simulando llamada al backend
    const fetchData = async () => {
      setLoading(true);
      try {
        // En un escenario real: const response = await api.get(`/diagnosticos/${caseId}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const dummyData = {
          id: caseId || "ID-9932",
          lastConsultation: "27/02/2024",
          ageGroup: "Adulto",
          gender: "Masculino",
          clinicalVignette:
            'El paciente reporta sentirse "sin energía" y "sin motivación" durante las últimas 4 semanas. Ha experimentado dificultad para dormir, despertándose frecuentemente durante la noche. Menciona que ha perdido interés en actividades que antes disfrutaba como leer y salir con amigos. Ha tenido pensamientos recurrentes de inutilidad y expresa que "ya nada tiene sentido". Ha perdido aproximadamente 5kg en el último mes sin hacer dieta. Su rendimiento laboral ha disminuido significativamente.',
          analysis: {
            globalScore: 18,
            maxScore: 32,
            symptoms: [
              { name: "Estado de ánimo deprimido", value: 3 },
              { name: "Anhedonia", value: 3 },
              { name: "Alteraciones del sueño", value: 2 },
              { name: "Fatiga o pérdida de energía", value: 3 },
              { name: "Sentimientos de inutilidad", value: 2 },
              { name: "Problemas de concentración", value: 1 },
              { name: "Pensamientos de muerte", value: 1 },
              { name: "Cambios en apetito/peso", value: 3 },
            ],
          },
          criteria: {
            dsm5: [
              {
                id: "a1",
                title: "Criterio A1",
                description:
                  "Estado de ánimo deprimido la mayor parte del día, casi todos los días.",
              },
              {
                id: "a2",
                title: "Criterio A2",
                description:
                  "Disminución importante del interés o el placer por todas o casi todas las actividades.",
              },
              {
                id: "a3",
                title: "Criterio A3",
                description:
                  "Pérdida importante de peso sin hacer dieta o aumento de peso, o disminución o aumento del apetito.",
              },
              {
                id: "a4",
                title: "Criterio A4",
                description: "Insomnio o hipersomnia casi todos los días.",
              },
              {
                id: "a5",
                title: "Criterio A5",
                description:
                  "Agitación o retraso psicomotor casi todos los días.",
              },
              {
                id: "a6",
                title: "Criterio A6",
                description: "Fatiga o pérdida de energía casi todos los días.",
              },
              {
                id: "a7",
                title: "Criterio A7",
                description:
                  "Sentimiento de inutilidad o culpabilidad excesiva o inapropiada.",
              },
              {
                id: "a8",
                title: "Criterio A8",
                description:
                  "Disminución de la capacidad para pensar o concentrarse, o para tomar decisiones.",
              },
              {
                id: "a9",
                title: "Criterio A9",
                description:
                  "Pensamientos de muerte recurrentes, ideas suicidas, intento de suicidio o un plan específico.",
              },
            ],
            cie11: [
              {
                id: "b1",
                title: "Estado de ánimo depresivo",
                description:
                  "El individuo experimenta un estado de ánimo deprimido la mayor parte del día.",
              },
              {
                id: "b2",
                title: "Pérdida de interés",
                description:
                  "Pérdida de interés o placer en actividades que normalmente son gratificantes.",
              },
            ],
          },
        };

        setData(dummyData);
      } catch (err: unknown) {
        console.error(err);
        setError("Error al cargar los datos del caso");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [caseId]);

  return { data, loading, error };
};
