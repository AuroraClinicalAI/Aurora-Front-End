import { Card } from "@/components/ui";
import { Upload } from "lucide-react";

export const FileUploadModule = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Tipos de archivo permitidos:</p>
            <p className="text-[10px] font-medium text-slate-400">.csv, .json</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Tamaño máximo:</p>
            <p className="text-[10px] font-medium text-slate-400">50 MB por archivo</p>
          </div>
        </div>

        <div className="w-full min-h-[400px] bg-zinc-50 border border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-indigo-300 transition-all">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Upload className="w-10 h-10 text-zinc-900" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 mb-4">Arrastra Archivos o Haz Click Aquí Para Seleccionar</h3>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Formatos soportados: .csv, .json</p>

          <button className="px-10 py-3 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg text-sm font-bold transition-all shadow-md shadow-indigo-100">
            Subir Archivos
          </button>
        </div>
      </Card>
    </div>
  );
};
