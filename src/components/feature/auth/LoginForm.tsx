import { useLogin } from "@/hooks";
import type { LoginData, UserState } from "@/types/AuthType";
import { Button} from "@components/common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const LoginForm = () => {
  // Definir variables para el guardado de inicio de sesión
  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });
  const { loading, error, handleLogin} = useLogin();
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);

  useEffect(() => {
    if (userState.usuario != null && !userState.loading) {
      window.location.href = "/";
    }
  }, [userState]);
  // Función para guardar los cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  };

  // Función para hacer la consulta de inicio de sesión y guardar el usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: LoginData = {
      correo: formData.correo,
      clave: formData.clave
    }
    const success = await handleLogin(data);
    if(success){
      window.location.href = "/";
    }
  }
  return (
    <div className="max-w-[473px] min-h-96 rounded-[5px] md:outline-2 md:outline-offset-[-2px] md:outline-zinc-800/20 flex flex-col items-center px-10 pt-8 pb-5 gap-10 mx-auto">
      <div>
        <h3 className="justify-center text-black text-3xl font-bold mb-1 text-center">Inicio de Sesión</h3>
        <p className="justify-center text-slate-500 text-sm font-normal text-center">Ingresa tus datos para acceder a la Plataforma</p>
      </div>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="correo" className="text-black text-sm font-semibold ">CORREO ELECTRÓNICO</label>
          <input type="text" name="correo" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400 px-2 py-1" placeholder="tu@ejemplo.com" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="clave" className="text-black text-sm font-semibold ">CONTRASEÑA</label>
          <input type="password" name="clave" className="rounded outline-1 outline-offset-[-1px] outline-neutral-400  px-2 py-1" placeholder="************************" onChange={handleChange} />
          <a href="/forgot-password" className="text-slate-500 text-xs font-normal">Olvide mi contraseña</a>
          <p>{error}</p>
        </div>
        <div className="mx-auto">
          <Button label="Iniciar Sesión" type="register" onClick={() => { }} buttonType="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
}
