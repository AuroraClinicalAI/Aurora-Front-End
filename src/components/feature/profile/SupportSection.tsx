import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useUser } from "@/hooks";
import { SUPPORT_EMAIL } from "@/config";
import { useState } from "react";
import { ReportUserModal } from "./ReportUserModal";

/* ── Importación de PDFs (Vite) ── */
import guiaAdmin from "@/assets/guides/guia_admin.pdf";
import guiaPracticante from "@/assets/guides/guia_practicante.pdf";
import guiaModeradorPdf from "@/assets/guides/guia_moderador.pdf";
import guiaPsicologoPdf from "@/assets/guides/guia_psicologo.pdf";
import guiaEvaluadorPdf from "@/assets/guides/guia_evaluador.pdf";
import guiaGeneralPdf from "@/assets/guides/guia_general.pdf";

const USER_GUIDE_MAP: Record<string, string> = {
  ADMIN: guiaAdmin,
  PRACTICANTE: guiaPracticante,
  MODERADOR: guiaModeradorPdf,
  PSICOLOGO: guiaPsicologoPdf,
  EVALUADOR: guiaEvaluadorPdf,
  GENERAL: guiaGeneralPdf,
};

export const SupportSection = () => {
  const { usuario } = useUser();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleOpenGuide = () => {
    const userType = usuario?.tipo_usuario ?? "GENERAL";
    const pdfUrl = USER_GUIDE_MAP[userType] ?? USER_GUIDE_MAP["GENERAL"];
    window.open(pdfUrl, "_blank");
  };

  const handleContactSupport = () => {
    window.location.href = `mailto:${SUPPORT_EMAIL}`;
  };

  const links = [
    { label: "Guía de Usuario", action: handleOpenGuide },
    { label: "Contactar Soporte", action: handleContactSupport },
  ];

  return (
    <>
      <Card className="rounded-2xl border-zinc-100 shadow-sm bg-white overflow-hidden p-6 mt-6 hover:shadow-md transition-shadow">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold text-zinc-900">Ayuda y Soporte</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-3">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="w-full text-left p-4 rounded-xl border border-zinc-100 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all hover:border-indigo-100"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="w-full text-center p-4 rounded-xl bg-indigo-400 text-white text-xs font-bold shadow-md shadow-indigo-100 hover:bg-indigo-500 transition-all mt-1"
          >
            Reportar Cuenta de Usuario
          </button>
        </CardContent>
      </Card>

      <ReportUserModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
};
