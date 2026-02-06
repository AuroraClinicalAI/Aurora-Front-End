import { Mail, User, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface PersonalInformationCardProps {
  user: {
    nombre: string;
    email: string;
    rol: string;
    fechaRegistro: string;
    imagen?: string;
  };
}

export const PersonalInformationCard = ({ user }: PersonalInformationCardProps) => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-zinc-900">Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm">
          <AvatarImage src={user.imagen} />
          <AvatarFallback className="bg-indigo-400 text-white text-2xl font-bold">
            {user.nombre.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-zinc-900">{user.nombre}</h2>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium">{user.email}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <User className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium">{user.rol}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <CalendarDays className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium">Miembro desde {user.fechaRegistro}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
