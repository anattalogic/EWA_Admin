import React, { useState, useRef, useEffect } from 'react';
import { useEwaStore } from '../../app/store';

export function RightPanel() {
  const { bankAccounts, glAccounts, activityLogs, activeTab } = useEwaStore();

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
      case 'Companies':
        return {
          title: 'Organization Onboarding',
          description: 'Configure credit limits and fee policies for corporate partners. Note: Changes to credit lines require secondary treasury approval.',
          actions: ['Credit Policy Documentation', 'KYC Verification Guide']
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
    <aside className="w-64 border-l border-slate-200 bg-slate-50 p-4 shrink-0 flex flex-col justify-between overflow-y-auto space-y-6 h-full">
      
      {/* Top section: double-entry real-time visual monitor */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Double-Entry Preview</h3>
        <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono space-y-2 text-slate-300">
          <div className="border-b border-slate-700 pb-1.5 text-[9px] text-slate-500 uppercase font-bold">Current Platform Totals</div>
          
          <div className="flex justify-between items-center">
            <span>DR Receivables (1400)</span>
            <span className="text-emerald-400 font-bold">${receivableBalance.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pl-4 text-slate-400">
            <span>CR Prefund Vault (1200)</span>
            <span className="text-rose-400 font-bold">(${prefundBalance.toLocaleString()})</span>
          </div>
        </div>
      </section>

      {/* Central section: Knowledge Center & Wizard */}
      <section className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
        <div className="flex items-center gap-2 pb-2 border-b">
          <i className="fa-solid fa-book-bookmark text-blue-600 text-sm"></i>
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Knowledge Center</span>
        </div>

        <div className="py-3 space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-900">{help.title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              {help.description}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Helpful Resources</span>
            <div className="space-y-1.5">
              {help.actions.map((action, i) => (
                <button key={i} className="w-full text-left p-1.5 text-[10px] text-slate-600 bg-slate-50 border border-slate-200 rounded hover:bg-slate-100 transition flex items-center justify-between">
                  {action}
                  <i className="fa-solid fa-chevron-right text-[8px] text-slate-400"></i>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="bg-blue-50 border border-blue-100 rounded p-2 flex gap-2">
              <i className="fa-solid fa-circle-info text-blue-400 text-xs mt-0.5"></i>
              <div className="text-[9px] text-blue-800 leading-tight">
                <strong>Oracle/SAP Integration</strong>
                <p className="mt-1">Cloud connectors are active. Batch sync happens at 00:00 UTC.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom section: Active Activities logs */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Activity Feed</h3>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {activityLogs.slice(0, 3).map((act, index) => (
            <div key={index} className="flex gap-2 text-[10px] items-start border-l-2 pl-2 border-slate-300">
              <div className="flex-1">
                <div className="font-bold text-slate-800">{act.title}</div>
                <div className="text-slate-500 leading-snug">{act.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </aside>
  );
}
