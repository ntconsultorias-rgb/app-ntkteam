"use client";

import Link from "next/link";

const treino = {
  nome: "Lower 1",
  seriesFeitas: 3,
  totalSeries: 8,
  proximoExercicio: "Flexor sentado",
};

const dieta = {
  kcalConsumidas: 1240,
  kcalTotal: 2100,
  proteinas: { consumido: 95, total: 160 },
  carboidratos: { consumido: 130, total: 240 },
  gorduras: { consumido: 38, total: 65 },
};

const historico = [
  { id: 1, nome: "Upper 1", data: "Ontem", duracao: "52min", series: 14, volume: "3.240 kg" },
  { id: 2, nome: "Lower 2", data: "Seg", duracao: "48min", series: 11, volume: "2.890 kg" },
  { id: 3, nome: "Lower 1", data: "Dom", duracao: "55min", series: 8, volume: "2.100 kg" },
];

export default function Home() {
  const progresso = (treino.seriesFeitas / treino.totalSeries) * 100;
  const kcalPct = Math.min((dieta.kcalConsumidas / dieta.kcalTotal) * 100, 100);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">Bem-vindo de volta</p>
          <h1 className="text-xl font-bold text-white">Julia Miggiorini</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
          <span className="text-white font-bold text-base">J</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">

        {/* Card treino do dia */}
        <Link href="/treino/lower-1" className="block bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-5 relative overflow-hidden active:scale-95 transition-transform">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
              <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
            </svg>
          </div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Treino de hoje</p>
          <h2 className="text-2xl font-bold text-white uppercase">{treino.nome}</h2>
          <p className="text-white/60 text-sm mt-1 mb-4">Próximo: {treino.proximoExercicio}</p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-xs">{treino.seriesFeitas} de {treino.totalSeries} séries</span>
            <span className="text-white/70 text-xs">{Math.round(progresso)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${progresso}%` }} />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="text-white text-sm font-bold">Continuar treino</span>
          </div>
        </Link>

        {/* Card dieta */}
        <Link href="/dieta" className="block bg-[#1a1a1a] rounded-2xl p-4 active:scale-95 transition-transform">
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-bold text-sm">Dieta de hoje</p>
            <span className="text-orange-400 text-xs font-bold">{dieta.kcalConsumidas} / {dieta.kcalTotal} kcal</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${kcalPct}%` }} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Proteínas", consumido: dieta.proteinas.consumido, total: dieta.proteinas.total, cor: "bg-red-500" },
              { label: "Carboidratos", consumido: dieta.carboidratos.consumido, total: dieta.carboidratos.total, cor: "bg-amber-400" },
              { label: "Gorduras", consumido: dieta.gorduras.consumido, total: dieta.gorduras.total, cor: "bg-blue-500" },
            ].map((m) => (
              <div key={m.label} className="bg-[#242424] rounded-xl p-3">
                <div className={`w-2 h-2 rounded-full ${m.cor} mb-2`} />
                <p className="text-white font-bold text-sm">{m.consumido}g</p>
                <p className="text-white/30 text-[10px]">de {m.total}g</p>
                <p className="text-white/40 text-[10px] mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </Link>

        {/* Histórico recente */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-bold text-sm">Histórico recente</p>
            <button className="text-orange-400 text-xs">Ver tudo</button>
          </div>
          <div className="flex flex-col gap-2">
            {historico.map((h) => (
              <div key={h.id} className="bg-[#1a1a1a] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2a2a2a] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4v16M18 4v16M3 8h3m12 0h3M3 16h3m12 0h3M9 4h6v16H9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold">{h.nome}</p>
                  <p className="text-white/30 text-xs">{h.data} · {h.duracao} · {h.series} séries</p>
                </div>
                <span className="text-white/40 text-xs">{h.volume}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 flex items-center justify-around px-6 py-3 pb-6">
        <NavBtn icon="home" label="Início" href="/" active />
        <NavBtn icon="dumbbell" label="Treino" href="/treino" />
        <NavBtn icon="food" label="Dieta" href="/dieta" />
        <NavBtn icon="clock" label="Histórico" href="#" />
        <NavBtn icon="user" label="Perfil" href="#" />
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href: string }) {
  const color = active ? "#f97316" : "#6b7280";
  return (
    <Link href={href} className="flex flex-col items-center gap-1">
      {icon === "home" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )}
      {icon === "dumbbell" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16M18 4v16M3 8h3m12 0h3M3 16h3m12 0h3M9 4h6v16H9z" />
        </svg>
      )}
      {icon === "food" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      )}
      {icon === "clock" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {icon === "user" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      )}
      <span className="text-[10px] font-medium" style={{ color }}>{label}</span>
    </Link>
  );
}
