import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import {
  Download,
  Target,
  Calendar,
  Award,
  AlertCircle,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  BarChart3,
  TrendingUp,
  Shield,
  FileText,
  Layers,
  Database,
} from "lucide-react";
import { useModelos } from "@/hooks";
import type { Modelo, Entrenamiento, Grafica } from "@/types/BackendTypes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { API_BASE_URL } from "@/config";

interface AnalysisItem {
  category: string;
  level: "good" | "warning" | "critical";
  text: string;
}

export const ModelReports = () => {
  const { getAllModelos, loading, error } = useModelos();
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [searchParams] = useSearchParams();
  const [selectedModeloId, setSelectedModeloId] = useState<number | "">("");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchModelos = async () => {
      const data = await getAllModelos();
      setModelos(data);
      if (data.length > 0) {
        const queryModel = searchParams.get("modelo");
        setSelectedModeloId(
          queryModel ? Number(queryModel) : data[data.length - 1].id_modelo
        );
      }
    };
    fetchModelos();
  }, [getAllModelos, searchParams]);

  const selectedModelo = modelos.find(
    (m) => m.id_modelo === Number(selectedModeloId)
  );
  const latestEntrenamiento: Entrenamiento | undefined =
    selectedModelo?.entrenamientos &&
    selectedModelo.entrenamientos.length > 0
      ? selectedModelo.entrenamientos[
          selectedModelo.entrenamientos.length - 1
        ]
      : undefined;

  const exportPDF = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `Reporte_${selectedModelo?.nombre_modelo || "Modelo"}`,
  });

  // Derive analysis summary from analysis_metrics or compute basic fallback
  const getAnalysisItems = (): AnalysisItem[] => {
    const am = latestEntrenamiento?.analysis_metrics;
    if (am && Array.isArray(am.analysis_summary)) {
      return am.analysis_summary as AnalysisItem[];
    }
    // Fallback basic analysis
    const items: AnalysisItem[] = [];
    const precision = latestEntrenamiento?.precision || 0;
    const recall = latestEntrenamiento?.sensibilidad || 0;
    const f1 = latestEntrenamiento?.f_score || 0;

    if (precision >= 0.9 && recall >= 0.85) {
      items.push({
        category: "general",
        level: "good",
        text: `El modelo presenta metricas solidas: precision ${(precision * 100).toFixed(1)}% y recall ${(recall * 100).toFixed(1)}%.`,
      });
    } else if (precision >= 0.8 && recall >= 0.75) {
      items.push({
        category: "general",
        level: "warning",
        text: `El modelo presenta metricas aceptables pero con margen de mejora.`,
      });
    } else {
      items.push({
        category: "general",
        level: "critical",
        text: `El modelo presenta metricas por debajo de los umbrales recomendados para uso clinico.`,
      });
    }

    if (f1 < 0.8) {
      items.push({
        category: "balance",
        level: "warning",
        text: `F1-Score de ${(f1 * 100).toFixed(1)}% indica desbalance entre precision y recall.`,
      });
    }

    return items;
  };

  const analysisItems = getAnalysisItems();
  const overallLevel = analysisItems.some((i) => i.level === "critical")
    ? "critical"
    : analysisItems.some((i) => i.level === "warning")
      ? "warning"
      : "good";

  const levelConfig = {
    good: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      icon: CheckCircle,
      label: "MODELO APTO PARA USO CLINICO",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: AlertTriangle,
      label: "MODELO FUNCIONAL CON RESERVAS",
    },
    critical: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: XCircle,
      label: "MODELO NO RECOMENDADO PARA PRODUCCION",
    },
  };

  const LevelIcon = levelConfig[overallLevel].icon;

  // Map graphic names
  const graphicTitleMap: Record<string, string> = {
    accuracy_img: "Learning Curve: Accuracy vs Training Set Size",
    loss_img: "Validation Curve: Accuracy vs Hyperparameter",
    confusion_matrix: "Confusion Matrix (K-Fold Cross-Validation)",
    xai_top_features: "XAI: Top LIME Features",
    roc_curve: "ROC Curve (Cross-Validated)",
    pr_curve: "Precision-Recall Curve (Cross-Validated)",
    calibration_curve: "Calibration Curve (Cross-Validated)",
    feature_importance: "Feature Importance (Global)",
  };

  const getGraphicUrl = (g: Grafica) => {
    return g.archivo.startsWith("http")
      ? g.archivo
      : `${API_BASE_URL}${g.archivo}`;
  };

  const pngGraphics =
    latestEntrenamiento?.graficas?.filter(
      (g) => g.archivo && !g.archivo.endsWith(".json")
    ) || [];

  if (loading && modelos.length === 0) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-[50vh] p-8">
          <div className="animate-spin h-8 w-8 rounded-full border-t-2 border-b-2 border-primary"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="p-8 text-center text-red-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl">{error}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20 print:bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 print:hidden">
            <div>
              <h1 className="text-3xl font-bold">
                Reporte de Ingenieria Algoritmica
              </h1>
              <p className="text-muted-foreground mt-2">
                Metricas y explicabilidad de modelos desplegados
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <select
                className="flex h-10 w-full md:w-[280px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={selectedModeloId}
                onChange={(e) => setSelectedModeloId(Number(e.target.value))}
              >
                <option value="" disabled>
                  Seleccione un modelo...
                </option>
                {modelos.map((m) => (
                  <option key={m.id_modelo} value={m.id_modelo}>
                    {m.nombre_modelo}
                  </option>
                ))}
              </select>
              <Button
                onClick={() => exportPDF()}
                disabled={!selectedModelo}
                className="whitespace-nowrap flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Exportar PDF
              </Button>
            </div>
          </div>

          {!selectedModelo ? (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Target className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-xl">
                  Por favor selecciona un modelo para visualizar su reporte
                </p>
              </CardContent>
            </Card>
          ) : (
            <div
              ref={reportRef}
              className="space-y-8 bg-white p-6 md:p-10 rounded-xl border border-border shadow-sm print:shadow-none print:border-0 print:p-0"
            >
              {/* Report Header (visible en PDF) */}
              <div className="border-b pb-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                      Reporte de Rendimiento del Modelo
                    </h2>
                    <p className="text-slate-500 font-mono mt-2 text-sm bg-slate-100 inline-block px-3 py-1 rounded">
                      Ref: {selectedModelo.nombre_modelo}
                    </p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div className="flex items-center gap-2 justify-end">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {latestEntrenamiento
                          ? new Date(
                              latestEntrenamiento.fecha_entrenamiento
                            ).toLocaleDateString("es-CO", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    {latestEntrenamiento?.algorithm && (
                      <div className="flex items-center gap-2 justify-end mt-1">
                        <Settings className="w-4 h-4" />
                        <span className="font-mono uppercase">
                          {latestEntrenamiento.algorithm}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {!latestEntrenamiento ? (
                <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                  No hay informacion de entrenamiento detallada para este
                  modelo. Sincroniza metricas desde el panel de control.
                </div>
              ) : (
                <>
                  {/* Veredicto Ejecutivo */}
                  <div
                    className={`rounded-lg border p-6 ${levelConfig[overallLevel].bg} ${levelConfig[overallLevel].border}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <LevelIcon
                        className={`w-6 h-6 ${levelConfig[overallLevel].text}`}
                      />
                      <h3
                        className={`text-lg font-bold ${levelConfig[overallLevel].text}`}
                      >
                        {levelConfig[overallLevel].label}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {analysisItems.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 text-sm ${
                            item.level === "good"
                              ? "text-emerald-700"
                              : item.level === "warning"
                                ? "text-amber-700"
                                : "text-red-700"
                          }`}
                        >
                          {item.level === "good" && (
                            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          )}
                          {item.level === "warning" && (
                            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                          )}
                          {item.level === "critical" && (
                            <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          )}
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Configuracion del Entrenamiento */}
                  {latestEntrenamiento.hyperparameters &&
                    Object.keys(latestEntrenamiento.hyperparameters).length >
                      0 && (
                      <div className="border rounded-lg p-6 bg-slate-50/50">
                        <div className="flex items-center gap-2 mb-4">
                          <Database className="w-5 h-5 text-slate-600" />
                          <h3 className="text-lg font-semibold">
                            Configuracion del Entrenamiento
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(
                            latestEntrenamiento.hyperparameters
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-white border rounded-md p-3"
                            >
                              <p className="text-xs text-slate-500 uppercase tracking-wide">
                                {key}
                              </p>
                              <p className="text-sm font-mono font-medium text-slate-800 mt-1">
                                {Array.isArray(value)
                                  ? `[${value.join(", ")}]`
                                  : String(value)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Metricas Detalladas */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-slate-600" />
                      <h3 className="text-lg font-semibold">
                        Metricas de Rendimiento
                      </h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            Accuracy
                          </CardTitle>
                          <Award className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.precision
                              ? `${(latestEntrenamiento.precision * 100).toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            Precision
                          </CardTitle>
                          <Target className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.analysis_metrics &&
                            typeof latestEntrenamiento.analysis_metrics
                              .cv_precision === "number"
                              ? `${(latestEntrenamiento.analysis_metrics.cv_precision * 100).toFixed(1)}%`
                              : latestEntrenamiento.precision
                                ? `${(latestEntrenamiento.precision * 100).toFixed(1)}%`
                                : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            Recall
                          </CardTitle>
                          <Activity className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.sensibilidad
                              ? `${(latestEntrenamiento.sensibilidad * 100).toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            F1-Score
                          </CardTitle>
                          <TrendingUp className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.f_score
                              ? `${(latestEntrenamiento.f_score * 100).toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            Specificity
                          </CardTitle>
                          <Shield className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.analysis_metrics &&
                            typeof latestEntrenamiento.analysis_metrics
                              .specificity === "number"
                              ? `${(latestEntrenamiento.analysis_metrics.specificity * 100).toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xs font-medium text-slate-600">
                            AUC-ROC
                          </CardTitle>
                          <Layers className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-slate-900">
                            {latestEntrenamiento.analysis_metrics &&
                            typeof latestEntrenamiento.analysis_metrics
                              .roc_auc === "number"
                              ? `${(latestEntrenamiento.analysis_metrics.roc_auc * 100).toFixed(1)}%`
                              : "N/A"}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Metricas Adicionales */}
                  {latestEntrenamiento.analysis_metrics && (
                    <div className="border rounded-lg p-6 bg-slate-50/50">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-slate-600" />
                        <h3 className="text-lg font-semibold">
                          Metricas Adicionales
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {typeof latestEntrenamiento.analysis_metrics
                          .pr_auc === "number" && (
                          <div className="bg-white border rounded-md p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              AUC-PR
                            </p>
                            <p className="text-sm font-mono font-medium text-slate-800 mt-1">
                              {(
                                latestEntrenamiento.analysis_metrics
                                  .pr_auc as number
                              ).toFixed(3)}
                            </p>
                          </div>
                        )}
                        {typeof latestEntrenamiento.analysis_metrics
                          .brier_score === "number" && (
                          <div className="bg-white border rounded-md p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Brier Score
                            </p>
                            <p className="text-sm font-mono font-medium text-slate-800 mt-1">
                              {(
                                latestEntrenamiento.analysis_metrics
                                  .brier_score as number
                              ).toFixed(4)}
                            </p>
                          </div>
                        )}
                        {typeof latestEntrenamiento.analysis_metrics
                          .true_positives === "number" && (
                          <div className="bg-white border rounded-md p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Verdaderos Positivos
                            </p>
                            <p className="text-sm font-mono font-medium text-slate-800 mt-1">
                              {String(
                                latestEntrenamiento.analysis_metrics
                                  .true_positives
                              )}
                            </p>
                          </div>
                        )}
                        {typeof latestEntrenamiento.analysis_metrics
                          .false_negatives === "number" && (
                          <div className="bg-white border rounded-md p-3">
                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                              Falsos Negativos
                            </p>
                            <p className="text-sm font-mono font-medium text-slate-800 mt-1">
                              {String(
                                latestEntrenamiento.analysis_metrics
                                  .false_negatives
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Galeria de Visualizaciones */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-slate-600" />
                      <h3 className="text-lg font-semibold">
                        Visualizaciones del Entrenamiento
                      </h3>
                    </div>
                    {pngGraphics.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pngGraphics.map((g) => {
                          const readableName =
                            graphicTitleMap[g.nombre_grafica] ||
                            g.nombre_grafica;
                          return (
                            <Card
                              key={g.id_grafica}
                              className="overflow-hidden shadow-sm flex flex-col h-full border-slate-200 print:break-inside-avoid"
                            >
                              <CardHeader className="bg-slate-50 py-4 border-b">
                                <CardTitle className="text-center text-sm font-semibold text-slate-700">
                                  {readableName}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="flex-1 flex items-center justify-center p-0 bg-white">
                                <img
                                  src={getGraphicUrl(g)}
                                  alt={readableName}
                                  className="w-full h-auto object-contain max-h-[400px]"
                                  crossOrigin="anonymous"
                                />
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-slate-50 border border-dashed rounded-lg text-slate-500">
                        No se han registrado graficas para este modelo.
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};
