'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ClienteListTag({ logo, nombre, dato, url }) {
  const router = useRouter();

  function handleClick() {
    router.push(`/clientes/${url}`);
  }

  return (
    <div>
      <div
        className="flex items-center space-x-4 hover:bg-slate-500 p-2 rounded-lg cursor-pointer"
        onClick={handleClick}
      >
         <Image  src={logo} alt={nombre} className="h-12 w-12 rounded-lg" />
        <div>
          <h1 className="text-lg font-semibold">{nombre}</h1>
          <p className="text-sm text-gray-400">{dato}</p>
        </div>
      </div>
    </div>
  );
}