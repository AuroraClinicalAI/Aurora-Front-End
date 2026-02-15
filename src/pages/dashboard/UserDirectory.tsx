import { useState, useEffect } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  UserPlus,
  Mail,
  Calendar,
  Loader2,
  Trash2,
  UserCheck
} from "lucide-react";
import {
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui";
import { useServices } from "@/context/useServices";
import type { UserProfile } from "@/types/BackendTypes";
import { UserRole } from "@/types/Roles";

export const UserDirectory = () => {
  const { usuariosService } = useServices();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usuariosService.getAllUsuarios();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [usuariosService]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "Todos" || user.tipo_usuario === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = {
      [UserRole.ADMIN]: "bg-red-50 text-red-700 border-red-100",
      [UserRole.MODERADOR]: "bg-orange-50 text-orange-700 border-orange-100",
      [UserRole.PSICOLOGO]: "bg-emerald-50 text-emerald-700 border-emerald-100",
      [UserRole.EVALUADOR]: "bg-blue-50 text-blue-700 border-blue-100",
      [UserRole.PRACTICANTE]: "bg-slate-50 text-slate-700 border-slate-100",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${roleStyles[role] || "bg-zinc-50 text-zinc-600 border-zinc-100"}`}>
        {role}
      </span>
    );
  };

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-zinc-900">Directorio de Usuarios</h1>
              <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">Gestión Administrativa de Accesos y Roles</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-all shadow-lg">
              <UserPlus className="w-4 h-4" /> Invitar Usuario
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo electrónico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all bg-white"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-200 text-sm font-medium text-slate-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              >
                <option value="Todos">Todos los roles</option>
                {Object.values(UserRole).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <p className="text-xs text-slate-400 font-medium">
                Mostrando <span className="text-zinc-900 font-bold">{filteredUsers.length}</span> usuarios
              </p>
            </div>
          </div>

          {/* List Content */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-zinc-900 animate-spin" />
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card key={user.id} className="rounded-2xl border-zinc-100 shadow-sm transition-all hover:shadow-md overflow-hidden">
                  <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-sm flex-shrink-0">
                      <AvatarImage src={`${apiUrl}${user.imagen}`} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                        {user.nombre?.substring(0, 2).toUpperCase() || '??'}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-1">
                      <h3 className="font-bold text-zinc-900 text-lg">{user.nombre || "Usuario Sin Nombre"}</h3>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {user.correo}</span>
                        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> {user.nombre_usuario}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Último acceso: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Nunca'}</span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                      {getRoleBadge(user.tipo_usuario)}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                          <DropdownMenuItem className="gap-2 p-3 font-medium rounded-lg cursor-pointer">
                            <UserCheck className="w-4 h-4" /> Editar permisos
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 p-3 font-medium rounded-lg cursor-pointer">
                            <Shield className="w-4 h-4 ml-auto" /> Cambiar rol
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 p-3 font-medium text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                            <Trash2 className="w-4 h-4" /> Eliminar usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center text-slate-500 font-medium">
                No se encontraron usuarios con los criterios seleccionados.
              </div>
            )}
          </div>

          <div className="mt-20 bg-white border border-zinc-100 rounded-xl p-4">
            <p className="text-[10px] text-zinc-900 leading-relaxed">
              <span className="font-bold">Nota Administrativa:</span> Las acciones realizadas en este panel quedan registradas en el log de auditoría del sistema Aurora.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
