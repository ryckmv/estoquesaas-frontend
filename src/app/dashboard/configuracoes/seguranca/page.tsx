"use client";

import { useState } from "react";
import api from "@/services/api";
import { Loader2, Shield, KeyRound } from "lucide-react";

export default function SegurancaPage() {
  const [salvando, setSalvando] = useState(false);
  const [form, setForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  async function alterarSenha(e: React.FormEvent) {
    e.preventDefault();

    if (form.novaSenha !== form.confirmarSenha) {
      alert("As senhas novas não coincidem.");
      return;
    }

    try {
      setSalvando(true);
      // Ajuste a rota para o endpoint de alteração de senha no backend
      await api.put("/conta/senha", {
        senhaAtual: form.senhaAtual,
        novaSenha: form.novaSenha,
      });
      alert("Senha alterada com sucesso!");
      setForm({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao alterar a senha.");
    } finally {
      setSalvando(false);
    }
  }

  const inputClasses =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <form onSubmit={alterarSenha} className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Shield size={20} className="text-blue-600" />
          Segurança da Conta
        </h2>
        <p className="text-sm text-gray-500">Mantenha sua conta segura alterando sua senha periodicamente.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClasses}>Senha Atual</label>
          <input
            type="password"
            value={form.senhaAtual}
            onChange={(e) => setForm({ ...form, senhaAtual: e.target.value })}
            className={inputClasses}
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Nova Senha</label>
          <input
            type="password"
            value={form.novaSenha}
            onChange={(e) => setForm({ ...form, novaSenha: e.target.value })}
            className={inputClasses}
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Confirme a Nova Senha</label>
          <input
            type="password"
            value={form.confirmarSenha}
            onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })}
            className={inputClasses}
            placeholder="••••••••"
            required
          />
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
              Atualizando...
            </>
          ) : (
            <>
              <KeyRound size={18} />
              Alterar Senha
            </>
          )}
        </button>
      </div>
    </form>
  );
}