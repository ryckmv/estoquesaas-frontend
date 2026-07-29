"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
}

export default function UsuariosMaster() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {

    async function carregar() {

      try {

        const response = await api.get("/usuarios");

        setUsuarios(response.data);

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
        Carregando usuários...
      </div>
    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-8">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Usuários do Sistema
        </h1>

        <p className="text-gray-500 mt-2">
          Administração global dos usuários
        </p>

      </div>



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
                Permissão
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>



          <tbody>


            {usuarios.map((usuario) => (

              <tr
                key={usuario.id}
                className="border-b"
              >


                <td className="p-4">
                  {usuario.nome}
                </td>


                <td className="p-4">
                  {usuario.email}
                </td>


                <td className="p-4 uppercase font-bold">
                  {usuario.role}
                </td>


                <td className="p-4">

                  {usuario.ativo ? (

                    <span className="bg-green-600 text-white px-3 py-1 rounded-full">
                      Ativo
                    </span>

                  ) : (

                    <span className="bg-red-600 text-white px-3 py-1 rounded-full">
                      Inativo
                    </span>

                  )}

                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}