

export default function LayoutCrearClientes({ children }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-gray-100">
      {/* Contenedor principal */}
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}
