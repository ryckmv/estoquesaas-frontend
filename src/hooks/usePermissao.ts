"use client";

import { useEffect, useState } from "react";


export function usePermissao() {

  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {

    const usuario = localStorage.getItem("usuario");


    if (usuario) {

      try {

        const dados = JSON.parse(usuario);

        setRole(dados.role);

      } catch (error) {

        console.error(
          "Erro ao ler usuário:",
          error
        );

      }

    }

  }, []);



  return {

    role,

    isMaster:
      role === "master",

    isAdmin:
      role === "admin",

    isGerente:
      role === "gerente",

    isFuncionario:
      role === "funcionario"

  };

}