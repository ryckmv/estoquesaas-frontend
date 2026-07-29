"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

interface Movimentacao {
  id: string;

  produto: {
    nome: string;
  };

  usuario?: {
    nome: string;
  };

  tipo: string;
  motivo: string;
  quantidade: number;
  criadoEm: string;
}


export default function EstoquePage() {

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [motivoFiltro, setMotivoFiltro] = useState("todos");


  async function carregar() {

    try {

      const response = await api.get("/movimentacoes");


      if (Array.isArray(response.data)) {

        setMovimentacoes(response.data);

      } 
      else if (Array.isArray(response.data.movimentacoes)) {

        setMovimentacoes(response.data.movimentacoes);

      }
      else {

        setMovimentacoes([]);

      }


    } catch(error) {

      console.error(error);
      alert("Erro ao carregar movimentações");

    }
    finally {

      setCarregando(false);

    }

  }


  useEffect(() => {

    carregar();

  }, []);



  const movimentacoesFiltradas = useMemo(() => {

    return movimentacoes.filter((mov)=>{


      const produto =
        mov.produto?.nome
        ?.toLowerCase()
        .includes(busca.toLowerCase());


      const tipo =
        tipoFiltro === "todos"
        ||
        mov.tipo === tipoFiltro;


      const motivo =
        motivoFiltro === "todos"
        ||
        mov.motivo === motivoFiltro;



      return produto && tipo && motivo;


    });


  },[
    movimentacoes,
    busca,
    tipoFiltro,
    motivoFiltro
  ]);



  const entradas =
    movimentacoes.filter(
      m=>m.tipo==="entrada"
    ).length;


  const saidas =
    movimentacoes.filter(
      m=>m.tipo==="saida"
    ).length;



  if(carregando){

    return(
      <div className="p-8">
        Carregando estoque...
      </div>
    );

  }



return (

<div className="p-6 md:p-8 bg-slate-100 min-h-screen">


<div className="flex justify-between items-center mb-8">


<div>

<h1 className="text-3xl font-bold">
Estoque
</h1>

<p className="text-gray-500">
Histórico geral de movimentações
</p>

</div>
<Link
  href="/dashboard/estoque/detalhes"
  className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium transition"
>
  Ver Detalhes
</Link>

<div className="flex gap-3">

<Link
href="/dashboard/estoque/nova"
className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
+ Nova Movimentação
</Link>


</div>


</div>



<div className="grid md:grid-cols-3 gap-5 mb-6">


<Card
titulo="Total de Entradas"
valor={entradas}
cor="text-green-600"
/>


<Card
titulo="Total de Saídas"
valor={saidas}
cor="text-red-600"
/>


<Card
titulo="Movimentações Totais"
valor={movimentacoes.length}
cor="text-blue-600"
/>


</div>




<div className="bg-white p-5 rounded-xl shadow mb-6">


<div className="grid md:grid-cols-3 gap-4">


<input
placeholder="🔍 Buscar produto..."
value={busca}
onChange={(e)=>setBusca(e.target.value)}
className="border rounded-lg p-3"
/>



<select
value={tipoFiltro}
onChange={(e)=>setTipoFiltro(e.target.value)}
className="border rounded-lg p-3"
>

<option value="todos">
Todos os tipos
</option>

<option value="entrada">
Entrada
</option>

<option value="saida">
Saída
</option>

</select>




<select
value={motivoFiltro}
onChange={(e)=>setMotivoFiltro(e.target.value)}
className="border rounded-lg p-3"
>

<option value="todos">
Todos os motivos
</option>

<option value="compra">
Compra
</option>

<option value="ajuste">
Ajuste
</option>

<option value="perda">
Perda
</option>

</select>


</div>


</div>




<div className="bg-white rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-slate-50">

<tr>

<th className="p-4 text-left">
Produto
</th>

<th className="p-4 text-left">
Tipo
</th>

<th className="p-4 text-left">
Motivo
</th>

<th className="p-4 text-left">
Quantidade
</th>

<th className="p-4 text-left">
Usuário
</th>

<th className="p-4 text-left">
Data
</th>


</tr>

</thead>



<tbody>


{movimentacoesFiltradas.map((mov)=>(


<tr
key={mov.id}
className="border-b"
>


<td className="p-4 font-semibold">
{mov.produto.nome}
</td>



<td className="p-4">

<span
className={
mov.tipo==="entrada"
?
"bg-green-100 text-green-700 px-3 py-1 rounded-full"
:
"bg-red-100 text-red-700 px-3 py-1 rounded-full"
}
>

{mov.tipo}

</span>

</td>



<td className="p-4 capitalize">
{mov.motivo}
</td>



<td
className={
mov.tipo==="entrada"
?
"text-green-600 font-bold p-4"
:
"text-red-600 font-bold p-4"
}
>

{mov.tipo==="entrada" ? "+" : "-"}
{mov.quantidade}

</td>



<td className="p-4">

{mov.usuario?.nome ?? "Não informado"}

</td>



<td className="p-4">

{new Date(
mov.criadoEm
).toLocaleDateString("pt-BR")}

</td>


</tr>


))}


</tbody>


</table>


</div>


</div>

);


}



function Card({
titulo,
valor,
cor
}:{
titulo:string;
valor:number;
cor:string;
}){

return(

<div className="bg-white p-5 rounded-xl shadow">

<p className="text-gray-500">
{titulo}
</p>

<h2 className={`text-3xl font-bold ${cor}`}>
{valor}
</h2>

</div>

)

}