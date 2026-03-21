interface MetricCardProps {
  title: string;
  value: number;
  type: "principal" | "secondary";
  img: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, type = "principal", img }) => {
  const typeClassesContainer = {
    "principal": "h-30",
    "secondary": "h-25"
  };
  const containerClasses = `flex min-w-50 outline-1 outline-gray-300 items-center justify-between py-5 px-5 rounded ${typeClassesContainer[type]}`;
  return (
    <div className={containerClasses} >
      <div className="flex flex-col gap-3 w-[70%]">
        <p className="text-neutral-400 text-base font-bold">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <img src={img} alt="people icon" className="w-8 h-8" />
    </div>
  );
}
