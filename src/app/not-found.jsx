import Link from 'next/link';

export default function Personalizado404() {
  return (
    <div className="flex-col w-full h-screen flex items-center justify-center  text-center bg-gray-100 text-gray-700 font-sans">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <p className="text-2xl mb-6">¡Lo sentimos! No encontramos lo que buscas.</p>
      <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300">
        Volver al inicio
      </Link>
    </div>
  );
}
