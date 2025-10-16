import { Button } from "@/components/common";
import type { UserState } from "@/types/AuthType";
import { useSelector } from "react-redux";

export const ImageChange = () => {
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  const apiUrl = import.meta.env.VITE_BASE_URL;
  return (
    <div className="max-w-[300px] flex flex-col items-center gap-4 py-5">
      <div>
        <img className="rounded-full w-40 h-40"
        src={`${apiUrl}${userState.usuario?.imagen}`} alt={userState.usuario?.nombre_usuario} />
      </div>
      <p className="text-center justify-center text-zinc-800/30 text-md font-normal">Haz clic en la imagen o en el boton para cambiar tu foto de perfil</p>
      <Button label="Cambiar Imagen" onClick={() => {}} type="register"/>
    </div>
  );
}
