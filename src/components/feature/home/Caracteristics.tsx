import Mind from "@assets/images/mind.svg";
import { Card } from "@components/common";

export const MindIcon = () => {
  return (<img src={Mind} alt="mind icon" />);
};

export const Caracteristics = () => {
  return (
    <div className="bg-sky-300/10 flex justify-center">
      <div className=" flex justify-center flex-col items-center max-w-[1440px] py-20 px-11 gap-4 w-full">
        <h2 className="text-yellow-900 text-3xl font-bold text-center">Características Principales</h2>
        <p className="text-slate-500 text-2xl font-semibold text-center mb-10">Herramientas avanzadas para Estudiantes y Profesionales de la Salud Mental</p>
        <div className="flex justify-around w-full flex-wrap gap-5">
          <Card
            icon={<MindIcon/>}
            title="Análisis Predictivo"
            subtitle="Modelos de Machine Learning para clasificación y apoyo al diagnostico."
            description="Algoritmos entrenados con datos clínicos que ayudan a identificar patrones y factores de riesgo asociados a trastornos depresivos."
            buttonText="Explorar Modelos"
            onButtonClick={() => {}}
            />
          <Card
            icon={<MindIcon/>}
            title="Gestión de Pacientes"
            subtitle="Seguimiento integral de casos clínicos y evolución de pacientes."
            description="Sistema de registro y seguimiento que permite documentar la evolución de los pacientes y mantener un historial clínico organizado."
            buttonText="Gestionar Pacientes"
            onButtonClick={() => {}}
            />
        </div>
      </div>
    </div>
  );
}
