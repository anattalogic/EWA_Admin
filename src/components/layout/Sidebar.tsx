import React from 'react';
import { useEwaStore } from '../../app/store';

export function Sidebar() {
  const { activeTab, setActiveTab, bankAccounts } = useEwaStore();

  const totalLiquidity = bankAccounts.reduce((sum, ba) => sum + ba.balance, 0);

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-chart-line', category: 'Principal' },
    { name: 'Company Setup', icon: 'fa-building', category: 'Principal' },
    { name: 'Employees Accrual', icon: 'fa-users', category: 'Principal' },
    { name: 'Budget Control', icon: 'fa-vault', category: 'Principal' },
    
    { name: 'EWA Requests', icon: 'fa-envelope-open-text', category: 'Finance & Ledger' },
    { name: 'Disbursement', icon: 'fa-paper-plane', category: 'Finance & Ledger' },
    { name: 'Repayments', icon: 'fa-file-invoice-dollar', category: 'Finance & Ledger' },
    { name: 'Fee Management', icon: 'fa-hand-holding-dollar', category: 'Finance & Ledger' },
    
    { name: 'General Ledger', icon: 'fa-scale-balanced', category: 'Operations' },
    { name: 'Banking & Reconcile', icon: 'fa-building-columns', category: 'Operations' },
    { name: 'Reports Center', icon: 'fa-file-contract', category: 'Operations' },
    { name: 'Workflow Builder', icon: 'fa-diagram-project', category: 'Operations' },
    
    { name: 'Rules Compliance', icon: 'fa-sliders', category: 'Automation' },
    { name: 'System Config', icon: 'fa-gears', category: 'Automation' },
  ];

  // Group by category
  const categories = ['Principal', 'Finance & Ledger', 'Operations', 'Automation'];

  return (
    <aside className="w-56 border-r border-slate-800 bg-slate-900 text-slate-300 flex flex-col shrink-0">
      
      {/* Platform Name header */}
      <div className="p-4 flex items-center gap-2 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold font-display">E</div>
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-white leading-none">EWA Enterprise</span>
          <span className="text-[9px] text-slate-500 font-mono mt-0.5">V4.2.0-STABLE</span>
        </div>
      </div>

      {/* Sidebar navigation items categorized */}
      <nav className="flex-1 py-4 overflow-y-auto px-2 space-y-4">
        {categories.map(cat => (
          <div key={cat} className="space-y-1">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5">{cat}</div>
            {menuItems.filter(item => item.category === cat).map(item => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} text-sm shrink-0 w-4 text-center`}></i>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section: SVB Daily Liquidity balance bar */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 p-3 rounded-lg space-y-1.5">
          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Daily Aggregated Liquidity</div>
          <div className="text-sm font-mono text-blue-400 font-bold">
            ${totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '74%' }}></div>
          </div>
        </div>
      </div>

    </aside>
  );
}
