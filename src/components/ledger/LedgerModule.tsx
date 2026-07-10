import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function LedgerModule() {
  const { glAccounts, journals } = useEwaStore();
  const [activeSubTab, setActiveSubTab] = useState<'Accounts' | 'Journals' | 'Statements'>('Accounts');

  // Statements calculations
  const cashOperating = glAccounts.find(g => g.id === '1100')?.balance || 0;
  const cashPrefund = glAccounts.find(g => g.id === '1200')?.balance || 0;
  const cashCollection = glAccounts.find(g => g.id === '1300')?.balance || 0;
  const receivables = glAccounts.find(g => g.id === '1400')?.balance || 0;
  const liabilities = glAccounts.find(g => g.id === '2100')?.balance || 0;
  const equity = glAccounts.find(g => g.id === '3100')?.balance || 0;
  const revenue = glAccounts.find(g => g.id === '4100')?.balance || 0;
  const expense = glAccounts.find(g => g.id === '5100')?.balance || 0;

  const totalAssets = cashOperating + cashPrefund + cashCollection + receivables;
  const netIncome = revenue - expense;
  const totalEquityAndLiabilities = liabilities + equity + netIncome;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Accounting Ledger</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">General Ledger System</h1>
        </div>
      </div>

      {/* Mini tabs */}
      <div className="flex border-b border-slate-200 gap-1 pb-px">
        {(['Accounts', 'Journals', 'Statements'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeSubTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab === 'Accounts' ? 'Chart of Accounts' : tab === 'Journals' ? 'Journal Entries' : 'Financial Statements'}
          </button>
        ))}
      </div>

      {/* Subtab Content: Chart of Accounts */}
      {activeSubTab === 'Accounts' && (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Double-Entry Account Registry</h3>
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-600">
              Balanced Protocol: Assets = Liabilities + Equity
            </span>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                <th className="p-3">GL Code</th>
                <th className="p-3">Account Name</th>
                <th className="p-3">GL Category</th>
                <th className="p-3 text-right">Debit / Credit Balance</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y font-mono">
              {glAccounts.map(gl => (
                <tr key={gl.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-blue-600">{gl.id}</td>
                  <td className="p-3 font-sans text-slate-900 font-semibold">{gl.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 font-sans rounded-full text-[9px] font-bold uppercase ${
                      gl.category === 'Asset' ? 'bg-blue-50 text-blue-700' : 
                      gl.category === 'Liability' ? 'bg-orange-50 text-orange-700' : 
                      gl.category === 'Revenue' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {gl.category}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-slate-950">
                    ${gl.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subtab Content: Journal Entries */}
      {activeSubTab === 'Journals' && (
        <div className="space-y-4">
          {journals.map(j => (
            <div key={j.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b bg-slate-50 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 mr-2">{j.reference}</span>
                  <span className="text-slate-400 font-mono">JE-ID: {j.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono">{j.date}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded-full">
                    {j.status}
                  </span>
                </div>
              </div>
              <div className="p-3 text-xs text-slate-500 italic bg-slate-50/30 border-b">
                Description: {j.description}
              </div>
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-slate-100/50 text-[10px] font-bold text-slate-400 uppercase border-b">
                    <th className="p-2 pl-4">Account Name</th>
                    <th className="p-2 text-right">Debit ($)</th>
                    <th className="p-2 text-right">Credit ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {j.details.map((d, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition">
                      <td className="p-2 pl-4 text-slate-700 font-sans">
                        {d.type === 'Credit' ? <span className="pl-4 text-slate-400">↳</span> : null}
                        {d.accountName}
                      </td>
                      <td className="p-2 text-right text-slate-900">
                        {d.type === 'Debit' ? `$${d.amount.toFixed(2)}` : ''}
                      </td>
                      <td className="p-2 text-right text-rose-600">
                        {d.type === 'Credit' ? `($${d.amount.toFixed(2)})` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Subtab Content: Financial Statements */}
      {activeSubTab === 'Statements' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Statement: Balance Sheet */}
          <div className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Statement of Financial Position</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Aggregate Balance Sheet</p>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 border-b pb-1">ASSETS</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Operating Cash Account</span>
                    <span className="font-mono">${cashOperating.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EWA Prefund Account</span>
                    <span className="font-mono">${cashPrefund.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EWA Collection Clearing</span>
                    <span className="font-mono">${cashCollection.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employee Advance Receivables</span>
                    <span className="font-mono">${receivables.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 text-slate-900 text-sm">
                    <span>TOTAL ASSETS</span>
                    <span className="font-mono">${totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-bold text-slate-900 border-b pb-1">LIABILITIES & EQUITY</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>EWA Platform Liabilities</span>
                    <span className="font-mono">${liabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Common Contributed Capital</span>
                    <span className="font-mono">${equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Current Fiscal Net Earnings (YTD)</span>
                    <span className="font-mono">${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 text-slate-900 text-sm">
                    <span>TOTAL LIABILITIES & EQUITY</span>
                    <span className="font-mono">${totalEquityAndLiabilities.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statement: Income Statement */}
          <div className="bg-white border rounded-lg shadow-sm p-6 space-y-4">
            <div className="border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Statement of Profit or Loss</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Aggregate Income Statement</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 border-b pb-1">REVENUE</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>EWA Platform Processing Fees</span>
                    <span className="font-mono text-emerald-700">${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 text-slate-950 text-sm">
                    <span>TOTAL OPERATING REVENUE</span>
                    <span className="font-mono">${revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 border-b pb-1">OPERATING EXPENSES</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Custodial Bank ACH & Wire Expenses</span>
                    <span className="font-mono text-rose-700">(${expense.toLocaleString('en-US', { minimumFractionDigits: 2 })})</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 text-slate-950 text-sm">
                    <span>TOTAL OPERATING EXPENSES</span>
                    <span className="font-mono">(${expense.toLocaleString('en-US', { minimumFractionDigits: 2 })})</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-slate-900">
                <div className="flex justify-between font-bold text-sm text-slate-950">
                  <span>NET COMPREHENSIVE EARNINGS</span>
                  <span className="font-mono text-emerald-700">${netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
