import Mind from "@assets/images/mind.svg";
import { Card } from "@components/common";

const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};

export const Resources = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full">
        <h2 className="text-yellow-900 text-3xl font-bold text-center">Recursos Para Estudiantes</h2>
        <p className="text-slate-500 text-2xl font-semibold mb-10 text-center">Material de apoyo para complementar tu formación clínica</p>
        <div className="flex justify-around w-full flex-wrap gap-5">
          <Card
            icon={<MindIcon/>}
            title="Biblioteca de Recursos"
            subtitle="Accede a artículos científicos, guías clínicas y material de estudio."
            description="Colección curada de recursos académicos y clínicos para profundizar en el conocimiento sobre trastornos depresivos y su diagnóstico."
            buttonText="Explorar Biblioteca"
            onButtonClick={() => {window.location.href = "/library"}}
            align="left"
            size="large"
            />
          <Card
            icon={<MindIcon/>}
            title="Casos de Estudio"
            subtitle="Aprende con casos prácticos y simulaciones clínicas."
            description="Casos clínicos simulados para practicar el proceso diagnóstico y familiarizarse con diferentes presentaciones de trastornos depresivos."
            buttonText="Ver Casos de Estudio"
            onButtonClick={() => {window.location.href = "/case-analysis"}}
            align="left"
            size="large"
            />
        </div>
      </div>
    </div>
  );
}
