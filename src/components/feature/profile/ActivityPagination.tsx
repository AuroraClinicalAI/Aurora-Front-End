import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const ActivityPagination = () => {
  return (
    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-[10px] text-slate-400 font-bold">Mostrando 1 a 4 de 50 resultados</p>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">Elementos por página</span>
          <select className="p-2 border border-zinc-200 rounded-lg text-[10px] font-bold outline-none bg-white">
            <option>10</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50 transition-all"><ChevronsLeft className="w-4 h-4" /></button>
          <button className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50 transition-all"><ChevronLeft className="w-4 h-4" /></button>

          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 text-white text-[10px] font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-900 text-[10px] font-bold hover:bg-zinc-50">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-900 text-[10px] font-bold hover:bg-zinc-50">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-900 text-[10px] font-bold hover:bg-zinc-50">4</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-900 text-[10px] font-bold hover:bg-zinc-50">5</button>

          <button className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50 transition-all"><ChevronRight className="w-4 h-4" /></button>
          <button className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:bg-zinc-50 transition-all"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};
