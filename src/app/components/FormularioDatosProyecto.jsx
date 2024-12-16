import FormularioDatosEditables from "./FormularioDatosEditar";

export default function FormularioDatosProyecto({ isEditable, datos, setDatos }) {
    const handleInputChange = (field, newValue) => {
        setDatos((prevDatos) => {
            if (field === "Nombre") {
                return { ...prevDatos, name: newValue };
            } else if (field === "Código Interno") {
                return { ...prevDatos, projectCode: newValue };
            }
            return prevDatos;
        });
    };

    return (
        <>
            {!datos && <div>Cargando datos...</div>}
            {datos && (
                <FormularioDatosEditables
                inputs={["Nombre", "Código Interno"]}
                values={[datos.name, datos.projectCode]}
                placeholders={["Ingrese el nombre", "Ingrese el código interno"]}
                isEditable={isEditable}
                onChange={handleInputChange}
            />
                    
            )}
        </>
    );
}
