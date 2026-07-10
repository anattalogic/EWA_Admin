import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function FeeModule() {
  const { companies, addAuditLog } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');

  const company = companies.find(c => c.id === selectedCompanyId);

  const handleUpdatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog('Alex Chen', `Updated Fee Policy for ${company?.name}`, 'Revenue Ops', 'Policy version bumped to v2.4. Effective immediately.');
    alert('Fee policy updated and synchronized with Ledger Posting Rules.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Revenue Configuration</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Platform Fee Management</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Policy Config */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 border rounded-lg shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Service Fee Engine (SFE)</h3>
              <select 
                value={selectedCompanyId} 
                onChange={e => setSelectedCompanyId(e.target.value)}
                className="text-xs p-1.5 border rounded bg-slate-50 font-bold"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <form onSubmit={handleUpdatePolicy} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Fee Basis</label>
                  <select className="w-full text-xs p-2.5 border rounded-md bg-slate-50">
                    <option>Flat Processing Fee</option>
                    <option>Percentage of Drawdown</option>
                    <option>Tiered Utilization Fee</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Standard Rate ($)</label>
                  <input type="number" defaultValue={2.99} className="w-full text-xs p-2.5 border rounded-md font-mono font-bold" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Late Settlement Penalty (%)</label>
                  <input type="number" defaultValue={1.5} className="w-full text-xs p-2.5 border rounded-md font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Instant Clearing Premium</label>
                  <input type="number" defaultValue={1.00} className="w-full text-xs p-2.5 border rounded-md font-mono font-bold" />
                </div>
              </div>

              <div className="md:col-span-2 pt-4 border-t flex justify-between items-center">
                <p className="text-[10px] text-slate-400 italic">Policy updates require Checker-level authorization for production deployment.</p>
                <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800 transition">
                  Deploy Policy Update
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-900 text-slate-300 p-6 rounded-lg border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Yield Analytics Simulation</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-[9px] text-slate-500 uppercase">Avg Yield / Txn</div>
                <div className="text-lg font-mono font-bold text-white">$3.14</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 uppercase">Annualized APR Equiv</div>
                <div className="text-lg font-mono font-bold text-white">4.2%</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 uppercase">Fee Coverage</div>
                <div className="text-lg font-mono font-bold text-emerald-400">112%</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-500 uppercase">Revenue Runrate</div>
                <div className="text-lg font-mono font-bold text-blue-400">$1.2M</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Fees List */}
        <div className="bg-white border rounded-lg shadow-sm flex flex-col h-fit">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Effective Fee Schedule</h3>
            <i className="fa-solid fa-circle-info text-slate-300"></i>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-slate-900">Standard Disbursement</div>
                <div className="text-[9px] text-slate-400 uppercase">ACH Standard / 2-Day</div>
              </div>
              <div className="text-sm font-mono font-bold">$1.99</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-slate-900">Priority Clearing</div>
                <div className="text-[9px] text-slate-400 uppercase">Same-Day ACH / FedNow</div>
              </div>
              <div className="text-sm font-mono font-bold">$2.99</div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-slate-900">Real-Time Payload</div>
                <div className="text-[9px] text-slate-400 uppercase">Instant Visa Direct</div>
              </div>
              <div className="text-sm font-mono font-bold">$4.99</div>
            </div>
            <div className="p-4 flex justify-between items-center bg-slate-50">
              <div className="text-[10px] text-slate-500 font-semibold italic">Auto-Scaling Tiers Enabled</div>
              <button className="text-[10px] text-blue-600 font-bold hover:underline">View Logic</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
