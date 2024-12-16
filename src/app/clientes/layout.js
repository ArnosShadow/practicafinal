import ClienteList from "../components/ClienteList";
import NavSuperior from "../components/NavSuperior";

export default function LayoutClientes({children}) {
  return (

      <div className="flex-1 h-screen flex flex-col lg:mt-0">
        <NavSuperior titulo={"Cliente"} />
        <div className="bg-white gap-y-5  w-full  shadow-md rounded-lg flex flex-row justify-between p-2  overflow-y-auto  max-h-screen">

            <ClienteList></ClienteList> 
            {children}

        </div>
      </div>
  );
}
