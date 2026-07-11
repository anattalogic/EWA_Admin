import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function RequestModule() {
  const { 
    transactions, 
    employees, 
    createEwaRequest, 
    approveTransaction, 
    rejectTransaction, 
    holdTransaction,
    disburseTransaction 
  } = useEwaStore();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected' | 'Hold' | 'Disbursed'>('All');
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0]?.id || '');
  const [requestAmount, setRequestAmount] = useState(150);
  const [channel, setChannel] = useState<'Instant ACH' | 'Same-Day ACH' | 'Real-Time Payment'>('Instant ACH');

  const handleSimulateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId) return;

    createEwaRequest(selectedEmployeeId, Number(requestAmount), channel);
    setShowSimulateModal(false);
  };

  const filteredTxns = transactions.filter(t => {
    if (activeFilter === 'All') return true;
    return t.status === activeFilter;
  });

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Treasury Ops</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Advance Requests</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Request Queue</h1>
        </div>
        <button 
          onClick={() => setShowSimulateModal(true)}
          className="px-4 py-1.5 bg-sap-shell text-white rounded text-xs font-bold hover:bg-sap-shell/90 transition shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-blue-300"></i>
          Simulate Request
        </button>
      </div>

      {/* Filter Tabs strip */}
      <div className="bg-white border-b border-sap-border px-6 flex gap-1 overflow-x-auto shrink-0">
        {(['All', 'Pending', 'Approved', 'Hold', 'Disbursed', 'Rejected'] as const).map(f => {
          const count = f === 'All' ? transactions.length : transactions.filter(t => t.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition relative whitespace-nowrap ${
                activeFilter === f ? 'text-sap-primary border-b-2 border-sap-primary' : 'text-sap-text-secondary hover:text-sap-text'
              }`}
            >
              {f} <span className="ml-1 opacity-50">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Request Queue Table */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="sap-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                  <th className="p-4">Transaction Object</th>
                  <th className="p-4">Enterprise Personnel</th>
                  <th className="p-4 text-right">Principal ($)</th>
                  <th className="p-4 text-right">Yield Net ($)</th>
                  <th className="p-4">Audit Matrix</th>
                  <th className="p-4">Risk Scoping</th>
                  <th className="p-4 text-center">Lifecycle</th>
                  <th className="p-4 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="text-[11px] divide-y">
                {filteredTxns.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-20 text-center">
                      <div className="max-w-xs mx-auto">
                        <i className="fa-regular fa-folder-open text-4xl text-slate-200 block mb-4"></i>
                        <p className="text-[11px] font-bold text-sap-text-secondary uppercase tracking-widest">
                          Queue is empty for selected filter
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTxns.map(t => (
                    <tr key={t.id} className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                      <td className="p-4">
                        <div className="font-mono font-bold text-sap-primary uppercase tracking-tighter">TX-{t.id}</div>
                        <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest mt-1">
                          {new Date(t.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {t.channel}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-sap-text group-hover:text-sap-primary transition font-sans">{t.employeeName}</div>
                        <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest">{t.companyName}</div>
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-sap-text">${t.amount.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono">
                        <div className="font-bold text-sap-text">${t.netDisbursed.toFixed(2)}</div>
                        <div className="text-[9px] text-sap-success font-bold uppercase tracking-tighter">Yield: ${t.feeAmount.toFixed(2)}</div>
                      </td>
                      
                      {/* Validation Check Matrix Icons */}
                      <td className="p-4">
                        <div className="flex gap-1">
                          {([
                            { label: 'T', title: 'Tenure', check: t.verificationDetails.tenureCheck },
                            { label: 'B', title: 'Budget', check: t.verificationDetails.budgetCheck },
                            { label: 'K', title: 'KYC', check: t.verificationDetails.kycCheck },
                            { label: 'D', title: 'Duplicate', check: t.verificationDetails.duplicateCheck },
                          ]).map(icon => (
                            <span 
                              key={icon.label}
                              title={icon.title} 
                              className={`w-5 h-5 rounded-sm flex items-center justify-center text-[9px] font-bold border transition-colors ${
                                icon.check ? 'bg-emerald-50 text-sap-success border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
                              }`}
                            >
                              {icon.label}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Risk Rating Indicator */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0 border border-slate-200">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                t.riskLevel === 'Low' ? 'bg-sap-success' : 
                                t.riskLevel === 'Medium' ? 'bg-sap-warning' : 'bg-red-500'
                              }`}
                              style={{ width: `${t.riskScore}%` }}
                            ></div>
                          </div>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${
                            t.riskLevel === 'Low' ? 'text-sap-success' : 
                            t.riskLevel === 'Medium' ? 'text-sap-warning' : 'text-red-700'
                          }`}>
                            {t.riskLevel}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm border ${
                          t.status === 'Disbursed' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          t.status === 'Approved' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 
                          t.status === 'Hold' ? 'bg-amber-50 text-sap-warning border-amber-200 animate-pulse' : 
                          t.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {t.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="p-4 text-right">
                        <div className="flex gap-1 justify-end">
                          {t.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => approveTransaction(t.id, 'Alex Chen')}
                                className="w-7 h-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-[10px] font-bold transition flex items-center justify-center shadow-sm"
                                title="Approve & Clear"
                              >
                                <i className="fa-solid fa-check"></i>
                              </button>
                              <button 
                                onClick={() => holdTransaction(t.id, 'Alex Chen')}
                                className="w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded-sm text-[10px] font-bold transition flex items-center justify-center shadow-sm"
                                title="Place Hold"
                              >
                                <i className="fa-solid fa-pause"></i>
                              </button>
                              <button 
                                onClick={() => rejectTransaction(t.id, 'Alex Chen')}
                                className="w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-sm text-[10px] font-bold transition flex items-center justify-center shadow-sm"
                                title="Reject"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </>
                          )}
                          {t.status === 'Hold' && (
                            <button 
                              onClick={() => approveTransaction(t.id, 'Alex Chen')}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition shadow-sm"
                            >
                              Release
                            </button>
                          )}
                          {t.status === 'Approved' && (
                            <button 
                              onClick={() => disburseTransaction(t.id, 'Alex Chen')}
                              className="px-3 py-1 bg-sap-primary hover:bg-sap-primary/90 text-white rounded-sm text-[10px] font-bold uppercase tracking-widest transition shadow-sm flex items-center gap-2"
                            >
                              <i className="fa-solid fa-paper-plane"></i>
                              Disburse
                            </button>
                          )}
                          {t.status === 'Disbursed' && (
                            <span className="text-sap-success text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                              <i className="fa-solid fa-circle-check"></i>
                              Posted
                            </span>
                          )}
                          {t.status === 'Rejected' && (
                            <span className="text-red-600 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                              <i className="fa-solid fa-circle-xmark"></i>
                              Failed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Simulator Modal Dial */}
      {showSimulateModal && (
        <div className="fixed inset-0 bg-sap-shell/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full overflow-hidden border border-sap-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-sap-shell text-white flex justify-between items-center border-b border-white/10">
              <h3 className="font-bold tracking-widest text-[11px] uppercase">EWA Request Protocol Simulation</h3>
              <button onClick={() => setShowSimulateModal(false)} className="text-white/60 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleSimulateRequest} className="p-6 space-y-5 bg-sap-background/30">
              <div>
                <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Personnel Identifier</label>
                <select 
                  value={selectedEmployeeId} 
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                  className="w-full text-[11px] p-2.5 border border-sap-border bg-white rounded-sm font-bold text-sap-text focus:ring-1 focus:ring-sap-primary outline-none"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} (Accrued: ${emp.accruedWages} | Avail: ${emp.ewaAvailable})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Withdrawal Principal ($)</label>
                <input 
                  type="number" 
                  value={requestAmount} 
                  onChange={e => setRequestAmount(Number(e.target.value))}
                  className="w-full text-[11px] p-2.5 border border-sap-border bg-white rounded-sm font-mono font-bold text-sap-text focus:ring-1 focus:ring-sap-primary outline-none"
                  required
                />
                <p className="text-[9px] text-sap-text-secondary mt-1.5 font-bold uppercase tracking-tighter italic">Risk engine will evaluate against enterprise guardrails.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Network Channel</label>
                <select 
                  value={channel} 
                  onChange={e => setChannel(e.target.value as any)}
                  className="w-full text-[11px] p-2.5 border border-sap-border bg-white rounded-sm font-bold text-sap-text focus:ring-1 focus:ring-sap-primary outline-none"
                >
                  <option value="Instant ACH">Instant ACH (Clears in 5 mins)</option>
                  <option value="Same-Day ACH">Same-Day ACH (Clears in 4 hours)</option>
                  <option value="Real-Time Payment">Real-Time Payment (Clears instantly)</option>
                </select>
              </div>

              <div className="pt-5 border-t border-sap-border flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowSimulateModal(false)}
                  className="px-5 py-2 border border-sap-border bg-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition text-sap-text"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-sap-primary text-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-sap-primary/90 transition shadow-sm"
                >
                  Post Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
