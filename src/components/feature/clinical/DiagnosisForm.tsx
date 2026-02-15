import { useState } from "react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import type { Diagnostico } from "@/types/BackendTypes";
import { Plus, Trash2 } from "lucide-react";

interface DiagnosisFormProps {
  initialData?: Partial<Diagnostico>;
  onSubmit: (data: Partial<Diagnostico>) => void;
  onCancel: () => void;
}

export const DiagnosisForm = ({ initialData, onSubmit, onCancel }: DiagnosisFormProps) => {
  // Local state interface to handle object-based tamizaje editing
  interface DiagnosisFormState extends Omit<Partial<Diagnostico>, 'tamizaje'> {
    tamizaje: Record<string, string>;
  }

  const [formData, setFormData] = useState<DiagnosisFormState>({
    nombre: initialData?.nombre || "",
    historia_clinica: initialData?.historia_clinica || "",
    impresion_clinica: initialData?.impresion_clinica || "",
    hipotesis_diagnostica: initialData?.hipotesis_diagnostica || "",
    tamizaje: typeof initialData?.tamizaje === 'string' ? JSON.parse(initialData.tamizaje) : (initialData?.tamizaje || {}),
    sintomas_identificados: initialData?.sintomas_identificados || [],
  });

  // Sintomas handler (Array of strings)
  const [newSintoma, setNewSintoma] = useState("");

  const addSintoma = () => {
    if (newSintoma.trim()) {
      const currentSintomas = Array.isArray(formData.sintomas_identificados) ? formData.sintomas_identificados : [];
      setFormData({
        ...formData,
        sintomas_identificados: [...currentSintomas, newSintoma.trim()]
      });
      setNewSintoma("");
    }
  };

  const removeSintoma = (index: number) => {
    const currentSintomas = Array.isArray(formData.sintomas_identificados) ? formData.sintomas_identificados : [];
    setFormData({
      ...formData,
      sintomas_identificados: currentSintomas.filter((_, i) => i !== index)
    });
  };

  // Tamizaje handler (Simple Key-Value for now)
  const [tamizajeKey, setTamizajeKey] = useState("");
  const [tamizajeValue, setTamizajeValue] = useState("");

  const addTamizaje = () => {
    if (tamizajeKey.trim() && tamizajeValue.trim()) {
      setFormData({
        ...formData,
        tamizaje: {
          ...formData.tamizaje,
          [tamizajeKey.trim()]: tamizajeValue.trim()
        }
      });
      setTamizajeKey("");
      setTamizajeValue("");
    }
  };

  const removeTamizaje = (key: string) => {
    const newTamizaje = { ...formData.tamizaje };
    delete newTamizaje[key];
    setFormData({ ...formData, tamizaje: newTamizaje });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert back to backend format
    const submissionData: Partial<Diagnostico> = {
      ...formData,
      tamizaje: JSON.stringify(formData.tamizaje)
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Registro de Diagnóstico Clínico</h3>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nombre">Título del Caso / Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            placeholder="Ej: Caso Clínico de Ansiedad - Paciente #123"
          />
        </div>

        <div>
          <Label htmlFor="historia">Historia Clínica</Label>
          <Textarea
            id="historia"
            value={formData.historia_clinica}
            onChange={(e) => setFormData({ ...formData, historia_clinica: e.target.value })}
            required
            className="min-h-[150px]"
            placeholder="Describa los antecedentes, motivo de consulta y evolución..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sintomas Section */}
          <div className="border p-4 rounded-md bg-gray-50">
            <Label className="mb-2 block">Síntomas Identificados</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSintoma}
                onChange={(e) => setNewSintoma(e.target.value)}
                placeholder="Ej: Insomnio"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSintoma())}
              />
              <Button type="button" onClick={addSintoma} size="sm"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(Array.isArray(formData.sintomas_identificados) ? formData.sintomas_identificados : []).map((sintoma: string, idx: number) => (
                <span key={idx} className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-full flex items-center gap-1">
                  {sintoma}
                  <button type="button" onClick={() => removeSintoma(idx)} className="text-indigo-600 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Tamizaje Section */}
          <div className="border p-4 rounded-md bg-gray-50">
            <Label className="mb-2 block">Tamizaje (Pruebas/Escalas)</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tamizajeKey}
                onChange={(e) => setTamizajeKey(e.target.value)}
                placeholder="Prueba (Ej: GAD-7)"
              />
              <Input
                value={tamizajeValue}
                onChange={(e) => setTamizajeValue(e.target.value)}
                placeholder="Puntaje/Resultado"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTamizaje())}
              />
              <Button type="button" onClick={addTamizaje} size="sm"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-1 mt-2">
              {Object.entries(formData.tamizaje).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-white p-2 rounded border text-sm">
                  <span><span className="font-semibold">{key}:</span> {value as string}</span>
                  <button type="button" onClick={() => removeTamizaje(key)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="impresion">Impresión Clínica</Label>
          <Textarea
            id="impresion"
            value={formData.impresion_clinica}
            onChange={(e) => setFormData({ ...formData, impresion_clinica: e.target.value })}
            required
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="hipotesis">Hipótesis Diagnóstica</Label>
          <Textarea
            id="hipotesis"
            value={formData.hipotesis_diagnostica}
            onChange={(e) => setFormData({ ...formData, hipotesis_diagnostica: e.target.value })}
            required
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar Diagnóstico</Button>
      </div>
    </form>
  );
};
