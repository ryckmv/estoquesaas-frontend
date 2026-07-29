import { ReactNode } from "react";

interface Props {
  titulo: string;
  valor: string | number;
  icone: ReactNode;
  cor: string;
}

export default function CardDashboard({
  titulo,
  valor,
  icone,
  cor,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      <div className="flex justify-between items-center p-6">

        <div>

          <p className="text-gray-500">
            {titulo}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {valor}
          </h2>

        </div>

        <div className={`${cor} text-white p-4 rounded-xl`}>
          {icone}
        </div>

      </div>

    </div>
  );
}