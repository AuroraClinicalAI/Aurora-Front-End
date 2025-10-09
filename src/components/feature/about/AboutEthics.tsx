import { Subtitle } from "@/components/common/Subtitle";
import { Title } from "@/components/common/Title";
import Mind from "@assets/images/mind.svg";
import Card from "@components/common/Card";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
export const AboutEthics = () => {
  return (
    <div className="bg-sky-300/20 pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
          <Title type="secondary">Nuestros Valores</Title>
          <Subtitle type="secondary">Los principios que guían cada decisión y desarrollo en nuestra plataforma</Subtitle>
        <div className="flex justify-evenly pt-10 w-full">
          <Card 
            icon={<MindIcon/>} 
            title="Empatía" 
            description="Entendemos la sensibilidad del tema y diseñamos cada interacción con compasión y respeto hacia nuestros usuarios." 
            align="center" 
            size="medium" 
          />
          <Card 
            icon={<MindIcon/>} 
            title="Privacidad" 
            description="La confidencialidad y seguridad de los datos de nuestros usuarios es nuestra máxima prioridad en todo momento." 
            align="center" 
            size="medium" 
          />
          <Card 
            icon={<MindIcon/>} 
            title="Evidencia Científica" 
            description="Basamos nuestros algoritmos en investigación científica rigurosa y colaboramos con profesionales de la salud mental." 
            align="center" 
            size="medium" 
          />
        </div>
      </div>
    </div>
  );
}