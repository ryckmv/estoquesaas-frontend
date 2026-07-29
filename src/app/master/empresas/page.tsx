"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Empresa {
  id: string;
  nome: string;
  email: string | null;
  cnpj: string | null;
}

export default function EmpresasMaster() {

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {

    async function carregar() {

      try {

        const response = await api.get("/empresas");

        setEmpresas(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setCarregando(false);

      }

    }


    carregar();

  }, []);



  if (carregando) {

    return (
      <div className="p-8">
        Carregando empresas...
      </div>
    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-8">


      <h1 className="text-4xl font-bold mb-8">
        Empresas
      </h1>


      <div className="bg-white rounded-xl shadow overflow-hidden">


        <table className="w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Nome
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                CNPJ
              </th>

            </tr>

          </thead>


          <tbody>

            {empresas.map((empresa) => (

              <tr
                key={empresa.id}
                className="border-b"
              >

                <td className="p-4">
                  {empresa.nome}
                </td>


                <td className="p-4">
                  {empresa.email ?? "-"}
                </td>


                <td className="p-4">
                  {empresa.cnpj ?? "-"}
                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}