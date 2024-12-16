"use client";

import { useRouter } from "next/navigation";

export default function TablaDatosAlbaranes({ datos = [] }) {
  const router = useRouter();

  const handleCellClick = (dato) => {
    localStorage.setItem(dato._id, JSON.stringify(dato.clientId+","+dato.projectId));
    router.push(`/albaranes/${dato._id}`);
  };

  return (
    <>
      {datos.length === 0 ? (
        <p>No hay albaranes para este proyecto</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 overflow-y-auto  max-h-[30rem]">
          <thead>
            <tr>
              <th className="border px-4 py-2">Num</th>
              <th className="border px-4 py-2">Material</th>
              <th className="border px-4 py-2">Descripción</th>
              <th className="border px-4 py-2">Fecha de Trabajo</th>
              <th className="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={dato._id} className="hover:bg-gray-100 transition">
                {/* Número secuencial */}
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato)}
                >
                  {index + 1}
                </td>

                {/* Material */}
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato)}
                >
                  {dato.material || "N/A"}
                </td>

                {/* Descripción */}
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato)}
                >
                  {dato.description || "Sin descripción"}
                </td>

                {/* Fecha de trabajo */}
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato)}
                >
                  {new Date(dato.workdate).toLocaleDateString("es-ES")}
                </td>

                {/* Estado */}
                <td
                  className="border px-4 py-2 cursor-pointer"
                  onClick={() => handleCellClick(dato)}
                >
                  <span
                    className={`px-2 py-1 rounded-full ${
                      dato.pending
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {dato.pending ? "Pendiente" : "Completado"}
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
