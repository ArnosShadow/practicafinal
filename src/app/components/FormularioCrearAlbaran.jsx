"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postCrearAlbaran } from "../utils";
import InputFormulariosCrear from "./InputFormulariosCrear";

export default function FormularioCrearAlbaran({ projectId }) {
  const {register,handleSubmit,reset,formState: { errors },} = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const storedClientId = localStorage.getItem(projectId);
    if (storedClientId) {
      setClientId(JSON.parse(storedClientId));
    } else {
      console.warn(`No se encontró clientId para el proyecto ${projectId} en localStorage.`);
    }
  }, [projectId]);

  const onSubmit = async (formData) => {
    if (!clientId) {
      alert("No se encontró un clientId válido. Por favor, revisa la configuración del proyecto.");
      return;
    }

    const description = `
      Store name: ${formData.name}, 
      Legal Name: ${formData.legalName}, 
      Dirección: ${formData.direccion}, 
      Suite: ${formData.apartamento}
    `.trim();

    const payload = {
      clientId: clientId,
      projectId: projectId,
      format: formData.format,
      description: description,
      workdate: formData.workdate,
      ...(formData.format === "material" && { material: formData.material }),
      ...(formData.format === "hours" && { hours: formData.hours }),
    };

    console.log("Payload enviado:", payload);

    try {
      await postCrearAlbaran(payload);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      alert("Error al crear el albarán. Por favor, intenta nuevamente.");
      console.error("Error detallado:", error.message);
    }
  };

  return (
    <div className="w-full gap-5 p-6 bg-white shadow-md rounded-lg space-y-4 overflow-y-auto max-h-[21rem]">
      <p className="text-sm text-gray-500">
        Completa los campos para generar el albarán correspondiente.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Formato */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Formato</label>
            <select
              {...register("format", { required: "Selecciona un formato válido" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="material">Material</option>
              <option value="hours">Horas</option>
            </select>
            {errors.format && (
              <p className="text-red-500 text-sm">{errors.format.message}</p>
            )}
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              dato="material" register={register} errors={errors} placeholder="Ej: Cemento"/>
          </div>

          {/* Horas */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Horas</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="number" dato="hours" register={register} errors={errors} placeholder="Ej: 8"/>
          </div>

          {/* Nombre del Store */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Name</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              dato="name" register={register} errors={errors} placeholder="Ej: Makostore"/>
          </div>

          {/* Legal Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Legal Name</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              dato="legalName" register={register} errors={errors} placeholder="Ej: Makostore LLC"/>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              dato="direccion" register={register} errors={errors} placeholder="Introduce la direccion"/>
          </div>

          {/* Apartamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Apartment, suite...</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              dato="apartamento" register={register} errors={errors} placeholder="Ej: Suite 10B"/>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <InputFormulariosCrear 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="date" dato="workdate" register={register} errors={errors} placeholder="La fecha es obligatoria"/>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Guardar Albarán
        </button>
      </form>

      {isSubmitted && (
        <p className="text-green-500 text-center">¡Albarán creado correctamente!</p>
      )}
    </div>
  );
}
