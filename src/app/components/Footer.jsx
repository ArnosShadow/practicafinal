import Link from "next/link"
export default function Footer(){

    return (
        <footer className="flex flex-col gap-6 justify-center items-center bg-slate-600 text-white py-8">
            <p className="text-center font-medium">
                Trabajo realizado por <span className="font-bold">Francisco José Jaraba Estévez</span>
            </p>
            <div className="w-full h-px bg-slate-800"></div>
            <div className="text-center">
                <p className="mb-2">Repositorio de GitHub:</p>
                <Link 
                    href="https://github.com/ArnosShadow"
                    className="text-blue-400 hover:underline"
                >
                    Visita el repositorio
                </Link>
            </div>
        </footer>
    )
}