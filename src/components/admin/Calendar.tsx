"use client";

import { useState } from "react";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const legends = [
  { label: "Atualizações", color: "bg-green-500" },
  { label: "Vencimentos", color: "bg-red-500" },
  { label: "Treinos", color: "bg-yellow-500" },
  { label: "Atualizaram", color: "bg-blue-500" },
  { label: "Aniversariantes", color: "bg-purple-500" },
];

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const daysInPrev = new Date(current.year, current.month, 0).getDate();

  const cells: { day: number; type: "prev" | "current" | "next" }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, type: "prev" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: "current" });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, type: "next" });
  }

  const prev = () => {
    setCurrent((c) => {
      const m = c.month === 0 ? 11 : c.month - 1;
      const y = c.month === 0 ? c.year - 1 : c.year;
      return { month: m, year: y };
    });
  };

  const next = () => {
    setCurrent((c) => {
      const m = c.month === 11 ? 0 : c.month + 1;
      const y = c.month === 11 ? c.year + 1 : c.year;
      return { month: m, year: y };
    });
  };

  const isToday = (day: number, type: string) =>
    type === "current" &&
    day === today.getDate() &&
    current.month === today.getMonth() &&
    current.year === today.getFullYear();

  return (
    <div className="rounded-xl bg-surface border border-border overflow-hidden">
      {/* Legendas + navegação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
        <div className="flex flex-wrap gap-4">
          {legends.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-xs text-muted">{l.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="px-4 h-8 rounded-lg border border-border text-sm text-muted hover:bg-surface-light hover:text-foreground transition-colors"
          >
            ‹ Anterior
          </button>
          <span className="text-sm font-semibold text-foreground min-w-36 text-center">
            {MONTHS[current.month]} {current.year}
          </span>
          <button
            onClick={next}
            className="px-4 h-8 rounded-lg border border-border text-sm text-muted hover:bg-surface-light hover:text-foreground transition-colors"
          >
            Próximo ›
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {/* Cabeçalho */}
        {DAYS.map((d) => (
          <div key={d} className="py-3 text-center text-xs font-semibold text-muted uppercase tracking-widest border-b border-border">
            {d}
          </div>
        ))}

        {/* Dias */}
        {cells.map((cell, i) => (
          <div
            key={i}
            className={`min-h-16 p-2 border-b border-r border-border last:border-r-0 transition-colors ${
              cell.type !== "current" ? "opacity-30" : "hover:bg-surface-light cursor-pointer"
            }`}
          >
            <span
              className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-medium ${
                isToday(cell.day, cell.type)
                  ? "bg-primary text-white font-bold"
                  : "text-foreground"
              }`}
            >
              {cell.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
