import { useEffect } from "react";
import { logout } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { logout as logoutService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutService();
        dispatch(logout());
      } catch (err) {
        console.log("Error al cerrar sesión: ", err);
      } finally {
        navigate('/');
      }
    };
    performLogout();
  }, [dispatch, navigate]);
  return (
    <div>
      Cerrando sesión
    </div>
  );
}
