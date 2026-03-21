import { DefaultLayout } from "@/layout/DefaultLayout";
import { useUser, useModelos, useDiagnosticos } from "@/hooks";
import { useEffect, useState } from "react";
import type { Modelo, Diagnostico } from "@/types/BackendTypes";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui";
import {
  ClipboardList,
  Users,
  Search,
  Settings,
  HelpCircle,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { UserRole } from "@/types/Roles";

export const Dashboard = () => {
  const { usuario } = useUser();
  const { getAllModelos } = useModelos();
  const { getAllDiagnosticos } = useDiagnosticos();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [latestModel, setLatestModel] = useState<Modelo | null>(null);
  const [diagnosticos, setDiagnosticos] = useState<Diagnostico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const models = await getAllModelos();
      if (models && models.length > 0) {
        setLatestModel(models[models.length - 1]);
      }
      const diags = await getAllDiagnosticos();
      if (diags) setDiagnosticos(diags);
    };
    fetchData();
  }, [getAllModelos, getAllDiagnosticos]);

  if (!usuario) return null;

  const roleLabels: Record<UserRole, string> = {
    [UserRole.ADMIN]: "Administrador",
    [UserRole.MODERADOR]: "Moderador",
    [UserRole.PSICOLOGO]: "Psicólogo",
    [UserRole.PRACTICANTE]: "Practicante",
    [UserRole.EVALUADOR]: "Evaluador",
  };

  const menuActions = [
    {
      title: "Historial de Casos",
      description: "Gestiona y revisa diagnósticos previos",
      icon: <ClipboardList className="w-6 h-6 text-indigo-500" />,
      path: "/cases",
      roles: [UserRole.PRACTICANTE, UserRole.PSICOLOGO, UserRole.EVALUADOR, UserRole.ADMIN, UserRole.MODERADOR],
      color: "bg-indigo-50"
    },
    {
      title: "Investigación",
      description: "Accede al panel de análisis avanzado",
      icon: <Search className="w-6 h-6 text-emerald-500" />,
      path: "/researching-panel",
      roles: [UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO],
      color: "bg-emerald-50"
    },
    {
      title: "Administración",
      description: "Gestión de usuarios y solicitudes",
      icon: <Users className="w-6 h-6 text-orange-500" />,
      path: "/admin-panel",
      roles: [UserRole.ADMIN, UserRole.MODERADOR],
      color: "bg-orange-50"
    },
    {
      title: "Reportes",
      description: "Métricas y estadísticas del sistema",
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      path: "/reports",
      roles: [UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.EVALUADOR],
      color: "bg-blue-50"
    },
    {
      title: "Configuración",
      description: "Ajustes de tu perfil y cuenta",
      icon: <Settings className="w-6 h-6 text-slate-500" />,
      path: "/profile/settings",
      roles: [UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.PRACTICANTE, UserRole.EVALUADOR],
      color: "bg-slate-50"
    },
    {
      title: "Centro de Ayuda",
      description: "FAQs y soporte técnico",
      icon: <HelpCircle className="w-6 h-6 text-purple-500" />,
      path: "/help",
      roles: [UserRole.ADMIN, UserRole.MODERADOR, UserRole.PSICOLOGO, UserRole.PRACTICANTE, UserRole.EVALUADOR],
      color: "bg-purple-50"
    }
  ];

  const filteredActions = menuActions.filter(action =>
    action.roles.includes(usuario.tipo_usuario as UserRole)
  );

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-300 to-indigo-200 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-lg shadow-indigo-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white space-y-4 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold">¡Hola, {usuario.nombre?.split(' ')[0] || 'Usuario'}!</h1>
              <p className="text-indigo-50 text-lg max-w-md">
                Bienvenido a tu panel central. Desde aquí puedes gestionar todas tus operaciones clínicas y administrativas.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Sesión como {roleLabels[usuario.tipo_usuario as UserRole]}
              </div>
            </div>

            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white/30 shadow-2xl">
                <AvatarImage src={`${apiUrl}${usuario.imagen}`} alt={usuario.nombre || 'Usuario'} />
                <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-600">
                  {usuario.nombre?.substring(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActions.map((action) => (
                <Card
                  key={action.path}
                  className="group hover:shadow-xl transition-all duration-300 border-zinc-100 cursor-pointer overflow-hidden rounded-2xl"
                  onClick={() => navigate(action.path)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-zinc-900">{action.title}</h3>
                          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Placeholder or Secondary Stats */}
          <div className="grid gap-8">
            <Card className="rounded-[2rem] border-zinc-100 shadow-sm transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-zinc-900">Estado del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      Precisión del Modelo {latestModel ? `(${new Date(latestModel.fecha_entrenamiento).toLocaleDateString()})` : ''}
                    </span>
                    <span className="font-bold text-indigo-600">
                      {latestModel && latestModel.precision ? (latestModel.precision * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full transition-all duration-1000"
                      style={{ width: `${latestModel && latestModel.precision ? (latestModel.precision * 100).toFixed(1) : 0}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">Casos Hoy</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {diagnosticos.filter(d => d.fecha && d.fecha.startsWith(new Date().toISOString().split('T')[0])).length}
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Casos Totales</p>
                    <p className="text-2xl font-bold text-emerald-900">
                      {diagnosticos.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-20 bg-white border border-zinc-100 rounded-xl p-4">
            <p className="text-[10px] text-zinc-900 leading-relaxed">
              <span className="font-bold">Uso Académico:</span> Este sistema es únicamente para fines educativos. Los resultados no constituyen diagnósticos médicos reales y no deben usarse para decisiones clínicas en pacientes reales.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
