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
    <header className="bg-white shadow h-16 flex items-center justify-between px-4 sm:px-8">
      {/* Título com tamanho responsivo para telas menores */}
      <h2 className="text-xl sm:text-2xl font-bold truncate">
        Dashboard
      </h2>

      <div className="flex items-center gap-4 sm:gap-6">
        <Bell className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-black transition-colors" />

        <div className="flex items-center gap-2">
          <UserCircle size={35} className="shrink-0" />

          {/* Oculta o nome e a role em telas muito pequenas (mobile portrait) se preferir, ou mantém ajustado */}
          <div className="hidden xs:block sm:block">
            <p className="font-semibold text-sm sm:text-base leading-tight">
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