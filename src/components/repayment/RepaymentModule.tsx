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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Finance</span>
            <span>/</span>
            <span className="text-blue-600">Payroll Repayment matching</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Payroll Collections Matching</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Step panel left */}
        <div className="bg-white p-5 border rounded-lg shadow-sm lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Enterprise Partner</h3>
          <p className="text-xs text-slate-400">Match employee wage deductions from company payroll files to clear our open receivables ledger.</p>
          
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company Partner</label>
            <select 
              value={selectedCompanyId} 
              onChange={e => setSelectedCompanyId(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border rounded-md"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>

          <div className="bg-slate-50 p-3 rounded border text-xs">
            <div className="font-bold text-slate-800 mb-1">Deduction Summary:</div>
            <div className="flex justify-between py-1 border-b">
              <span>Employees with balances:</span>
              <span className="font-bold">{outstandingEmployees.length}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Open Receivables Total:</span>
              <span className="font-bold text-red-600">${outstandingEmployees.reduce((sum, e) => sum + e.outstanding, 0).toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handleSimulatePayrollRepayment}
            disabled={outstandingEmployees.length === 0}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-md text-xs font-bold transition shadow-sm"
          >
            <i className="fa-solid fa-file-invoice-dollar mr-1.5"></i>
            Post Payroll Deductions
          </button>
        </div>

        {/* Outstanding balances table right */}
        <div className="bg-white border rounded-lg shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Open Advances under {currentCompName}</h3>
            <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2.5 py-0.5 rounded">
              Awaiting Collections
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                  <th className="p-3">Employee</th>
                  <th className="p-3">Employee Role</th>
                  <th className="p-3 text-right">EWA Drawn Balances</th>
                  <th className="p-3 text-right">Deduction Match</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y">
                {outstandingEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400">
                      <i className="fa-regular fa-face-smile text-3xl text-slate-300 block mb-2"></i>
                      All employees for this corporate partner have paid back their EWA advances. Perfect state parity!
                    </td>
                  </tr>
                ) : (
                  outstandingEmployees.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</div>
                        <div className="text-[9px] text-slate-400">ID: {emp.id}</div>
                      </td>
                      <td className="p-3 text-slate-500">{emp.role}</td>
                      <td className="p-3 text-right font-mono font-bold text-red-600">${emp.outstanding.toFixed(2)}</td>
                      <td className="p-3 text-right font-mono text-emerald-700 font-bold">${emp.outstanding.toFixed(2)}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold uppercase rounded-full">
                          Open Receivable
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
  );
}
