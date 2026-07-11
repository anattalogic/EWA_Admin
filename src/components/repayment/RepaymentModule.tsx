import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function RepaymentModule() {
  const { employees, companies, importPayrollRepayment } = useEwaStore();
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || 'C-001');

  // Find employees for selected company with outstanding balances
  const outstandingEmployees = employees.filter(e => e.companyId === selectedCompanyId && e.outstanding > 0);

  const handleSimulatePayrollRepayment = () => {
    if (outstandingEmployees.length === 0) return;

    // Simulate payroll matching
    const repayments = outstandingEmployees.map(e => ({
      employeeId: e.id,
      amountPaid: e.outstanding
    }));

    importPayrollRepayment(selectedCompanyId, repayments);
  };

  const currentCompName = companies.find(c => c.id === selectedCompanyId)?.name || '';

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Finance Control</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Repayment Matching</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Payroll Collections</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Controls */}
          <div className="sap-card p-6 lg:col-span-1 space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Enterprise Selection</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Company Partner</label>
                <select 
                  value={selectedCompanyId} 
                  onChange={e => setSelectedCompanyId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-sap-border rounded-sm font-bold text-sap-text focus:ring-1 focus:ring-sap-primary focus:border-sap-primary transition outline-none"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-sm border border-sap-border space-y-3">
                <div className="text-[10px] font-bold text-sap-text uppercase tracking-widest border-b border-sap-border/10 pb-1.5">Deduction Protocol</div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">Active Balances:</span>
                  <span className="text-[12px] font-mono font-bold text-sap-text">{outstandingEmployees.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">Open AR:</span>
                  <span className="text-[12px] font-mono font-bold text-red-600">${outstandingEmployees.reduce((sum, e) => sum + e.outstanding, 0).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSimulatePayrollRepayment}
                disabled={outstandingEmployees.length === 0}
                className="w-full py-2.5 bg-sap-primary hover:bg-sap-primary/90 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-sm text-[11px] font-bold uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-file-invoice-dollar"></i>
                Post Collections
              </button>
            </div>

            <div className="pt-4 border-t border-sap-border">
              <p className="text-[10px] text-sap-text-secondary italic leading-relaxed">
                <i className="fa-solid fa-circle-info mr-1 text-sap-info"></i>
                Matching EWA advances against imported payroll deduction logs. This clears GL open items across both assets and liabilities.
              </p>
            </div>
          </div>

          {/* Records Table */}
          <div className="sap-card lg:col-span-2 flex flex-col overflow-hidden bg-white">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">Outstanding AR under {currentCompName}</h3>
              <span className="text-[10px] bg-red-50 text-sap-warning border border-amber-200 font-bold px-2 py-0.5 rounded-sm">
                AWAITING COLLECTIONS
              </span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                    <th className="p-4">Personnel</th>
                    <th className="p-4">Org Unit Role</th>
                    <th className="p-4 text-right">EWA Principal ($)</th>
                    <th className="p-4 text-right">Match Amount ($)</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] divide-y">
                  {outstandingEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-20 text-center">
                        <div className="max-w-xs mx-auto">
                          <i className="fa-solid fa-certificate text-4xl text-emerald-200 block mb-4"></i>
                          <div className="font-bold text-sap-text uppercase tracking-widest text-[12px] mb-2">Ledger Parity Achieved</div>
                          <p className="text-sap-text-secondary font-bold uppercase tracking-tighter text-[10px]">
                            All employee EWA obligations for this entity have been matched and cleared.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    outstandingEmployees.map(emp => (
                      <tr key={emp.id} className="sap-table-row hover:bg-blue-50/30 transition group cursor-pointer">
                        <td className="p-4">
                          <div className="font-bold text-sap-text group-hover:text-sap-primary transition">{emp.firstName} {emp.lastName}</div>
                          <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest font-mono">ID: {emp.id}</div>
                        </td>
                        <td className="p-4 text-sap-text-secondary font-bold uppercase tracking-tighter">{emp.role}</td>
                        <td className="p-4 text-right font-mono font-bold text-red-600">${emp.outstanding.toFixed(2)}</td>
                        <td className="p-4 text-right font-mono text-sap-success font-bold">${emp.outstanding.toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <span className="px-2 py-0.5 bg-amber-50 text-sap-warning border border-amber-200 text-[9px] font-bold uppercase rounded-sm">
                            OPEN AR
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
