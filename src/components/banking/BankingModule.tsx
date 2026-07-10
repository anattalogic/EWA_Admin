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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Custodial Accounts</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Banking & Reconciliation</h1>
        </div>
      </div>

      {/* Grid of Bank accounts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bankAccounts.map(ba => (
          <div key={ba.id} className="bg-white p-5 border rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  ba.type === 'Operating' ? 'bg-slate-100 text-slate-800' :
                  ba.type === 'Prefund' ? 'bg-blue-100 text-blue-800' : 'bg-cyan-100 text-cyan-800'
                }`}>
                  {ba.type} Account
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-2">{ba.name}</h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{ba.accountNumber}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <i className="fa-solid fa-building-columns text-slate-500"></i>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Ledger Balance:</span>
              <span className="text-xl font-bold font-mono text-slate-950">${ba.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Reconciliation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Unreconciled statements */}
        <div className="bg-white border rounded-lg shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Unreconciled Bank Feed Transactions</h3>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded">
              Statement Matching
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                  <th className="p-3">Date</th>
                  <th className="p-3">Statement Description</th>
                  <th className="p-3 text-right">Amount ($)</th>
                  <th className="p-3 text-center">Clearance Status</th>
                  <th className="p-3 text-right">Match</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y">
                {bankStatements.map(line => (
                  <tr key={line.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3 font-mono font-bold text-slate-600">{line.date}</td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{line.description}</div>
                      <div className="text-[9px] text-slate-400">Line-ID: {line.id}</div>
                    </td>
                    <td className={`p-3 text-right font-mono font-bold ${line.type === 'CR' ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {line.type === 'DR' ? `($${line.amount.toLocaleString()})` : `$${line.amount.toLocaleString()}`}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                        line.reconciled ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {line.reconciled ? 'Matched & Cleared' : 'Unmatched'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {!line.reconciled ? (
                        <button
                          onClick={() => setSelectedStatementId(line.id)}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-[10px]"
                        >
                          Trigger Match
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">Matched: {line.matchedTransactionId || 'Internal Transfer'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Match Drawer */}
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Matched-Clearing Workspace</h3>
          {selectedLine ? (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded text-xs space-y-1.5 text-blue-900">
                <div className="font-bold">Awaiting Match:</div>
                <div>Line: {selectedLine.description}</div>
                <div>Date: {selectedLine.date}</div>
                <div className="font-bold font-mono">Amount: ${selectedLine.amount.toLocaleString()}</div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Link to Core Transaction</label>
                <select
                  value={matchedTxnId}
                  onChange={e => setMatchedTxnId(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border rounded-md"
                >
                  <option value="">-- Direct Treasury Transfer (No TXN ID) --</option>
                  {transactions.filter(t => t.status === 'Disbursed').map(t => (
                    <option key={t.id} value={t.id}>
                      {t.employeeName} (${t.amount} advance on {t.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStatementId(null)}
                  className="w-1/2 py-2 border rounded-md text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReconcile}
                  className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md text-xs transition"
                >
                  Confirm Clearance
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              <i className="fa-solid fa-code-merge text-2xl text-slate-300 block mb-2"></i>
              Select an unmatched statement line from the feed to execute the treasury verification rules.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
