import DatosAlbaranes from "@/app/components/DatosAlbaranes";


export default function PageAlbaranesEspecifico({params}){
    const {id}= params

    return(
        <div className="flex-1 space-y-4 p-4 bg-gray-300">
            <DatosAlbaranes albaranId={id}></DatosAlbaranes>
        </div>
    )
}