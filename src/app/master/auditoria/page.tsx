"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Log {
  id: string;
  acao: string;
  detalhes: string | null;
  criadoEm: string;
  usuario: {
    nome: string;
    email: string;
  } | null;
  empresa: {
    nome: string;
  };
}


export default function AuditoriaMaster() {

  const [logs, setLogs] = useState<Log[]>([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {

    async function carregar() {

      try {

        const response = await api.get("/auditoria");

        setLogs(response.data);

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
        Carregando auditoria...
      </div>
    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Auditoria Global
        </h1>

        <p className="text-gray-500 mt-2">
          Histórico de ações do sistema
        </p>

      </div>



      <div className="bg-white rounded-xl shadow overflow-hidden">


        <table className="w-full">


          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-left">
                Empresa
              </th>


              <th className="p-4 text-left">
                Usuário
              </th>


              <th className="p-4 text-left">
                Ação
              </th>


              <th className="p-4 text-left">
                Detalhes
              </th>


              <th className="p-4 text-left">
                Data
              </th>


            </tr>

          </thead>



          <tbody>


            {logs.map((log) => (

              <tr
                key={log.id}
                className="border-b hover:bg-slate-50"
              >


                <td className="p-4">
                  {log.empresa.nome}
                </td>


                <td className="p-4">

                  {log.usuario ? (
                    <>
                      <div>
                        {log.usuario.nome}
                      </div>

                      <div className="text-sm text-gray-500">
                        {log.usuario.email}
                      </div>
                    </>
                  ) : (
                    "-"
                  )}

                </td>


                <td className="p-4 font-bold">
                  {log.acao}
                </td>


                <td className="p-4">
                  {log.detalhes ?? "-"}
                </td>


                <td className="p-4">
                  {new Date(log.criadoEm)
                    .toLocaleDateString("pt-BR")}
                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}