"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
}

export default function UsuariosMaster() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) {
    return (
      <div className="p-8 text-slate-600 font-medium animate-pulse">
        Carregando usuários...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Usuários do Sistema
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
          Administração global dos usuários
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        {/* Container com rolagem horizontal para telas pequenas */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
              <tr>
                <th className="p-3 sm:p-4 font-semibold">
                  Nome
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Email
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Permissão
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                    {usuario.nome}
                  </td>

                  <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                    {usuario.email}
                  </td>

                  <td className="p-3 sm:p-4 uppercase font-bold text-slate-700 whitespace-nowrap text-xs sm:text-sm">
                    {usuario.role}
                  </td>

                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    {usuario.ativo ? (
                      <span className="bg-green-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-medium shadow-2xs">
                        Ativo
                      </span>
                    ) : (
                      <span className="bg-red-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-medium shadow-2xs">
                        Inativo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}