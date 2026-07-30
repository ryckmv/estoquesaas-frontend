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
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full">
      <div className="flex justify-between items-center p-4 sm:p-6 gap-4">
        <div className="min-w-0">
          <p className="text-gray-500 text-sm sm:text-base truncate">
            {titulo}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 truncate">
            {valor}
          </h2>
        </div>

        <div className={`${cor} text-white p-3 sm:p-4 rounded-xl shrink-0 shadow-sm`}>
          {icone}
        </div>
      </div>
    </div>
  );
}