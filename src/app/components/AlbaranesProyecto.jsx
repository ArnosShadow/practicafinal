"use client";
import FormularioCrearAlbaran from "./FormularioCrearAlbaran";
import TablaDatosAlbaranes from "./TablaDatosAlbaranes";
import { useEffect, useState } from "react";
import { getAlbaranesPorProyecto } from "../utils";

export default function AlbaranesProyecto({ proyectoId }) {
  const [albaranes, setAlbaranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monstrarFormularios, setMonstrarFormularios]=useState(false);

  useEffect(() => {
    async function fetchCargarAlbaranes() {
      try {
        const lista = await getAlbaranesPorProyecto(proyectoId);
        setAlbaranes(lista);
      } catch (error) {
        console.error("Error al cargar los albaranes del proyecto:", error);
        setAlbaranes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCargarAlbaranes();
  }, [proyectoId]);

  function toggleFormulario() {
    setMonstrarFormularios((prev) => !prev);
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex-1 w-full max-h-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Albaranes</h2>
        <button
          onClick={toggleFormulario}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          {!monstrarFormularios ? "Crear Albarán" : "Cancelar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        {!monstrarFormularios && (
          <>
            {loading ? (
              <p>Cargando albaranes...</p>
            ) : albaranes.length > 0 ? (
              <TablaDatosAlbaranes datos={albaranes} />
            ) : (
              <p>No hay albaranes para este proyecto.</p>
            )}
          </>
        )}
        {monstrarFormularios && <FormularioCrearAlbaran projectId={proyectoId} onFormSubmit={toggleFormulario} />}
      </div>
    </div>

  );
}
