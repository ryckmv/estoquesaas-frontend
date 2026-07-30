"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePermissao } from "@/hooks/usePermissao";


interface Empresa {
  id: string;
  nome: string;
  cnpj: string | null;
  telefone: string | null;
  email: string | null;
}

export default function ConfiguracoesPage() {
  const [empresa, setEmpresa] = useState<Empresa>({
    id: "",
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const router = useRouter();
const { role, isAdmin } = usePermissao();

  async function carregarEmpresa() {
    
    try {
      const { data } = await api.get("/configuracoes");

      setEmpresa({
        id: data.id,
        nome: data.nome ?? "",
        cnpj: data.cnpj ?? "",
        telefone: data.telefone ?? "",
        email: data.email ?? "",
      });
    } catch (error) {
      console.error("Erro ao carregar empresa:", error);
      alert("Erro ao carregar as configurações.");
    } finally {
      setCarregando(false);
    }
  }

useEffect(() => {
  if (role && !isAdmin) {
    router.replace("/dashboard");
    return;
  }

  if (isAdmin) {
    carregarEmpresa();
  } else {
    setCarregando(false);
  }
}, [role, isAdmin, router]);

  async function salvar() {
    try {
      setSalvando(true);

      await api.put("/configuracoes", {
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        telefone: empresa.telefone,
        email: empresa.email,
      });

      alert("Configurações salvas com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  const inputClasses =
    "w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";
  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5";

  if (carregando) {
    return (
      <div className="p-8 flex justify-center items-center min-h-screen text-slate-500 font-medium animate-pulse">
        <Loader2 className="animate-spin text-blue-600 mr-2" size={24} />
        Carregando configurações...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Cabeçalho */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Detalhes da Organização
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Atualize os dados cadastrais da sua empresa exibidos no sistema
          </p>
        </div>

        {/* Formulário em Card */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8 space-y-5">
          <div>
            <label className={labelClasses}>Nome da Empresa</label>
            <input
              type="text"
              value={empresa.nome}
              onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
              className={inputClasses}
              placeholder="Nome da sua empresa"
            />
          </div>

          <div>
            <label className={labelClasses}>CNPJ</label>
            <input
              type="text"
              value={empresa.cnpj ?? ""}
              onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
              className={`${inputClasses} font-mono`}
              placeholder="00.000.000/0001-00"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Telefone</label>
              <input
                type="text"
                value={empresa.telefone ?? ""}
                onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
                className={`${inputClasses} font-mono`}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label className={labelClasses}>E-mail</label>
              <input
                type="email"
                value={empresa.email ?? ""}
                onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })}
                className={inputClasses}
                placeholder="contato@empresa.com"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={salvar}
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
        </div>
      </div>
    </div>
  );
}