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
      <div className="flex items-center justify-center h-screen bg-slate-100 text-slate-600 font-medium animate-pulse">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden w-full">
      {/* Sidebar - Oculta ou responsiva dependendo da implementação interna dela */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 w-full bg-slate-100">
          {children}
        </main>
      </div>
    </div>
  );
}