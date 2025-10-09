import RegisterRocket from "@assets/images/register_rocket.svg";
import RegisterCloud from "@assets/images/register_cloud.svg";
import { RegisterForm } from "@components/feature/auth/RegisterForm";
import { useSelector } from "react-redux";
import type { UserState } from "@/types/AuthType";
import { useEffect } from "react";

export const Register = () => {
  const userState = useSelector((state: { user: UserState }) => state.user);
  useEffect(() => {
    if(userState.user != null) {
      window.location.href = "/"
    }
  }, [userState]);
  return (
    <div className="flex items-center align-middle flex-grow">
      <img src={RegisterRocket} alt="login illustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:top-30 lg:left-10 xl:top-30 xl:left-20"/>
      <RegisterForm />
      <img src={RegisterCloud} alt="login illustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:right-10 lg:bottom-30 xl:right-20 xl:bottom-30"/>
    </div>
  );
}
