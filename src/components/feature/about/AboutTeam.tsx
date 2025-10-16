import { Subtitle, Title, Card } from "@/components/common";
import User from "@assets/images/user.svg";

export const UserIcon = () => {
  return (<img src={User} alt="User icon" />);
};
export const AboutTeam = () => {
  return (
    <div className="bg-white pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
        <Title type="secondary">Nuestro Equipo</Title>
        <Subtitle type="secondary">Un equipo multidisciplinario comprometido con la salud mental</Subtitle>
        <div className="flex gap 20 justify-evenly w-full">
          <Card icon={<UserIcon/>} title="2+" subtitle="Psicólogos Clínicos" align="center" size="small"/>
          <Card icon={<UserIcon/>} title="4+" subtitle="Desarrolladores" align="center" size="small"/>
          <Card icon={<UserIcon/>} title="3+" subtitle="Especialistas en IA" align="center" size="small"/>
          <Card icon={<UserIcon/>} title="4+" subtitle="Investigadores" align="center" size="small"/>
        </div>
      </div>
    </div>
  );
}
