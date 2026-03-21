import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface Patient {
  id: string;
  name: string;
  patientId: string;
  lastVisit: string;
  status: 'Nuevo' | 'En Seguimiento';
  initials: string;
}

export const CaseTrackingSystem = () => {
  const patients: Patient[] = [
    { id: "1", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'Nuevo', initials: 'TN' },
    { id: "2", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'En Seguimiento', initials: 'TN' },
    { id: "3", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'Nuevo', initials: 'TN' },
    { id: "4", name: "Paciente 1", patientId: "100001", lastVisit: "13/4/2025", status: 'En Seguimiento', initials: 'TN' },
  ];

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-8 h-full">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-xl font-bold text-zinc-900">Sistema de Registro y Seguimiento</CardTitle>
        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md">
          Documenta la evolución de los casos registrados y mantén un historial clínico organizado.
        </p>
      </CardHeader>

      <CardContent className="p-0 flex flex-col gap-4">
        {patients.map((patient, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 hover:bg-zinc-50/50 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-100">
              {patient.initials}
            </div>

            <div className="flex-grow">
              <h4 className="text-sm font-bold text-zinc-900">{patient.name}</h4>
              <p className="text-[10px] text-slate-400 font-medium">
                ID: {patient.patientId} • Última consulta: {patient.lastVisit}
              </p>
            </div>

            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold ${patient.status === 'Nuevo'
                ? "bg-white border-zinc-200 text-zinc-900"
                : "bg-white border-zinc-100 text-zinc-500"
              }`}>
              {patient.status}
            </div>
          </div>
        ))}

        <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6">
          <p className="text-[10px] text-slate-300 font-bold">Mostrando 1 a 4 de 24 resultados</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-lg bg-indigo-300 text-white text-[10px] font-bold shadow-md shadow-indigo-100 opacity-80 cursor-not-allowed">
              Anterior
            </button>
            <button className="px-6 py-2 rounded-lg bg-[#7693cc] hover:bg-indigo-500 text-white text-[10px] font-bold shadow-md shadow-indigo-100 transition-all">
              Siguiente
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
