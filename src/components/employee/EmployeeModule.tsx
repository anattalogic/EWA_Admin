import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function EmployeeModule() {
  const { employees, companies, addEmployee } = useEwaStore();
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New employee state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState(companies[0]?.id || 'C-001');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState(5000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [tenureMonths, setTenureMonths] = useState(12);
  const [bankName, setBankName] = useState('Chase Bank');
  const [bankAccount, setBankAccount] = useState('•••• 1234');
  const [accruedWages, setAccruedWages] = useState(2500);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !role) return;

    addEmployee({
      companyId,
      firstName,
      lastName,
      email,
      role,
      group: 'Staff',
      salary: Number(salary),
      hourlyRate: Number(hourlyRate),
      tenureMonths: Number(tenureMonths),
      ewaAvailable: 0, // calculated in store
      usedAmount: 0,
      outstanding: 0,
      bankName,
      bankAccount,
      kycStatus: 'Verified',
      riskCategory: 'Low',
      accruedWages: Number(accruedWages)
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setRole('');
    setShowAddModal(false);
  };

  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) || emp.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Human Capital</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Payroll Ledger</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Employee Accounts</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-1.5 bg-sap-primary text-white rounded text-xs font-bold hover:bg-sap-primary/90 transition shadow-sm flex items-center gap-2"
        >
          <i className="fa-solid fa-user-plus"></i>
          Provision Account
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="sap-card p-4">
            <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Total Headcount</div>
            <div className="text-2xl font-bold text-sap-text mt-1">{employees.length}</div>
          </div>
          <div className="sap-card p-4 border-l-4 border-sap-success">
            <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Accrued Liability</div>
            <div className="text-2xl font-bold text-sap-success mt-1 font-mono">
              ${employees.reduce((sum, e) => sum + e.accruedWages, 0).toLocaleString()}
            </div>
          </div>
          <div className="sap-card p-4 border-l-4 border-sap-primary">
            <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Liquidity Reserves</div>
            <div className="text-2xl font-bold text-sap-primary mt-1 font-mono">
              ${employees.reduce((sum, e) => sum + e.ewaAvailable, 0).toLocaleString()}
            </div>
          </div>
          <div className="sap-card p-4 border-l-4 border-sap-warning">
            <div className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-wider">Active Draws</div>
            <div className="text-2xl font-bold text-sap-warning mt-1 font-mono">
              ${employees.reduce((sum, e) => sum + e.outstanding, 0).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="sap-card overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <span className="absolute left-3 top-2.5 text-sap-text-secondary text-xs">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input 
                type="text" 
                placeholder="Search master file..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 w-full text-xs p-2 bg-white border border-sap-border rounded outline-none focus:border-sap-primary"
              />
            </div>
            <div className="text-sap-text-secondary text-[10px] font-bold uppercase tracking-tight">
              Filtered Registry: {filteredEmployees.length} Units
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                  <th className="p-3">Identity</th>
                  <th className="p-3">Affiliation</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right">Base</th>
                  <th className="p-3 text-right">Accrued</th>
                  <th className="p-3 text-right">Limit</th>
                  <th className="p-3 text-right">Outstanding</th>
                  <th className="p-3 text-center">Security</th>
                </tr>
              </thead>
              <tbody className="text-[11px] divide-y">
                {filteredEmployees.map(emp => {
                  const compName = companies.find(c => c.id === emp.companyId)?.name || 'Unknown Corp';
                  return (
                    <tr key={emp.id} className="sap-table-row hover:bg-blue-50/30 transition cursor-pointer group">
                      <td className="p-3">
                        <div className="font-bold text-sap-text group-hover:text-sap-primary">{emp.firstName} {emp.lastName}</div>
                        <div className="text-[9px] text-sap-text-secondary font-mono">{emp.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-sap-text-secondary">{compName}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sap-text font-medium">{emp.role}</div>
                        <div className="text-[9px] text-sap-text-secondary">Tenure: {emp.tenureMonths}m</div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold">${emp.salary.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-bold text-sap-success">${emp.accruedWages.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-bold text-sap-primary">${emp.ewaAvailable.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono font-bold text-sap-warning">${emp.outstanding.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm border ${
                          emp.kycStatus === 'Verified' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 
                          emp.kycStatus === 'Pending' ? 'bg-amber-50 text-sap-warning border-amber-200' : 
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {emp.kycStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-sap-shell/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-sap-shell p-4 text-white flex justify-between items-center">
              <h3 className="text-sm font-bold">Payroll Account Provisioning</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">First Name</label>
                  <input 
                    type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Last Name</label>
                  <input 
                    type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Enterprise Corporate Client</label>
                <select 
                  value={companyId} onChange={e => setCompanyId(e.target.value)}
                  className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Email Address</label>
                  <input 
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">System Role</label>
                  <input 
                    type="text" value={role} onChange={e => setRole(e.target.value)}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Monthly ($)</label>
                  <input 
                    type="number" value={salary} onChange={e => setSalary(Number(e.target.value))}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Accrued ($)</label>
                  <input 
                    type="number" value={accruedWages} onChange={e => setAccruedWages(Number(e.target.value))}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary font-mono"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sap-text-secondary uppercase">Tenure (m)</label>
                  <input 
                    type="number" value={tenureMonths} onChange={e => setTenureMonths(Number(e.target.value))}
                    className="w-full p-2 border border-sap-border rounded text-xs outline-none focus:border-sap-primary"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 border border-sap-border rounded text-xs font-bold text-sap-text hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-1.5 bg-sap-primary text-white rounded text-xs font-bold hover:bg-sap-primary/90 transition shadow-sm"
                >
                  Onboard Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
