import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function FeeModule() {
  const { companies, feePolicies, addAuditLog } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || '');

  const company = companies.find(c => c.id === selectedCompanyId);
  const currentPolicy = feePolicies.find(p => p.id === company?.feePolicyId) || feePolicies[0];

  const handleUpdatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog('Alex Chen', `Updated Fee Protocol for ${company?.name}`, 'Revenue Ops', 'Hierarchical protocol version bumped. Tiered parameters recalculated.');
    alert('Enterprise fee protocol committed to the Service Fee Engine.');
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Finance Architecture</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Revenue & Policy Engine</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Platform Fee Configuration</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Policy Config */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sap-card p-6 space-y-6 bg-white">
              <div className="flex justify-between items-center border-b pb-4 border-sap-border">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text">Service Fee Engine (SFE)</h3>
                <div className="flex gap-2">
                   <span className="px-2 py-1 bg-blue-50 text-sap-primary text-[9px] font-bold uppercase border border-blue-100 rounded-sm">
                    Hierarchy Level: {currentPolicy.hierarchyLevel === 1 ? 'Global' : 'Entity Specific'}
                  </span>
                  <select 
                    value={selectedCompanyId} 
                    onChange={e => setSelectedCompanyId(e.target.value)}
                    className="text-[11px] p-1.5 border border-sap-border rounded-sm bg-slate-50 font-bold text-sap-text focus:ring-1 focus:ring-sap-primary outline-none"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <form onSubmit={handleUpdatePolicy} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Primary Fee Model</label>
                      <select 
                        value={currentPolicy.type}
                        className="w-full text-[11px] p-2.5 border border-sap-border bg-slate-50 rounded-sm font-bold text-sap-text focus:bg-white outline-none"
                        onChange={() => {}}
                      >
                        <option value="Flat">Flat Processing Fee</option>
                        <option value="Percentage">Percentage of Drawdown</option>
                        <option value="Tiered">Multi-Tier Utilization Fee</option>
                        <option value="Conditional">Conditional Logic Protocol</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {currentPolicy.type !== 'Tiered' && (
                      <div>
                        <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Base Rate Value</label>
                        <input type="number" defaultValue={currentPolicy.value} className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text" />
                      </div>
                    )}
                  </div>
                </div>

                {currentPolicy.type === 'Tiered' && currentPolicy.tiers && (
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest border-b pb-1">Tiered Calculation Matrix</h4>
                    <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-sap-text uppercase tracking-tighter bg-slate-50 p-2">
                      <div>Range (Min - Max)</div>
                      <div className="text-center">Flat Component</div>
                      <div className="text-center">Variable (%)</div>
                      <div className="text-right">Action</div>
                    </div>
                    {currentPolicy.tiers.map(tier => (
                      <div key={tier.id} className="grid grid-cols-4 gap-2 p-2 border border-sap-border rounded-sm items-center hover:bg-slate-50 transition">
                        <div className="font-mono text-[11px] font-bold">${tier.minAmount} - ${tier.maxAmount}</div>
                        <div className="text-center font-mono font-bold text-sap-text">${tier.flatFee}</div>
                        <div className="text-center font-mono font-bold text-sap-text">{tier.percentFee}%</div>
                        <div className="text-right">
                          <button type="button" className="text-[9px] font-bold text-sap-primary uppercase hover:underline">Edit Tier</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="md:col-span-2 pt-6 border-t border-sap-border flex justify-between items-center">
                  <p className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter italic max-w-xs">Enterprise protocols require dual-factor cryptographic authorization for rollout.</p>
                  <button type="submit" className="px-6 py-2 bg-sap-shell text-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-sap-shell/90 transition shadow-sm">
                    Commit Protocol
                  </button>
                </div>
              </form>
            </div>

            {/* Dark Analytics card */}
            <div className="bg-sap-shell text-slate-100 p-6 rounded-sm border border-sap-border space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-primary border-b border-sap-primary/30 pb-2">Yield Analytics Simulator</h3>
                <span className="text-[9px] font-mono font-bold text-slate-500">REALTIME_POSTING</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Avg Yield / Txn</div>
                  <div className="text-xl font-mono font-bold text-white tracking-tighter">$3.14</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Annualized APR</div>
                  <div className="text-xl font-mono font-bold text-white tracking-tighter">4.2%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Fee Coverage</div>
                  <div className="text-xl font-mono font-bold text-sap-success tracking-tighter">112%</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Rev Runrate</div>
                  <div className="text-xl font-mono font-bold text-sap-primary tracking-tighter">$1.2M</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Active Fees List */}
          <div className="sap-card flex flex-col h-fit bg-white border-t-4 border-t-sap-primary">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">Effective Fee Schedule</h3>
              <i className="fa-solid fa-shield-halved text-sap-primary text-[11px]"></i>
            </div>
            <div className="divide-y divide-sap-border">
              {[
                { name: 'Standard Disbursement', meta: 'ACH Standard / 2-Day', price: '$1.99' },
                { name: 'Priority Clearing', meta: 'Same-Day ACH / FedNow', price: '$2.99' },
                { name: 'Real-Time Payload', meta: 'Instant Visa Direct', price: '$4.99' }
              ].map(fee => (
                <div key={fee.name} className="p-5 flex justify-between items-center group hover:bg-slate-50 transition">
                  <div>
                    <div className="text-[11px] font-bold text-sap-text uppercase tracking-tight group-hover:text-sap-primary transition-colors">{fee.name}</div>
                    <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest mt-1 opacity-70">{fee.meta}</div>
                  </div>
                  <div className="text-[14px] font-mono font-bold text-sap-text">{fee.price}</div>
                </div>
              ))}
              <div className="p-5 flex justify-between items-center bg-slate-50/50">
                <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-tighter italic">Auto-Scaling Logic Enabled</div>
                <button className="text-[10px] text-sap-primary font-bold hover:underline uppercase tracking-widest">Audit Logic</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
