import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const SystemInfoSection = () => {
  const info = [
    { label: "Último Acceso:", value: "Hoy, 14:30" },
    { label: "Sesiones Activas:", value: "2" },
    { label: "Versión del Sistema:", value: "v2.1.0" },
  ];

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 mt-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-zinc-900">Información del Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-3">
        {info.map((item) => (
          <div key={item.label} className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 font-medium">{item.label}</span>
            <span className="text-zinc-900 font-bold">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
