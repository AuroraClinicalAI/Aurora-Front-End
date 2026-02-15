import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { SintomaIdentificado as Symptom } from "@/types/BackendTypes";

interface SymptomSelectorProps {
  symptoms: Symptom[];
  onChange: (symptoms: Symptom[]) => void;
}

const DEFAULT_SYMPTOMS = [
  "Estado de ánimo deprimido",
  "Anhedonia",
  "Alteraciones del sueño",
  "Fatiga o pérdida de energía",
  "Sentimientos de inutilidad",
  "Dificultad para concentrarse",
  "Cambios en el apetito",
  "Agitación o retraso psicomotor"
];

export const SymptomSelector = ({ symptoms, onChange }: SymptomSelectorProps) => {
  const [customSymptom, setCustomSymptom] = useState("");

  const updateIntensity = (index: number, intensity: number) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index].intensity = intensity;
    onChange(newSymptoms);
  };

  const removeSymptom = (index: number) => {
    const newSymptoms = symptoms.filter((_, i) => i !== index);
    onChange(newSymptoms);
  };

  const addSymptom = (name: string) => {
    if (!name || symptoms.find(s => s.name.toLowerCase() === name.toLowerCase())) return;
    onChange([...symptoms, { name, intensity: 0 }]);
  };

  const handleAddCustom = () => {
    if (customSymptom.trim()) {
      addSymptom(customSymptom.trim());
      setCustomSymptom("");
    }
  };

  // Symptoms not yet in the list
  const availableDefaults = DEFAULT_SYMPTOMS.filter(ds => !symptoms.find(s => s.name === ds));

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
          Síntomas Identificados y Gravedad
        </label>
        <p className="text-[10px] text-slate-400">Seleccione la intensidad de cada síntoma (0: No presenta, 1: Leve, 2: Moderado, 3: Grave)</p>
      </div>

      <div className="space-y-3">
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-100 rounded-xl transition-all hover:border-indigo-100">
            <span className="text-xs font-medium text-zinc-700">{symptom.name}</span>
            <div className="flex items-center gap-4">
              <div className="flex bg-zinc-200 p-0.5 rounded-lg gap-0.5">
                {[0, 1, 2, 3].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => updateIntensity(index, val)}
                    className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${symptom.intensity === val
                      ? (val === 0 ? 'bg-zinc-400 text-white' : 'bg-indigo-600 text-white shadow-sm')
                      : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => removeSymptom(index)}
                className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap gap-2">
          {availableDefaults.map((ds) => (
            <button
              key={ds}
              type="button"
              onClick={() => addSymptom(ds)}
              className="px-3 py-1.5 bg-white border border-dashed border-zinc-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 rounded-full text-[10px] font-medium transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" /> {ds}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustom())}
            placeholder="Agregar síntoma personalizado..."
            className="flex-1 p-3 rounded-xl border border-zinc-100 bg-zinc-50/30 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
