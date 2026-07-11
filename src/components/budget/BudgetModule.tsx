import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function BudgetModule() {
  const { companies, addAuditLog, tasks, updateTask, transactions } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');

  const company = companies.find(c => c.id === selectedCompanyId);
  const companyTasks = tasks.filter(t => t.type === 'BUDGET_REQUEST' && t.payload.companyId === selectedCompanyId);
  
  const currentPeriodOutstanding = transactions
    .filter(t => t.companyId === selectedCompanyId && t.periodId === 'P-2026-06')
    .reduce((sum, t) => sum + t.outstanding, 0);

  const handleAdjustBudget = (type: 'Increase' | 'Decrease') => {
    if (!company) return;
    const amount = 50000;
    const action = `${type} Budget for ${company.name}`;
    addAuditLog('Alex Chen', action, 'Budget Management', `${type} request of $${amount.toLocaleString()} processed via treasury override.`);
    alert(`${action} successful. Ledger commitments updated.`);
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Treasury</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Liquidity & Budget</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Corporate Budget Control</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-50 border border-sap-border text-sap-text rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition shadow-sm">
            <i className="fa-solid fa-download mr-1.5"></i> Export Utilization
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Selector Panel */}
          <div className="lg:col-span-1 sap-card p-6 space-y-6 flex flex-col h-fit sticky top-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Entity Selection</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Enterprise Partner</label>
                <select 
                  value={selectedCompanyId} 
                  onChange={e => setSelectedCompanyId(e.target.value)}
                  className="w-full text-[11px] p-2.5 border border-sap-border bg-slate-50 rounded-sm font-bold text-sap-text focus:ring-1 focus:ring-sap-primary focus:bg-white outline-none transition-all"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-sm space-y-3">
                <div className="text-[9px] font-bold text-sap-primary uppercase tracking-widest border-b border-blue-200 pb-1.5">Budget Snapshot</div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter">Total Limit:</span>
                  <span className="text-[12px] font-mono font-bold text-sap-text">${company?.creditLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter">Utilized:</span>
                  <span className="text-[12px] font-mono font-bold text-red-600">${company?.budgetUtilized.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter">Period Outstanding:</span>
                  <span className="text-[12px] font-mono font-bold text-amber-600">${currentPeriodOutstanding.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                  <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter">Net Available:</span>
                  <span className="text-[13px] font-mono font-bold text-sap-success">${((company?.creditLimit || 0) - (company?.budgetUtilized || 0)).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics & Actions */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="sap-card p-6 flex flex-col justify-between bg-white border-l-4 border-l-sap-primary">
                <div>
                  <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest mb-1">Utilization Rate</div>
                  <div className="text-2xl font-mono font-bold text-sap-text">
                    {company ? Math.round((company.budgetUtilized / company.creditLimit) * 100) : 0}%
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden border border-slate-200">
                  <div 
                    className="bg-sap-primary h-full rounded-full transition-all duration-500" 
                    style={{ width: `${company ? (company.budgetUtilized / company.creditLimit) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="sap-card p-6 flex flex-col justify-between bg-white border-l-4 border-l-sap-info">
                <div>
                  <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest mb-1">Reserved Capital</div>
                  <div className="text-2xl font-mono font-bold text-sap-text">$250,000.00</div>
                  <div className="text-[9px] text-sap-text-secondary mt-1 font-bold uppercase tracking-tighter italic">Escrowed in Prefund Vault</div>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sap-success"></span>
                  <span className="text-[9px] text-sap-success font-bold uppercase tracking-widest">Protocol Synchronized</span>
                </div>
              </div>

              <div className="sap-card p-6 flex flex-col gap-3 justify-center bg-white border-l-4 border-l-sap-shell">
                <button 
                  onClick={() => handleAdjustBudget('Increase')}
                  className="w-full bg-sap-success hover:bg-sap-success/90 text-white py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-circle-plus"></i> Increase Limit
                </button>
                <button 
                  onClick={() => handleAdjustBudget('Decrease')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-circle-minus"></i> Decrease Limit
                </button>
              </div>
            </div>

            <div className="sap-card overflow-hidden bg-white">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">In-Flight Budget Proposals</h3>
                <span className="text-[10px] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm font-bold text-sap-primary uppercase tracking-widest">WORKFLOW_QUEUE</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                      <th className="p-4">Reference</th>
                      <th className="p-4">Requested By</th>
                      <th className="p-4 text-right">Expansion ($)</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4 text-center">Protocol State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sap-border text-[11px]">
                    {companyTasks.map(task => (
                      <tr key={task.id} className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                        <td className="p-4 font-mono font-bold text-sap-primary">{task.id}</td>
                        <td className="p-4 text-sap-text font-bold">{task.creator}</td>
                        <td className="p-4 text-right font-mono text-sap-text font-bold">${task.payload.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase ${
                            task.priority === 'High' ? 'bg-red-50 text-sap-error' : 'bg-blue-50 text-sap-primary'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                            task.status === 'Approved' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 
                            task.status === 'Rejected' ? 'bg-red-50 text-sap-error border-red-200' :
                            'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {!companyTasks.length && (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-slate-300 italic font-bold uppercase tracking-widest text-[10px]">
                          No active budget proposals in treasury queue.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sap-card overflow-hidden bg-white">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">Budget Adjustment Protocol History</h3>
                <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-sm font-bold text-sap-text-secondary uppercase tracking-widest">AUDIT_LEDGER</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                      <th className="p-4">Reference Object</th>
                      <th className="p-4">Fiscal Timestamp</th>
                      <th className="p-4">Operation Type</th>
                      <th className="p-4 text-right">Adjustment ($)</th>
                      <th className="p-4">Authorized By</th>
                      <th className="p-4 text-center">Lifecycle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sap-border text-[11px]">
                    <tr className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                      <td className="p-4 font-mono font-bold text-sap-primary">BADJ-09212</td>
                      <td className="p-4 text-sap-text-secondary font-bold">2026-07-09 14:22</td>
                      <td className="p-4 font-bold text-sap-text uppercase tracking-tighter">Credit Limit Expansion</td>
                      <td className="p-4 text-right font-mono text-sap-success font-bold">+$50,000.00</td>
                      <td className="p-4 font-bold text-sap-text">Alex Chen (Treasury)</td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-sap-success border border-emerald-200 rounded-sm text-[9px] font-bold uppercase tracking-widest">COMMITTED</span>
                      </td>
                    </tr>
                    <tr className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                      <td className="p-4 font-mono font-bold text-sap-primary">BADJ-08119</td>
                      <td className="p-4 text-sap-text-secondary font-bold">2026-07-01 09:15</td>
                      <td className="p-4 font-bold text-sap-text uppercase tracking-tighter">Quarterly Policy Reset</td>
                      <td className="p-4 text-right font-mono text-sap-text-secondary font-bold">---</td>
                      <td className="p-4 font-bold text-sap-text">System Automation</td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-slate-50 text-sap-text-secondary border border-slate-200 rounded-sm text-[9px] font-bold uppercase tracking-widest">ARCHIVED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
