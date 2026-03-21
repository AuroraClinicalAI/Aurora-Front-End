import { Card } from "@/components/ui";

export const ActivityFilters = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-zinc-900 mb-1">Filtros</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">BUSCAR</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Busca Por Título, Descripción..."
              className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">TIPO DE ACTIVIDAD</label>
            <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none bg-white">
              <option>Todos los Tipos</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">ESTADO</label>
            <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none bg-white">
              <option>Todos los Estados</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">DESDE</label>
            <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none bg-white">
              <option>Seleccionar Fecha</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">HASTA</label>
            <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none bg-white">
              <option>Seleccionar Fecha</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};
