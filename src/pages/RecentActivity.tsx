import { MetricCard } from "@/components/common/MetricCard";
import { Subtitle } from "@/components/common/Subtitle";
import { Title } from "@/components/common/Title";
import People from "@assets/images/people.svg";

export const RecentActivity = () => {
  return (
    <div className="py-10">
      <div className="max-w-[1440px] flex flex-col mx-auto gap-5 flex-wrap md:flex-nowrap px-5 2xl:px-0">
        <Title type="principal">Actividad Reciente</Title>
        <Subtitle type="principal">Resumen de tu impacto en la plataforma desde tu incorporación</Subtitle>
        {/* Metrics */}
        <div className="flex gap-10 w-full justify-center">
          <MetricCard title="Total de actividades" value={0} type="principal" img={People}/>
          <MetricCard title="Completadas" value={0} type="secondary" img={People}/>
          <MetricCard title="En Revisión" value={0} type="secondary" img={People}/>
          <MetricCard title="Este Mes" value={0} type="secondary" img={People}/>
        </div>
      </div>
    </div>
  );
}
