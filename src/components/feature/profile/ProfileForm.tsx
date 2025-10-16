import type { UserState } from "@/types/AuthType";
import { Button } from "@components/common";
import React, { useState } from 'react';
import { useSelector } from "react-redux";

export const ProfileForm = () => {
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  const [formData, setFormData] = useState({
    nombre: userState.usuario?.nombre,
    email: userState.usuario?.correo,
    nombreUsuario: userState.usuario?.nombre_usuario,
    tipoUsuario: userState.usuario?.tipo_usuario_info.tipo_usuario,
    clave: '',
    nuevaClave: '',
    confirmarNuevaClave: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.nuevaClave !== formData.confirmarNuevaClave) {
      setError("Las contraseñas no coinciden")
      setLoading(false);
      return;
    }
  };
  return (
    <div className="w-full">
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-black text-lg font-semibold">NOMBRE</label>
          <input type="text" name="nombre" className=" text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 self-stretch" placeholder="Cual es tu nombre?" onChange={handleChange} value={formData.nombre}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black text-lg font-semibold ">CORREO ELECTRÓNICO</label>
          <input type="text" name="email" className="text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 disabled:text-gray-400" placeholder="tu@ejemplo.com" onChange={handleChange} disabled={true} value={formData.email} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nombreUsuario" className="text-black text-lg font-semibold ">NOMBRE DE USUARIO</label>
          <input type="text" name="nombreUsuario" className="text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 disabled:text-gray-400" placeholder="Usuario123" onChange={handleChange} disabled={true} value={formData.nombreUsuario} />
          <p className="text-neutral-400 text-md font-normal">Este es tu identificador único en el sistema</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="tipoUsuario" className="text-black text-lg font-semibold ">TIPO DE USUARIO</label>
          <input type="text" name="nombreUsuario" className="text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 disabled:text-gray-400" placeholder="Tipo Usuario" onChange={handleChange} disabled={true} value={formData.tipoUsuario} />
          <p className="text-neutral-400 text-md font-normal">El tipo de usuario no puede ser modificado</p>
        </div>
        <h3 className="text-black text-xl font-bold mb-1 border-t-1 border-t-gray-400 pt-5">Cambiar Contraseña</h3>
        <div className="flex flex-col">
          <label htmlFor="clave" className="text-black text-lg font-semibold ">CONTRASEÑA</label>
          <input type="password" name="clave" className="text-;g rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
          <p className="text-neutral-400 text-md font-normal">Deja en blanco si no deseas cambiar tu contraseña</p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="nuevaClave" className="text-black text-lg font-semibold ">NUEVA CONTRASEÑA</label>
          <input type="password" name="nuevaClave" className="text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmarNuevaClave" className="text-black text-lg font-semibold ">CONFIRMAR NUEVA CONTRASEÑA</label>
          <input type="password" name="confirmarNuevaClave" className="text-lg rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
        </div>
        <div>
          {error}
        </div>
        <div className="mx-auto w-full flex justify-between border-t-1 border-t-gray-400 pt-10">
          <Button label="Eliminar Cuenta" type="primary" onClick={() => {}} />
          <Button label="Guardar Cambios" type="register" onClick={() => {}} buttonType="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
}
