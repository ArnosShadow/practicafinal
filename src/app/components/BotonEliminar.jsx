export default function BotonEliminar({ eliminarId, Id, url }) {
    return (
        <button
            onClick={() => eliminarId(url, Id)}
            className="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
            Eliminar
        </button>
    );
}