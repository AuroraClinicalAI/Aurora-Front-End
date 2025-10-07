import Mind from "@assets/images/mind.svg";
import Card from "@components/common/Card";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};
export const AboutTeam = () => {
  return (
    <div>
      <div>
        <h3>Nuestro Equipo</h3>
        <p>Un equipo multidisciplinario comprometido con la salud mental</p>
      </div>
      <Card icon={<MindIcon/>} title="2+" subtitle="Psicólogos Clínicos" align="center" size="medium"/>
      <Card icon={<MindIcon/>} title="4+" subtitle="Desarrolladores" align="center" size="medium"/>
      <Card icon={<MindIcon/>} title="3+" subtitle="Especialistas en IA" align="center" size="medium"/>
      <Card icon={<MindIcon/>} title="4+" subtitle="Investigadores" align="center" size="medium"/>
    </div>
  );
}