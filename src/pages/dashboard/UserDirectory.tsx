import { useState, useEffect, useCallback } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  Mail,
  Calendar,
  Loader2,
  Trash2,
  UserCheck,
  Edit,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  AlertTriangle,
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
  DropdownMenuSeparator,
} from "@/components/ui";
import { useAdminUsuarios } from "@/hooks/useAdminUsuarios";
import type { UserProfile } from "@/types/BackendTypes";
import { UserRole } from "@/types/Roles";

const ESTADO_OPTIONS = ["ACTIVO", "INACTIVO", "SUSPENDIDO", "EN REVISION", "ELIMINADO"];

export const UserDirectory = () => {
  const {
    usuarios,
    pagination,
    getUsuariosPaginated,
    updateUsuario,
    desactivarUsuario,
    loading,
  } = useAdminUsuarios();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Edit modal state
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});
  const [saving, setSaving] = useState(false);

  // Deactivate confirm state
  const [confirmDeactivate, setConfirmDeactivate] = useState<number | null>(null);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  const fetchUsers = useCallback(() => {
    const params: Record<string, string> = { page: String(currentPage) };
    if (searchTerm) params.busqueda = searchTerm;
    if (roleFilter) params.tipo_usuario = roleFilter;
    if (estadoFilter) params.estado = estadoFilter;
    getUsuariosPaginated(params);
  }, [currentPage, searchTerm, roleFilter, estadoFilter, getUsuariosPaginated]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, estadoFilter]);

  const handleOpenEdit = (user: UserProfile) => {
    setEditingUser(user);
    setEditForm({
      nombre: user.nombre,
      nombre_usuario: user.nombre_usuario,
      tipo_usuario: user.tipo_usuario,
      estado: user.estado,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    setSaving(true);
    const result = await updateUsuario(editingUser.id, editForm);
    if (result) {
      setEditingUser(null);
      fetchUsers();
    }
    setSaving(false);
  };

  const handleDeactivate = async (id: number) => {
    const success = await desactivarUsuario(id);
    if (success) {
      setConfirmDeactivate(null);
      fetchUsers();
    }
  };

  const totalPages = Math.ceil(pagination.count / 10);

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

  const getEstadoBadge = (estado?: string) => {
    const estadoStyles: Record<string, string> = {
      ACTIVO: "bg-emerald-50 text-emerald-700 border-emerald-100",
      INACTIVO: "bg-amber-50 text-amber-700 border-amber-100",
      SUSPENDIDO: "bg-red-50 text-red-700 border-red-100",
      "EN REVISION": "bg-blue-50 text-blue-700 border-blue-100",
      ELIMINADO: "bg-zinc-100 text-zinc-500 border-zinc-200",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${estadoStyles[estado ?? ""] || "bg-zinc-50 text-zinc-600 border-zinc-100"}`}>
        {estado ?? "Sin estado"}
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
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, correo o usuario..."
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
                <option value="">Todos los roles</option>
                {Object.values(UserRole).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-200 text-sm font-medium text-slate-600 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              >
                <option value="">Todos los estados</option>
                {ESTADO_OPTIONS.map(est => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <p className="text-xs text-slate-400 font-medium">
                Mostrando <span className="text-zinc-900 font-bold">{usuarios.length}</span> de{" "}
                <span className="text-zinc-900 font-bold">{pagination.count}</span> usuarios
              </p>
            </div>
          </div>

          {/* List Content */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-zinc-900 animate-spin" />
              </div>
            ) : usuarios.length > 0 ? (
              usuarios.map((user) => (
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

                    <div className="flex flex-col md:flex-row items-center gap-3">
                      {getRoleBadge(user.tipo_usuario)}
                      {getEstadoBadge(user.estado)}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
                          <DropdownMenuItem
                            className="gap-2 p-3 font-medium rounded-lg cursor-pointer"
                            onClick={() => handleOpenEdit(user)}
                          >
                            <Edit className="w-4 h-4" /> Editar usuario
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 p-3 font-medium rounded-lg cursor-pointer">
                            <UserCheck className="w-4 h-4" /> Editar permisos
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.estado !== 'ELIMINADO' && (
                            <DropdownMenuItem
                              className="gap-2 p-3 font-medium text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              onClick={() => setConfirmDeactivate(user.id)}
                            >
                              <Trash2 className="w-4 h-4" /> Desactivar usuario
                            </DropdownMenuItem>
                          )}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.previous}
                className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-zinc-600" />
              </button>
              <span className="text-sm font-bold text-zinc-900">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={!pagination.next}
                className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-zinc-600" />
              </button>
            </div>
          )}

          {/* Academic Disclaimer */}
          <div className="mt-20 bg-white border border-zinc-100 rounded-xl p-4">
            <p className="text-[10px] text-zinc-900 leading-relaxed">
              <span className="font-bold">Nota Administrativa:</span> Las acciones realizadas en este panel quedan registradas en el log de auditoría del sistema Aurora.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-zinc-900">Editar Usuario</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Correo (no editable)</label>
                <input
                  type="text"
                  value={editingUser.correo}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium bg-zinc-50 text-zinc-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nombre</label>
                <input
                  type="text"
                  value={editForm.nombre ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/5 bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nombre de Usuario</label>
                <input
                  type="text"
                  value={editForm.nombre_usuario ?? ""}
                  onChange={(e) => setEditForm({ ...editForm, nombre_usuario: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-zinc-900/5 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rol</label>
                  <select
                    value={editForm.tipo_usuario ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, tipo_usuario: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
                  >
                    {Object.values(UserRole).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estado</label>
                  <select
                    value={editForm.estado ?? ""}
                    onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
                  >
                    {ESTADO_OPTIONS.map(est => (
                      <option key={est} value={est}>{est}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> {saving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Deactivation Modal */}
      {confirmDeactivate !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">¿Desactivar usuario?</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Esta acción cambiará el estado del usuario a <strong>Eliminado</strong>, borrará su información personal y le impedirá iniciar sesión. Esta acción no se puede deshacer fácilmente.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setConfirmDeactivate(null)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDeactivate(confirmDeactivate)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Desactivar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};
