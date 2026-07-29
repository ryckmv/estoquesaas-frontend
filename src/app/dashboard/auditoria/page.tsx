"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";


interface LogAuditoria {

  id: string;

  acao: string;

  detalhes: string | null;

  ip: string | null;

  criadoEm: string;

  usuario: {

    nome: string;

    email: string;

  } | null;

}



export default function AuditoriaPage() {


  const [logs, setLogs] = useState<LogAuditoria[]>([]);

  const [carregando, setCarregando] = useState(true);



  async function carregarLogs() {


    try {


      const response = await api.get("/auditoria");


      console.log(
        "Auditoria:",
        response.data
      );


      setLogs(
        Array.isArray(response.data.auditorias)
          ? response.data.auditorias
          : []
      );



    } catch (erro) {


      console.error(
        "Erro ao carregar auditoria",
        erro
      );


    } finally {


      setCarregando(false);


    }


  }



  useEffect(() => {


    carregarLogs();


  }, []);




  if (carregando) {


    return (

      <div className="p-6">

        Carregando auditoria...

      </div>

    );


  }




  return (

    <div className="p-6">


      <h1 className="text-2xl font-bold mb-6">

        Auditoria

      </h1>



      <div className="overflow-x-auto">


        <table className="w-full border">


          <thead>


            <tr className="border-b">


              <th className="p-3 text-left">

                Usuário

              </th>


              <th className="p-3 text-left">

                Ação

              </th>


              <th className="p-3 text-left">

                Detalhes

              </th>


              <th className="p-3 text-left">

                IP

              </th>


              <th className="p-3 text-left">

                Data

              </th>


            </tr>


          </thead>




          <tbody>



            {logs.length === 0 ? (


              <tr>


                <td
                  colSpan={5}
                  className="p-4 text-center"
                >

                  Nenhum registro encontrado.


                </td>


              </tr>


            ) : (


              logs.map((log) => (


                <tr
                  key={log.id}
                  className="border-b"
                >



                  <td className="p-3">


                    {log.usuario?.nome ?? "Sistema"}


                  </td>




                  <td className="p-3">


                    {log.acao}


                  </td>




                  <td className="p-3">


                    {log.detalhes ?? "-"}


                  </td>




                  <td className="p-3">


                    {log.ip ?? "-"}


                  </td>




                  <td className="p-3">


                    {new Date(
                      log.criadoEm
                    ).toLocaleString("pt-BR")}


                  </td>



                </tr>


              ))


            )}



          </tbody>


        </table>


      </div>


    </div>

  );


}