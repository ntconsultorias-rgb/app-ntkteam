"use client";

import { useState } from "react";
import Link from "next/link";

const fichas = [
  { id: 35695, nome: "Mesociclo 1 Base", aluno: "Julia Miggiorini Crespo", alunoId: 35991, status: "Ativo" },
  { id: 35556, nome: "Mesociclo 1", aluno: "Piter Moreira Violim", alunoId: 35562, status: "Ativo" },
  { id: 35186, nome: "Mesociclo 1 Base", aluno: "Glenda Oliveira Silva", alunoId: 35373, status: "Ativo" },
];

export default function TreinosPage() {
  const [exibirInativas, setExibirInativas] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Fichas de treino</h1>
          <button className="text-muted hover:text-foreground transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
            Exibir fichas inativas
            <button
              onClick={() => setExibirInativas(!exibirInativas)}
              className={`relative w-11 h-6 rounded-full transition-colors ${exibirInativas ? "bg-primary" : "bg-border"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${exibirInativas ? "translate-x-5" : ""}`} />
            </button>
          </label>
          <button className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
            + Novo
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-light border-b border-border">
                <th className="text-left px-6 py-3 text-muted font-semibold">
                  <div className="flex items-center gap-1">
                    Id
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Nome</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">
                  <div className="flex items-center gap-1">
                    Aluno
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Status</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fichas.map((ficha) => (
                <tr key={ficha.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-6 py-4 text-muted">{ficha.id}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/treinos/${ficha.id}`} className="text-primary font-medium hover:underline">
                      {ficha.nome}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/alunos/${ficha.alunoId}`} className="text-primary hover:underline">
                      {ficha.aluno}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      {ficha.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-muted hover:text-foreground transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-wrap gap-4">
          <span className="text-sm text-muted">1-{fichas.length} de {fichas.length} itens</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted disabled:opacity-40" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted disabled:opacity-40" disabled>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <select className="h-8 px-2 rounded-lg border border-border bg-surface text-sm text-foreground focus:outline-none">
              <option>10 / página</option>
              <option>25 / página</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
