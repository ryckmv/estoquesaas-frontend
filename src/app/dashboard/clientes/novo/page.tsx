"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { Loader2, Save, ArrowLeft } from "lucide-react";

export default function NovoCliente() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvarCliente() {
    try {
      if (!nome.trim()) {
        alert("O nome é obrigatório.");
        return;
      }

      if (cpf && cpf.replace(/\D/g, "").length !== 11) {
        alert("CPF deve conter 11 números.");
        return;
      }

      setSalvando(true);

      await api.post("/clientes", {
        nome,
        telefone,
        cpf: cpf.replace(/\D/g, ""),
      });

      alert("Cliente cadastrado com sucesso!");
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar cliente.");
    } finally {
      setSalvando(false);
    }
  }

  const inputClasses =
    "w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all";
  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5";

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-screen flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Novo Cliente
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Cadastre um novo cliente no sistema
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/clientes")}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>

        {/* Formulário em Card */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8 space-y-5">
          <div>
            <label className={labelClasses}>Nome Completo</label>
            <input
              type="text"
              className={inputClasses}
              placeholder="Nome do cliente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClasses}>Telefone</label>
            <input
              type="text"
              className={`${inputClasses} font-mono`}
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClasses}>CPF</label>
            <input
              type="text"
              className={`${inputClasses} font-mono`}
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={salvarCliente}
              disabled={salvando}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              {salvando ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Salvando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Salvar Cliente
                </>
              )}
            </button>

            <button
              onClick={() => router.push("/dashboard/clientes")}
              disabled={salvando}
              className="sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer text-center"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}