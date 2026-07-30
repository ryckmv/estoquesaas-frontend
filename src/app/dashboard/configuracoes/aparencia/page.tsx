"use client";

import { useState } from "react";
import { Palette, Sun, Moon, Monitor, Save, Loader2 } from "lucide-react";

export default function AparenciaPage() {
  const [tema, setTema] = useState("light");
  const [salvando, setSalvando] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    setTimeout(() => {
      alert("Preferência de aparência salva!");
      setSalvando(false);
    }, 500);
  }

  return (
    <form onSubmit={salvar} className="w-full space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Palette size={22} className="text-blue-600" />
          Aparência do Sistema
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Personalize a forma como o sistema é exibido no seu navegador
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setTema("light")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${
            tema === "light"
              ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
        >
          <Sun size={24} />
          <span className="text-sm font-medium">Claro</span>
        </div>

        <div
          onClick={() => setTema("dark")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${
            tema === "dark"
              ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
        >
          <Moon size={24} />
          <span className="text-sm font-medium">Escuro</span>
        </div>

        <div
          onClick={() => setTema("system")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${
            tema === "system"
              ? "border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
        >
          <Monitor size={24} />
          <span className="text-sm font-medium">Sistema</span>
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
              Salvar Preferência
            </>
          )}
        </button>
      </div>
    </form>
  );
}