import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import type { ExportParams } from "@/types/BackendTypes";
import { useState } from "react";

interface DataExportSectionProps {
  handleExport: (params: Partial<ExportParams>) => Promise<void>;
  exporting: boolean;
}

export const DataExportSection = ({ handleExport, exporting }: DataExportSectionProps) => {
  const [format, setFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [category, setCategory] = useState('completo');

  return (
    <div id="export-section" className="scroll-mt-12">
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-12">
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-xl font-bold text-zinc-900">Exportación de Datasets</CardTitle>
          <p className="text-[10px] text-slate-400 font-medium">Exportar datos anonimizados para análisis externo (requiere consentimiento)</p>
        </CardHeader>

        <CardContent className="p-0 flex flex-col md:flex-row items-end gap-10">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">FORMATO DE EXPORTACIÓN</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
                className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all"
              >
                <option value="csv">CSV (Análisis Estadístico)</option>
                <option value="xlsx">Excel (XLSX - Reporte)</option>
                <option value="json">JSON (Integración)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">CATEGORÍA DE DATOS</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all"
              >
                <option value="completo">Completo (Clínico + ML)</option>
                <option value="demograficos">Solo Datos Demográficos</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => handleExport({ format })}
            disabled={exporting}
            className="px-8 py-3 bg-[#637bc4] hover:bg-indigo-500 disabled:bg-slate-300 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100 uppercase tracking-widest whitespace-nowrap"
          >
            {exporting ? "Generando..." : "Generar Exportación"}
          </button>
        </CardContent>
      </Card>

      <div className="bg-white border border-zinc-100 rounded-xl p-4 mt-8">
        <p className="text-[10px] text-zinc-900 leading-relaxed">
          <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
        </p>
      </div>
    </div>
  );
};
