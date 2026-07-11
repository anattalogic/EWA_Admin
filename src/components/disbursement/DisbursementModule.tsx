import React from 'react';
import { useEwaStore } from '../../app/store';

export function DisbursementModule() {
  const { transactions, bankAccounts, disburseTransaction } = useEwaStore();

  const approvedList = transactions.filter(t => t.status === 'Approved');
  const disbursedList = transactions.filter(t => t.status === 'Disbursed');

  const totalOutstandingPrefund = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Treasury Ops</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Direct Disbursement</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Treasury Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-sap-shell text-white p-5 rounded-sm border border-sap-shell flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <i className="fa-solid fa-vault text-6xl"></i>
            </div>
            <div className="relative z-10">
              <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Custodial Liquidity Limit</div>
              <div className="text-2xl font-mono font-bold text-blue-300 mt-2">${totalOutstandingPrefund.toLocaleString()}</div>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Real-time FedNow protocol Active</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-[10px] font-bold uppercase tracking-widest relative z-10">
              <span className="text-slate-400">Vault Status:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                ACTIVE PROTOCOL
              </span>
            </div>
          </div>

          <div className="sap-card p-5 flex flex-col justify-between group">
            <div>
              <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest">Awaiting Direct Release</div>
              <div className="text-2xl font-mono font-bold text-sap-text mt-2">
                {approvedList.length} <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest">Batches</span>
              </div>
              <p className="text-[10px] text-sap-text-secondary mt-2 font-bold uppercase tracking-tighter">
                Exposure: ${approvedList.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-sap-border flex gap-2">
              <button 
                onClick={() => {
                  approvedList.forEach(t => disburseTransaction(t.id, 'Alex Chen'));
                }}
                disabled={approvedList.length === 0}
                className="w-full py-2 bg-sap-primary hover:bg-sap-primary/90 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-sm text-[11px] uppercase tracking-widest transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bolt-lightning"></i>
                Batch Release Master
              </button>
            </div>
          </div>

          <div className="sap-card p-5 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest">Finalized Disbursements</div>
              <div className="text-2xl font-mono font-bold text-sap-primary mt-2">
                {disbursedList.length} <span className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest">Batches</span>
              </div>
              <p className="text-[10px] text-sap-text-secondary mt-2 font-bold uppercase tracking-tighter">
                Cleared: ${disbursedList.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-sap-border flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-sap-text-secondary">Network Latency:</span>
              <span className="text-sap-success">0.4ms (FedNow)</span>
            </div>
          </div>
        </div>

        {/* Queues */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="sap-card flex flex-col overflow-hidden">
            <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Approved Batch Queue</h3>
              <span className="text-[10px] bg-blue-50 text-sap-primary border border-blue-200 font-bold px-2 py-0.5 rounded-sm">
                {approvedList.length} QUEUED
              </span>
            </div>
            <div className="divide-y max-h-[400px] overflow-y-auto">
              {approvedList.length === 0 ? (
                <div className="p-12 text-center text-sap-text-secondary text-[11px] font-bold uppercase tracking-widest">
                  <i className="fa-solid fa-check-double text-3xl text-slate-200 block mb-3"></i>
                  Zero pending releases
                </div>
              ) : (
                approvedList.map(t => (
                  <div key={t.id} className="p-4 hover:bg-blue-50/30 transition flex justify-between items-center group">
                    <div>
                      <div className="font-bold text-[11px] text-sap-text uppercase tracking-tight">{t.employeeName}</div>
                      <div className="text-[10px] text-sap-text-secondary mt-1 flex items-center gap-2 font-mono font-bold">
                        <span className="text-sap-primary">TX-{t.id}</span>
                        <span className="opacity-30">•</span>
                        <span>NET {t.channel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-mono font-bold text-[11px] text-sap-text">${t.amount.toFixed(2)}</div>
                        <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-tighter">NET: ${t.netDisbursed.toFixed(2)}</div>
                      </div>
                      <button 
                        onClick={() => disburseTransaction(t.id, 'Alex Chen')}
                        className="px-3 py-1.5 bg-sap-primary hover:bg-sap-primary/90 text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition opacity-0 group-hover:opacity-100 shadow-sm"
                      >
                        Release
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="sap-card flex flex-col overflow-hidden">
            <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight">Direct Deposit Logs</h3>
              <span className="text-[10px] bg-emerald-50 text-sap-success border border-emerald-200 font-bold px-2 py-0.5 rounded-sm">
                {disbursedList.length} POSTED
              </span>
            </div>
            <div className="divide-y max-h-[400px] overflow-y-auto">
              {disbursedList.length === 0 ? (
                <div className="p-12 text-center text-sap-text-secondary text-[11px] font-bold uppercase tracking-widest">
                  Zero historical records in this session
                </div>
              ) : (
                disbursedList.map(t => (
                  <div key={t.id} className="p-4 hover:bg-slate-50/50 transition flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[11px] text-sap-text uppercase tracking-tight">{t.employeeName}</div>
                      <div className="text-[10px] text-sap-text-secondary mt-1 flex items-center gap-2 font-mono font-bold">
                        <span className="text-sap-primary">TX-{t.id}</span>
                        <span className="opacity-30">•</span>
                        <span className="text-sap-success"><i className="fa-solid fa-circle-check mr-1"></i>POSTED</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-[11px] text-sap-text">${t.amount.toFixed(2)}</div>
                      <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-tighter">CLEARED NET: ${t.netDisbursed.toFixed(2)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
