import { useRegister } from "@/hooks/useAuth";
import type { RegisterData } from "@/types/AuthType";
import { Button } from "@components/common";
import React, { useState } from 'react';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    nombreUsuario: '',
    tipoUsuario: '',
    clave: '',
    confirmarClave: ''
  });
  const { loading, error, handleRegister } = useRegister();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: RegisterData = {
      nombre: formData.nombre,
      correo: formData.email,
      nombre_usuario: formData.nombreUsuario,
      tipo_usuario: Number(formData.tipoUsuario),
      clave: formData.clave,
      confirmar_clave: formData.confirmarClave
    };
    const success = await handleRegister(data);
    if(success){
      window.location.href = "/register-confirm";
    }
  };
  return (
    <div className="max-w-[473px] w-full rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center px-10 pt-8 pb-4 gap-10 mx-auto md:my-30">
      <div>
        <h3 className="justify-center text-black text-3xl font-bold mb-1 text-center">Registro de Usuario</h3>
        <p className="justify-center text-slate-500 text-sm font-normal text-center">Ingresa tus datos para crear una cuenta</p>
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-black text-sm font-semibold ">NOMBRE</label>
          <input type="text" name="nombre" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1 self-stretch" placeholder="Cual es tu nombre?" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-black text-sm font-semibold ">CORREO ELECTRÓNICO</label>
          <input type="text" name="email" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="tu@ejemplo.com" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nombreUsuario" className="text-black text-sm font-semibold ">NOMBRE DE USUARIO</label>
          <input type="text" name="nombreUsuario" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="Usuario123" onChange={handleChange} />
          <p className="text-neutral-400 text-[8px] font-normal">Este sera tu identificador único en el sistema</p>
        </div>
        <Button label="Verificar nombre de usuario" type="register" onClick={() => { }} />
        <div className="flex flex-col">
          <label htmlFor="clave" className="text-black text-sm font-semibold ">CONTRASEÑA</label>
          <input type="password" name="clave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmarClave" className="text-black text-sm font-semibold ">CONFIRMAR CONTRASEÑA</label>
          <input type="password" name="confirmarClave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
          <a href="/forgot-password" className="text-slate-500 text-xs font-normal">Olvide mi contraseña</a>
        </div>
        <div>
          {error}
        </div>
        <div className="mx-auto">
          <Button label="Regístrate" type="register" onClick={() => {}} buttonType="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
}
