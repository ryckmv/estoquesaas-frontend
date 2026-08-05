import { SearchX } from "lucide-react";

export default function EmptyState({ title = "Nenhum resultado encontrado", description = "Tente ajustar os termos da busca ou os filtros aplicados." }: { title?: string; description?: string }) {
  return (
    <div className="grid min-h-64 place-items-center p-8 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400"><SearchX size={22} /></div>
        <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
