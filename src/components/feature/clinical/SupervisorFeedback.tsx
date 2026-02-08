import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface FeedbackItemProps {
  name: string;
  role: string;
  date: string;
  pic?: string;
  initials: string;
  content: string;
}

const FeedbackItem = ({ name, role, date, pic, initials, content }: FeedbackItemProps) => (
  <div className="p-4 rounded-xl border border-zinc-50 bg-white space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8 rounded-full border border-zinc-100">
          <AvatarImage src={pic} />
          <AvatarFallback className="bg-indigo-50 text-indigo-400 text-[10px] font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-[10px] font-bold text-zinc-900">{name}</h5>
          <p className="text-[8px] text-slate-400 font-medium">{role}</p>
        </div>
      </div>
      <span className="text-[8px] text-slate-300 font-bold uppercase">{date}</span>
    </div>
    <div className="bg-zinc-50/50 rounded-lg p-3 border border-zinc-100">
      <p className="text-[9px] text-slate-500 font-medium leading-relaxed italic">
        "{content}"
      </p>
    </div>
  </div>
);

export const SupervisorFeedback = () => {
  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 mt-8">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-sm font-bold text-zinc-900">Retroalimentación de supervisores</CardTitle>
        <p className="text-[8px] text-slate-400 font-medium uppercase tracking-widest mt-1">Comentarios de Psicólogos e Investigadores para el caso</p>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <FeedbackItem
          name="Dr. Santiago Arango"
          role="Psicólogo"
          date="FEB 2025"
          initials="SA"
          content="Excelente identificación de los síntomas principales. Sin embargo te falta considerar el impacto que pudo tener la falta de sueño en el rendimiento laboral y académico del paciente."
        />
        <FeedbackItem
          name="Dr. Mateo Ramos"
          role="Investigador"
          date="ENERO 2025"
          initials="MR"
          content="He sugerido profundizar más en la exploración de factores de riesgo, con el fin de realizar un proceso más detallado y tener datos concluyentes con mayor detalle."
        />
      </CardContent>
    </Card>
  );
};
