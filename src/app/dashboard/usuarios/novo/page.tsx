"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function NovoUsuario() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("funcionario");

  const [salvando, setSalvando] = useState(false);

  async function salvarUsuario(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSalvando(true);

      await api.post("/usuarios", {
        nome,
        email,
        senha,
        role,
      });

      alert("Usuário criado com sucesso!");
      router.push("/dashboard/usuarios");
    } catch (erro: any) {
      if (erro.response?.status === 403) {
        alert(
          erro.response.data.mensagem ||
            "Acesso negado para este perfil."
        );
        return;
      }

      console.error("Erro ao criar usuário", erro);
      alert(
        erro.response?.data?.mensagem ?? "Erro ao criar usuário"
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Novo Usuário
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Cadastre um novo usuário e defina seu nível de acesso
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5 sm:p-8 max-w-xl">
        <form onSubmit={salvarUsuario} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="Digite o nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border border-slate-300 rounded-lg p-3 w-full text-sm sm:text-base bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              placeholder="••••••••"
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

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={salvando}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-colors shadow-sm cursor-pointer"
            >
              {salvando ? "Salvando..." : "Salvar Usuário"}
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