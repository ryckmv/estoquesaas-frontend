"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setVerificando(false);
  }, [router]);

  if (verificando) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar entra aqui no fluxo */}
      <Sidebar />

      {/* Bloco da direita: no desktop ganha margem esquerda de 16rem (64px * 4 = w-64) para compensar o fixed */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}