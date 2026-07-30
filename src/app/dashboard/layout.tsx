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
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-col min-h-screen lg:ml-64">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}