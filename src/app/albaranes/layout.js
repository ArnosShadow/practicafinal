// LayoutClientes.js
import NavSuperior from "../components/NavSuperior";
import Navbar from "../components/Navbar";

export default function LayoutAlbaranes({ children }) {
  return (
      <div className="flex-1 h-screen flex flex-col lg:mt-0">
        <NavSuperior />
        <div className="bg-slate-300 h-full shadow-md rounded-lg overflow-y-auto  max-h-full p-2">
            {children}
        </div>
      </div>
  );
}
