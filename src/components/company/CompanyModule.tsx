import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function CompanyModule() {
  const { companies, addCompany } = useEwaStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [industry, setIndustry] = useState('Logistics');
  const [creditLimit, setCreditLimit] = useState(500000);
  const [prefundBalance, setPrefundBalance] = useState(100000);
  const [contactEmail, setContactEmail] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !contactEmail) return;
    
    addCompany({
      name,
      code,
      industry,
      status: 'Active',
      creditLimit: Number(creditLimit),
      availableLimit: Number(creditLimit),
      prefundBalance: Number(prefundBalance),
      feePolicyId: 'FP-001',
      bankAccount: bankAccount || 'US-OPER-0000',
      contactEmail
    });

    setName('');
    setCode('');
    setContactEmail('');
    setBankAccount('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Operations</span>
            <span>/</span>
            <span className="text-blue-600">Company Registry</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Company Master File</h1>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-plus mr-1.5"></i>
          Provision Enterprise
        </button>
      </div>

      {/* Credit Metric Overview strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 text-white p-4 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Aggregated Credit Line</div>
          <div className="text-2xl font-bold font-mono mt-1">
            ${companies.reduce((sum, c) => sum + c.creditLimit, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Enterprise underwriting limits</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Active Prefunds</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            ${companies.reduce((sum, c) => sum + c.prefundBalance, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Directly drawable EWA liquidity</div>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Client Accounts</div>
          <div className="text-2xl font-bold mt-1 text-slate-800">
            {companies.filter(c => c.status === 'Active').length} <span className="text-sm text-slate-400 font-normal">/ {companies.length}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">KYC validated partners</div>
        </div>
      </div>

      {/* Companies List Data Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Client Organizations</h3>
          <span className="text-[10px] bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded font-bold">{companies.length} Registries</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b tracking-tight">
                <th className="p-3">Company Code</th>
                <th className="p-3">Enterprise Name</th>
                <th className="p-3">Industry</th>
                <th className="p-3 text-right">Credit Line Limit</th>
                <th className="p-3 text-right">Prefund Balance</th>
                <th className="p-3">Contact Gateway</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y">
              {companies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-blue-600">{c.code}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-[9px] text-slate-400">ID: {c.id} • Registered: {c.createdDate}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">{c.industry}</span>
                  </td>
                  <td className="p-3 text-right font-mono font-bold">${c.creditLimit.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono font-bold text-blue-600">${c.prefundBalance.toLocaleString()}</td>
                  <td className="p-3">
                    <div className="font-medium text-slate-700">{c.contactEmail}</div>
                    <div className="text-[9px] text-slate-400">Vault Account: {c.bankAccount}</div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                      c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 
                      c.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Company Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden border shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold tracking-tight text-sm uppercase">Provision New Enterprise Organization</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white transition">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Acme Corporation" 
                    className="w-full text-xs p-2 border rounded-md focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company Code Prefix</label>
                  <input 
                    type="text" 
                    value={code} 
                    onChange={e => setCode(e.target.value)}
                    placeholder="e.g. ACM-CORP" 
                    className="w-full text-xs p-2 border rounded-md focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Industry Sector</label>
                  <select 
                    value={industry} 
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full text-xs p-2 border rounded-md"
                  >
                    <option value="Logistics">Logistics</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Enterprise Contact Email</label>
                  <input 
                    type="email" 
                    value={contactEmail} 
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="finance@acme.com" 
                    className="w-full text-xs p-2 border rounded-md focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Underwritten Credit Line ($)</label>
                  <input 
                    type="number" 
                    value={creditLimit} 
                    onChange={e => setCreditLimit(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Initial Prefund Allocation ($)</label>
                  <input 
                    type="number" 
                    value={prefundBalance} 
                    onChange={e => setPrefundBalance(Number(e.target.value))}
                    className="w-full text-xs p-2 border rounded-md font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned Custodial Bank Account</label>
                <input 
                  type="text" 
                  value={bankAccount} 
                  onChange={e => setBankAccount(e.target.value)}
                  placeholder="e.g. US-OPER-3341" 
                  className="w-full text-xs p-2 border rounded-md font-mono"
                />
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
                  Confirm & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
