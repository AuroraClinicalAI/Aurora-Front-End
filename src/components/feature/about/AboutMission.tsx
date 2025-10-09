import { Subtitle } from "@/components/common/Subtitle";
import { Title } from "@/components/common/Title";
import Mind from "@assets/images/mind.svg";
import Card from "@components/common/Card";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
export const AboutMission = () => {
  return (
    <div className="bg-sky-300/20 pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
        <Title type="secondary">Nuestra Misión y Visión</Title>
        <Subtitle type="secondary">Guiados por el compromiso de mejorar la salud mental global</Subtitle>
        <div className="flex justify-evenly pt-10 w-full">
          <Card 
            icon={<MindIcon/>} 
            title="Misión" 
            subtitle="" 
            description="Democratizar el acceso a herramientas de detección temprana de depresión mediante tecnología innovadora, proporcionando evaluaciones precisas y accesibles que empoderen a las personas a tomar control de su bienestar mental." 
            buttonText="" 
            onButtonClick={() => {}} 
            align="left" 
            size="xl" 
          />
          <Card 
            icon={<MindIcon/>} 
            title="Visión" 
            subtitle="" 
            description="Ser la plataforma líder mundial en detección temprana de depresión, contribuyendo a un futuro donde la salud mental sea prioritaria, accesible y libre de estigmas para todas las personas." 
            buttonText="" 
            onButtonClick={() => {}} 
            align="left" 
            size="xl" 
          />
        </div>
      </div>
    </div>
  );
}