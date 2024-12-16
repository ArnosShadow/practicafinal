import FormularioDatosEditables from "./FormularioDatosEditar";

export default function FormularioDatosAlbaranes({isEditable, datos, setDatos}){
    
    const handleInputChange = (field, value) => {
        setDatos((prev) => {
            console.log(prev)
            if (field === "Material") {
                return { ...prev, material: value };
            } else if (field === "Formato") {
                return { ...prev, format: value };
            } else if (field === "Descricion") {
                return { ...prev, description: value };
            } else if (field === "Fecha/Workdate") {
                return { ...prev, date: value };
            }
            return prev;
        });
    };

    return(  
    <>
        {!datos && <div>Cargando datos...</div>}
        {datos && <div className="grid grid-col-2">
        <FormularioDatosEditables
            inputs={["Material", "Formato", "Descricion", "Fecha/Workdate"]}
            values={[datos.material || "", datos.format || "",datos.description || "",datos.date || "" ]}
            placeholders={["Ingrese el material", "Ingrese el Formato", "Ingrese la descricion", "Ingrese la fecha"]}
            isEditable={isEditable}
            onChange={handleInputChange}
        ></FormularioDatosEditables>

        </div>}
    </>
    )

}