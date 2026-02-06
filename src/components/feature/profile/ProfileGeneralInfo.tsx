import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface ProfileGeneralInfoProps {
  user: {
    nombre: string;
    email: string;
    rol: string;
    usuario: string;
    fechaRegistro: string;
  };
}

export const ProfileGeneralInfo = ({ user }: ProfileGeneralInfoProps) => {
  const infoFields = [
    { label: "Nombre", value: user.nombre },
    { label: "Email", value: user.email },
    { label: "Rol", value: user.rol },
    { label: "Usuario", value: user.usuario },
    { label: "Fecha de Registro", value: user.fechaRegistro },
  ];

  return (
    <Card className="flex-grow rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden">
      <CardHeader className="p-8 border-b border-zinc-50 bg-zinc-50/30">
        <CardTitle className="text-xl font-bold text-zinc-900">Información General</CardTitle>
        <p className="text-xs text-slate-400 font-medium">Detalles básicos de tu cuenta en Aurora</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoFields.map((field) => (
            <div key={field.label} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                {field.label}
              </label>
              <p className="text-base font-semibold text-zinc-800 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
