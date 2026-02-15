import { DefaultLayout } from "@/layout/DefaultLayout";
import { AdminStatsSummary } from "@/components/feature/clinical/AdminStatsSummary";
import { UserRequestGrid } from "@/components/feature/clinical/UserRequestGrid";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-zinc-900">Panel de Administración</h1>
            <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase mt-1">Gestión de Usuarios y Solicitudes</p>
          </div>

          <div className="space-y-12">
            {/* Stats */}
            <AdminStatsSummary />

            {/* Main Content Area */}
            <div className="bg-white border border-zinc-100 rounded-[2rem] p-4 sm:p-12 shadow-sm">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900">Solicitudes de Usuario</h2>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">Revisa y gestiona las solicitudes de bloqueo y desbloqueo de usuarios</p>
                </div>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  Ver Directorio Completo de Usuarios &rarr;
                </button>
              </div>

              <UserRequestGrid />
            </div>
          </div>

          {/* Academic Disclaimer */}
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
