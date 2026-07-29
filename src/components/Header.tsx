"use client";

import { useEffect, useState } from "react";
import { Bell, UserCircle } from "lucide-react";


interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
}


export default function Header() {

  const [usuario, setUsuario] = useState<Usuario | null>(null);


  useEffect(() => {

    const dados = localStorage.getItem("usuario");


    if (dados) {
      setUsuario(JSON.parse(dados));
    }

  }, []);



  return (
    <header className="bg-white shadow h-16 flex items-center justify-between px-8">


      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>


      <div className="flex items-center gap-6">


        <Bell className="cursor-pointer" />


        <div className="flex items-center gap-2">

          <UserCircle size={35} />


          <div>

            <p className="font-semibold">
              {usuario?.nome ?? "Usuário"}
            </p>


            <p className="text-xs text-gray-500">
              {usuario?.role ?? ""}
            </p>

          </div>


        </div>


      </div>


    </header>
  );
}