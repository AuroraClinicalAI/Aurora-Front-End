import { Button } from "@components/ui";
import { useNavigate } from "react-router-dom";
import packageJson from "../../../package.json";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer min-h-25 relative bg-slate-500 flex justify-center md:justify-between px-10 py-3  gap-5 md:gap-25 md:py-0 items-center flex-wrap md:flex-nowrap">
      <div className="justify-center text-white text-md md:text-lg font-normal">
        © 2025 Universidad de Cundinamarca Extensión Facatativá. Todos los derechos reservados. | v{packageJson.version}
      </div>
      <div className="flex gap-10">
        <Button variant={"link_secondary"} onClick={() => navigate("/privacy-policy")} className="text-center justify-center text-orange-300 text-md md:text-lg font-bold">Política de Privacidad</Button>
        <Button variant={"link_secondary"} onClick={() => navigate("/terms-of-use")} className="text-center justify-center text-orange-300 text-md md:text-lg font-bold">Términos de Uso</Button>
      </div>
    </footer>
  );
}
