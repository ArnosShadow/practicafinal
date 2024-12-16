'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getLoginAPI } from "@/app/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function PageLogin(){
    const router=useRouter()
    const{register,reset, handleSubmit,formState:{ errors }}=useForm();
    const [incorrecta, setIncorrecta]=useState(false);
    async function onSubmit(data){
        try {
            const respuesta = await getLoginAPI(data);

            console.log("Respuesta:", respuesta);
1       
            if (respuesta === 401) {
                setIncorrecta(true);
            } else {
                setIncorrecta(false);
                localStorage.setItem('name', respuesta.user.name);
                localStorage.setItem('email', respuesta.user.email);
                router.push('/')
            }
        } catch (error) {
            console.error("Error al hacer login:", error);
            setIncorrecta(true);
        } 
        reset();
    }
    return(
        <>
            <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                <input {...register("email", {required:'Introduce el email',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Introduce un email válido'
                }})}
                className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"
                placeholder="Introduce el email"/>{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <input  {...register("password",{required:'Introduce la contraseña'})}
                className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"
                placeholder="Introduce la contraseña"
                type="password"/>{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                <button className="rounded-lg w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Sign in</button>
                <Link className="text-blue-500 hover:text-blue-800 text-sm" href="/auth/register">¿Tienes cuenta? Registrate</Link>
            </form>
            {incorrecta && <div  className="bg-red-300 rounded-lg p-1 flex  justify-center"><p className="text-red-500 text-sm mt-1">Email o Password incorrecto</p></div>}
           
        </>

    )
}

{/*Extraido de https://uiverse.io/themrsami/orange-cat-97*/}