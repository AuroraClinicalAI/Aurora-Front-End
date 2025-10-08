import { login } from "@/services/AuthService";
import { loginFailure, loginStart, loginSuccess } from "@/store/userSlice";
import type { LoginData, UserState } from "@/types/AuthType";
import { ApiError } from "@/types/ErrorType";
import Button from "@components/common/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LoginForm = () => {
  // Definir variables para el guardado de inicio de sesión
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });
  const userState = useSelector((state: { user: UserState }) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (userState.user !== null && !userState.loading) {
    window.location.href = "/";
  }
  }, [userState.user, userState.loading]);
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
    dispatch(loginStart());
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data: LoginData = {
      correo: formData.correo,
      clave: formData.clave
    };

    try {
      // Guardar el usuario en el reducer
      const authData = await login(data);
      dispatch(loginSuccess(authData));
    } catch (err) {
      console.error('Error en el inicio de sesión:', err);
      let errorMessage = "Error en la api";
      if(err instanceof ApiError){
        errorMessage = err.message;
      }
        setError(errorMessage);
      dispatch(loginFailure(String(err)));
    } finally {
      setLoading(false);
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