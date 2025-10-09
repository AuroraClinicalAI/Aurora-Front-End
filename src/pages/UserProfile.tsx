import { Subtitle } from "@/components/common/Subtitle";
import { Title } from "@/components/common/Title";
import { ImageChange } from "@/components/feature/profile/ImageChange";
import { ProfileForm } from "@/components/feature/profile/ProfileForm";
import type { UserState } from "@/types/AuthType";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const UserProfile = () => {

  const userState = useSelector((state: { user: UserState }) => state.user);
  useEffect(() => {
    if(userState.user == null) {
      window.location.href = "/login"
    }
  }, [userState]);
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