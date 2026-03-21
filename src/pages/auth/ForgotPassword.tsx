import { ForgotPasswordForm } from "@components/feature/auth"
import LoginIllustration1 from "@assets/images/login_illustration1.svg"
import LoginIllustration2 from "@assets/images/login_illustration2.svg"
import { DefaultLayout } from "@/layout/DefaultLayout";

export const ForgotPassword = () => {
  return (
    <DefaultLayout>
      <div className="flex items-center align-middle flex-grow">
        <img src={LoginIllustration1} alt="login ilustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:top-30 lg:left-10 xl:top-30 xl:left-20" />
        <ForgotPasswordForm />
        <img src={LoginIllustration2} alt="login ilustration" className="hidden lg:w-[200px] xl:w-[300px] lg:block lg:absolute lg:right-10 lg:bottom-30 xl:right-20 xl:bottom-30" />
      </div>
    </DefaultLayout>
  );
}

export default ForgotPassword;
