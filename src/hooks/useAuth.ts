import { useServices } from "@/context/useServices";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  setUsuario,
} from "@/store/userSlice";
import type {
  LoginData,
  RegisterData,
  UpdatePasswordData,
  UpdateUserData,
} from "@/types/AuthType";
import { ApiError } from "@/types/ErrorType";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UserState } from "@/types/AuthType";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { authService } = useServices();

  const handleLogin = async (data: LoginData) => {
    dispatch(loginStart());
    setLoading(true);
    setError(null);
    let response = false;
    try {
      const authData = await authService.login(data);
      dispatch(loginSuccess(authData));
      response = true;
    } catch (err) {
      console.error(err);
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError) {
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
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authService } = useServices();

  const handleRegister = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      if (data.clave !== data.confirmar_clave) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return false;
      }
      // RegisterResponse returns { usuario: User }
      await authService.register(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleRegister, loading, error };
};

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authService } = useServices();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      await authService.logout();
      dispatch(logout());
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleLogout, loading, error };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authService } = useServices();
  const dispatch = useDispatch();

  const handleUpdateUsername = async (data: UpdateUserData) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      const updatedUser = await authService.updateProfile(data);
      dispatch(setUsuario(updatedUser));
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  const handleUpdateImage = async (image: File) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      const updatedUser = await authService.updateProfile({
        nombre: undefined,
        imagen: image,
      });
      dispatch(setUsuario(updatedUser));
      response = true;
    } catch (err) {
      let errorMessage = "Error al actualizar la imagen";
      if (err instanceof ApiError) {
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
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return false;
      }
      await authService.changePassword(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error en la conexión al servidor";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return {
    handleUpdateUsername,
    handleUpdateImage,
    handleUpdatePassword,
    loading,
    error,
  };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authService } = useServices();

  const handleRequestReset = async (email: string) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      await authService.requestPasswordReset(email);
      response = true;
    } catch (err) {
      let errorMessage = "Error al solicitar el restablecimiento";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleRequestReset, loading, error };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authService } = useServices();

  const handleConfirmReset = async (data: Record<string, string>) => {
    setLoading(true);
    setError(null);
    let response = false;
    try {
      if (data.clave !== data.confirmar_clave) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return false;
      }
      await authService.confirmPasswordReset(data);
      response = true;
    } catch (err) {
      let errorMessage = "Error al restablecer la contraseña";
      if (err instanceof ApiError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { handleConfirmReset, loading, error };
};

export const useUser = () => {
  const userState = useSelector(
    (state: { usuario: UserState }) => state.usuario,
  );
  return userState;
};
