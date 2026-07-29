"use client";

import { useEffect, useState } from "react";


export function usePermissao() {


  const [role, setRole] = useState<string | null>(null);



  useEffect(() => {


    const usuario =
      localStorage.getItem("usuario");



    if (usuario) {


      const dados =
        JSON.parse(usuario);


      setRole(
        dados.role
      );


    }


  }, []);




  return {

    role,

    isAdmin:
      role === "admin",

    isGerente:
      role === "gerente",

    isFuncionario:
      role === "funcionario"

  };


}