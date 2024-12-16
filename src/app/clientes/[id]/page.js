
import DatosCliente from "@/app/components/DatosCliente";
import ProyectosCliente from "@/app/components/ProyectosCliente";

export default function PageClienteEspecifico({ params }) {
    const { id } = params;

    return (
      <div className="flex-1 space-y-4 p-4 bg-gray-300">
        {/* Datos del Cliente */}
        <DatosCliente clienteId={id} />
  
        {/* Proyectos */}
        <ProyectosCliente clienteId={id} />
      </div>
    );
  }
  