import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const CaseDataForm = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-zinc-900">Datos del Caso</CardTitle>
        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md">
          Ingrese aquí la información básica del paciente o caso simulado. Todos los datos serán tratados de forma anónima.
        </p>
      </CardHeader>

      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">NOMBRE DEL CASO</label>
          <input
            type="text"
            placeholder="Escriba aquí..."
            className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">RANGO DE EDAD</label>
          <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all bg-white">
            <option>Seleccionar una Opción</option>
            <option>18-25 años</option>
            <option>26-40 años</option>
            <option>41-60 años</option>
            <option>60+ años</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">GÉNERO</label>
          <select className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all bg-white">
            <option>Seleccionar una Opción</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="space-y-2 md:col-start-2">
          <label className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">FECHA DE CONSULTA</label>
          <input
            type="date"
            className="w-full p-3 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
      </CardContent>
    </Card>
  );
};
