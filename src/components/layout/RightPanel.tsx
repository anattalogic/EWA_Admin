import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function RightPanel() {
  const { bankAccounts, glAccounts, activityLogs, activeTab, toggleRightPanel } = useEwaStore();
  const [activeSubTab, setActiveSubTab] = useState<'guide' | 'accounting' | 'logs'>('guide');

  const prefundBalance = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;
  const receivableBalance = glAccounts.find(g => g.id === '1400')?.balance || 0;

  const getContextualHelp = () => {
    switch (activeTab) {
      case 'Dashboard':
        return {
          title: 'Liquidity Overview',
          description: 'Monitor real-time prefund availability vs. employee credit exposure. Ensure prefund vaults are topped up before peak payroll cycles.',
          actions: ['View Liquidity Forecast', 'Vault Transfer Protocol']
        };
      case 'Company Setup':
      case 'Companies':
        return {
          title: 'Organization Onboarding',
          description: 'Configure credit limits and fee policies for corporate partners. Note: Changes to credit lines require secondary treasury approval.',
          actions: ['Credit Policy Documentation', 'KYC Verification Guide']
        };
      case 'Employees Accrual':
        return {
          title: 'Employee Ledger & Risk',
          description: 'Overview of work logs, daily accrual wages, and specific employee KYC verification parameters. High tenure mitigates payout delay.',
          actions: ['Salary Cap Policies', 'Verification Criteria']
        };
      case 'EWA Requests':
        return {
          title: 'Disbursement Management',
          description: 'Review manual holds and risk alerts. Real-time payment (RTP) channels require active clearing house connectivity.',
          actions: ['Fraud Detection Rules', 'ACH Timing Matrix']
        };
      case 'General Ledger':
        return {
          title: 'Double-Entry Accounting',
          description: 'All system transactions follow balanced bookkeeping. Verify DR 1400 vs CR 1200 matches for the current period.',
          actions: ['GL Chart of Accounts', 'Trial Balance Guide']
        };
      case 'System Blueprint':
        return {
          title: 'Technical Blueprint Guide',
          description: 'Interactive documentation for full system design, Next.js architecture, and automated pro-rata repayment math calculations.',
          actions: ['Deployment Playbook', 'Myanmar Specs Translation']
        };
      default:
        return {
          title: 'System Resources',
          description: 'Welcome to the EWA Enterprise Finance Portal. Access documentation and system health metrics here.',
          actions: ['User Manual', 'API Documentation']
        };
    }
  };

  const help = getContextualHelp();

  return (
    <aside className="w-80 border-l border-slate-200 bg-white p-4 shrink-0 flex flex-col overflow-hidden h-full shadow-lg relative z-40 transition-all duration-300">
      
      {/* Header with Close Button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-150 shrink-0">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-blue-600 text-sm"></i>
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">Treasury Co-Pilot</span>
        </div>
        <button 
          onClick={toggleRightPanel} 
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition" 
          title="Close Panel"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>

      {/* Interactive Subtabs inside the right panel */}
      <div className="flex bg-slate-100 p-1 rounded-md my-3 shrink-0">
        {[
          { id: 'guide', label: 'Guide', icon: 'fa-circle-info' },
          { id: 'accounting', label: 'Ledger', icon: 'fa-scale-balanced' },
          { id: 'logs', label: 'Activity', icon: 'fa-clock-rotate-left' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold uppercase tracking-tight rounded transition-all ${
              activeSubTab === t.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid ${t.icon} text-xs`}></i>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 min-h-0">
        
        {/* TAB 1: CO-PILOT HELP */}
        {activeSubTab === 'guide' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-3">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-book-bookmark text-blue-600 text-xs"></i>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contextual Guide</span>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900">{help.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed text-slate-500 italic">
                  {help.description}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Interactive Manuals</span>
              <div className="space-y-1.5">
                {help.actions.map((action, i) => (
                  <button key={i} className="w-full text-left p-2 text-[10px] text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 hover:border-slate-300 transition flex items-center justify-between font-medium">
                    <span>{action}</span>
                    <i className="fa-solid fa-chevron-right text-[8px] text-slate-400"></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-2.5">
              <i className="fa-solid fa-circle-nodes text-blue-500 text-xs mt-0.5"></i>
              <div className="text-[10px] text-blue-800 leading-normal font-medium">
                <strong>Active SAP integration</strong>
                <p className="mt-1 text-slate-500 font-normal">Real-time ledger entries are mirrored to Oracle Cloud at 00:00 UTC.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOUBLE-ENTRY ACCOUNTING MATRIX */}
        {activeSubTab === 'accounting' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Active Accounting Equation</span>
              <div className="bg-slate-950 rounded-lg p-3 text-xs font-mono space-y-3 text-slate-300 shadow-inner">
                <div className="border-b border-slate-800 pb-1.5 text-[9px] text-slate-500 uppercase font-bold flex justify-between">
                  <span>GL Chart Account</span>
                  <span>Balance</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">DR 1400 Receivables</span>
                  <span className="text-emerald-400 font-bold">${receivableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between items-center pl-3">
                  <span className="text-slate-500">CR 1200 Prefund Vault</span>
                  <span className="text-rose-400 font-bold">(${prefundBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })})</span>
                </div>

                <div className="border-t border-slate-800 pt-1.5 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Status Verification:</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-[8px]"></i>
                    Balanced
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[10px] text-amber-900 space-y-1.5 leading-normal font-medium">
              <div className="flex items-center gap-1.5">
                <i className="fa-solid fa-triangle-exclamation text-amber-600"></i>
                <span className="font-bold">Liquidity Warning Threshold</span>
              </div>
              <p className="text-slate-600 font-normal">
                If the combined prefund cash pools drop below 15% of active corporate lines, automated disbursements will trigger temporary holds.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: PLATFORM ACTIVITY FEED */}
        {activeSubTab === 'logs' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Platform Audit Streams</span>
            <div className="space-y-2.5">
              {activityLogs.map((act, index) => {
                const colors = {
                  success: 'border-emerald-500 text-emerald-700 bg-emerald-50/40',
                  warning: 'border-amber-500 text-amber-700 bg-amber-50/40',
                  error: 'border-rose-500 text-rose-700 bg-rose-50/40',
                  info: 'border-blue-500 text-blue-700 bg-blue-50/40'
                };
                const col = colors[act.type] || colors.info;
                return (
                  <div key={index} className={`border-l-3 pl-2.5 py-1.5 pr-2 rounded-r-md border-y border-r border-slate-100 ${col}`}>
                    <div className="text-[10px] font-bold leading-tight">{act.title}</div>
                    <div className="text-[9px] text-slate-500 leading-relaxed mt-0.5">{act.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Footer Info inside Right Panel */}
      <div className="pt-2.5 border-t border-slate-150 shrink-0 text-center text-[9px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
        <i className="fa-solid fa-shield-halved text-slate-300"></i>
        <span>SOC2 Secure Environment</span>
      </div>

    </aside>
  );
}
