"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormularioCrearCliente from "@/app/components/FormularioCrearCliente";
import Image from "next/image";
import logo from '@/app/logos/logo3.webp'
export default function pageCrearClientes() {
  const router = useRouter();
  const [existeCliente, setExisteCliente] = useState(true);
  const [clienteId, setClienteId]=useState(null);
  useEffect(() => {
    setExisteCliente(localStorage.getItem("existeCliente"));
  }, []);

  function handdleOpenCrearCliente() {
    setExisteCliente(true);
  }

  function handdleCloseCrearCliente() {
    setExisteCliente(false);
    router.push("/clientes");
  }

  return (
    <div className="flex flex-col space-y-4 p-4 md:p-8">
      {/* Bloque para cuando no existe cliente */}
      {!existeCliente && (
        <div className="bg-white p-6 shadow-md rounded-md flex flex-col items-center text-center space-y-4">
          <Image src={logo} alt="Crea tu cliente" className="w-32 h-32 rounded-lg"/>
          <h1 className="text-xl font-bold">Crea tu propio cliente</h1>
          <h3 className="text-gray-600">Para poder generar Albaranes digitales</h3>
          <button
            onClick={handdleOpenCrearCliente}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Sí, ¡vamos!
          </button>
        </div>
      )}

      {/* Bloque para cuando existe cliente */}
      {existeCliente && (
        <div className="bg-white p-6 shadow-md rounded-md space-y-6">
          <h1 className="text-xl font-bold">Nuevo Cliente</h1>
          <FormularioCrearCliente handdleClose={handdleCloseCrearCliente} setClienteId={setClienteId}/>
        </div>
      )}
    </div>
  );
}
