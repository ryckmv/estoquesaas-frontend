"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ExternalLink, Sparkles, X } from "lucide-react";
import { CRUZ_SYSTEMS_DEMO_URL, DEMO_NOTICE } from "@/lib/constants";

interface DemoContextValue {
  showDemoNotice: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, visible]);

  return (
    <DemoContext.Provider value={{ showDemoNotice: () => setVisible(true) }}>
      {children}
      {visible && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <div className="w-full max-w-md animate-modal-in overflow-hidden rounded-2xl bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
            <div className="flex items-start justify-between bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <Sparkles size={22} />
              </div>
              <button type="button" onClick={close} className="rounded-lg p-2 text-blue-100 transition hover:bg-white/10 hover:text-white" aria-label="Fechar aviso">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-xs font-bold tracking-[0.14em] text-blue-600">AMBIENTE DE DEMONSTRAÇÃO</p>
              <h2 id="demo-modal-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Conheça todo o potencial</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{DEMO_NOTICE}</p>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={close} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Continuar explorando</button>
                <a href={CRUZ_SYSTEMS_DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Falar com a Cruz Systems <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemoNotice() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemoNotice deve ser usado dentro de DemoProvider");
  return context;
}
