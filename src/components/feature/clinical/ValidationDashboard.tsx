import { Card } from "@/components/ui";
import { Users, CheckCircle, LogOut, Clock, Database, Brain, Network } from "lucide-react";

const ValidationStatCard = ({ label, value, subtext, icon }: { label: string, value: string, subtext: string, icon: React.ReactNode }) => (
  <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-bold text-zinc-900">{value}</p>
      </div>
      <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-900">
        {icon}
      </div>
    </div>
    <p className="text-[8px] font-bold text-green-500 uppercase tracking-tight">{subtext}</p>
  </Card>
);

const SystemComponentBar = ({ label, value, percentage, icon }: { label: string, value: string, percentage: number, icon: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="text-zinc-900">{icon}</div>
        <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">{label}</span>
      </div>
      <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[9px] font-bold text-zinc-900">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#637bc4] rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const ValidationDashboard = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ValidationStatCard
          label="Archivos Cargados"
          value="1,247"
          subtext="+12% desde el último mes"
          icon={<Users className="w-5 h-5" />}
        />
        <ValidationStatCard
          label="Pruebas de Carga"
          value="98.5%"
          subtext="+3.1% desde el último mes"
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <ValidationStatCard
          label="Tiempo de Respuesta"
          value="1.2s"
          subtext="-0.3s desde el último mes"
          icon={<LogOut className="w-5 h-5" />}
        />
        <ValidationStatCard
          label="Integridad de Datos"
          value="100%"
          subtext="0% desde el último mes"
          icon={<Clock className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System State */}
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
          <h4 className="text-md font-bold text-zinc-900 mb-2">Estado del Sistema</h4>
          <p className="text-[10px] text-slate-400 font-medium mb-12">Monitoreo en tiempo real de los componentes críticos</p>

          <div className="space-y-10">
            <SystemComponentBar label="Base de Datos" value="300ms" percentage={100} icon={<Database className="w-4 h-4" />} />
            <SystemComponentBar label="Modelo ML" value="300ms" percentage={75} icon={<Brain className="w-4 h-4" />} />
            <SystemComponentBar label="API Gateway" value="Operativo" percentage={100} icon={<Network className="w-4 h-4" />} />
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
          <h4 className="text-md font-bold text-zinc-900 mb-2">Actividad Reciente</h4>
          <p className="text-[10px] text-slate-400 font-medium mb-12">Últimas Operaciones Realizadas en el Sistema</p>

          <div className="space-y-6">
            {[
              { text: "Validación de reporte completada", time: "Hace 5 min" },
              { text: "Carga de archivo de prueba", time: "Hace 12 min" },
              { text: "Entrenamiento de Modelo Completado", time: "Hace 1 hora" },
              { text: "Backup de datos completado", time: "Hace 2 horas" }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-300" />
                  <p className="text-[10px] font-medium text-zinc-900">{activity.text}</p>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
