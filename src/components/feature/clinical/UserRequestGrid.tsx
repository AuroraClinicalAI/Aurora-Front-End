import { Search } from "lucide-react";
import { UserRequestCard } from "./UserRequestCard";

export const UserRequestGrid = () => {
  const requests = [
    { name: "Juan Pérez", email: "jperez@gmail.com", date: "14/01/2024", type: "Bloqueo" as const, status: "Pendiente" as const, reason: "Actividad Sospechosa Reportada" },
    { name: "María García", email: "mgarcia@gmail.com", date: "14/01/2024", type: "Desbloqueo" as const, status: "Activo" as const, reason: "Cuenta Verificada" },
    { name: "Carlos Rodríguez", email: "crodriguez@gmail.com", date: "12/01/2024", type: "Bloqueo" as const, status: "Bloqueado" as const, reason: "Violación en términos de Servicio" },
    { name: "Ana Martínez", email: "amartinez@gmail.com", date: "11/01/2024", type: "Desbloqueo" as const, status: "Pendiente" as const, reason: "Solicitud de Reactivación" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar Por Usuario o Email"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
          />
        </div>
        <select className="px-4 py-2.5 rounded-lg border border-zinc-200 text-xs font-medium text-slate-400 bg-white min-w-[200px]">
          <option>Todos los Estados</option>
          <option>Pendiente</option>
          <option>Activo</option>
          <option>Bloqueado</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {requests.map((req, idx) => (
          <UserRequestCard key={idx} {...req} />
        ))}
      </div>
    </div>
  );
};
