"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Log {
  id: string;
  acao: string;
  detalhes: string | null;
  criadoEm: string;
  usuario: {
    nome: string;
    email: string;
  } | null;
  empresa: {
    nome: string;
  };
}

export default function AuditoriaMaster() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/auditoria");
        setLogs(response.data);
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
        Carregando auditoria...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 w-full">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Auditoria Global
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
          Histórico de ações do sistema
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden w-full">
        {/* Container com rolagem horizontal suave para telas menores */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
              <tr>
                <th className="p-3 sm:p-4 font-semibold">
                  Empresa
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Usuário
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Ação
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Detalhes
                </th>

                <th className="p-3 sm:p-4 font-semibold">
                  Data
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                    {log.empresa.nome}
                  </td>

                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    {log.usuario ? (
                      <div>
                        <div className="font-medium text-slate-900">
                          {log.usuario.nome}
                        </div>

                        <div className="text-xs sm:text-sm text-gray-500">
                          {log.usuario.email}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="p-3 sm:p-4 font-bold text-slate-800 whitespace-nowrap">
                    {log.acao}
                  </td>

                  <td className="p-3 sm:p-4 text-slate-600 max-w-xs truncate">
                    {log.detalhes ?? "-"}
                  </td>

                  <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                    {new Date(log.criadoEm).toLocaleDateString("pt-BR")}
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