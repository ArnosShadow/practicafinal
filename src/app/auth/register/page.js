'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { postRegister } from "@/app/utils";

export default function PageRegister(){
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const router=useRouter();
    let respuesta;
    async function onSubmit(data){
        console.log(data);
        try{
            respuesta=await postRegister(data);
            if (respuesta.token) {
                localStorage.setItem('jwt', respuesta.token);
                localStorage.setItem('name', respuesta.user.name);
                router.push('/auth/validate');
                reset();
            } else {
                throw new Error("No se recibió un token válido. Verifica la respuesta del servidor.");
            }
        }catch(error){
            throw new Error("Error al registrarse");
        }
        localStorage.setItem('jwt', respuesta.token);
        router.push('/auth/validate');
        reset();
        
    }
    return(
        <>
        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">Register</h2>
        <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <input {...register('name',{required:'introduce el nombre'})}  
            placeholder="Introduce el nombre"
            className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"/>
            {errors.Nombre && <p className="text-red-500 text-sm mt-1">{errors.Nombre.message}</p>}
            
            <input {...register('email',{required:'Introduce el email', 
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Introduce un email válido'
            }})}
            className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"
            placeholder="Introduce el email"
            />{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            
            <input {...register('password', {required:'Introduce la contraseña', 
            minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: 'La contraseña debe incluir letras, números y un carácter especial'
            }})} 
            className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"
            placeholder="Introduce la contraseña"
            type="password"
            />{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            <button className="rounded-lg w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Sign out</button>
            <Link className="text-blue-500 hover:text-blue-800 text-sm" href="/auth/login">Ya tengo cuenta</Link>
        </form>
        </>
    )
}
