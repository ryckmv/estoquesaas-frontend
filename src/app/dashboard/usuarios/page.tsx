"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { usePermissao } from "@/hooks/usePermissao";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
  criadoEm: string;
}

export default function Usuarios() {
  const router = useRouter();
  const { role, isAdmin } = usePermissao();

  console.log("ROLE LOGADA:", role);
  console.log("É ADMIN:", isAdmin);

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarUsuarios() {
    try {
      const resposta = await api.get("/usuarios");
      setUsuarios(resposta.data.usuarios);
    } catch (erro) {
      console.error("Erro ao buscar usuários", erro);
    } finally {
      setCarregando(false);
    }
  }

  async function desativarUsuario(id: string) {
    const confirmar = confirm("Deseja desativar este usuário?");

    if (!confirmar) return;

    try {
      await api.delete(`/usuarios/${id}`);
      alert("Usuário desativado com sucesso.");
      carregarUsuarios();
    } catch (erro: any) {
      if (erro.response?.status === 403) {
        alert(
          erro.response.data.mensagem ||
            "Você não tem permissão para desativar usuários."
        );
        return;
      }

      console.error("Erro ao desativar usuário", erro);
      alert("Erro ao desativar usuário.");
    }
  }
  useEffect(() => {
  if (role && !isAdmin) {
    router.replace("/dashboard");
  }
}, [role, isAdmin, router, ]);
useEffect(() => {
  if (isAdmin) {
    carregarUsuarios();
  } else {
    setCarregando(false);
  }
}, [isAdmin]);

  if (carregando) {
    return (
      <div className="p-6 text-slate-600 font-medium animate-pulse">
        Carregando usuários...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Usuários
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Gerenciamento de acessos e perfis do sistema
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => router.push("/dashboard/usuarios/novo")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
          >
            Novo Usuário
          </button>
        )}
      </div>

      {usuarios.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          Nenhum usuário cadastrado.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-slate-200 text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Nome</th>
                  <th className="p-3 sm:p-4 font-semibold">Email</th>
                  <th className="p-3 sm:p-4 font-semibold">Perfil</th>
                  <th className="p-3 sm:p-4 font-semibold">Status</th>
                  <th className="p-3 sm:p-4 font-semibold text-right">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 sm:p-4 font-medium text-slate-900 whitespace-nowrap">
                      {usuario.nome}
                    </td>

                    <td className="p-3 sm:p-4 text-slate-600 whitespace-nowrap">
                      {usuario.email}
                    </td>

                    <td className="p-3 sm:p-4 capitalize text-slate-700 whitespace-nowrap">
                      {usuario.role}
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        usuario.ativo 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {usuario.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>

                    <td className="p-3 sm:p-4 space-x-2 text-right whitespace-nowrap">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/usuarios/editar/${usuario.id}`)
                        }
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                      >
                        Editar
                      </button>

                      {usuario.ativo && (
                        <button
                          onClick={() => desativarUsuario(usuario.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                        >
                          Desativar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}