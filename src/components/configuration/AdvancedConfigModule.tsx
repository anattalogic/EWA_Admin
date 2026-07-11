import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { ReusableTabs } from '../ui/ReusableTabs';

export function AdvancedConfigModule() {
  const { companies, activeSubTabs, setActiveSubTab } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');
  const activeSubTab = (activeSubTabs['Advanced Config'] || 'Payroll Policies') as 'Payroll Policies' | 'Dynamic Limits' | 'System Rules';

  const company = companies.find(c => c.id === selectedCompanyId);

  return (
    <div className="flex flex-col h-full bg-sap-background">
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Administration</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Advanced Protocols</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Enterprise Configuration</h1>
        </div>
        <select 
          value={selectedCompanyId} 
          onChange={e => setSelectedCompanyId(e.target.value)}
          className="text-[11px] p-2 border border-sap-border rounded-sm bg-white font-bold text-sap-text focus:ring-1 focus:ring-sap-primary outline-none min-w-[200px]"
        >
          {companies.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="shrink-0">
        <ReusableTabs 
          tabs={['Payroll Policies', 'Dynamic Limits', 'System Rules']} 
          activeTab={activeSubTab} 
          onTabChange={(tab) => setActiveSubTab('Advanced Config', tab)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeSubTab === 'Payroll Policies' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="sap-card p-6 bg-white space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Payroll Cycle Matrix</h3>
                <span className="text-[9px] font-mono text-sap-primary font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-widest">
                  Current: {company?.payrollPolicy?.cycle || 'Not Set'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Cycle Strategy</label>
                    <select className="w-full text-[11px] p-2.5 border border-sap-border bg-slate-50 rounded-sm font-bold text-sap-text outline-none">
                      <option>Monthly</option>
                      <option>Bi-Weekly</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Payroll Start Day</label>
                    <input type="number" defaultValue={company?.payrollPolicy?.startDay || 1} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Payroll End Day</label>
                    <input type="number" defaultValue={company?.payrollPolicy?.endDay || 30} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Standard Payday</label>
                    <input type="number" defaultValue={company?.payrollPolicy?.payDay || 5} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">EWA Withdrawal End Day</label>
                    <input type="number" defaultValue={company?.payrollPolicy?.ewaWindowEnd || 25} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Repayment Day (Default)</label>
                    <input type="number" defaultValue={company?.payrollPolicy?.repaymentDay || 5} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t flex justify-between items-center">
                <p className="text-[9px] text-sap-text-secondary font-bold uppercase italic max-w-xs">Modifying payroll cycles impacts automated ledger posting and repayment scheduling.</p>
                <button className="px-6 py-2 bg-sap-shell text-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-sap-shell/90 transition shadow-sm">
                  Commit Matrix
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-sap-shell text-white p-6 rounded-sm shadow-xl space-y-4 border border-sap-border">
                <h3 className="text-[11px] font-bold text-sap-primary uppercase tracking-widest border-b border-sap-primary/30 pb-2">Operational Timing Protocol</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">Accrual Calculation window</span>
                    <span className="font-mono font-bold">L-PERIOD - 24H</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">Settlement Buffer</span>
                    <span className="font-mono font-bold">{company?.payrollPolicy?.lateGraceDays || 3} DAYS</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-bold uppercase tracking-tighter">Repayment Hook</span>
                    <span className="font-mono font-bold text-emerald-400">AUTO_PAY_OFFSET</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Dynamic Limits' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="sap-card bg-white">
              <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Active Governance Limits</h3>
                <button className="text-[10px] bg-sap-primary text-white px-3 py-1 rounded-sm font-bold uppercase tracking-widest shadow-sm">Create New Limit</button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-4">Limit Reference</th>
                    <th className="p-4">Frequency Protocol</th>
                    <th className="p-4">Restriction Type</th>
                    <th className="p-4 text-center">Value Range (Min - Max)</th>
                    <th className="p-4">Validity</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y">
                  {company?.limits?.map(limit => (
                    <tr key={limit.id} className="sap-table-row hover:bg-slate-50/50 transition">
                      <td className="p-4 font-mono font-bold text-sap-primary uppercase">{limit.id}</td>
                      <td className="p-4 font-bold text-sap-text uppercase tracking-widest text-[10px]">{limit.frequency}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-sm font-bold uppercase tracking-tighter text-[9px]">
                          {limit.type} LIMIT
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-sap-text">
                        ${limit.min.toLocaleString()} - ${limit.max.toLocaleString()}
                      </td>
                      <td className="p-4 text-[10px] font-bold text-sap-text-secondary uppercase tracking-tighter">
                        {limit.effectiveFrom} — {limit.effectiveTo || '∞'}
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-[10px] font-bold text-sap-success uppercase tracking-widest flex items-center justify-end gap-1">
                          <i className="fa-solid fa-circle-check"></i> ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!company?.limits?.length && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-slate-300 italic font-bold uppercase tracking-widest text-xs">
                        No entity-specific limits defined. Global protocols applying.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
