import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { ReusableTabs } from '../ui/ReusableTabs';

export function LedgerModule() {
  const { glAccounts, journals, services, activeSubTabs, setActiveSubTab } = useEwaStore();
  const activeSubTab = (activeSubTabs['General Ledger'] || 'Accounts') as 'Accounts' | 'Journals' | 'Statements' | 'Services';

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
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Corporate Finance</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">General Ledger</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Accounting Core</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 border border-sap-border bg-white text-sap-text rounded text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2">
            <i className="fa-solid fa-file-export"></i>
            Export PDF
          </button>
          <button className="px-4 py-1.5 bg-sap-primary text-white rounded text-xs font-bold hover:bg-sap-primary/90 transition shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-plus"></i>
            New Journal
          </button>
        </div>
      </div>

      {/* Reusable Tabs */}
      <div className="shrink-0">
        <ReusableTabs 
          tabs={['Accounts', 'Journals', 'Statements', 'Services']} 
          activeTab={activeSubTab} 
          onTabChange={(tab) => setActiveSubTab('General Ledger', tab)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {activeSubTab === 'Accounts' && (
          <div className="animate-in fade-in duration-300">
            <div className="sap-card overflow-hidden">
              <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Double-Entry Account Registry</h3>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-600">
                  Balanced Protocol: Assets = Liabilities + Equity
                </span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-3">GL Code</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">GL Category</th>
                    <th className="p-3 text-right">Debit / Credit Balance</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y font-mono">
                  {glAccounts.map(gl => (
                    <tr key={gl.id} className="sap-table-row hover:bg-blue-50/30 transition cursor-pointer">
                      <td className="p-3 font-bold text-sap-primary">{gl.id}</td>
                      <td className="p-3 font-sans text-sap-text font-semibold">{gl.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 font-sans rounded-sm text-[9px] font-bold uppercase border ${
                          gl.category === 'Asset' ? 'bg-blue-50 text-sap-info border-blue-200' : 
                          gl.category === 'Liability' ? 'bg-amber-50 text-sap-warning border-amber-200' : 
                          gl.category === 'Revenue' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {gl.category}
                        </span>
                      </td>
                      <td className="p-3 text-right font-bold text-sap-text">
                        ${gl.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'Journals' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {journals.map(j => (
              <div key={j.id} className="sap-card overflow-hidden">
                <div className="p-3 border-b bg-slate-50 flex justify-between items-center text-[11px]">
                  <div>
                    <span className="font-bold text-sap-text mr-2">{j.reference}</span>
                    <span className="text-sap-text-secondary font-mono">JE-{j.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sap-text-secondary font-mono">{j.date}</span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-sap-success text-[9px] font-bold uppercase rounded-sm border border-emerald-200">
                      {j.status}
                    </span>
                  </div>
                </div>
                <div className="p-3 text-[10px] text-sap-text-secondary italic bg-slate-50/30 border-b">
                  Ledger Memo: {j.description}
                </div>
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-slate-100/50 text-[10px] font-bold text-sap-text-secondary uppercase border-b">
                      <th className="p-2 pl-4">Account Unit</th>
                      <th className="p-2 text-right">Debit ($)</th>
                      <th className="p-2 text-right">Credit ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {j.details.map((d, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition">
                        <td className="p-2 pl-4 text-sap-text font-sans">
                          {d.type === 'Credit' ? <span className="pl-4 text-slate-300">↳</span> : null}
                          {d.accountName}
                        </td>
                        <td className="p-2 text-right text-sap-text">
                          {d.type === 'Debit' ? `$${d.amount.toFixed(2)}` : ''}
                        </td>
                        <td className="p-2 text-right text-red-600">
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

        {activeSubTab === 'Services' && (
          <div className="animate-in fade-in duration-300">
            <div className="sap-card overflow-hidden">
              <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Service Definition Registry</h3>
                <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded font-bold text-sap-primary uppercase tracking-widest border border-blue-100">
                  Protocol Mapping
                </span>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-3">Service ID</th>
                    <th className="p-3">Service Capability</th>
                    <th className="p-3">Flow Strategy</th>
                    <th className="p-3">Posting Rule (DR/CR)</th>
                    <th className="p-3 text-center">Fee Obligation</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y">
                  {services.map(svc => (
                    <tr key={svc.id} className="sap-table-row hover:bg-slate-50/50 transition">
                      <td className="p-3 font-mono font-bold text-sap-primary uppercase tracking-widest">{svc.code}</td>
                      <td className="p-3">
                        <div className="font-bold text-sap-text">{svc.name}</div>
                        <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-tighter opacity-70 truncate max-w-xs">{svc.description}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                          svc.type === 'Transactional' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {svc.type}
                        </span>
                      </td>
                      <td className="p-3 font-mono">
                        {svc.glPostingRule ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sap-primary font-bold">{svc.glPostingRule.debitAccountId}</span>
                            <i className="fa-solid fa-arrow-right-long text-[8px] opacity-30"></i>
                            <span className="text-sap-primary font-bold">{svc.glPostingRule.creditAccountId}</span>
                          </div>
                        ) : (
                          <span className="text-slate-300 italic">None (Record Only)</span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <i className={`fa-solid ${svc.requiresFee ? 'fa-circle-check text-sap-primary' : 'fa-circle-xmark text-slate-200'} text-sm`}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'Statements' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {/* Balance Sheet */}
            <div className="sap-card p-6 space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-bold text-sap-text text-sm uppercase tracking-tight">Statement of Financial Position</h3>
                <p className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest mt-0.5">Aggregate Snapshot</p>
              </div>
              <div className="space-y-4 text-[11px]">
                <div className="space-y-2">
                  <h4 className="font-bold text-sap-text-secondary border-b pb-1 text-[9px] uppercase tracking-wider">ASSETS</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between"><span>Operating Cash</span> <span className="font-mono">${cashOperating.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>EWA Prefund Account</span> <span className="font-mono">${cashPrefund.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Collection Clearing</span> <span className="font-mono">${cashCollection.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Advance Receivables</span> <span className="font-mono">${receivables.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold border-t pt-2 text-sap-text text-xs">
                      <span>TOTAL ASSETS</span>
                      <span className="font-mono font-bold text-sap-primary">${totalAssets.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-sap-text-secondary border-b pb-1 text-[9px] uppercase tracking-wider">LIABILITIES & EQUITY</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between"><span>EWA Platform Liabilities</span> <span className="font-mono">${liabilities.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Contributed Capital</span> <span className="font-mono">${equity.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sap-success"><span>YTD Net Earnings</span> <span className="font-mono">${netIncome.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold border-t pt-2 text-sap-text text-xs">
                      <span>TOTAL L&E</span>
                      <span className="font-mono font-bold">${totalEquityAndLiabilities.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Statement */}
            <div className="sap-card p-6 space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-bold text-sap-text text-sm uppercase tracking-tight">Statement of Profit or Loss</h3>
                <p className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest mt-0.5">Operating Performance</p>
              </div>
              <div className="space-y-6 text-[11px]">
                <div className="space-y-2">
                  <h4 className="font-bold text-sap-text-secondary border-b pb-1 text-[9px] uppercase tracking-wider">REVENUE</h4>
                  <div className="flex justify-between items-end">
                    <span>EWA Platform Fees</span>
                    <span className="font-mono font-bold text-sap-success text-sm">${revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-sap-text-secondary border-b pb-1 text-[9px] uppercase tracking-wider">OPERATING EXPENSES</h4>
                  <div className="flex justify-between items-end">
                    <span>Custodial Bank & ACH Fees</span>
                    <span className="font-mono font-bold text-red-600">(${expense.toLocaleString()})</span>
                  </div>
                </div>
                <div className="pt-4 border-t-2 border-sap-text mt-4">
                  <div className="flex justify-between font-bold text-xs text-sap-text">
                    <span>NET EARNINGS</span>
                    <span className="font-mono text-sap-success text-sm">${netIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
