import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Download, Target, Calendar, Award, AlertCircle, Activity } from "lucide-react";
import { useModelos } from "@/hooks";
import type { Modelo, Entrenamiento } from "@/types/BackendTypes";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { API_BASE_URL } from "@/config";

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
        const queryModel = searchParams.get('modelo');
        setSelectedModeloId(queryModel ? Number(queryModel) : data[data.length - 1].id_modelo);
      }
    };
    fetchModelos();
  }, [getAllModelos, searchParams]);

  const selectedModelo = modelos.find((m) => m.id_modelo === Number(selectedModeloId));
  const latestEntrenamiento: Entrenamiento | undefined =
    selectedModelo?.entrenamientos && selectedModelo.entrenamientos.length > 0
      ? selectedModelo.entrenamientos[selectedModelo.entrenamientos.length - 1] // assumes last is newest
      : undefined;

  const exportPDF = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `Reporte_${selectedModelo?.nombre_modelo || "Modelo"}`,
  });

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
      <div className="bg-[#f8faff] min-h-screen font-poppins pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold">Reportes de Ingeniería Algorítmica</h1>
              <p className="text-muted-foreground mt-2">
                Supervisa las métricas y explicabilidad (XAI) de los modelos desplegados
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <select
                className="flex h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedModeloId}
                onChange={(e) => setSelectedModeloId(Number(e.target.value))}
              >
                <option value="" disabled>Seleccione un modelo...</option>
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
                <p className="text-xl">Por favor selecciona un modelo para visualizar su reporte</p>
              </CardContent>
            </Card>
          ) : (
            <div ref={reportRef} className="space-y-8 bg-background p-4 md:p-8 rounded-xl border border-border shadow-sm">
              {/* Cabecera del Reporte para el PDF */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-primary">Diagnóstico de Rendimiento</h2>
                  <p className="text-muted-foreground font-mono mt-1 text-sm bg-muted inline-block px-2 py-1 rounded">
                    Ref: {selectedModelo.nombre_modelo}
                  </p>
                </div>
              </div>

              {!latestEntrenamiento ? (
                <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
                  No hay información de entrenamiento detallada para este modelo. Por favor sincroniza métricas desde el panel de control.
                </div>
              ) : (
                <>
                  {/* Tarjetas de Métricas Resumen */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="shadow-sm border-primary/20 bg-primary/5">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exactitud (Accuracy)</CardTitle>
                        <Award className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">
                          {latestEntrenamiento.precision ? (latestEntrenamiento.precision * 100).toFixed(2) + "%" : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Global performance</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-blue-500/20 bg-blue-500/5">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">F1-Score</CardTitle>
                        <Target className="h-4 w-4 text-blue-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">
                          {latestEntrenamiento.f_score ? (latestEntrenamiento.f_score * 100).toFixed(2) + "%" : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Balance precisión-Sens.</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-green-500/20 bg-green-500/5">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sensibilidad (Recall)</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                          {latestEntrenamiento.sensibilidad ? (latestEntrenamiento.sensibilidad * 100).toFixed(2) + "%" : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Tasa de verdaderos (+)</p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-sm border-orange-500/20 bg-orange-500/5">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Fecha Entrenamiento</CardTitle>
                        <Calendar className="h-4 w-4 text-orange-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-orange-600 truncate pt-2">
                          {new Date(latestEntrenamiento.fecha_entrenamiento).toLocaleDateString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Última recalibración</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sección Gráficas */}
                  <div className="pt-6 border-t mt-8">
                    <h3 className="text-xl font-semibold mb-6">Visualizaciones del Entrenamiento</h3>
                    {latestEntrenamiento.graficas && latestEntrenamiento.graficas.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {latestEntrenamiento.graficas.map((g) => {
                          // Filter out anything that's json, only display png
                          if (!g.archivo || g.archivo.endsWith(".json")) return null;

                          const rawUrl = g.archivo.startsWith('http') ? g.archivo : `${API_BASE_URL}${g.archivo}`;

                          // Map graphic name to readable title
                          let readableName = g.nombre_grafica;
                          if (g.nombre_grafica === 'accuracy_img') readableName = "Curva de Precisión por Época";
                          if (g.nombre_grafica === 'loss_img') readableName = "Curva de Función de Pérdida";
                          if (g.nombre_grafica === 'confusion_matrix') readableName = "Matriz de Confusión K-Fold";
                          if (g.nombre_grafica === 'xai_top_features') readableName = "Top LIME Features (Espectrogramas y LSA)";

                          return (
                            <Card key={g.id_grafica} className="overflow-hidden shadow-sm flex flex-col h-full border-muted">
                              <CardHeader className="bg-muted/30 py-4 border-b">
                                <CardTitle className="text-center text-sm">{readableName}</CardTitle>
                              </CardHeader>
                              <CardContent className="flex-1 flex items-center justify-center p-0 bg-white">
                                {/* Adding crossOrigin anonymous to image helps with html2canvas CORS issues during PDF generation */}
                                <img
                                  src={rawUrl}
                                  alt={readableName}
                                  className="w-full h-auto object-contain max-h-[400px]"
                                  crossOrigin="anonymous"
                                />
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-muted/20 border border-dashed rounded-lg text-muted-foreground">
                        No se han registrado gráficas binarias (PNG) para este modelo.
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
