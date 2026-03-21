import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Stethoscope, TrendingUp, BookMarked, ListTodo } from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: 'Completado' | 'Validado' | 'En Revisión';
  icon: React.ReactNode;
}

export const ProfileActivityList = () => {
  const navigate = useNavigate();
  const activities: Activity[] = [
    {
      id: "1",
      title: "Caso Clínico #2024-015",
      description: "Evaluación de estudiante de 20 años con síntomas depresivos",
      time: "Hace 2 Horas",
      status: 'Completado',
      icon: <Stethoscope className="w-5 h-5" />
    },
    {
      id: "2",
      title: "Análisis PHQ-9",
      description: "Revisión de escala de tamizaje para caso #2024-012",
      time: "Hace 5 Horas",
      status: 'Validado',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: "3",
      title: "Supervisión de Caso",
      description: "Caso Registrado Por Estudiante: Karina Vélez",
      time: "Ayer",
      status: 'En Revisión',
      icon: <BookMarked className="w-5 h-5" />
    },
    {
      id: "4",
      title: "Análisis de Viñeta Clínica",
      description: "Revisión de escala de tamizaje para caso #2024-012",
      time: "Hace 5 Horas",
      status: 'Completado',
      icon: <ListTodo className="w-5 h-5" />
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completado': return "border-zinc-200 text-zinc-900 bg-white";
      case 'Validado': return "border-indigo-100 text-indigo-400 bg-indigo-50/30";
      case 'En Revisión': return "border-orange-100 text-orange-400 bg-orange-50/30";
      default: return "";
    }
  };

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden mt-8 p-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-xl font-bold text-zinc-900">Actividad Reciente</CardTitle>
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Revisa tus últimas acciones dentro de la plataforma y el estado actual de los casos clínicos que supervisas.
        </p>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-50 hover:bg-zinc-50/50 transition-all">
            <div className="bg-zinc-50 p-3 rounded-xl text-zinc-900 border border-zinc-100">
              {activity.icon}
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-zinc-900">{activity.title}</h4>
              <p className="text-[10px] text-slate-400 font-medium">{activity.description}</p>
              <p className="text-[8px] text-slate-300 font-bold uppercase mt-1">🕒 {activity.time}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold ${getStatusStyles(activity.status)}`}>
              {activity.status}
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/recent-activity")}
          className="w-fit mx-auto mt-6 px-12 py-3 bg-[#637bc4] hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-100 text-xs font-bold transition-all"
        >
          Ver Todo el Historial
        </button>
      </CardContent>
    </Card>
  );
};
