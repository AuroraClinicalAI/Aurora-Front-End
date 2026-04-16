import { useState, useRef, useCallback } from "react";
import { Card } from "@/components/ui";
import { Upload, CheckCircle, AlertTriangle, Loader2, Trash2, File as FileIcon } from "lucide-react";
import { useModelTesting } from "@/hooks";

export const FileUploadModule = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Array<{ name: string; message: string; filas: number }>>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { testUploadModel, loading, error } = useModelTesting();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.name.endsWith('.csv'));
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(f => f.name.endsWith('.csv'));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setResults([]);
    for (const f of files) {
      try {
        const data = await testUploadModel(f);
        setResults(prev => [...prev, { name: f.name, message: data.message, filas: data.filas }]);
      } catch {
        setResults(prev => [...prev, { name: f.name, message: "Error al cargar dataset", filas: 0 }]);
      }
    }
  };

  const removeFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Tipos de archivo permitidos:</p>
            <p className="text-[10px] font-medium text-slate-400">.csv</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">Tamaño máximo:</p>
            <p className="text-[10px] font-medium text-slate-400">50 MB por archivo</p>
          </div>
        </div>

        <input
          type="file"
          accept=".csv"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div
          className={`w-full min-h-[300px] border border-dashed rounded-[2rem] flex flex-col items-center justify-center p-12 text-center group transition-all ${isDragActive ? 'bg-indigo-50 border-indigo-400' : 'bg-zinc-50 border-zinc-200 hover:border-indigo-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {files.length === 0 ? (
            <div className="cursor-pointer flex flex-col items-center" onClick={() => fileInputRef.current?.click()}>
              <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-zinc-900" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                Arrastra Archivos o Haz Click Aquí
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Multiples formatos .csv soportados
              </p>
            </div>
          ) : (
            <div className="w-full">
              <h3 className="text-lg font-bold text-zinc-900 mb-4 text-left">Archivos en cola ({files.length})</h3>
              <div className="space-y-3 mb-8 w-full max-h-48 overflow-y-auto pr-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-zinc-100 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileIcon className="w-5 h-5 text-indigo-500" />
                      <span className="text-sm font-medium text-zinc-700">{file.name}</span>
                      <span className="text-[10px] text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <button onClick={(e) => removeFile(idx, e)} className="p-1 hover:bg-red-50 text-red-400 rounded-md transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg text-sm font-bold transition-all"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  Agregar más
                </button>
                <button
                  className="px-10 py-2 bg-[#637bc4] hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2"
                  onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Procesando..." : "Subir y Analizar Todo"}
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 border border-zinc-200 rounded-xl overflow-hidden bg-white animate-in fade-in slide-in-from-top-4">
            <div className="p-4 flex items-center gap-3 border-b border-zinc-100 bg-zinc-50">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-bold text-zinc-900">Resultados de Cargas Completadas</h4>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {results.map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{res.name}</p>
                      <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${res.message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{res.message}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filas</p>
                      <p className="text-lg font-bold text-zinc-900">{res.filas}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
