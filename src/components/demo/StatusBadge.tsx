const statusStyles: Record<string, string> = {
  Disponível: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  "Estoque baixo": "bg-amber-50 text-amber-700 ring-amber-600/15",
  "Sem estoque": "bg-red-50 text-red-700 ring-red-600/15",
  Concluída: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Pendente: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Cancelada: "bg-red-50 text-red-700 ring-red-600/15",
  Ativo: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Inativo: "bg-slate-100 text-slate-600 ring-slate-500/15",
  Entrada: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Saída: "bg-red-50 text-red-700 ring-red-600/15",
  Ajuste: "bg-blue-50 text-blue-700 ring-blue-600/15",
};

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] ?? "bg-slate-100 text-slate-600 ring-slate-500/15"}`}>{status}</span>;
}
