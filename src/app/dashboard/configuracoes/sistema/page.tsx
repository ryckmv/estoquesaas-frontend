"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function SistemaPage() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [salvando, setSalvando] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      alert("Configurações do sistema salvas!");
      setSalvando(false);
    }, 500);
  }

  return (
    <form onSubmit={salvar} className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Settings size={20} className="text-blue-600" />
          Configurações do Sistema
        </h2>
        <p className="text-sm text-gray-500">Ajuste parâmetros de funcionamento e alertas gerais.</p>
      </div>

      <div className="space-y-4 border-t border-b border-gray-200 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Notificações por E-mail</h3>
            <p className="text-xs text-gray-500">Receba alertas importantes sobre o estoque diretamente no seu e-mail.</p>
          </div>
          <input
            type="checkbox"
            checked={notificacoes}
            onChange={(e) => setNotificacoes(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={salvando}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm cursor-pointer"
        >
          <Save size={18} />
          Salvar Configurações
        </button>
      </div>
    </form>
  );
}