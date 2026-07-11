import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function BankingModule() {
  const { bankAccounts, bankStatements, reconcileStatement, transactions } = useEwaStore();
  const [selectedStatementId, setSelectedStatementId] = useState<string | null>(null);
  const [matchedTxnId, setMatchedTxnId] = useState('');

  const handleReconcile = () => {
    if (!selectedStatementId) return;
    reconcileStatement(selectedStatementId, matchedTxnId || undefined);
    setSelectedStatementId(null);
    setMatchedTxnId('');
  };

  const selectedLine = bankStatements.find(s => s.id === selectedStatementId);

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Treasury Ops</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Banking & Custody</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Reconciliation</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bankAccounts.map(ba => (
            <div key={ba.id} className="sap-card p-5 space-y-4 group">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                    ba.type === 'Operating' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                    ba.type === 'Prefund' ? 'bg-blue-50 text-sap-primary border-blue-200' : 'bg-cyan-50 text-sap-info border-cyan-200'
                  }`}>
                    {ba.type} Protocol
                  </span>
                  <h3 className="font-bold text-sap-text text-sm mt-2">{ba.name}</h3>
                  <p className="text-[10px] text-sap-text-secondary font-mono mt-0.5 uppercase tracking-widest font-bold">{ba.accountNumber}</p>
                </div>
                <div className="w-10 h-10 rounded-sm bg-slate-50 flex items-center justify-center border border-sap-border group-hover:bg-blue-50 group-hover:border-sap-primary transition">
                  <i className="fa-solid fa-building-columns text-sap-text-secondary group-hover:text-sap-primary"></i>
                </div>
              </div>

              <div className="border-t border-sap-border pt-3 flex justify-between items-baseline">
                <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest">Ledger Balance:</span>
                <span className="text-xl font-bold font-mono text-sap-text">${ba.balance.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Feed */}
          <div className="sap-card lg:col-span-2 flex flex-col overflow-hidden bg-white">
            <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">Bank Feed Protocol Records</h3>
              <span className="text-[10px] bg-blue-50 text-sap-primary border border-blue-200 font-bold px-2.5 py-0.5 rounded-sm">
                STATEMENT MATCHING
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-4">Fiscal Date</th>
                    <th className="p-4">Internal Description</th>
                    <th className="p-4 text-right">Principal ($)</th>
                    <th className="p-4 text-center">Lifecycle</th>
                    <th className="p-4 text-right">Operational Link</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y">
                  {bankStatements.map(line => (
                    <tr key={line.id} className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                      <td className="p-4 font-mono font-bold text-sap-text-secondary">{line.date}</td>
                      <td className="p-4">
                        <div className="font-bold text-sap-text group-hover:text-sap-primary transition">{line.description}</div>
                        <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest font-mono mt-0.5">LINE-{line.id}</div>
                      </td>
                      <td className={`p-4 text-right font-mono font-bold ${line.type === 'CR' ? 'text-sap-success' : 'text-sap-text'}`}>
                        {line.type === 'DR' ? `($${line.amount.toLocaleString()})` : `$${line.amount.toLocaleString()}`}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm border ${
                          line.reconciled ? 'bg-emerald-50 text-sap-success border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {line.reconciled ? 'MATCHED' : 'UNMATCHED'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {!line.reconciled ? (
                          <button
                            onClick={() => setSelectedStatementId(line.id)}
                            className="px-3 py-1 bg-sap-primary hover:bg-sap-primary/90 text-white rounded-sm font-bold text-[10px] uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition"
                          >
                            Execute
                          </button>
                        ) : (
                          <span className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest font-mono">
                            LINK: {line.matchedTransactionId || 'INTERNAL'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Drawer */}
          <div className="sap-card p-6 space-y-6 bg-white h-fit sticky top-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Clearing Workspace</h3>
            {selectedLine ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-sm text-[11px] space-y-2 text-sap-text">
                  <div className="text-[9px] font-bold text-sap-primary uppercase tracking-widest mb-1">Target Line Identifier:</div>
                  <div className="font-bold">{selectedLine.description}</div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                    <span className="uppercase tracking-widest font-bold opacity-50">Date:</span>
                    <span className="font-mono font-bold">{selectedLine.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="uppercase tracking-widest font-bold opacity-50">Principal:</span>
                    <span className="font-mono font-bold text-lg text-sap-primary">${selectedLine.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest">Protocol Matching</label>
                  <select
                    value={matchedTxnId}
                    onChange={e => setMatchedTxnId(e.target.value)}
                    className="w-full text-[11px] p-2.5 bg-slate-50 border border-sap-border rounded-sm font-bold text-sap-text outline-none focus:ring-1 focus:ring-sap-primary"
                  >
                    <option value="">-- Internal Treasury Transfer --</option>
                    {transactions.filter(t => t.status === 'Disbursed').map(t => (
                      <option key={t.id} value={t.id}>
                        TX-{t.id} • {t.employeeName} (${t.amount})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-4 border-t border-sap-border">
                  <button
                    onClick={() => setSelectedStatementId(null)}
                    className="w-1/2 py-2.5 border border-sap-border bg-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition text-sap-text"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReconcile}
                    className="w-1/2 py-2.5 bg-sap-primary hover:bg-sap-primary/90 text-white font-bold rounded-sm text-[10px] uppercase tracking-widest transition shadow-sm"
                  >
                    Clear Line
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-sap-text-secondary">
                <i className="fa-solid fa-code-merge text-4xl text-slate-100 block mb-4"></i>
                <div className="font-bold text-[11px] uppercase tracking-widest mb-2">Protocol Pending</div>
                <p className="text-[10px] font-bold uppercase tracking-tighter italic">
                  Select an unmatched statement line to execute the automated verification workflow.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
