import { changePassword, login, register, updateProfile } from "@/services/AuthService";
import { loginFailure, loginStart, loginSuccess } from "@/store/userSlice";
import type { LoginData, RegisterData, UpdatePasswordData, UpdateUserData } from "@/types/AuthType";
import { ApiError } from "@/types/ErrorType";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const handleLogin = async (data: LoginData) => {
    dispatch(loginStart());
    setLoading(true);
    setError(null);
    let response = false;
    try {
      const authData = await login(data);
      dispatch(loginSuccess(authData));
      response = true;
    } catch (err) {
      console.error(err)
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError){
        errorMessage = err.message;
      }
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleLogin, loading, error };
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      if (data.clave !== data.confirmar_clave) {
        setError("Las contraseñas no coinciden")
        setLoading(false);
        return false;
      }
      await register(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError){
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleRegister, loading, error };
}

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleUpdateUsername = async (data: UpdateUserData) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      await updateProfile(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError){
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };
  const handleUpdatePassword = async (data: UpdatePasswordData) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      if (data.nueva_clave !== data.confirmar_clave) {
        setError("Las contraseñas no coinciden")
        setLoading(false);
        return false;
      }
      await changePassword(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError){
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleUpdateUsername, handleUpdatePassword, loading, error };
}
