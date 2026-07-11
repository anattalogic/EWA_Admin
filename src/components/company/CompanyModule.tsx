import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { ReusableTabs } from '../ui/ReusableTabs';

export function CompanyModule() {
  const { companies, addCompany, activeSubTabs, setActiveSubTab } = useEwaStore();
  const activeSubTab = activeSubTabs['Company Setup'] || 'Registry';
  
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  
  // Wizard state
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [industry, setIndustry] = useState('Logistics');
  const [creditLimit, setCreditLimit] = useState(50000);
  const [contactEmail, setContactEmail] = useState('');

  const handleFinishWizard = () => {
    addCompany({
      name,
      code,
      industry,
      category: 'Enterprise',
      region: 'North America',
      creditLimit,
      availableLimit: creditLimit,
      budgetUtilized: 0,
      prefundBalance: 0,
      contactEmail,
      bankAccount: `VAULT-${code}`,
      feePolicyId: 'FP-01',
      status: 'Pending'
    });
    setShowWizard(false);
    setWizardStep(1);
    // Reset fields
    setName(''); setCode(''); setIndustry('Logistics'); setCreditLimit(50000); setContactEmail('');
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Dynamic Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Enterprise Ops</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Organization Master</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Client Organizations</h1>
        </div>
        <button 
          onClick={() => setShowWizard(true)}
          className="px-4 py-1.5 bg-sap-primary text-white rounded text-xs font-bold hover:bg-sap-primary/90 transition shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Register New Organization
        </button>
      </div>

      {/* Sub-tabs Slot */}
      <div className="shrink-0">
        <ReusableTabs 
          tabs={['Registry', 'Limits', 'Policies']} 
          activeTab={activeSubTab} 
          onTabChange={(tab) => setActiveSubTab('Company Setup', tab)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {activeSubTab === 'Registry' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sap-card p-4">
                <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Total Credit Line</div>
                <div className="text-2xl font-bold text-sap-text mt-1 font-mono">
                  ${companies.reduce((sum, c) => sum + c.creditLimit, 0).toLocaleString()}
                </div>
              </div>
              <div className="sap-card p-4 border-l-4 border-sap-primary">
                <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Active Prefunds</div>
                <div className="text-2xl font-bold text-sap-primary mt-1 font-mono">
                  ${companies.reduce((sum, c) => sum + c.prefundBalance, 0).toLocaleString()}
                </div>
              </div>
              <div className="sap-card p-4">
                <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Validated Partners</div>
                <div className="text-2xl font-bold text-sap-text mt-1">
                  {companies.filter(c => c.status === 'Active').length}
                </div>
              </div>
            </div>

            {/* Organizations Table */}
            <div className="sap-card overflow-hidden">
              <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
                <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Partner Registry</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Filter..." className="text-[10px] border border-sap-border px-2 py-1 rounded outline-none focus:border-sap-primary" />
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-3">Org Code</th>
                    <th className="p-3">Organization Name</th>
                    <th className="p-3">Sector</th>
                    <th className="p-3 text-right">Limit</th>
                    <th className="p-3 text-right">Prefund</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y">
                  {companies.map((c) => (
                    <tr key={c.id} className="sap-table-row hover:bg-blue-50/30 transition cursor-pointer group">
                      <td className="p-3 font-mono font-bold text-sap-primary">{c.code}</td>
                      <td className="p-3 font-semibold text-sap-text group-hover:text-sap-primary">{c.name}</td>
                      <td className="p-3 text-sap-text-secondary">{c.industry}</td>
                      <td className="p-3 text-right font-mono font-bold">${c.creditLimit.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-bold text-sap-info">${c.prefundBalance.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm border ${
                          c.status === 'Active' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 
                          'bg-amber-50 text-sap-warning border-amber-200'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeSubTab === 'Limits' || activeSubTab === 'Policies') && (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
            <i className="fa-solid fa-screwdriver-wrench text-5xl text-slate-200 mb-4"></i>
            <h3 className="text-lg font-bold text-slate-400">Governance & Limits Configuration</h3>
            <p className="text-xs text-slate-400 italic mt-1">This analytical module is being provisioned from the Cloud Template.</p>
          </div>
        )}
      </div>

      {/* SAP Onboarding Wizard Overlay */}
      {showWizard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-sap-shell/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Wizard Header */}
            <div className="bg-sap-shell p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold">New Organization Onboarding Wizard</h3>
                <p className="text-[10px] text-slate-300">Guided registration for enterprise partners</p>
              </div>
              <button onClick={() => setShowWizard(false)} className="text-slate-300 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex border-b border-sap-border">
              {[1, 2, 3].map(step => (
                <div key={step} className={`flex-1 p-3 flex flex-col items-center gap-1 border-b-4 transition-colors ${
                  wizardStep === step ? 'border-sap-primary' : 'border-transparent'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    wizardStep >= step ? 'bg-sap-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-tighter ${
                    wizardStep === step ? 'text-sap-primary' : 'text-slate-400'
                  }`}>
                    {step === 1 ? 'Identity' : step === 2 ? 'Treasury' : 'Review'}
                  </span>
                </div>
              ))}
            </div>

            {/* Wizard Body */}
            <div className="p-8 min-h-[300px]">
              {wizardStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Enterprise Legal Name</label>
                    <input 
                      type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="e.g. Amazon Logistics"
                      className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Industry Sector</label>
                      <select 
                        value={industry} onChange={e => setIndustry(e.target.value)}
                        className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                      >
                        <option>Logistics</option>
                        <option>Healthcare</option>
                        <option>Retail</option>
                        <option>Manufacturing</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-sap-text-secondary uppercase">System Code (Short)</label>
                      <input 
                        type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                        placeholder="AMZN"
                        className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Underwritten Credit Limit ($)</label>
                    <input 
                      type="number" value={creditLimit} onChange={e => setCreditLimit(Number(e.target.value))}
                      className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Primary Contact / Admin Email</label>
                    <input 
                      type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                      placeholder="treasury@partner.com"
                      className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    />
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded flex gap-3">
                    <i className="fa-solid fa-info-circle text-sap-info text-sm mt-0.5"></i>
                    <p className="text-[10px] text-blue-800 leading-relaxed italic">
                      Oracle Cloud connector will automatically provision a **Virtual Vault Account** upon completion. Credit lines are subject to quarterly review.
                    </p>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="bg-slate-50 p-4 border rounded space-y-2">
                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">Legal Entity:</span> <span className="font-bold">{name}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">System Code:</span> <span className="font-mono font-bold">{code}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">Industry:</span> <span className="font-bold">{industry}</span></div>
                    <div className="flex justify-between text-[11px] border-t pt-2"><span className="text-slate-500">Credit Limit:</span> <span className="font-mono font-bold text-sap-primary">${creditLimit.toLocaleString()}</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-slate-500">Virtual Vault:</span> <span className="font-mono italic">VAULT-{code}</span></div>
                  </div>
                  <div className="flex gap-2 p-2 items-center bg-amber-50 border border-amber-100 rounded">
                    <i className="fa-solid fa-gavel text-sap-warning text-xs"></i>
                    <p className="text-[9px] text-amber-800 uppercase font-bold">Awaiting secondary treasury sign-off</p>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Footer */}
            <div className="bg-slate-50 p-4 border-t border-sap-border flex justify-between items-center">
              <button 
                onClick={() => setWizardStep(s => s - 1)}
                disabled={wizardStep === 1}
                className="px-4 py-1.5 border border-sap-border rounded text-xs font-bold text-sap-text hover:bg-white disabled:opacity-50 transition"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {wizardStep < 3 ? (
                  <button 
                    onClick={() => setWizardStep(s => s + 1)}
                    disabled={!name || !code}
                    className="px-6 py-1.5 bg-sap-primary text-white rounded text-xs font-bold hover:bg-sap-primary/90 transition shadow-sm disabled:opacity-50"
                  >
                    Next Step
                  </button>
                ) : (
                  <button 
                    onClick={handleFinishWizard}
                    className="px-6 py-1.5 bg-sap-success text-white rounded text-xs font-bold hover:bg-emerald-700 transition shadow-sm"
                  >
                    Finish Onboarding
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
