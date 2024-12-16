'use client';
import {eliminar, getAlbaran, putAlbaran } from "../utils";
import BotonCambioEstado from "./BotonCambioEstado";
import FormularioDatosAlbaranes from "./FormularioDatosAlbaranes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '@/app/logos/logo2.webp'
import BotonEliminar from "./BotonEliminar";

export default function DatosAlbaranes({ albaranId }) {
    const [isEditable, setIsEditable] = useState(false);
    const [datos, setDatos] = useState({});
    const [clientId, setClientId] = useState("");
    const [projectId, setProjectId] = useState("");
    const router=useRouter();

    async function eliminarId(url, id) {
        try {
            await eliminar(url, id);
            router.push("/");
        } catch (error) {
            console.error("Error al eliminar el albaran:", error);
            alert("Hubo un error al eliminar el albaran.");
        }
    } 
    async function handdleEditModel() {
        if (isEditable) {
            try {
                const payload = {
                    clientId: clientId.trim() || "",
                    projectId: projectId.trim() || "", 
                    format: datos.format || "material",
                    material: datos.material || "",
                    hours: datos.hours || 0,
                    description: datos.description || "",
                    workdate: datos.workdate || "" 
                };


                console.log("Enviando datos al servidor:", payload);
                const respuesta = await putAlbaran(payload, albaranId);
                console.log("Datos guardados correctamente:", respuesta);
            } catch (error) {
                console.error("Error al guardar los datos del albarán:", error);
                alert("Hubo un error al guardar los cambios.");
            }
        }
        setIsEditable((prev) => !prev);
    }

    useEffect(() => {
        const totalId = localStorage.getItem(albaranId);
        if (totalId) {
            const [storedClientId, storedProjectId] = totalId.split(",");
            setClientId(storedClientId?.replace(/"/g, "").trim() || "");
            setProjectId(storedProjectId?.replace(/"/g, "").trim() || "");
        } else {
            console.warn("No se encontraron IDs en localStorage.");
        }

        async function fetchCargarDatos() {
            try {
                const albaran = await getAlbaran(albaranId);

                const formattedDate = albaran.date ? new Date(albaran.date).toLocaleDateString("en-US") : "";

                setDatos({...albaran,workdate: formattedDate});
            } catch (error) {
                console.error("Error al cargar los datos del albarán:", error);
            }
        }
        fetchCargarDatos();
    }, [albaranId]);

    useEffect(() => {
        console.log("Estado actualizado de datos:", datos);
    }, [datos]);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex-1">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">{datos.material}</h1>
                    <p className="text-gray-500">Datos del Albarán</p>
                </div>
                <Image src={logo} alt={datos.name} className="h-10 w-10  rounded-lg " />

            </div>
            {datos && (
                <FormularioDatosAlbaranes
                    isEditable={isEditable}
                    datos={datos}
                    setDatos={setDatos}
                />
            )}
            {!datos && <p>Cargando Datos...</p>}
            <div className="mt-4 flex flex-row justify-between ">
                <BotonCambioEstado isEditable={isEditable} handdleEditModel={handdleEditModel}></BotonCambioEstado>
                <BotonEliminar   url="https://bildy-rpmaya.koyeb.app/api/deliverynote" Id={albaranId} eliminarId={eliminarId}></BotonEliminar>
            </div>
        </div>
    );
}
