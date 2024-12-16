'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { putValidate } from "@/app/utils";
export default function PageValidate(){
    const{register, handleSubmit, reset,formState: {errors}}=useForm();
    const router= useRouter();
    const email = localStorage.getItem('email');
    async function onSubmit(data){
        try {
            const payload = {
                email: email,
                code: data.validate 
            };

            await putValidate(payload);
            alert("Cuenta validada con éxito. ¡Puedes iniciar sesión!");
            reset();
            router.push("/auth/login");
        } catch (error) {
            console.error("Error al validar la cuenta:", error.message);
            alert("Hubo un error al validar la cuenta. Por favor, revisa el código de validación.");
        }
    }
    return(
        <>
        <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">Validate</h2>
        <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            <input {...register('validate', {required:'Introduce la Validación'})} 
            className="w-full h-12 border-b border-b-gray-800 px-3 hover:border-none hover:bg-slate-100 hover:rounded-lg"
            placeholder="- - - - - - - "
            type="password"
            />{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            <button className="rounded-lg w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Validar</button>
        </form>
        </>
    );

}