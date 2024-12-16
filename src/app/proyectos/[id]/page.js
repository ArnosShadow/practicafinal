// src/app/proyectos/[id]/page.js
"use client";
import DatosProyecto from "@/app/components/DatosProyecto";
import AlbaranesProyecto from "@/app/components/AlbaranesProyecto";

export default function PageProyectoEspecifico({ params }) {
  const { id } = params;

  return (
    <div className="flex-1 space-y-4 p-4 bg-gray-300 h-full ">
      {/* Datos del Proyecto */}
      <DatosProyecto proyectoId={id} />

      {/* Albaranes */}
      <AlbaranesProyecto proyectoId={id} />
    </div>
  );
}
