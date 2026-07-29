"use client";

import { useState } from "react";
import { Palette, Sun, Moon, Monitor, Save } from "lucide-react";

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
    <form onSubmit={salvar} className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Palette size={20} className="text-blue-600" />
          Aparência do Sistema
        </h2>
        <p className="text-sm text-gray-500">Personalize a forma como o sistema é exibido no seu navegador.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          onClick={() => setTema("light")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition ${
            tema === "light" ? "border-blue-600 bg-blue-50/50 text-blue-600" : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <Sun size={24} />
          <span className="text-sm font-medium">Claro</span>
        </div>

        <div
          onClick={() => setTema("dark")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition ${
            tema === "dark" ? "border-blue-600 bg-blue-50/50 text-blue-600" : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <Moon size={24} />
          <span className="text-sm font-medium">Escuro</span>
        </div>

        <div
          onClick={() => setTema("system")}
          className={`border rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer transition ${
            tema === "system" ? "border-blue-600 bg-blue-50/50 text-blue-600" : "border-gray-200 text-gray-700 hover:border-gray-300"
          }`}
        >
          <Monitor size={24} />
          <span className="text-sm font-medium">Sistema</span>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={salvando}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-sm cursor-pointer"
        >
          <Save size={18} />
          Salvar Preferência
        </button>
      </div>
    </form>
  );
}