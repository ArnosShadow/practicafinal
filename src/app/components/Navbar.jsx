import Link from "next/link"
import Image from "next/image";
import foto from "@/app/logos/Empresa.webp"
export default function Navbar() {
    return (
        <div className="bg-gray-800 text-white p-4 h-full top-0 left-0 flex flex-col shadow-lg z-10">
            <div className="mb-4">
                <Image  src={foto} alt="logotipo" height={8} width={8} className="w-20 h-20 mx-auto" />
                <h1 className="text-center text-lg font-bold">LOGO</h1>
            </div>
            <nav>
                <ul className="space-y-2 flex flex-col ">
                        <li>
                            <Link href="/" className="hover:bg-gray-700 p-2 rounded block">
                                Resumen
                            </Link>
                        </li>
                        <li>
                            <Link href="/clientes" className="hover:bg-gray-700 p-2 rounded block">
                                Clientes
                            </Link>
                        </li>
                        <li>
                            <Link href="/proyectos" className="hover:bg-gray-700 p-2 rounded block">
                                Proyectos
                            </Link>
                        </li>
                        <li>
                            <Link href="/albaranes" className="hover:bg-gray-700 p-2 rounded block">
                                Albaranes
                            </Link>
                        </li>
                        <li>
                            <Link href="/proveedores" className="hover:bg-gray-700 p-2 rounded block">
                                Proveedores
                            </Link>
                        </li>
                        <li>
                            <Link href="/ajustes" className="hover:bg-gray-700 p-2 rounded block">
                                Ajustes
                            </Link>
                        </li>
                        <li>
                            <Link href="/auth/login" className="hover:bg-gray-700 bg-red-500 p-2 rounded-lg  flex justify-center">
                                Login
                            </Link>
                        </li>

                </ul>
            </nav>
        </div>
    );
}
