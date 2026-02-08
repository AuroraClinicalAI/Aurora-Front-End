import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const DataExportSection = () => {
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
              <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
                <option>Seleccionar una Opción</option>
                <option>CSV (Análisis Estadístico)</option>
                <option>JSON (Integración)</option>
                <option>Excel (.xlsx)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">CAMPOS A INCLUIR</label>
              <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
                <option>Seleccionar una Opción</option>
                <option>Solo Datos Demográficos</option>
                <option>Completo (Clínico + ML)</option>
              </select>
            </div>
          </div>

          <button className="px-8 py-3 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-indigo-100 uppercase tracking-widest whitespace-nowrap">
            Generar Exportación
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
