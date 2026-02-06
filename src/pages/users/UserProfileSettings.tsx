import { Subtitle, Title } from "@/components/ui";
import { ImageChange, ProfileForm } from "@/components/feature/profile/";
import type { UserState } from "@/types/AuthType";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";

export const UserProfileSettings = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  useEffect(() => {
    if (userState.usuario == null) {
      navigate("/login");
    }
  }, [userState, navigate]);
  return (
    <DefaultLayout>
      <div className="max-w-[1440px] flex flex-col mx-auto gap-5 flex-wrap md:flex-nowrap px-5 2xl:px-0">
        <Title type="principal">Configuración de Perfil</Title>
        <Subtitle type="secondary">Actualiza tu información personal y contraseña</Subtitle>
        <div className="flex">
          <ImageChange />
          <ProfileForm />
        </div>
      </div>
    </DefaultLayout>
  );
}
