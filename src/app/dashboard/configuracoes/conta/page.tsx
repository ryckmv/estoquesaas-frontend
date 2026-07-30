"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Loader2, Save, User } from "lucide-react";

interface ContaData {
  nome: string;
  email: string;
  role: string;
}

export default function ContaPage() {
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState<ContaData>({
    nome: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    carregarConta();
  }, []);

  async function carregarConta() {
    try {
      setLoading(true);
      const { data } = await api.get("/me");
      setForm({
        nome: data.nome ?? "",
        email: data.email ?? "",
        role: data.role ?? "",
      });
    } catch (error) {
      console.error("Erro ao carregar dados da conta:", error);
      alert("Erro ao carregar os dados da conta.");
    } finally {
      setLoading(false);
    }
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSalvando(true);
      await api.put("/conta", {
        nome: form.nome,
        email: form.email,
      });
      alert("Dados da conta atualizados com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar os dados da conta.");
    } finally {
      setSalvando(false);
    }
  }

  const inputClasses =
    "w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";
  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5";

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center min-h-[300px] text-slate-500 font-medium animate-pulse">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        Carregando dados da conta...
      </div>
    );
  }

  return (
    <form onSubmit={salvar} className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <User size={22} className="text-blue-600" />
          Minha Conta
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Atualize suas informações pessoais de acesso
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClasses}>Seu Nome</label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>E-mail de Acesso</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Nível de Permissão (Role)</label>
          <input
            type="text"
            value={form.role}
            disabled
            className="w-full bg-slate-100 border border-slate-300 rounded-lg p-3 text-sm text-slate-500 cursor-not-allowed outline-none"
          />
          <span className="text-xs text-gray-400 mt-1.5 block">
            O nível de acesso só pode ser alterado pelo administrador master.
          </span>
        </div>
      </div>

      <div className="pt-2 flex justify-start">
        <button
          type="submit"
          disabled={salvando}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          {salvando ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Salvando...
            </>
          ) : (
            <>
              <Save size={18} />
              Salvar Alterações
            </>
          )}
        </button>
      </div>
    </form>
  );
}