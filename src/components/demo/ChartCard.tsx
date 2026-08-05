interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  insight?: string;
}

export default function ChartCard({ title, description, children, insight }: ChartCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-950">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>
        {insight && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">{insight}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
