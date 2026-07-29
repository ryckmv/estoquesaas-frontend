"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { usePermissao } from "@/hooks/usePermissao";


interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
  criadoEm: string;
}

export default function Usuarios() {

  const router = useRouter();
    const {
      role,
    isAdmin
  } = usePermissao();

  console.log("ROLE LOGADA:", role);
console.log("É ADMIN:", isAdmin);

  

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);


  async function carregarUsuarios() {

    try {

      const resposta = await api.get("/usuarios");

      setUsuarios(resposta.data.usuarios);

    } catch (erro) {

      console.error("Erro ao buscar usuários", erro);

    } finally {

      setCarregando(false);

    }

  }


async function desativarUsuario(id: string) {

  const confirmar =
    confirm("Deseja desativar este usuário?");


  if (!confirmar) return;


  try {

    await api.delete(`/usuarios/${id}`);

    alert("Usuário desativado com sucesso.");

    carregarUsuarios();


  } catch (erro: any) {


    if (erro.response?.status === 403) {

      alert(
        erro.response.data.mensagem ||
        "Você não tem permissão para desativar usuários."
      );

      return;

    }


    console.error(
      "Erro ao desativar usuário",
      erro
    );


    alert(
      "Erro ao desativar usuário."
    );

  }

}


  useEffect(() => {

    carregarUsuarios();

  }, []);



  if (carregando) {

    return (
      <div>
        Carregando usuários...
      </div>
    );

  }



  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Usuários
        </h1>


              {isAdmin && (

              <button

                onClick={() =>
                  router.push("/dashboard/usuarios/novo")
                }

                className="bg-blue-600 text-white px-4 py-2 rounded"

              >

                Novo Usuário

              </button>

            )}

      </div>



      {usuarios.length === 0 ? (

        <p>
          Nenhum usuário cadastrado.
        </p>

      ) : (


        <table className="w-full border">


          <thead>

            <tr className="border">

              <th className="p-2">
                Nome
              </th>


              <th className="p-2">
                Email
              </th>


              <th className="p-2">
                Perfil
              </th>


              <th className="p-2">
                Status
              </th>


              <th className="p-2">
                Ações
              </th>


            </tr>

          </thead>



          <tbody>


            {usuarios.map((usuario) => (


              <tr
                key={usuario.id}
                className="border"
              >


                <td className="p-2">
                  {usuario.nome}
                </td>


                <td className="p-2">
                  {usuario.email}
                </td>


                <td className="p-2 capitalize">
                  {usuario.role}
                </td>


                <td className="p-2">

                  {usuario.ativo
                    ? "Ativo"
                    : "Inativo"}

                </td>


                <td className="p-2 space-x-2">


                  <button

                    onClick={() =>
                      router.push(
                        `/dashboard/usuarios/editar/${usuario.id}`
                      )
                    }

                    className="bg-yellow-500 text-white px-3 py-1 rounded"

                  >

                    Editar

                  </button>



                  {usuario.ativo && (

                    <button

                      onClick={() =>
                        desativarUsuario(usuario.id)
                      }

                      className="bg-red-600 text-white px-3 py-1 rounded"

                    >

                      Desativar

                    </button>

                  )}


                </td>


              </tr>


            ))}


          </tbody>


        </table>


      )}


    </div>

  );

}