import { Subtitle, Title } from "@/components/ui";
import { ImageChange, ProfileForm } from "@/components/feature/profile/";
import type { UserState } from "@/types/AuthType";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  useEffect(() => {
    if(userState.usuario == null) {
      navigate("/login");
    }
  }, [userState, navigate]);
  return (
    <div className="py-10">
      <div className="max-w-[1440px] flex flex-col mx-auto gap-5 flex-wrap md:flex-nowrap px-5 2xl:px-0">
        <Title type="principal">Perfil de Usuario</Title>
        <Subtitle type="secondary">Visualiza y actualiza tu información personal</Subtitle>
        <div className="flex">
          <ImageChange/>
          <ProfileForm/>
        </div>
      </div>
    </div>
  );
}
