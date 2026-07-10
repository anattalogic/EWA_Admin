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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Disbursement Queue</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">EWA Request Queue</h1>
        </div>
        <button 
          onClick={() => setShowSimulateModal(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-bold shadow-sm hover:bg-slate-800 transition"
        >
          <i className="fa-solid fa-wand-magic-sparkles mr-1.5 text-blue-400 animate-pulse"></i>
          Simulate EWA Request
        </button>
      </div>

      {/* Filter Tabs strip */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        {(['All', 'Pending', 'Approved', 'Hold', 'Disbursed', 'Rejected'] as const).map(f => {
          const count = f === 'All' ? transactions.length : transactions.filter(t => t.status === f).length;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition relative ${
                activeFilter === f ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Request Queue Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Employee</th>
                <th className="p-3">Enterprise Client</th>
                <th className="p-3 text-right">Advance amount</th>
                <th className="p-3 text-right">Yield Fee / Net</th>
                <th className="p-3">Validation Matrix</th>
                <th className="p-3">Risk Rating</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y">
              {filteredTxns.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-slate-400">
                    <i className="fa-regular fa-folder-open text-3xl text-slate-300 block mb-2"></i>
                    No transactions matched the selected queue filter.
                  </td>
                </tr>
              ) : (
                filteredTxns.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-3 font-mono font-bold text-blue-600">
                      <div>{t.id}</div>
                      <div className="text-[9px] text-slate-400 font-normal">{new Date(t.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{t.employeeName}</td>
                    <td className="p-3 text-slate-600">{t.companyName}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">${t.amount.toFixed(2)}</td>
                    <td className="p-3 text-right font-mono">
                      <div className="font-bold text-slate-700">${t.netDisbursed.toFixed(2)}</div>
                      <div className="text-[9px] text-emerald-700 font-semibold">Fee: ${t.feeAmount.toFixed(2)}</div>
                    </td>
                    
                    {/* Validation Check Matrix Icons */}
                    <td className="p-3">
                      <div className="flex gap-1.5">
                        <span 
                          title="Tenure Check" 
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            t.verificationDetails.tenureCheck ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}
                        >
                          T
                        </span>
                        <span 
                          title="Budget Reserve Check" 
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            t.verificationDetails.budgetCheck ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}
                        >
                          B
                        </span>
                        <span 
                          title="Identity KYC Check" 
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            t.verificationDetails.kycCheck ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}
                        >
                          K
                        </span>
                        <span 
                          title="Duplicate Submission Check" 
                          className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                            t.verificationDetails.duplicateCheck ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}
                        >
                          D
                        </span>
                      </div>
                    </td>

                    {/* Risk Rating Indicator */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shrink-0">
                          <div 
                            className={`h-full rounded-full ${
                              t.riskLevel === 'Low' ? 'bg-emerald-500' : 
                              t.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${t.riskScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          t.riskLevel === 'Low' ? 'text-emerald-700' : 
                          t.riskLevel === 'Medium' ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {t.riskLevel} ({t.riskScore})
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                        t.status === 'Disbursed' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                        t.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 
                        t.status === 'Hold' ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse' : 
                        t.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 text-right">
                      <div className="flex gap-1 justify-end">
                        {t.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => approveTransaction(t.id, 'Alex Chen')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition"
                              title="Approve & Clear"
                            >
                              <i className="fa-solid fa-check"></i>
                            </button>
                            <button 
                              onClick={() => holdTransaction(t.id, 'Alex Chen')}
                              className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[10px] font-bold transition"
                              title="Place Hold"
                            >
                              <i className="fa-solid fa-pause"></i>
                            </button>
                            <button 
                              onClick={() => rejectTransaction(t.id, 'Alex Chen')}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold transition"
                              title="Reject"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </>
                        )}
                        {t.status === 'Hold' && (
                          <button 
                            onClick={() => approveTransaction(t.id, 'Alex Chen')}
                            className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold transition"
                          >
                            Release Hold
                          </button>
                        )}
                        {t.status === 'Approved' && (
                          <button 
                            onClick={() => disburseTransaction(t.id, 'Alex Chen')}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[10px] font-bold transition"
                          >
                            <i className="fa-solid fa-paper-plane mr-1"></i>
                            Disburse Funds
                          </button>
                        )}
                        {t.status === 'Disbursed' && (
                          <span className="text-slate-400 text-[10px] italic">
                            <i className="fa-solid fa-circle-check mr-1 text-emerald-500"></i>
                            Disbursed
                          </span>
                        )}
                        {t.status === 'Rejected' && (
                          <span className="text-rose-600 text-[10px] font-bold">Rejected</span>
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

      {/* Simulator Modal Dial */}
      {showSimulateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden border shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold tracking-tight text-sm uppercase">Simulate Employee EWA Request</h3>
              <button onClick={() => setShowSimulateModal(false)} className="text-slate-400 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleSimulateRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Active Employee</label>
                <select 
                  value={selectedEmployeeId} 
                  onChange={e => setSelectedEmployeeId(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-md"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} (Accrued: ${emp.accruedWages} | Avail: ${emp.ewaAvailable})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Withdrawal Amount ($)</label>
                <input 
                  type="number" 
                  value={requestAmount} 
                  onChange={e => setRequestAmount(Number(e.target.value))}
                  className="w-full text-xs p-2 border rounded-md font-mono"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">Rule engine will validate this against corporate limits & employee availability.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Disbursement Channel</label>
                <select 
                  value={channel} 
                  onChange={e => setChannel(e.target.value as any)}
                  className="w-full text-xs p-2 border rounded-md"
                >
                  <option value="Instant ACH">Instant ACH (Clears in 5 mins)</option>
                  <option value="Same-Day ACH">Same-Day ACH (Clears in 4 hours)</option>
                  <option value="Real-Time Payment">Real-Time Payment (Clears instantly)</option>
                </select>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 border rounded-md text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700"
                >
                  Submit Simulated Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
