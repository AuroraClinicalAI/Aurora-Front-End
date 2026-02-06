import { Stethoscope, ClipboardCheck, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const QuickActions = () => {
  const actions = [
    {
      label: "Diagnóstico Clínico",
      desc: "Acceder a Herramientas de Diagnóstico",
      icon: <Stethoscope className="w-5 h-6" />,
      active: true
    },
    {
      label: "Revisar Casos",
      desc: "Evaluar Casos Registrados Por Estudiantes",
      icon: <ClipboardCheck className="w-5 h-6" />,
      active: false
    },
    {
      label: "Análisis Clínicos",
      desc: "Ver Análisis Automatizados de Viñetas",
      icon: <Activity className="w-5 h-6" />,
      active: false
    },
  ];

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-xl font-bold text-zinc-900">Acciones Rápidas</CardTitle>
        <p className="text-[10px] text-slate-400 font-medium leading-tight">
          Comienza un nuevo diagnóstico o revisa casos en curso según tu rol en la plataforma.
        </p>
      </CardHeader>
      <CardContent className="p-0 mt-4 flex flex-col gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all border text-left ${action.active
                ? "bg-indigo-400 border-indigo-500 text-white shadow-md shadow-indigo-100"
                : "bg-white border-zinc-100 text-zinc-600 hover:bg-zinc-50"
              }`}
          >
            <div className={`${action.active ? "text-white" : "text-zinc-900"}`}>
              {action.icon}
            </div>
            <div>
              <p className={`text-sm font-bold ${action.active ? "text-white" : "text-zinc-900"}`}>
                {action.label}
              </p>
              <p className={`text-[9px] font-medium leading-none ${action.active ? "text-indigo-100" : "text-slate-400"}`}>
                {action.desc}
              </p>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
