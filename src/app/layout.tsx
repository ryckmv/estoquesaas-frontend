"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div
        className="
          lg:ml-64
          min-h-screen
          flex
          flex-col
        "
      >

        <Header />

        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-y-auto
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}