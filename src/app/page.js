'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRedireccionar } from "./utils";
import NavSuperior from "./components/NavSuperior";

export default function Home() {
  const router= useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      getRedireccionar(router, '/auth/login');
    }
  }, []);

 
  return (
    <>
      <div className="flex-1 h-screen flex flex-col lg:mt-0">
          <NavSuperior />
          <div className="bg-slate-300 flex justify-center  items-center h-full shadow-md rounded-lg  p-2">
            <div className="overflow-x-auto flex flex-col w-full p-4 align-middle items-center  bg-white shadow-md rounded-lg ">
              <h1>En desarrollo</h1>
              </div>
          </div>
        </div>
    </>
  );
}
