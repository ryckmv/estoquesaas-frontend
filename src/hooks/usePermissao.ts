"use client";

import { useEffect, useState } from "react";

export function usePermissao() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (usuario) {
      const dados = JSON.parse(usuario);

      console.log("HOOK DADOS:", dados);
      console.log("HOOK ROLE RECEBIDA:", dados.role);

      setRole(dados.role);
    }
  }, []);

  console.log("HOOK ROLE ATUAL:", role);

  return {
    role,

    isMaster: role === "master",

    isAdmin: role === "admin",

    isGerente: role === "gerente",

    isFuncionario: role === "funcionario",
  };
}