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
      salary: Number(salary),
      hourlyRate: Number(hourlyRate),
      tenureMonths: Number(tenureMonths),
      ewaAvailable: 0, // calculated in store
      usedAmount: 0,
      outstanding: 0,
      bankName,
      bankAccount,
      kycStatus: 'Verified',
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Operations</span>
            <span>/</span>
            <span className="text-blue-600">Employee Profiles</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Accrued Wage Ledger</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-user-plus mr-1.5"></i>
          Onboard Employee Account
        </button>
      </div>

      {/* Global stats about active employees */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Active Employees</div>
          <div className="text-2xl font-bold mt-1 text-slate-800">{employees.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Matched against payroll rosters</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Aggregated Accrued Wages</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            ${employees.reduce((sum, e) => sum + e.accruedWages, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Earned net payroll accruals</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Available EWA Reserves</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            ${employees.reduce((sum, e) => sum + e.ewaAvailable, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Approved limit ceilings</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-display text-red-600">Active Outstanding Advances</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            ${employees.reduce((sum, e) => sum + e.outstanding, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Drawn and unpaid advances</div>
        </div>
      </div>

      {/* Main Table view with Filter & Search */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
              type="text" 
              placeholder="Search employees by name, email, or role..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 w-full text-xs p-2 bg-white border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
            />
          </div>
          <div className="text-slate-400 text-xs font-semibold">
            Showing {filteredEmployees.length} of {employees.length} entries
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                <th className="p-3">Employee Name</th>
                <th className="p-3">Assigned Enterprise</th>
                <th className="p-3">Role & Title</th>
                <th className="p-3 text-right">Base Salary</th>
                <th className="p-3 text-right">Earned Wages</th>
                <th className="p-3 text-right">EWA Available Limit</th>
                <th className="p-3 text-right">Used / Outstanding</th>
                <th className="p-3">Direct Deposit Account</th>
                <th className="p-3 text-center">KYC Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y">
              {filteredEmployees.map(emp => {
                const compName = companies.find(c => c.id === emp.companyId)?.name || 'Unknown Corp';
                return (
                  <tr key={emp.id} className="hover:bg-slate-50 transition">
                    <td className="p-3">
                      <div className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</div>
                      <div className="text-[9px] text-slate-400">ID: {emp.id} • {emp.email}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-700">{compName}</div>
                      <div className="text-[9px] text-slate-400">ID: {emp.companyId}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-slate-700">{emp.role}</div>
                      <div className="text-[9px] text-slate-400">Tenure: {emp.tenureMonths} Months</div>
                    </td>
                    <td className="p-3 text-right font-mono font-bold">${emp.salary.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-emerald-700 font-bold">${emp.accruedWages.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono text-blue-600 font-bold">${emp.ewaAvailable.toLocaleString()}</td>
                    <td className="p-3 text-right font-mono">
                      <div className="font-bold text-rose-700">${emp.outstanding.toLocaleString()}</div>
                      <div className="text-[9px] text-slate-400">Used: ${emp.usedAmount.toLocaleString()}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-slate-700">{emp.bankAccount}</div>
                      <div className="text-[9px] text-slate-400">{emp.bankName}</div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                        emp.kycStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 
                        emp.kycStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
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

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden border shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold tracking-tight text-sm uppercase">Add New Employee Payroll Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">First Name</label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Corporate Client</label>
                  <select 
                    value={companyId} 
                    onChange={e => setCompanyId(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Role Title</label>
                  <input 
                    type="text" 
                    value={role} 
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Lead Logistics Engineer"
                    className="w-full text-xs p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tenure (Months)</label>
                  <input 
                    type="number" 
                    value={tenureMonths} 
                    onChange={e => setTenureMonths(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Monthly Salary ($)</label>
                  <input 
                    type="number" 
                    value={salary} 
                    onChange={e => setSalary(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hourly Rate ($)</label>
                  <input 
                    type="number" 
                    value={hourlyRate} 
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Earned wages ($)</label>
                  <input 
                    type="number" 
                    value={accruedWages} 
                    onChange={e => setAccruedWages(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Recipient Bank</label>
                  <input 
                    type="text" 
                    value={bankName} 
                    onChange={e => setBankName(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Recipient Account Number</label>
                  <input 
                    type="text" 
                    value={bankAccount} 
                    onChange={e => setBankAccount(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-md text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700"
                >
                  Add Employee Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
