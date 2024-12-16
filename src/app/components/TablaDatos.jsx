"use client";

import { useRouter } from "next/navigation";

export default function TablaDatos({ datos = [] }) {
  const router = useRouter();

  const handleCellClick = (id) => {
    router.push(`/proyectos/${id}`);
  };

  return (
    <>
      {datos.length === 0 ? (
        <p>No hay proyectos en este cliente</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 overflow-y-auto  max-h-[30rem]">
          <thead>
            <tr>
              <th className="border px-4 py-2">Num</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Código</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={dato._id} className="hover:bg-gray-100 transition">
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato._id)}
                >
                  {index + 1}
                </td>
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato._id)}
                >
                  {dato.name}
                </td>
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato._id)}
                >
                  {dato.projectCode}
                </td>
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato._id)}
                >
                  {new Date(dato.createdAt).toLocaleDateString()}
                </td>
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato._id)}
                >
                  <span
                    className={`px-2 py-1 rounded-full ${
                      dato.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dato.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
