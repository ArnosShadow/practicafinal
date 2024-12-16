import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputFormulariosCrear from './InputFormulariosCrear';
import { postCrearProyecto, getListaClientes } from '../utils';
import { getListaCliente } from '../utils';
export default function FormularioCrearProyecto() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [proyectoData, setProyectoData] = useState({});
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        getListaCliente()
            .then((data) => setClientes(data))
            .catch((error) => console.error("Error al cargar la lista de clientes:", error));
    }, []);

    function onSubmit(data) {
        const direccion = data.direccion.split(" ").filter((parte) => parte.trim() !== "");

        if (direccion.length < 5) {
            alert("La dirección debe incluir: Calle, Número, Código Postal, Ciudad y Provincia (separados por espacios)");
            return;
        }

        const calle = direccion.slice(0, -4).join(" ");
        const numero = direccion[direccion.length - 4];
        const postal = direccion[direccion.length - 3];
        const ciudad = direccion[direccion.length - 2];
        const provincia = direccion[direccion.length - 1];

        const datos = {
            name: data.nombreProyecto,
            projectCode: data.codigoInterno,
            email: data.email,
            address: {
                street: calle,
                number: numero,
                postal: postal,
                city: ciudad,
                province: provincia,
            },
            code: data.codigoInterno,
            clientId: data.ClientId,
        };

        console.log("Datos enviados:", datos);
        postCrearProyecto(datos)
            .then((response) => {
                console.log("Proyecto creado:", response);
                setProyectoData(response);
                setIsDialogOpen(true);
            })
            .catch((error) => {
                console.error("Error al crear proyecto:", error);
            });

        reset();
    }

    const cerrarDialog = () => {
        setIsDialogOpen(false);
        router.push('/proyectos');
    };

    const handdleClose = () => {
        console.log('Formulario descartado');
        setIsDialogOpen(false);
        router.push('/proyectos');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col space-y-4">
                <label className="block font-semibold text-gray-700 pb-2">Nuevo Proyecto</label>
                <InputFormulariosCrear placeholder="Nombre Proyecto" dato="nombreProyecto" register={register} errors={errors} />

                <label className="block font-semibold text-gray-700 pb-2">Datos de tu Cliente</label>
            {            console.log(clientes)}
                <select
                    {...register("ClientId", { required: "Seleccionar un cliente es obligatorio" })}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                    onChange={(e) => setValue("ClientId", e.target.value)}
                >
                    <option value="">-- Selecciona un cliente --</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.clientId} value={cliente._id}>
                            {cliente.name} ({cliente.cif})
                        </option>
                    ))}
                </select>
                {errors.ClientId && <p className="text-red-500 text-sm">{errors.ClientId.message}</p>}

                <InputFormulariosCrear placeholder="Dirección" dato="direccion" register={register} errors={errors} />
                <InputFormulariosCrear placeholder="Email" dato="email" register={register} errors={errors} />

                <label className="block font-semibold text-gray-700 pb-2">Datos de tu Empresa</label>
                <InputFormulariosCrear placeholder="Código Interno del proyecto" dato="codigoInterno" register={register} errors={errors} />
            </div>
            <div className="flex space-x-4 mt-6">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                >
                    Sí, ¡vamos!
                </button>
                <button
                    type="button"
                    onClick={handdleClose}
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                >
                    Descartar
                </button>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
                        <h2 className="text-lg font-bold text-gray-800">
                            Enhorabuena!
                        </h2>
                        <p className='text-gray-500'>
                            El proyecto {proyectoData.projectCode} con código interno {proyectoData.ClientId} se ha creado correctamente.
                        </p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={cerrarDialog}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Sí, vamos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
