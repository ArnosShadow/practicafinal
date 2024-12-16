import NavSuperior from "../components/NavSuperior";

export default function LayoutProyectos({ children }) {
  return (

      <div className="flex-1 h-full flex flex-col lg:mt-0">
        <NavSuperior titulo={"Proyecto"} />
        <div className="bg-slate-300  shadow-md rounded-lg  p-2 overflow-y-auto  max-h-full">
            {children}
        </div>
      </div>
  );
}
