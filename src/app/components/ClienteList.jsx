"use client";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import ClienteListTag from "./ClienteListTag";
import { getListaCliente } from "../utils";
import "../estilos/global-componentes.css";
import logo from '@/app/logos/logo1.webp'

export default function ClienteList() {
  const router = useRouter();

  const [clientes, setClientes] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchClientes() {
      try {
        const lista = await getListaCliente(); 
        console.log(lista);
        setClientes(lista);
      } catch (error) {
        console.error("Error al obtener la lista de clientes:", error);
        setClientes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, []);

  function handleOpenCrearCliente() {
    router.push("/clientes/crear%20cliente");
  }

  return (
    <div className="flex flex-col bg-slate-800 text-white p-4 justify-between rounded-lg">
      {/* Mostrar lista de clientes */}
      <div className="flex flex-col gap-5 overflow-y-auto  max-h-[40rem]"> {/*Esto crea un scrollbar*/}
        {loading && <p>Cargando clientes...</p>}
        {clientes && clientes.length > 0 ? (
          clientes.map((item) => (
            <ClienteListTag logo={logo} key={item._id} nombre={item.name} dato="Detalles de Cliente" url={item._id} />
          ))
        ) : (
          !loading && <p>Clientes no encontrados</p>
        )}
      </div>
      {/* Botón para crear cliente */}
      <button
        className="bg-blue-600 py-2 px-1 rounded-lg hover:bg-blue-700"
        onClick={handleOpenCrearCliente}
      >
        Crear Cliente
      </button>
    </div>
  );
  
}
