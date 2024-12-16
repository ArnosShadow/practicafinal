import FormularioDatosEditables from "./FormularioDatosEditar";

export default function FormularioDatosCliente({isEditable, datos, setDatos}){
    
    const handleInputChange = (field, value) => {
        setDatos((prev) => {
            if (field === "CIF") {
            return { ...prev, cif: value };
            } else if (field === "Ciudad") {
            return { ...prev, address: { ...prev.address, city: value } };
            } else if (field === "Código Postal") {
            return { ...prev, address: { ...prev.address, postal: value } };
            } else if (field === "Domicilio Fiscal") {
            return { ...prev, address: { ...prev.address, street: value } };
            }
            return prev;
        });
    };

    return(  
    <>
        {!datos && <div>Cargando datos...</div>}
        {datos && <div className="flex flex-col">
        <FormularioDatosEditables
            inputs={["CIF", "Ciudad"]}
            values={[datos.cif, datos.address?.city]}
            placeholders={["Ingrese el CIF", "Ingrese la ciudad"]}
            isEditable={isEditable}
            onChange={(field, newValue) => handleInputChange(field, newValue)}
        ></FormularioDatosEditables>
        <FormularioDatosEditables
            inputs={["Código Postal", "Domicilio Fiscal"]}
            placeholders={["Ingrese codigo Postal", "Ingrese Domicilio"]}
            values={[datos.address?.postal, datos.address?.street + " " + datos.address?.number]}
            isEditable={isEditable}
            onChange={(field, newValue) => handleInputChange(field, newValue)}
        />

        </div>}
    </>
    )

}