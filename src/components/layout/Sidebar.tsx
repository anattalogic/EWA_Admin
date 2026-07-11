import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function Sidebar() {
  const { activeTab, setActiveTab, bankAccounts } = useEwaStore();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ewa_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('ewa_sidebar_collapsed', String(next));
      return next;
    });
  };

  const totalLiquidity = bankAccounts.reduce((sum, ba) => sum + ba.balance, 0);

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-chart-line', category: 'Principal' },
    { name: 'System Blueprint', icon: 'fa-book-open', category: 'Principal' },
    { name: 'Company Setup', icon: 'fa-building', category: 'Principal' },
    { name: 'Employees Accrual', icon: 'fa-users', category: 'Principal' },
    { name: 'Budget Control', icon: 'fa-vault', category: 'Principal' },
    
    { name: 'EWA Requests', icon: 'fa-envelope-open-text', category: 'Finance & Ledger' },
    { name: 'Disbursement', icon: 'fa-paper-plane', category: 'Finance & Ledger' },
    { name: 'Repayments', icon: 'fa-file-invoice-dollar', category: 'Finance & Ledger' },
    { name: 'Fee Management', icon: 'fa-hand-holding-dollar', category: 'Finance & Ledger' },
    
    { name: 'General Ledger', icon: 'fa-scale-balanced', category: 'Operations' },
    { name: 'Banking & Reconcile', icon: 'fa-building-columns', category: 'Operations' },
    { name: 'Reporting Hub', icon: 'fa-file-contract', category: 'Operations' },
    { name: 'Workflow Builder', icon: 'fa-diagram-project', category: 'Operations' },
    
    { name: 'Rules Compliance', icon: 'fa-sliders', category: 'Automation' },
    { name: 'Advanced Config', icon: 'fa-microchip', category: 'Automation' },
    { name: 'System Config', icon: 'fa-gears', category: 'Automation' },
  ];

  // Group by category
  const categories = ['Principal', 'Finance & Ledger', 'Operations', 'Automation'];

  return (
    <aside className={`border-r border-slate-800 bg-slate-900 text-slate-300 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-56'
    }`}>
      
      {/* Platform Name header with Collapse Trigger */}
      <div className={`p-4 flex items-center justify-between border-b border-slate-800 ${isCollapsed ? 'flex-col gap-2' : ''}`}>
        <div className="flex items-center gap-2">
          <div 
            onClick={toggleCollapse} 
            className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold font-display cursor-pointer hover:bg-blue-500 transition-colors shadow-md"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            E
          </div>
          {!isCollapsed && (
            <div className="flex flex-col animate-in fade-in duration-200">
              <span className="font-bold tracking-tight text-white leading-none">EWA Enterprise</span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">V4.2.0-STABLE</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={toggleCollapse} 
          className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800 transition"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <i className={`fa-solid ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'} text-xs`}></i>
        </button>
      </div>

      {/* Sidebar navigation items */}
      <nav className="flex-1 py-4 overflow-y-auto px-2 space-y-4">
        {categories.map((cat, idx) => {
          const items = menuItems.filter(item => item.category === cat);
          if (items.length === 0) return null;
          
          return (
            <div key={cat} className="space-y-1">
              {isCollapsed ? (
                // Compact divider instead of text
                idx > 0 && <div className="border-t border-slate-800/60 my-2 mx-1.5" />
              ) : (
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1.5 truncate animate-in fade-in duration-200">{cat}</div>
              )}
              
              {items.map(item => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    title={item.name}
                    className={`w-full flex items-center rounded-md text-xs font-semibold transition-all duration-150 ${
                      isCollapsed 
                        ? 'justify-center py-2.5 px-0' 
                        : 'gap-3 px-3 py-2'
                    } ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm font-bold' 
                        : 'hover:bg-slate-800 hover:text-white text-slate-400'
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} text-sm shrink-0 w-4 text-center ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}></i>
                    {!isCollapsed && <span className="truncate animate-in fade-in duration-200">{item.name}</span>}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom section: SVB Daily Liquidity balance bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        {isCollapsed ? (
          <div 
            className="bg-slate-800/80 p-2 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-800 transition"
            onClick={toggleCollapse}
            title={`Daily Aggregated Liquidity: $${totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          >
            <i className="fa-solid fa-chart-pie text-blue-400 text-xs"></i>
            <span className="text-[9px] font-mono font-bold text-blue-400">$LQD</span>
          </div>
        ) : (
          <div className="bg-slate-800 p-3 rounded-lg space-y-1.5 animate-in fade-in duration-300">
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Daily Aggregated Liquidity</div>
            <div className="text-xs font-mono text-blue-400 font-bold">
              ${totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '74%' }}></div>
            </div>
          </div>
        )}
      </div>

    </aside>
  );
}
