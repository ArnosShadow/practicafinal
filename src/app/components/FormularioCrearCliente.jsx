"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { postCrearCliente } from "../utils";
import InputFormulariosCrear from "./InputFormulariosCrear";

export default function FormularioCrearCliente({handdleClose}){
    const router = useRouter();
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [isDialogOpen, setDialogOpen] = useState(false);

    function onSubmit(data){
        const direccion = data.DomicilioFiscal.split(" ").filter((parte) => parte.trim() !== "");

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
            nombre: data.Nombre, 
            cif: data.CIF, 
            direccion: {
                calle: calle, 
                numero: numero, 
                postal: postal, 
                ciudad: ciudad, 
                provincia: provincia, 
            },
        };
    
        postCrearCliente(datos)
            .then((response) => {
                console.log("Cliente creado:", response);
                setDialogOpen(true);
            })
            .catch((error) => {
                console.error("Error al crear cliente:", error);
            }); 
    
        reset();
    }  
    function cerrarDialog(){
        setDialogOpen(false);
        router.push("/clientes");
    }
    
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700 pb-2">Nombre</label>
                            <InputFormulariosCrear 
                                className="w-full px-4 py-2 border rounded-lg"
                                dato="Nombre" register={register} errors={errors} placeholder="Introduce el Nombre"/>

                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 pb-2">Domicilio Fiscal</label>
                            <InputFormulariosCrear 
                                className="w-full px-4 py-2 border rounded-lg"
                                dato="DomicilioFiscal" register={register} errors={errors} placeholder="Introduce el domicilio Fiscal"/>

                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 pb-2">CIF</label>
                            <InputFormulariosCrear 
                                className="w-full px-4 py-2 border rounded-lg mb-3"
                                dato="CIF" register={register} errors={errors} placeholder="Introduce el CIF"/>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Si, vamos!</button> {/*Este abre un dialog y cambia el localStorage a True*/}
                    <button
                        type="button"
                        onClick={handdleClose}
                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                    >
                        Descartar
                    </button>

                    {isDialogOpen && ( 
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
                                <h2 className="text-lg font-bold text-gray-800">Cliente creado y guardado con éxito</h2>
                                <div className="h-0.5 w-20 mt-2 mb-2 bg-blue-50"></div>
                                <Link href="./proyectos" className="text-blue-600 hover:underline text-sm">
                                ¿Quieres asociarle un proyecto?
                                </Link>
                                <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={cerrarDialog}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Si, vamos
                                </button>
                                </div>
                            </div>
                        </div>
                    )}
                
                </div>   
            </form>
        </>
    )


}
