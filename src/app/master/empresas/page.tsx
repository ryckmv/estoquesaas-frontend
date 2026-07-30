"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Empresa {
  id: string;
  nome: string;
  email: string | null;
  cnpj: string | null;
}

export default function EmpresasMaster() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/empresas");
        setEmpresas(response.data);
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
        Carregando empresas...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Empresas
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        {/* Container com rolagem horizontal para telas menores */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead className="bg-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
              <tr>
                <th className="p-3 sm:p-4 font-semibold">
                  Nome
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Email
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  CNPJ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
              {empresas.map((empresa) => (
                <tr
                  key={empresa.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                    {empresa.nome}
                  </td>

                  <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                    {empresa.email ?? "-"}
                  </td>

                  <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                    {empresa.cnpj ?? "-"}
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