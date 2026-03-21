import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks";
import { UserRole } from "@/types/Roles";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const userState = useUser();
  const user = userState.usuario;
  const isAuthenticated = !!user; // Or userState.accessToken depending on your auth strategy

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user has one of them, otherwise allow
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.tipo_usuario as UserRole;
    if (!allowedRoles.includes(userRole)) {
      // User logged in but not authorized for this specific route
      return <Navigate to="/unauthorized" replace />; // Or home
    }
  }

  return <Outlet />;
};
