import { Card } from "@/components/ui";
import { Filter } from "lucide-react";

export const ResearchFilters = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mb-8">
      <div className="flex items-center gap-2 mb-8">
        <Filter className="w-5 h-5 text-zinc-900" />
        <h3 className="text-xl font-bold text-zinc-900">Filtros de Análisis</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">COHORTE</label>
          <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
            <option>Seleccionar una Opción</option>
            <option>2024-I</option>
            <option>2024-II</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">GÉNERO</label>
          <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
            <option>Seleccionar una Opción</option>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">RANGO DE EDAD</label>
          <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
            <option>Seleccionar una Opción</option>
            <option>18-25</option>
            <option>26-40</option>
            <option>41-60</option>
          </select>
        </div>

        <div className="space-y-2 md:col-start-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">MODELO ACTIVO</label>
          <select className="w-full p-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all">
            <option>Seleccionar una Opción</option>
            <option>Random Forest V2.1</option>
            <option>SVM Optimizer</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
