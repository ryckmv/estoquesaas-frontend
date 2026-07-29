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
      // Ajuste a rota da API conforme o seu backend (ex: /usuarios/perfil ou /conta)
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
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );
  }

  return (
    <form onSubmit={salvar} className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Minha Conta
        </h2>
        <p className="text-sm text-gray-500">Atualize suas informações pessoais de acesso.</p>
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
            className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none"
          />
          <span className="text-xs text-gray-400 mt-1 block">O nível de acesso só pode ser alterado pelo administrador master.</span>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={salvando}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm cursor-pointer"
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