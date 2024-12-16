'use client'
import { eliminar, getClienteId, putCliente } from "../utils";
import BotonCambioEstado from "./BotonCambioEstado";
import FormularioDatosCliente from "./FormularioDatosCliente";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '@/app/logos/logo2.webp';
import BotonElimiar from "./BotonEliminar.jsx"

export default function DatosCliente({clienteId}){
    const [isEditable, setIsEditable] = useState(false);
    const [datos, setDatos]=useState({});
    const router=useRouter();

    async function eliminarId(url, id) {
        try {
            await eliminar(url, id);
            router.push("/");
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            alert("Hubo un error al eliminar el cliente.");
        }
    }
    async function handdleEditModel(){
        if (isEditable) {
            try {
                const respuesta = await putCliente(datos, datos._id);
                console.log("Datos guardados correctamente:", respuesta);
            } catch (error) {
                console.error("Error al guardar los datos del cliente:", error);
                alert("Hubo un error al guardar los cambios.");
            }
        }
        setIsEditable((prev) => !prev);
    }
    useEffect(() => {
        async function fetchCargarDatos() {
            try {
                const cliente = await getClienteId(clienteId);
                setDatos(cliente);
            } catch (error) {
                console.error("Error al cargar los datos del cliente:", error);
            }
        }
        fetchCargarDatos();
    }, [clienteId]);

    useEffect(() => {
        console.log("Estado actualizado de datos:", datos); 
    }, [datos]);
    return(
        
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-xl font-semibold text-gray-800">{datos.name}</h1>
                <p className="text-gray-500">Datos del cliente</p>
                </div>
                <Image src={logo} alt={datos.name}  className="h-20 w-20 object-cover rounded-lg"/>
            </div>
            {datos && <FormularioDatosCliente isEditable={isEditable} datos={datos} setDatos={setDatos}></FormularioDatosCliente>}
            {!datos && <p>Cargando Datos...</p>}
            <div className="mt-4 flex flex-row justify-between ">
                <BotonCambioEstado isEditable={isEditable} handdleEditModel={handdleEditModel}></BotonCambioEstado>
                <BotonElimiar   url="https://bildy-rpmaya.koyeb.app/api/client" Id={clienteId} eliminarId={eliminarId}></BotonElimiar>
            </div>
        </div>
    );
}