"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getListaAlbaranes, getDescargar } from "../utils";

export default function PageAlbaranes() {
  const router = useRouter();
  const [data, setAlbaranes] = useState([]);
  const [filtro, setFiltro] = useState("");
  
  const handleCellClick = (dato) => {
    localStorage.setItem(dato._id, JSON.stringify(dato.clientId+","+dato.projectId._id));
    router.push(`/albaranes/${dato._id}`);
  };
  useEffect(() => {
    async function fetchAlbaranes() {
      try {
        const lista = await getListaAlbaranes();
        const listaConValoresPorDefecto = lista.map((item) => ({
          ...item,
          codigo: item._id || "Sin código",
          estado: item.estado || "Desconocido",
          description: item.description || "Sin descripción",
        }));
        setAlbaranes(listaConValoresPorDefecto);
      } catch (error) {
        console.error("Error al obtener la lista de albaranes:", error);
        setAlbaranes([]);
      }
    }

    fetchAlbaranes();
  }, []);

  const parseDescription = (description) => {
    if (!description) return { storeName: "N/A", address: "N/A" };

    const storeMatch = description.match(/Store name:\s*(.+?),/);
    const addressMatch = description.match(/Dirección:\s*(.+?),/);

    return {
      storeName: storeMatch ? storeMatch[1].trim() : "N/A",
      address: addressMatch ? addressMatch[1].trim() : "N/A",
    };
  };

  const handleDescargar = async (id) => {
    await getDescargar(id);
  };


  const datosFiltrados = data.filter((item) => {
    const { storeName, address } = parseDescription(item.description || "");
    return (
      (item.codigo && item.codigo.toLowerCase().includes(filtro.toLowerCase())) ||
      (storeName && storeName.toLowerCase().includes(filtro.toLowerCase())) ||
      (address && address.toLowerCase().includes(filtro.toLowerCase())) ||
      (item.estado && item.estado.toLowerCase().includes(filtro.toLowerCase()))
    );
  });

  return (
    <div className="p-9 ">
      <div className="p-9">
        <div className="flex flex-row justify-between">
          <h1 className="flex-1 text-blue-400">Todos los Albaranes</h1>
        </div>
        <div className="h-0.5 w-[9rem] mt-2 mb-2 bg-blue-400"></div>
      </div>
      <div className="flex align-baseline">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por código, nombre o estado"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full max-w-md"
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-y-auto  max-h-[30rem]">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 rounded-t-lg">
            <tr>
              <th className="px-4 py-2 text-left w-1/6">Código</th>
              <th className="px-4 py-2 text-left w-1/6">Fecha</th>
              <th className="px-4 py-2 text-left w-1/5">Store Name</th>
              <th className="px-4 py-2 text-center w-1/6">Material</th>
              <th className="px-4 py-2 text-left w-1/5">Dirección</th>
              <th className="px-4 py-2 text-center w-1/6">Estado</th>
              <th className="px-4 py-2 text-center w-1/6">Acción</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {datosFiltrados.map((item, index) => {
              const { storeName, address } = parseDescription(item.description || "");
              return (
                <tr key={index} className="border-b cursor-pointer border-gray-200 hover:bg-gray-50 transition" onClick={() => handleCellClick(item)}>
                  <td className="px-4 py-2" >{item.codigo}</td>
                  <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{storeName}</td>
                  <td className="px-4 py-2">{item.material}</td>
                  <td className="px-4 py-2">{address}</td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        item.estado === "Finalizado"
                          ? "bg-green-100 text-green-700"
                          : item.estado === "En marcha"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDescargar(item._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Descargar PDF
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
