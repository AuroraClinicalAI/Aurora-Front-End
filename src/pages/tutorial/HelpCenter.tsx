import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  HelpCircle,
  MessageCircle,
  FileText,
  Video,
  Search
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui";
import { PQRSForm } from "@/components/feature/help/PQRSForm";

export const HelpCenter = () => {
  const faqs = [
    {
      q: "¿Cómo inicio un nuevo diagnóstico?",
      a: "Ve a la sección 'Diagnóstico' desde el menú principal o tu dashboard, selecciona un paciente y completa el formulario clínico."
    },
    {
      q: "¿Qué significan los niveles de certeza?",
      a: "Es la probabilidad estadística devuelta por el modelo de IA basada en los síntomas y notas clínicas ingresadas."
    },
    {
      q: "¿Cómo exporto un informe?",
      a: "Dentro de la vista de análisis de caso, encontrarás un botón de 'Exportar Informe' en la esquina superior derecha."
    }
  ];

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl font-bold text-zinc-900">¿Cómo podemos ayudarte?</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Encuentra guías prácticas, tutoriales y respuestas a las dudas más comunes sobre el uso del sistema Aurora.
            </p>
            <div className="max-w-xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Busca un tema, guía o tutorial..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-16">
            <Card className="rounded-2xl border-zinc-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Guías de Usuario</h3>
                  <p className="text-xs text-slate-500 mt-1">Explora la documentación paso a paso.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-zinc-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Soporte Técnico</h3>
                  <p className="text-xs text-slate-500 mt-1">¿Tienes problemas técnicos? Contáctanos.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="space-y-16">
            <Card className="rounded-[2.5rem] border-zinc-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-zinc-100 p-8">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-indigo-500" /> Preguntas Frecuentes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-100">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-8 hover:bg-slate-50/30 transition-colors">
                      <h4 className="font-bold text-zinc-900 mb-2">{faq.q}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PQRS Form Section */}
            <div id="pqrs-section" className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-zinc-900">¿No encuentras lo que buscas?</h2>
                <p className="text-sm text-slate-400 mt-2">Envíanos una solicitud formal a través de nuestro sistema de PQRS.</p>
              </div>
              <PQRSForm />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
