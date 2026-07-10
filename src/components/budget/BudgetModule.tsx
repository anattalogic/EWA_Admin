import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function BudgetModule() {
  const { companies, addAuditLog } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');

  const company = companies.find(c => c.id === selectedCompanyId);

  const handleAdjustBudget = (type: 'Increase' | 'Decrease') => {
    if (!company) return;
    const amount = 50000;
    const action = `${type} Budget for ${company.name}`;
    addAuditLog('Alex Chen', action, 'Budget Management', `${type} request of $${amount.toLocaleString()} processed via treasury override.`);
    alert(`${action} successful. Ledger commitments updated.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Treasury</span>
            <span>/</span>
            <span className="text-blue-600">Liquidity & Budget</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Corporate Budget Control</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-xs font-bold hover:bg-slate-200 transition">
            <i className="fa-solid fa-download mr-1.5"></i> Export Utilization
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Selector Panel */}
        <div className="lg:col-span-1 bg-white p-4 border rounded-lg shadow-sm space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Select Enterprise Partner</label>
            <select 
              value={selectedCompanyId} 
              onChange={e => setSelectedCompanyId(e.target.value)}
              className="w-full text-xs p-2.5 border rounded-md bg-slate-50 font-semibold"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-900 space-y-2">
            <div className="font-bold border-b border-blue-200 pb-1 uppercase text-[9px]">Budget Snapshot</div>
            <div className="flex justify-between">
              <span>Limit:</span>
              <span className="font-mono font-bold">${company?.creditLimit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Utilized:</span>
              <span className="font-mono font-bold text-rose-600">${company?.budgetUtilized.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-blue-200">
              <span>Remaining:</span>
              <span className="font-mono font-bold text-emerald-600">${((company?.creditLimit || 0) - (company?.budgetUtilized || 0)).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Analytics & Actions */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Utilization Rate</div>
              <div className="text-xl font-mono font-bold mt-1">
                {company ? Math.round((company.budgetUtilized / company.creditLimit) * 100) : 0}%
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full" 
                  style={{ width: `${company ? (company.budgetUtilized / company.creditLimit) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Reserved Capital</div>
              <div className="text-xl font-mono font-bold mt-1 text-slate-900">$250,000.00</div>
              <div className="text-[9px] text-slate-400 mt-1 italic">Escrowed in Prefund Vault</div>
            </div>
            <div className="bg-white p-4 border rounded-lg shadow-sm flex items-center gap-2">
              <button 
                onClick={() => handleAdjustBudget('Increase')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded text-xs font-bold transition"
              >
                <i className="fa-solid fa-plus-circle mr-1.5"></i> Increase
              </button>
              <button 
                onClick={() => handleAdjustBudget('Decrease')}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded text-xs font-bold transition"
              >
                <i className="fa-solid fa-minus-circle mr-1.5"></i> Decrease
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Budget Adjustment History</h3>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">AUDIT_SYNCED</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase border-b">
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Action Date</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Adjustment ($)</th>
                  <th className="p-3">Authorized By</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-blue-600">BADJ-09212</td>
                  <td className="p-3 text-slate-500">2026-07-09 14:22</td>
                  <td className="p-3 font-semibold">Credit Limit Expansion</td>
                  <td className="p-3 text-right font-mono text-emerald-600 font-bold">+$50,000.00</td>
                  <td className="p-3">Alex Chen (Treasury)</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-bold">COMMITTED</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-blue-600">BADJ-08119</td>
                  <td className="p-3 text-slate-500">2026-07-01 09:15</td>
                  <td className="p-3 font-semibold">Quarterly Reset</td>
                  <td className="p-3 text-right font-mono text-slate-400">---</td>
                  <td className="p-3">System Automation</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full text-[9px] font-bold">ARCHIVED</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
