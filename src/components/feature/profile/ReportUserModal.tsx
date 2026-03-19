import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
  Label,
  Textarea
} from "@/components/ui";
import { Search, User, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useAdminUsuarios } from "@/hooks/useAdminUsuarios";
import { useServices } from "@/context/useServices";
import type { UserProfile } from "@/types/BackendTypes";

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportUserModal = ({ isOpen, onClose }: ReportUserModalProps) => {
  const { getUsuariosPaginated, loading: searchLoading } = useAdminUsuarios();
  const { adminService } = useServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [motivo, setMotivo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Búsqueda reactiva con debounce manual simple
  useEffect(() => {
    if (searchTerm.length < 3) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const resp = await getUsuariosPaginated({ busqueda: searchTerm, estado: 'ACTIVO' });
      if (resp) {
        setResults(resp.results);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, getUsuariosPaginated]);

  const handleSubmit = async () => {
    if (!selectedUser || !motivo.trim()) return;

    setSubmitting(true);
    setStatus('idle');
    try {
      await adminService.createSolicitud({
        tipo: 'BLOQUEAR',
        motivo: motivo,
        usuario_objetivo: selectedUser.id as never // Hack for type compatibility with Partial<Solicitud>
      });
      setStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: unknown) {
      setStatus('error');
      const error = err as { response?: { data?: { detail?: string } } };
      setErrorMessage(error.response?.data?.detail || "Error al crear la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setResults([]);
    setSelectedUser(null);
    setMotivo('');
    setStatus('idle');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 overflow-hidden">
        <DialogHeader className="space-y-4">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold text-zinc-900">Reportar Usuario</DialogTitle>
            <DialogDescription className="text-slate-500 text-sm">
              Busca al usuario que deseas reportar y describe el motivo detalladamente.
            </DialogDescription>
          </div>
        </DialogHeader>

        {status === 'success' ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-lg font-bold text-zinc-900">Reporte enviado con éxito</p>
            <p className="text-sm text-slate-500 text-center">Un administrador revisará la solicitud pronto.</p>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Buscar Usuario</Label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Nombre de usuario o correo..."
                  className="pl-11 h-12 rounded-xl border-zinc-200 focus:ring-indigo-500/20"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedUser) setSelectedUser(null);
                  }}
                />
                {searchLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  </div>
                )}
              </div>

              {results.length > 0 && !selectedUser && (
                <div className="mt-2 max-h-40 overflow-y-auto rounded-xl border border-zinc-100 bg-slate-50/50 p-2 space-y-1 animate-in slide-in-from-top-2">
                  {results.slice(0, 5).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchTerm(user.nombre_usuario);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{user.nombre || user.nombre_usuario}</p>
                        <p className="text-[10px] text-slate-500">{user.correo}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="mt-2 flex items-center gap-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 animate-in fade-in zoom-in-95">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">{selectedUser.nombre || selectedUser.nombre_usuario}</p>
                    <p className="text-xs text-indigo-600 font-medium">@{selectedUser.nombre_usuario}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-red-500"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cambiar
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Motivo del Reporte</Label>
              <Textarea
                placeholder="Explica qué comportamiento o inconveniente has detectado..."
                className="min-h-[100px] rounded-2xl resize-none border-zinc-200 focus:ring-indigo-500/20"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-500 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                {errorMessage}
              </p>
            )}

            <DialogFooter className="pt-4 gap-3 sm:gap-0">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="rounded-xl font-bold"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedUser || !motivo.trim() || submitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-indigo-100 disabled:bg-slate-200"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Enviar Reporte"
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
