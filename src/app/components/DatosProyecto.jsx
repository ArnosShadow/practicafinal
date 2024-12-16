"use client";

import {eliminar, getVerProyectoEspecifico, putActualizarProyecto } from "../utils";
import BotonCambioEstado from "./BotonCambioEstado";
import FormularioDatosProyecto from "./FormularioDatosProyecto";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from '@/app/logos/logo3.webp'
import BotonEliminar from "./BotonEliminar";

export default function DatosProyecto({ proyectoId }) {
  const [isEditable, setIsEditable] = useState(false);
  const [datos, setDatos] = useState({});
  const router=useRouter();

  async function eliminarId(url, id) {
      try {
        await eliminar(url, id);
        router.push("/");
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        alert("Hubo un error al eliminar el proyecto.");
      }
  }
  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  };

  const getFromLocalStorage = (key) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error al cargar desde localStorage:", error);
      return null;
    }
  };

  async function handdleEditModel() {
    if (isEditable) {
      try {
        console.log(datos);
        console.log(datos._id);
        const respuesta = await putActualizarProyecto(datos, datos._id);
        console.log("Datos guardados correctamente:", respuesta);
        alert("¡Cambios guardados con éxito!");
      } catch (error) {
        console.error("Error al guardar los datos del proyecto:", error);
        alert("Hubo un error al guardar los cambios.");
      }
    }
    setIsEditable((prev) => !prev);
  }

  useEffect(() => {
    async function fetchCargarDatos() {
      try {
        const proyecto = await getVerProyectoEspecifico(proyectoId);
        setDatos(proyecto);

        if (proyecto?.clientId) {
          saveToLocalStorage(proyectoId, proyecto.clientId);
        }
      } catch (error) {
        console.error("Error al cargar los datos del proyecto:", error);
      }
    }

    fetchCargarDatos();
  }, [proyectoId]);

  // Recuperar clientId de localStorage
  useEffect(() => {
    const storedClientId = getFromLocalStorage(proyectoId);
    if (storedClientId) {
      console.log(`ClientId recuperado para el proyecto ${proyectoId}:`, storedClientId);
    }
  }, [proyectoId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {datos.name || "Proyecto"}
          </h1>
          <p className="text-gray-500">Datos del proyecto</p>
        </div>
        
        <Image src={logo} alt={datos.name}  className="h-20 w-20 object-cover rounded-lg"/>
      </div>

      {/* Formulario Datos Editables */}
      {datos && (
        <FormularioDatosProyecto isEditable={isEditable} datos={datos} setDatos={setDatos} ></FormularioDatosProyecto>
      )}
      {!datos && <p className="text-gray-500">Cargando datos...</p>}

      {/* Botón para cambiar estado editable */}
      <div className="mt-4 flex flex-row justify-between ">
          <BotonCambioEstado isEditable={isEditable} handdleEditModel={handdleEditModel}></BotonCambioEstado>
          <BotonEliminar   url="https://bildy-rpmaya.koyeb.app/api/project" Id={proyectoId} eliminarId={eliminarId}></BotonEliminar>
      </div>
    </div>
  );
}
