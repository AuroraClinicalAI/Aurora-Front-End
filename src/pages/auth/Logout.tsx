import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks";

export const Logout = () => {
  const { handleLogout } = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    const performLogout = async () => {
      try {
        await handleLogout();
      } catch (err) {
        console.log("Error al cerrar sesión: ", err);
      } finally {
        navigate('/');
      }
    };
    performLogout();
  }, [handleLogout, navigate]);
  return (
    <div>
      Cerrando sesión
    </div>
  );
}
