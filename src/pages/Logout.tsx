import { useEffect } from "react";
import { logout } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { logout as logoutService } from "@/services/AuthService";

export const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logoutService();
        dispatch(logout());
      } catch (err) {
        console.log("Error al cerrar sesión: ", err);
      } finally {
        window.location.href = '/';
      }
    };
    performLogout();
  }, [dispatch]);
  return (
    <div>

    </div>
  );
}