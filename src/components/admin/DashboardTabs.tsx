"use client";

import { useState } from "react";

const tabs = [
  { id: "vencimentos", label: "Vencimentos", badge: null },
  { id: "sem-atualizacao", label: "Sem atualização recente", badge: null },
  { id: "sem-programada", label: "Sem atualização programada", badge: 3 },
  { id: "sem-vigencia", label: "Sem vigência", badge: 2 },
  { id: "engajamento", label: "Engajamento", badge: null },
];

// Dados mockados por enquanto
const mockAlunos = [
  {
    nome: "Glenda Oliveira Silva",
    email: "glendaoliveira2401@gmail.com",
    telefone: "+5534991254692",
    vencimento: "18/09/2026",
    diasRestantes: 162,
  },
];

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("vencimentos");

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {tab.badge !== null && (
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-surface-light text-muted"
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        {activeTab === "vencimentos" && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-muted font-semibold">Nome</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Email</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Telefone</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Data de vencimento</th>
                <th className="text-left px-6 py-3 text-muted font-semibold">Dias até vencimento</th>
              </tr>
            </thead>
            <tbody>
              {mockAlunos.map((aluno) => (
                <tr key={aluno.email} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      {aluno.nome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">{aluno.email}</td>
                  <td className="px-6 py-4 text-muted">{aluno.telefone}</td>
                  <td className="px-6 py-4 text-foreground">{aluno.vencimento}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-surface-light text-foreground text-xs font-medium border border-border">
                      Vence em {aluno.diasRestantes} dias
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab !== "vencimentos" && (
          <div className="flex flex-col items-center justify-center py-16 text-muted gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
            <p className="text-sm">Nenhum aluno nesta categoria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border text-xs text-muted text-center">
        Copyright © 2026 Team NTK. All rights reserved.
      </div>
    </div>
  );
}
