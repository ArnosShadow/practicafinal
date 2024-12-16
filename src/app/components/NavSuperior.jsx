'use client'
import Image from "next/image";
import foto from "@/app/logos/logo.webp"
import { useEffect } from "react";
export default function NavSuperior({titulo}) {
    let name;
    useEffect(()=>{
      name=localStorage.getItem('name');
    },[])
    return (
      <div className="bg-gray-800 text-white p-4  top-0 right-0 left-40 flex items-center justify-between z-10">
        <div>
          <h1>Crear {titulo}</h1>
          <p>Detalles de {titulo}</p>
        </div>
  
        <div className="flex items-center space-x-4">
          <Image  src={foto} alt={name} className="w-8 h-8 rounded-full" />
          <div>
            <h3>{name}</h3>
          </div>
        </div>
      </div>
    );
  }
  