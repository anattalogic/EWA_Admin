import React from 'react';
import { useEwaStore } from '../../app/store';

export function DisbursementModule() {
  const { transactions, bankAccounts, disburseTransaction } = useEwaStore();

  const approvedList = transactions.filter(t => t.status === 'Approved');
  const disbursedList = transactions.filter(t => t.status === 'Disbursed');

  const totalOutstandingPrefund = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Treasury Disbursement</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Direct Treasury Disbursement</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Treasury account liquidity overview */}
        <div className="bg-slate-900 text-white p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Custodial Vault Limit</div>
            <div className="text-2xl font-mono font-bold text-blue-400 mt-2">${totalOutstandingPrefund.toLocaleString()}</div>
            <p className="text-[11px] text-slate-400 mt-2">SVB FedNow & Real-time liquidity threshold</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Channel Status:</span>
            <span className="text-emerald-400 font-bold"><i className="fa-solid fa-circle mr-1 text-[10px]"></i> ACTIVE</span>
          </div>
        </div>

        {/* Dynamic pending release card */}
        <div className="bg-white p-5 border rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Awaiting Direct Release</div>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {approvedList.length} <span className="text-xs text-slate-400 font-normal">transactions</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Sum Total: ${approvedList.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
            <button 
              onClick={() => {
                approvedList.forEach(t => disburseTransaction(t.id, 'Alex Chen'));
              }}
              disabled={approvedList.length === 0}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold rounded-md text-xs transition"
            >
              <i className="fa-solid fa-bolt mr-1.5"></i>
              Batch Release All
            </button>
          </div>
        </div>

        {/* Disbursed totals card */}
        <div className="bg-white p-5 border rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Completed Disbursements</div>
            <div className="text-2xl font-mono font-bold text-indigo-600 mt-2">
              {disbursedList.length} <span className="text-xs text-slate-400 font-normal">transactions</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Total Cleared: ${disbursedList.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
          </div>
          <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100 flex justify-between">
            <span>Average cleared time:</span>
            <span className="font-bold">4.2 ms (Instant FedNow)</span>
          </div>
        </div>

      </div>

      {/* Main Queue Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Approved Batches Pending ACH Execution */}
        <div className="bg-white border rounded-lg shadow-sm flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Approved Queued Releases</h3>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
              {approvedList.length} Batches
            </span>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {approvedList.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                <i className="fa-solid fa-ban text-2xl text-slate-300 block mb-2"></i>
                All clear! No disbursements awaiting release.
              </div>
            ) : (
              approvedList.map(t => (
                <div key={t.id} className="p-4 hover:bg-slate-50/50 transition flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.employeeName}</div>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                      <span className="font-mono text-blue-600">{t.id}</span>
                      <span>•</span>
                      <span>Channel: {t.channel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-slate-900">${t.amount.toFixed(2)}</div>
                      <div className="text-[9px] text-slate-400">Net: ${t.netDisbursed.toFixed(2)}</div>
                    </div>
                    <button 
                      onClick={() => disburseTransaction(t.id, 'Alex Chen')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition shadow-sm"
                    >
                      Process Transfer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Historical Cleared Batches Logs */}
        <div className="bg-white border rounded-lg shadow-sm flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Completed Direct Deposits</h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
              {disbursedList.length} Cleared
            </span>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {disbursedList.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No disbursements posted in the current system context.
              </div>
            ) : (
              disbursedList.map(t => (
                <div key={t.id} className="p-4 hover:bg-slate-50/50 transition flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.employeeName}</div>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                      <span className="font-mono text-blue-600">{t.id}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold"><i className="fa-solid fa-circle-check mr-0.5"></i> Posted GL</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-slate-950">${t.amount.toFixed(2)}</div>
                    <div className="text-[9px] text-slate-400">Disbursed net: ${t.netDisbursed.toFixed(2)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
