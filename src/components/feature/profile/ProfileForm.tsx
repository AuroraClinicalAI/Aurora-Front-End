import { Button } from "@/components/ui";
import type { UserState } from "@/types/AuthType";
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useServices } from "@/context/useServices";
import { setUsuario } from "@/store/userSlice";

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { authService } = useServices();
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  const [formData, setFormData] = useState({
    nombre: userState.usuario?.nombre || '',
    email: userState.usuario?.correo || '',
    nombreUsuario: userState.usuario?.nombre_usuario || '',
    tipoUsuario: userState.usuario?.tipo_usuario || '',
    claveActual: '',
    nuevaClave: '',
    confirmarNuevaClave: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 1. Update Name if changed
      if (formData.nombre !== userState.usuario?.nombre) {
        const updatedUser = await authService.updateProfile({ nombre: formData.nombre });
        dispatch(setUsuario(updatedUser));
        setSuccess("Perfil actualizado correctamente");
      }

      // 2. Update Password if fields are filled
      if (formData.nuevaClave || formData.confirmarNuevaClave || formData.claveActual) {
        if (!formData.claveActual || !formData.nuevaClave || !formData.confirmarNuevaClave) {
          setError("Todos los campos de contraseña son requeridos para el cambio");
          setLoading(false);
          return;
        }

        if (formData.nuevaClave !== formData.confirmarNuevaClave) {
          setError("Las nuevas contraseñas no coinciden");
          setLoading(false);
          return;
        }

        await authService.changePassword({
          correo: formData.email,
          clave: formData.claveActual,
          nueva_clave: formData.nuevaClave,
          confirmar_clave: formData.confirmarNuevaClave
        });
        setSuccess(prev => prev ? prev + " e contraseña actualizada" : "Contraseña actualizada correctamente");
        setFormData(prev => ({ ...prev, claveActual: '', nuevaClave: '', confirmarNuevaClave: '' }));
      }
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "Ocurrió un error al actualizar el perfil";
      if (err && typeof err === 'object' && 'response' in err) {
        const response = (err as unknown as { response: { data: { detail: string; error: string } } }).response;
        errorMessage = response?.data?.detail || response?.data?.error || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 font-poppins">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="nombre" className="text-xs font-bold text-indigo-400 uppercase tracking-widest">NOMBRE COMPLETO</label>
          <input
            type="text"
            name="nombre"
            className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-semibold"
            placeholder="¿Cuál es tu nombre?"
            onChange={handleChange}
            value={formData.nombre}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-indigo-400 uppercase tracking-widest">CORREO ELECTRÓNICO</label>
            <input
              type="text"
              name="email"
              className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-semibold cursor-not-allowed"
              disabled={true}
              value={formData.email}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nombreUsuario" className="text-xs font-bold text-indigo-400 uppercase tracking-widest">NOMBRE DE USUARIO</label>
            <input
              type="text"
              name="nombreUsuario"
              className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-100 text-zinc-500 text-sm font-semibold cursor-not-allowed"
              disabled={true}
              value={formData.nombreUsuario}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-100">
          <h3 className="text-lg font-bold text-zinc-800 mb-4">Seguridad</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="claveActual" className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CONTRASEÑA ACTUAL</label>
              <input
                type="password"
                name="claveActual"
                className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                placeholder="********"
                onChange={handleChange}
                value={formData.claveActual}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nuevaClave" className="text-xs font-bold text-zinc-500 uppercase tracking-widest">NUEVA CONTRASEÑA</label>
                <input
                  type="password"
                  name="nuevaClave"
                  className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="********"
                  onChange={handleChange}
                  value={formData.nuevaClave}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmarNuevaClave" className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CONFIRMAR</label>
                <input
                  type="password"
                  name="confirmarNuevaClave"
                  className="w-full p-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                  placeholder="********"
                  onChange={handleChange}
                  value={formData.confirmarNuevaClave}
                />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">{error}</div>}
        {success && <div className="p-4 bg-green-50 text-green-600 text-xs font-bold rounded-xl border border-green-100">{success}</div>}

        <div className="pt-6 flex justify-end gap-4 border-t border-zinc-100">
          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-indigo-100 transition-all"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
