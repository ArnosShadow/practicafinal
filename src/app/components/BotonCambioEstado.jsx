

export default function BotonCambioEstado({isEditable, handdleEditModel}){

    return(
        <button
            onClick={handdleEditModel}
            className={` py-2 px-4 rounded-lg ${
                isEditable 
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } `}
        >{isEditable ? "Guardar" : "Editar"}</button>

    )

}