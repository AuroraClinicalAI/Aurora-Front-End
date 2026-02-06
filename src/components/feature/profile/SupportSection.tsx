import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const SupportSection = () => {
  const links = [
    { label: "Guía de Usuario" },
    { label: "Contactar Soporte" },
  ];

  return (
    <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 mt-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-bold text-zinc-900">Ayuda y Soporte</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-3">
        {links.map((link) => (
          <button
            key={link.label}
            className="w-full text-left p-4 rounded-xl border border-zinc-100 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all"
          >
            {link.label}
          </button>
        ))}

        <button className="w-full text-center p-4 rounded-xl bg-indigo-400 text-white text-xs font-bold shadow-md shadow-indigo-100 hover:bg-indigo-500 transition-all mt-1">
          Reportar Cuenta de Usuario
        </button>
      </CardContent>
    </Card>
  );
};
