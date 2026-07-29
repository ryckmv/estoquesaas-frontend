"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";


export default function EditarUsuario() {

  const router = useRouter();

  const params = useParams();

  const id = params.id as string;



  const [nome, setNome] = useState("");
  const [role, setRole] = useState("funcionario");
  const [ativo, setAtivo] = useState(true);
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);



  async function carregarUsuario() {

    try {

      const resposta =
        await api.get(`/usuarios/${id}`);


      const usuario =
        resposta.data.usuario;


      setNome(usuario.nome);

      setRole(usuario.role);

      setAtivo(usuario.ativo);


    } catch (erro: any) {


      if (erro.response?.status === 403) {

        alert(
          erro.response.data.mensagem ||
          "Acesso negado para este perfil."
        );


        router.push("/dashboard/usuarios");

        return;

      }


      console.error(
        "Erro ao carregar usuário",
        erro
      );


      alert(
        "Erro ao carregar usuário"
      );


      router.push("/dashboard/usuarios");


    } finally {

      setCarregando(false);

    }

  }





  async function salvarAlteracoes(
    e: React.FormEvent
  ) {

    e.preventDefault();


    try {

      setSalvando(true);


      await api.put(
        `/usuarios/${id}`,
        {

          nome,

          role,

          ativo,

          ...(senha && {
            senha
          })

        }
      );


      alert(
        "Usuário atualizado com sucesso!"
      );


      router.push(
        "/dashboard/usuarios"
      );


    } catch (erro: any) {


      if (erro.response?.status === 403) {

        alert(
          erro.response.data.mensagem ||
          "Acesso negado para este perfil."
        );

        return;

      }


      console.error(
        "Erro ao atualizar usuário",
        erro
      );


      alert(
        erro.response?.data?.mensagem ||
        "Erro ao atualizar usuário"
      );


    } finally {

      setSalvando(false);

    }

  }





  useEffect(() => {

    carregarUsuario();

  }, []);





  if (carregando) {

    return (

      <div className="p-6">

        Carregando usuário...

      </div>

    );

  }





  return (

    <div className="p-6">


      <h1 className="text-2xl font-bold mb-6">
        Editar Usuário
      </h1>




      <form

        onSubmit={salvarAlteracoes}

        className="space-y-4 max-w-md"

      >



        <div>

          <label className="block mb-1">
            Nome
          </label>


          <input

            type="text"

            value={nome}

            onChange={(e) =>
              setNome(e.target.value)
            }

            className="border p-2 w-full rounded"

            required

          />

        </div>





        <div>

          <label className="block mb-1">
            Perfil
          </label>



          <select

            value={role}

            onChange={(e) =>
              setRole(e.target.value)
            }

            className="border p-2 w-full rounded"

          >


            <option value="admin">
              Admin
            </option>


            <option value="gerente">
              Gerente
            </option>


            <option value="funcionario">
              Funcionário
            </option>


          </select>


        </div>





        <div>

          <label className="block mb-1">
            Nova senha (opcional)
          </label>


          <input

            type="password"

            value={senha}

            onChange={(e) =>
              setSenha(e.target.value)
            }

            className="border p-2 w-full rounded"

            placeholder="Deixe vazio para manter"

          />

        </div>





        <div>

          <label className="flex items-center gap-2">


            <input

              type="checkbox"

              checked={ativo}

              onChange={(e) =>
                setAtivo(e.target.checked)
              }

            />


            Usuário ativo


          </label>


        </div>





        <div className="flex gap-3">


          <button

            type="submit"

            disabled={salvando}

            className="bg-green-600 text-white px-4 py-2 rounded"

          >

            {salvando
              ? "Salvando..."
              : "Salvar Alterações"}

          </button>





          <button

            type="button"

            onClick={() =>
              router.push("/dashboard/usuarios")
            }

            className="bg-gray-500 text-white px-4 py-2 rounded"

          >

            Cancelar

          </button>



        </div>




      </form>



    </div>

  );

}