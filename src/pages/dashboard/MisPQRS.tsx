import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layout/DefaultLayout";
import {
  Inbox,
  MessageCircle,
  Clock,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { usePQRS } from "@/hooks/usePQRS";
import { useNavigate } from "react-router-dom";

export const MisPQRS = () => {
  const { pqrsList, getAllPQRS, loading } = usePQRS();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPQRS();
  }, [getAllPQRS]);

  const getTipoBadge = (tipo: string) => {
    const styles: Record<string, string> = {
      PETICION: "bg-blue-50 text-blue-700 border-blue-100",
      QUEJA: "bg-orange-50 text-orange-700 border-orange-100",
      RECLAMO: "bg-red-50 text-red-700 border-red-100",
      SUGERENCIA: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border uppercase tracking-widest ${styles[tipo]}`}>
        {tipo}
      </span>
    );
  };

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Mis Solicitudes PQRS</h1>
              <p className="text-[11px] font-bold text-slate-400 tracking-wide uppercase mt-1">Sigue el estado de tus peticiones, quejas, reclamos y sugerencias</p>
            </div>
            <button
              onClick={() => navigate('/help#pqrs-section')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 whitespace-nowrap"
            >
              Nueva Solicitud
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
              </div>
            ) : pqrsList.length > 0 ? (
              pqrsList.map((pqrs) => (
                <Card key={pqrs.id_pqrs} className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div
                      className="p-6 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      onClick={() => setExpandedId(expandedId === pqrs.id_pqrs ? null : pqrs.id_pqrs)}
                    >
                      <div className="space-y-2 flex-grow">
                        <div className="flex items-center gap-3">
                          {getTipoBadge(pqrs.tipo)}
                          {pqrs.respuesta ? (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 border border-emerald-100 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Respondida
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 border border-amber-100 rounded-full">
                              <Clock className="w-3 h-3" /> En Espera
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-zinc-900 text-base">{pqrs.asunto}</h3>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Enviada el {new Date(pqrs.fecha_creacion).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center shrink-0">
                        {expandedId === pqrs.id_pqrs ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </div>

                    {expandedId === pqrs.id_pqrs && (
                      <div className="px-6 pb-6 bg-slate-50/50 border-t border-zinc-100 pt-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Inbox className="w-3 h-3" /> Tu Mensaje Original</h4>
                            <p className="text-sm text-zinc-700 leading-relaxed bg-white p-4 rounded-xl border border-zinc-100">{pqrs.mensaje}</p>
                          </div>

                          {pqrs.respuesta ? (
                            <div>
                              <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <MessageCircle className="w-3 h-3" /> Respuesta del Equipo
                                <span className="text-slate-400 font-medium lowercase">({new Date(pqrs.fecha_respuesta!).toLocaleDateString()})</span>
                              </h4>
                              <p className="text-sm text-zinc-700 leading-relaxed bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
                                {pqrs.respuesta}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                              <p className="text-xs font-medium text-amber-800 leading-relaxed">
                                Tu solicitud está siendo procesada. Recibirás una respuesta en este panel pronto.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8 text-zinc-300" />
                </div>
                <h3 className="text-zinc-900 font-bold mb-1">Cero Solicitudes</h3>
                <p className="text-slate-500 font-medium text-sm">No has enviado ninguna PQRS aún.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
