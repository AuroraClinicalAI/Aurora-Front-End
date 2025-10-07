import Mind from "@assets/images/mind.svg";
import Card from "@components/common/Card";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
export const AboutEthics = () => {
  return (
    <div>
      <div>
        <h3></h3>
        <p></p>
      </div>
      <div>
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
  );
}