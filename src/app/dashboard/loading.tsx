export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Carregando conteúdo">
      <div className="h-40 rounded-2xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 rounded-2xl bg-slate-200" />)}</div>
      <div className="grid gap-6 xl:grid-cols-2"><div className="h-96 rounded-2xl bg-slate-200" /><div className="h-96 rounded-2xl bg-slate-200" /></div>
    </div>
  );
}
