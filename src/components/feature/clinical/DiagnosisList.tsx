import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { useServices } from "@/context/useServices";
import type { Diagnostico } from "@/types/BackendTypes";

interface DiagnosisListProps {
  onSelect: (diagnosis: Diagnostico) => void;
}

export const DiagnosisList = ({ onSelect }: DiagnosisListProps) => {
  const { diagnosticosService } = useServices();
  const [diagnoses, setDiagnoses] = useState<Diagnostico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiagnoses();
  }, []);

  const loadDiagnoses = async () => {
    setLoading(true);
    try {
      const data = await diagnosticosService.getAllDiagnosticos();
      // Filter by state if needed (e.g., only pending review)
      setDiagnoses(data);
    } catch (err) {
      console.error("Error loading diagnoses", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Cargando casos...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Casos Clínicos Pendientes de Revisión</h3>
      {diagnoses.length === 0 ? (
        <p className="text-gray-500">No hay casos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagnoses.map((d) => (
            <div key={d.id_diagnostico} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-indigo-700 mb-1">{d.nombre}</h4>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">ID Caso:</span> #{d.id_diagnostico}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">Fecha:</span> {new Date(d.fecha).toLocaleDateString()}
              </div>
              <div className="text-xs bg-gray-100 p-2 rounded mb-4 truncate text-gray-500 italic">
                {d.hipotesis_diagnostica || "Sin hipótesis registrada"}
              </div>
              <Button className="w-full" onClick={() => onSelect(d)}>Revisar Caso</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
