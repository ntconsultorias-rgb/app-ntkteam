"use client";

import Link from "next/link";

const treinos = [
  {
    id: "upper-1",
    nome: "Upper 1",
    series: 14,
    cor: "from-red-800 to-red-600",
    imagem: null,
  },
  {
    id: "lower-2",
    nome: "Lower 2",
    series: 11,
    cor: "from-blue-800 to-blue-600",
    imagem: null,
  },
  {
    id: "lower-3",
    nome: "Lower 3",
    series: 9,
    cor: "from-amber-800 to-amber-600",
    imagem: null,
  },
];

export default function SelecionarTreino() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <h1 className="text-xl font-bold text-white uppercase tracking-wide">
          Meus Treinos
        </h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>

      {/* Cards de treino */}
      <div className="flex-1 px-4 pb-8 flex flex-col gap-4">
        {treinos.map((treino) => (
          <Link
            key={treino.id}
            href={`/treino/${treino.id}`}
            className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${treino.cor} min-h-44 flex flex-col justify-between p-5 active:scale-95 transition-transform`}
          >
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Ícone muscular decorativo */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white" strokeWidth="0">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
              </svg>
            </div>

            {/* Conteúdo */}
            <div className="relative z-10">
              <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                {treino.series} séries válidas
              </span>
              <h2 className="text-2xl font-bold text-white mt-1 uppercase tracking-tight">
                {treino.nome}
              </h2>
            </div>

            {/* Botão iniciar */}
            <div className="relative z-10 mt-4">
              <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 flex items-center justify-around px-6 py-3 pb-6">
        <NavBtn icon="home" label="Início" active />
        <NavBtn icon="dumbbell" label="Treino" />
        <NavBtn icon="food" label="Dieta" />
        <NavBtn icon="clock" label="Histórico" />
        <NavBtn icon="user" label="Perfil" />
      </div>
    </div>
  );
}

function NavBtn({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  const color = active ? "#f97316" : "#6b7280";
  return (
    <button className="flex flex-col items-center gap-1">
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
    </button>
  );
}
