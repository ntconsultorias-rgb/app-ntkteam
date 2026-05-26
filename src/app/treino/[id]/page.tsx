"use client";

import { useState } from "react";
import Link from "next/link";

const exercicios = [
  {
    id: 1,
    nome: "Flexor sentado",
    melhorSeries: ["Série 1 com 143 kg x 13 reps", "Série 2 com 148 kg x 12 reps"],
    series: [
      { id: 1, ultimo: "143x13", kg: "", reps: "10-15", feito: false },
      { id: 2, ultimo: "", kg: "", reps: "5", feito: false },
      { id: 3, ultimo: "", kg: "", reps: "2", feito: false },
      { id: 4, ultimo: "143x13", kg: "", reps: "5-9", feito: false },
      { id: 5, ultimo: "143x10", kg: "", reps: "5-9", feito: false },
    ],
  },
  {
    id: 2,
    nome: "Cadeira abdutora",
    melhorSeries: ["Série 1 com 193 kg x 12 reps", "Série 2 com 193 kg x 12 reps"],
    series: [
      { id: 1, ultimo: "193x12", kg: "", reps: "10-15", feito: false },
      { id: 2, ultimo: "193x12", kg: "", reps: "10-15", feito: false },
      { id: 3, ultimo: "", kg: "", reps: "5", feito: false },
    ],
  },
];

type Serie = { id: number; ultimo: string; kg: string; reps: string; feito: boolean };

export default function ExecucaoTreino() {
  const [seriesState, setSeriesState] = useState<Record<number, Serie[]>>(
    Object.fromEntries(exercicios.map((e) => [e.id, e.series.map((s) => ({ ...s }))]))
  );
  const [tempoInicio] = useState(Date.now());
  const [expandido, setExpandido] = useState<number | null>(1);

  const totalSeries = Object.values(seriesState).flat().length;
  const seriesFeitas = Object.values(seriesState).flat().filter((s) => s.feito).length;
  const volumeTotal = Object.values(seriesState)
    .flat()
    .filter((s) => s.feito && s.kg)
    .reduce((acc, s) => acc + (parseFloat(s.kg) || 0), 0);

  const toggleFeito = (exId: number, serieId: number) => {
    setSeriesState((prev) => ({
      ...prev,
      [exId]: prev[exId].map((s) =>
        s.id === serieId ? { ...s, feito: !s.feito } : s
      ),
    }));
  };

  const updateKg = (exId: number, serieId: number, kg: string) => {
    setSeriesState((prev) => ({
      ...prev,
      [exId]: prev[exId].map((s) => (s.id === serieId ? { ...s, kg } : s)),
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3 sticky top-0 bg-[#0f0f0f] z-10">
        <Link href="/treino" className="flex items-center gap-2 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-base font-bold uppercase">Lower 1</span>
        </Link>
        <button className="px-4 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
          Finalizar
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-white/60 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span>0s</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          <span>{totalSeries} séries</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60 text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{volumeTotal.toFixed(1)} kg</span>
        </div>
      </div>

      {/* Exercícios */}
      <div className="flex flex-col gap-4 px-4 pt-4">
        {exercicios.map((ex) => {
          const series = seriesState[ex.id];
          const aberto = expandido === ex.id;

          return (
            <div key={ex.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
              {/* Cabeçalho do exercício */}
              <button
                className="w-full flex items-start gap-3 p-4"
                onClick={() => setExpandido(aberto ? null : ex.id)}
              >
                {/* Imagem placeholder */}
                <div className="w-16 h-16 rounded-xl bg-[#2a2a2a] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4v16M18 4v16M3 8h3m12 0h3M3 16h3m12 0h3M9 4h6v16H9z" />
                  </svg>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-white font-bold text-base">{ex.nome}</h3>
                  <p className="text-white/40 text-xs mt-0.5">Melhores repetições (Trabalho):</p>
                  {ex.melhorSeries.map((ms, i) => (
                    <p key={i} className="text-white/50 text-xs">- {ms}</p>
                  ))}
                </div>

                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`shrink-0 mt-1 transition-transform ${aberto ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Séries */}
              {aberto && (
                <div className="px-4 pb-4">
                  {/* Cabeçalho da tabela */}
                  <div className="grid grid-cols-[40px_1fr_80px_60px_44px] gap-2 mb-2 px-1">
                    <span className="text-white/40 text-xs">Série</span>
                    <span className="text-white/40 text-xs">Último</span>
                    <span className="text-white/40 text-xs">kg</span>
                    <span className="text-white/40 text-xs">Reps</span>
                    <span className="text-white/40 text-xs text-center">Feito</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {series.map((serie) => (
                      <div
                        key={serie.id}
                        className={`grid grid-cols-[40px_1fr_80px_60px_44px] gap-2 items-center px-1 py-1 rounded-lg transition-colors ${serie.feito ? "bg-green-500/10" : ""}`}
                      >
                        <span className="text-white/50 text-sm font-bold">{serie.id}</span>
                        <span className="text-white/40 text-xs">{serie.ultimo || "—"}</span>
                        <input
                          type="number"
                          value={serie.kg}
                          onChange={(e) => updateKg(ex.id, serie.id, e.target.value)}
                          placeholder="0"
                          className="w-full h-8 px-2 rounded-lg bg-[#2a2a2a] text-white text-sm text-center focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <span className="text-white/70 text-xs text-center">{serie.reps}</span>
                        <button
                          onClick={() => toggleFeito(ex.id, serie.id)}
                          className={`w-7 h-7 mx-auto rounded-md border-2 flex items-center justify-center transition-colors ${
                            serie.feito
                              ? "bg-green-500 border-green-500"
                              : "border-white/30 bg-transparent"
                          }`}
                        >
                          {serie.feito && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Botões */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 h-10 rounded-xl bg-[#2a2a2a] text-white/70 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Adicionar nota
                    </button>
                    <button className="flex-1 h-10 rounded-xl bg-[#2a2a2a] text-white/70 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      Cronômetro
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progresso */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/10 px-5 py-3 pb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/50 text-xs">{seriesFeitas} de {totalSeries} séries</span>
          <span className="text-white/50 text-xs">{Math.round((seriesFeitas / totalSeries) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all"
            style={{ width: `${(seriesFeitas / totalSeries) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
