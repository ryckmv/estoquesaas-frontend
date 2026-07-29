"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


export default function NovoUsuario() {

  const router = useRouter();


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("funcionario");


  const [salvando, setSalvando] = useState(false);



  async function salvarUsuario(e: React.FormEvent) {

    e.preventDefault();


    try {

      setSalvando(true);


      await api.post("/usuarios", {

        nome,
        email,
        senha,
        role

      });



      alert("Usuário criado com sucesso!");


      router.push("/dashboard/usuarios");


    }   catch (erro: any) {


      if (erro.response?.status === 403) {

        alert(
          erro.response.data.mensagem ||
          "Acesso negado para este perfil."
        );

        return;

      }



      console.error(
        "Erro ao criar usuário",
        erro
      );


      alert(
        erro.response?.data?.mensagem ??
        "Erro ao criar usuário"
      );


    } finally {


      setSalvando(false);


    }


  }



  return (

    <div className="p-6">


      <h1 className="text-2xl font-bold mb-6">
        Novo Usuário
      </h1>



      <form
        onSubmit={salvarUsuario}
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
            Email
          </label>


          <input

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="border p-2 w-full rounded"

            required

          />

        </div>




        <div>

          <label className="block mb-1">
            Senha
          </label>


          <input

            type="password"

            value={senha}

            onChange={(e) =>
              setSenha(e.target.value)
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





        <div className="flex gap-3">


          <button

            type="submit"

            disabled={salvando}

            className="bg-blue-600 text-white px-4 py-2 rounded"

          >

            {salvando
              ? "Salvando..."
              : "Salvar Usuário"}

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