import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { PersonalInformationCard } from "@/components/feature/profile/PersonalInformationCard";
import { ActivityStatistics } from "@/components/feature/profile/ActivityStatistics";
import { ProfileActivityList } from "@/components/feature/profile/ProfileActivityList";
import { QuickActions } from "@/components/feature/profile/QuickActions";
import { SystemInfoSection } from "@/components/feature/profile/SystemInfoSection";
import { SupportSection } from "@/components/feature/profile/SupportSection";
import type { UserState } from "@/types/AuthType";

export const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: { usuario: UserState }) => state.usuario);
  const user = userState.usuario;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const userData = {
    nombre: user.nombre || "Dr Santiago Naranjo",
    email: user.correo || "snaranjoh@ucundinamarca.edu.co",
    rol: user.tipo_usuario || "Psicólogo",
    fechaRegistro: "Marzo 2023",
    imagen: user.imagen
  };

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              <PersonalInformationCard user={userData} />
              <ActivityStatistics />
              <ProfileActivityList />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
              <QuickActions />
              <SystemInfoSection />
              <SupportSection />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
