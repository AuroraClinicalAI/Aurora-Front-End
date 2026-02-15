import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">403 - Acceso Denegado</h1>
      <p className="text-lg text-gray-600 mb-8">No tienes permisos para ver esta página.</p>
      <Button onClick={() => navigate("/")}>Volver al Inicio</Button>
    </div>
  );
};
