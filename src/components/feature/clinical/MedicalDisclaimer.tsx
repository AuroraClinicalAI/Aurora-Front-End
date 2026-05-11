import { AlertTriangle } from "lucide-react";

export const MedicalDisclaimer = ({ className = "" }: { className?: string }) => (
  <div className={`bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 ${className}`}>
    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
    <p className="text-[10px] font-medium text-amber-800 leading-relaxed">
      <span className="font-bold">Advertencia:</span> Resultado generado por IA con fines educativos. No sustituye un diagnóstico médico. La evaluación y el tratamiento deben ser realizados por un profesional de salud mental calificado.
    </p>
  </div>
);
