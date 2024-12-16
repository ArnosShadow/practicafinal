"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getListaProyectos } from "../utils";

export default function PageProyectos() {
  const router = useRouter();
  const [data, setProyectos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const handleCellClick = (dato) => {
    router.push(`/proyectos/${dato._id}`);
  };

  useEffect(() => {
    localStorage.setItem("cantidadProyectos", data.length);

    async function fetchProyectos() {
      try {
        const lista = await getListaProyectos();
        console.log(lista);
        setProyectos(lista);
      } catch (error) {
        console.error("Error al obtener la lista de proyectos:", error);
        setProyectos([]);
      }
    }

    fetchProyectos();
  }, []);

  const datosFiltrados = data.filter(
    (item) =>
      item.projectCode.toLowerCase().includes(filtro.toLowerCase()) ||
      item.name.toLowerCase().includes(filtro.toLowerCase()) ||
      item.clientId.toLowerCase().includes(filtro.toLowerCase()) ||
      item.email.toLowerCase().includes(filtro.toLowerCase())
  );

  function crearProyecto() {
    router.push("/proyectos/crear%20proyecto");
  }

  return (
    <div className="p-9">
      <div className="p-9">
        <div className="flex flex-row justify-between">
          <h1 className="flex-1 text-blue-400 ">Todos los proyectos</h1>
          <button onClick={crearProyecto} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md">
             Crear Proyecto
          </button>
        </div>
        <div className="h-0.5 w-[9rem] mt-2 mb-2 bg-blue-400"></div>
      </div>
      {/*FILTRO*/}
      <div className="flex align-baseline">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por código, nombre, cliente o email"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full max-w-md"
          />
        </div>
      </div>
      {/*TABLA*/}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg ">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg overflow-y-auto  max-h-full">
          <thead className="bg-gray-100  text-gray-700 rounded-t-lg">
            <tr>
              <th className="px-4 py-2 text-left w-1/6">Código</th>
              <th className="px-4 py-2 text-left w-1/6">Fecha</th>
              <th className="px-4 py-2 text-left w-1/5">Nombre</th>
              <th className="px-4 py-2 text-left w-1/5">Cliente</th>
              <th className="px-4 py-2 text-left w-1/5">Email</th>
              <th className="px-4 py-2 text-center w-1/6">Estado</th>
            </tr>
          </thead>
          <tbody className="rounded-b-lg">
            {datosFiltrados.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer" onClick={() => handleCellClick(item)}
              >
                <td className="px-4 py-2">{item.projectCode}</td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleString("es-ES")}
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.clientId}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.active
                        ? "bg-green-100 text-green-700"
                        : item.deleted
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.active
                      ? "Activo"
                      : item.deleted
                      ? "Eliminado"
                      : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
