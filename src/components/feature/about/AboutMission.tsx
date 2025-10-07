import Mind from "@assets/images/mind.svg";
import Card from "@components/common/Card";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
export const AboutMission = () => {
  return (
    <div>
      <div>
        <h2>Nuestra Misión y Visión</h2>
        <p>Guiados por el compromiso de mejorar la salud mental global</p>
        <div>
          <Card 
            icon={<MindIcon/>} 
            title="Misión" 
            subtitle="" 
            description="Democratizar el acceso a herramientas de detección temprana de depresión mediante tecnología innovadora, proporcionando evaluaciones precisas y accesibles que empoderen a las personas a tomar control de su bienestar mental." 
            buttonText="" 
            onButtonClick={() => {}} 
            align="left" 
            size="large" 
          />
          <Card 
            icon={<MindIcon/>} 
            title="Visión" 
            subtitle="" 
            description="Ser la plataforma líder mundial en detección temprana de depresión, contribuyendo a un futuro donde la salud mental sea prioritaria, accesible y libre de estigmas para todas las personas." 
            buttonText="" 
            onButtonClick={() => {}} 
            align="left" 
            size="large" 
          />
        </div>
      </div>
    </div>
  );
}