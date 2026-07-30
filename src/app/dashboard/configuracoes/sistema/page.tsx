"use client";

import { useState } from "react";
import { Settings, Save, Loader2 } from "lucide-react";

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
    <form onSubmit={salvar} className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings size={22} className="text-blue-600" />
          Configurações do Sistema
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ajuste parâmetros de funcionamento e alertas gerais
        </p>
      </div>

      <div className="space-y-4 border-t border-b border-slate-200 py-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Notificações por E-mail
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Receba alertas importantes sobre o estoque diretamente no seu e-mail
            </p>
          </div>
          <input
            type="checkbox"
            checked={notificacoes}
            onChange={(e) => setNotificacoes(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer accent-blue-600 shrink-0"
          />
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
              Salvar Configurações
            </>
          )}
        </button>
      </div>
    </form>
  );
}