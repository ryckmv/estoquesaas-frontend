"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Loader2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePermissao } from "@/hooks/usePermissao";
const router = useRouter();
const { role, isAdmin } = usePermissao();

interface LogAuditoria {
  id: string;
  acao: string;
  detalhes: string | null;
  ip: string | null;
  criadoEm: string;
  usuario: {
    nome: string;
    email: string;
  } | null;
}

export default function AuditoriaPage() {
  const [logs, setLogs] = useState<LogAuditoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarLogs() {
    try {
      const response = await api.get("/auditoria");
      console.log("Auditoria:", response.data);

      setLogs(
        Array.isArray(response.data.auditorias)
          ? response.data.auditorias
          : []
      );
    } catch (erro) {
      console.error("Erro ao carregar auditoria", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarLogs();
  }, []);

  if (carregando) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-slate-500 font-medium animate-pulse">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        Carregando auditoria...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <ShieldAlert size={28} className="text-blue-600" />
          Auditoria
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Acompanhe o registro de atividades e eventos do sistema
        </p>
      </div>

      {/* Conteúdo / Tabela */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200 w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-slate-50 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
              <tr className="border-b border-slate-200">
                <th className="p-3 sm:p-4 font-semibold">Usuário</th>
                <th className="p-3 sm:p-4 font-semibold">Ação</th>
                <th className="p-3 sm:p-4 font-semibold">Detalhes</th>
                <th className="p-3 sm:p-4 font-semibold">IP</th>
                <th className="p-3 sm:p-4 font-semibold">Data</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {log.usuario?.nome ?? "Sistema"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-700 font-medium whitespace-nowrap">
                      {log.acao}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 max-w-xs truncate">
                      {log.detalhes ?? "-"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 font-mono text-xs whitespace-nowrap">
                      {log.ip ?? "-"}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 text-xs sm:text-sm whitespace-nowrap">
                      {new Date(log.criadoEm).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}