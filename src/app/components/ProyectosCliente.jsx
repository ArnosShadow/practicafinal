'use client'
import Link from "next/link";
import TablaDatos from "./TablaDatos";
import { useEffect, useState } from "react";
import { getListaProyectosCliente } from "../utils";

export default function ProyectosCliente({clienteId}){
    const[proyectos, setProyectos]=useState([]);
    
    useEffect(() => {
        async function fetchCargarDatos() {
            try {
                const cliente = await getListaProyectosCliente(clienteId);
                setProyectos(cliente);
                console.log("Los proyectos son"+proyectos);
            } catch (error) {
                console.error("Error al cargar los datos del cliente:", error);
            }
        }
        fetchCargarDatos();
    }, [clienteId]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Proyectos</h2>
            <Link href="/proyectos" className="text-blue-600 hover:underline text-sm">
              Ver todos
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto overflow-y-auto max-h-[21rem]">
              {proyectos && <TablaDatos datos={proyectos}></TablaDatos>}
              {!proyectos && <p>Cargando proyectos...</p>}
          </div>
        </div>
    );
}