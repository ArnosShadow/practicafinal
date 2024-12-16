export default function InputFormulariosCrear({placeholder, type="text",dato,register,errors}){

    return(
        <div>
            <input {...register(`${dato}`,{required: 'Obligatorio'})} 
            placeholder={`${placeholder}`}
            type={type}
            className={`w-full px-4 py-2 border rounded-lg ${errors[dato] ? 'border-red-500' : 'border-gray-300'}`}/>
            {errors[dato] && <p className="text-red-500 text-sm mt-1">{errors[dato].message}</p>}
        </div>
    )
}