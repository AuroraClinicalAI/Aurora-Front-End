import MainIlustration from "@assets/images/main_ilustration.svg"
import Button from "../../common/Button";

export const Introduction = () => {
  return (
    <div className="flex py-20 justify-around max-w-[1440px] mx-auto flex-wrap md:flex-nowrap gap-10 px-5 2xl:px-0">
      <div className="flex gap-5 flex-col">
        <h2 className="text-indigo-400 text-4xl font-bold max-w-250">Sistema de Apoyo al Diagnóstico de Trastornos Depresivos</h2>
        <p className="text-slate-500/60 text-xl font-semibold max-w-250">Herramienta avanzada que utiliza modelos de clasificación de Machine Learning para apoyar el diagnóstico de trastornos depresivos en la práctica clínica.</p>
        <div className="flex gap-5">
          <Button label="Comenzar Diagnostico" onClick={() => {}} type="register"/>
          <Button label="Ver Tutorial" onClick={() => {}} type="login"/>
        </div>
      </div>
      <img src={MainIlustration} alt="Ilustracion principal" className="max-w-[90%] md:max-w-[50%]"/>
    </div>
  );
}