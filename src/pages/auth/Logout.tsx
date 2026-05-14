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
      } catch {
        // Silently ignore logout errors
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
