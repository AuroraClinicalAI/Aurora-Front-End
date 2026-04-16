import { useState, useEffect } from 'react';
import { useModelos } from '@/hooks/useModelos';
import type { Modelo } from '@/types/BackendTypes';
import { useNavigate } from 'react-router-dom';

export const ModelManagementView = () => {
  const {
    getAllModelos,
    getDeletedModelos,
    softDeleteModelo,
    recoverModelo,
    syncModelos,
    trainCustomModelo,
    toggleProductionModelo,
    loading
  } = useModelos();

  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [trainConfig, setTrainConfig] = useState<{ name: string, dataset: string, file: File | null }>({ name: '', dataset: '', file: null });
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const active = await getAllModelos();
      const deleted = await getDeletedModelos();

      const all: Modelo[] = [
        ...active.map((m: Modelo) => ({ ...m, is_active: true })),
        ...deleted.map((m: Modelo) => ({ ...m, is_active: false }))
      ];

      all.sort((a, b) => new Date(b.fecha_entrenamiento).getTime() - new Date(a.fecha_entrenamiento).getTime());
      setModelos(all);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSync = async () => {
    await syncModelos();
    loadData();
  };

  const handleToggleActive = async (modelo: Modelo) => {
    if (modelo.is_active) {
      if (confirm(`¿Seguro que deseas desactivar el modelo ${modelo.nombre_modelo}?`)) {
        await softDeleteModelo(modelo.id_modelo);
        loadData();
      }
    } else {
      await recoverModelo(modelo.id_modelo);
      loadData();
    }
  };

  const handleToggleProduction = async (modelo: Modelo) => {
    try {
      await toggleProductionModelo(modelo.id_modelo);
      loadData();
    } catch (e) {
      console.error(e);
      alert("Error al cambiar estado de producción");
    }
  };

  const handleTrain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await trainCustomModelo(trainConfig.file, trainConfig.dataset, trainConfig.name);
      const respObj = resp as { message?: string };
      alert(respObj?.message || "El entrenamiento ha comenzado. Esto tomará varios minutos.");
      setShowTrainModal(false);
      setTrainConfig({ name: '', dataset: '', file: null });
      loadData();
    } catch (e) {
      console.error(e);
      alert("Error al iniciar el entrenamiento.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 min-h-[500px] relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-800">Gestión de Modelos (Admin)</h2>
          <p className="text-sm text-zinc-500">Administra los modelos de IA desplegados en la plataforma</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSync}
            disabled={loading}
            className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sincronizando...' : 'Sincronizar Modelos'}
          </button>
          <button
            onClick={() => setShowTrainModal(true)}
            className="px-4 py-2 bg-[#637bc4] text-white rounded-md text-sm font-semibold hover:bg-indigo-500 transition-colors"
          >
            Entrenar Nuevo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 border border-zinc-100 rounded-lg overflow-hidden">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Métricas</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Producción</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-zinc-200">
            {modelos.map(m => (
              <tr key={m.id_modelo} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 border-l-4" style={{ borderLeftColor: m.is_active ? '#10b981' : '#ef4444' }}>
                  {m.nombre_modelo}
                  <div className="text-[11px] text-zinc-400 font-normal">{new Date(m.fecha_entrenamiento).toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {m.precision ? (m.precision * 100).toFixed(1) + "%" : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-[11px] leading-5 font-semibold rounded-full ${m.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {m.is_active ? 'Activo' : 'Soft Deleted'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {m.is_active ? (
                    <button
                      onClick={() => handleToggleProduction(m)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#637bc4] focus:ring-offset-2 ${m.is_production ? 'bg-emerald-500' : 'bg-zinc-200'} transition-colors duration-200 ease-in-out`}
                    >
                      <span className="sr-only">Toggle Producción</span>
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${m.is_production ? 'translate-x-2' : '-translate-x-2'}`}
                      />
                    </button>
                  ) : (
                    <span className="text-zinc-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => navigate(`/reports?modelo=${m.id_modelo}`)}
                    className="text-[#637bc4] hover:text-indigo-900"
                  >
                    Métricas
                  </button>
                  <button
                    onClick={() => handleToggleActive(m)}
                    className={m.is_active ? "text-red-500 hover:text-red-700" : "text-emerald-500 hover:text-emerald-700"}
                  >
                    {m.is_active ? 'Desactivar' : 'Recuperar'}
                  </button>
                </td>
              </tr>
            ))}
            {modelos.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-500">
                  No hay modelos disponibles. Sincroniza o entrena uno nuevo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showTrainModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 rounded-2xl backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Entrenar Nuevo Modelo</h3>
            <p className="text-xs text-zinc-500 mb-6">Configura el nombre y dataset a procesar por el MLCore (FastAPI). Por defecto usará el dataset de consolidado diagnóstico.</p>

            <form onSubmit={handleTrain} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre Personalizado (Opcional)</label>
                <input
                  type="text"
                  value={trainConfig.name}
                  onChange={e => setTrainConfig({ ...trainConfig, name: e.target.value })}
                  placeholder="ej. v2_clinical_advanced"
                  className="w-full px-3 py-2 border border-zinc-200 rounded-md text-sm focus:ring-2 focus:ring-[#637bc4] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Subir Dataset Nuevo (CSV)</label>
                <input
                  type="file"
                  accept=".csv,.zip"
                  onChange={e => setTrainConfig({ ...trainConfig, file: e.target.files ? e.target.files[0] : null, dataset: '' })}
                  className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#637bc4] hover:file:bg-indigo-100"
                />
                <p className="text-[10px] text-zinc-400 mt-1">Opcional. Dará precedencia sobre la selección inferior si se provee.</p>
              </div>

              <div className={trainConfig.file ? "opacity-40 pointer-events-none mt-4" : "mt-4"}>
                <label className="block text-sm font-medium text-zinc-700 mb-1">O selecciona dataset existente</label>
                <select
                  className="w-full px-3 py-2 border border-zinc-200 rounded-md text-sm focus:ring-2 focus:ring-[#637bc4] focus:outline-none"
                  value={trainConfig.dataset}
                  onChange={e => setTrainConfig({ ...trainConfig, dataset: e.target.value })}
                  disabled={!!trainConfig.file}
                >
                  <option value="">Consolidado Diagnóstico (Por Defecto)</option>
                  <option value="consolidado_etiquetado.csv">consolidado_etiquetado.csv</option>
                  <option value="consolidado_historia_clinica.csv">consolidado_historia_clinica.csv</option>
                </select>
                <p className="text-[10px] text-zinc-400 mt-2">Puedes seleccionar un dataset diferente si está montado en /Prototipe.</p>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowTrainModal(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:bg-zinc-50 rounded-md transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-[#637bc4] hover:bg-indigo-500 disabled:opacity-50 rounded-md transition-colors shadow-sm">
                  {loading ? 'Iniciando...' : 'Iniciar Entrenamiento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
