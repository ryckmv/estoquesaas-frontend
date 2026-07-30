"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";

export default function EditarUsuario() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [nome, setNome] = useState("");
  const [role, setRole] = useState("funcionario");
  const [ativo, setAtivo] = useState(true);
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarUsuario() {
    try {
      const resposta = await api.get(`/usuarios/${id}`);
      const usuario = resposta.data.usuario;

      setNome(usuario.nome);
      setRole(usuario.role);
      setAtivo(usuario.ativo);
    } catch (erro: any) {
      if (erro.response?.status === 403) {
        alert(
          erro.response.data.mensagem ||
            "Acesso negado para este perfil."
        );
        router.push("/dashboard/usuarios");
        return;
      }

      console.error("Erro ao carregar usuário", erro);
      alert("Erro ao carregar usuário");
      router.push("/dashboard/usuarios");
    } finally {
      setCarregando(false);
    }
  }

  async function salvarAlteracoes(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSalvando(true);

      await api.put(`/usuarios/${id}`, {
        nome,
        role,
        ativo,
        ...(senha && { senha }),
      });

      alert("Usuário atualizado com sucesso!");
      router.push("/dashboard/usuarios");
    } catch (erro: any) {
      if (erro.response?.status === 403) {
        alert(
          erro.response.data.mensagem ||
            "Acesso negado para este perfil."
        );
        return;
      }

      console.error("Erro ao atualizar usuário", erro);
      alert(
        erro.response?.data?.mensagem ||
          "Erro ao atualizar usuário"
      );
    } finally {
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  if (carregando) {
    return (
      <div className="p-6 text-slate-600 font-medium animate-pulse">
        Carregando usuário...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Editar Usuário
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Atualize as informações, permissões e status do usuário
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 sm:p-8 max-w-xl">
        <form onSubmit={salvarAlteracoes} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Perfil
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
            >
              <option value="admin">Admin</option>
              <option value="gerente">Gerente</option>
              <option value="funcionario">Funcionário</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Nova senha (opcional)
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Deixe vazio para manter"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm sm:text-base font-medium text-slate-700">
                Usuário ativo
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={salvando}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer"
            >
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard/usuarios")}
              className="w-full sm:w-auto bg-slate-500 hover:bg-slate-600 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer text-center"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}