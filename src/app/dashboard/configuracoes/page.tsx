"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Loader2, Save } from "lucide-react";

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
    carregarEmpresa();
  }, []);

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
    "w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none";
  const labelClasses = "block text-sm font-semibold text-gray-800 mb-1.5";

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Detalhes da Organização</h2>
        <p className="text-sm text-gray-500">Atualize os dados cadastrais da sua empresa exibidos no sistema.</p>
      </div>

      <div className="space-y-4">
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
            className={inputClasses}
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
              className={inputClasses}
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
      </div>

      <div className="pt-4 flex justify-start">
        <button
          onClick={salvar}
          disabled={salvando}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition shadow-sm cursor-pointer"
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
  );
}