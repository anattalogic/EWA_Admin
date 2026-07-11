import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function Header() {
  const { 
    toggleRightPanel, 
    isRightPanelOpen, 
    themePreset, 
    layoutStructure, 
    activeTab, 
    setActiveTab 
  } = useEwaStore();

  const [activeCategory, setActiveCategory] = useState<string>('Principal');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<string | null>(null);

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

  const categories = ['Principal', 'Finance & Ledger', 'Operations', 'Automation'];

  // Apply visual theme configuration styles to the header
  const getHeaderThemeStyles = () => {
    switch (themePreset) {
      case 'mainframe-retro':
        return 'h-14 bg-black border-b-2 border-green-500 text-green-400 font-mono shadow-none';
      case 'brutalist':
        return 'h-14 bg-yellow-400 text-black border-b-[3px] border-black font-sans font-black shadow-none';
      case 'cosmic-slate':
        return 'h-14 bg-slate-950 text-slate-100 border-b border-slate-900 shadow-lg shadow-purple-950/10';
      case 'macos-aqua':
        return 'h-13 bg-gradient-to-b from-slate-100 to-slate-200/90 text-slate-800 border-b border-slate-300 shadow-xs';
      case 'fluent-windows':
        return 'h-14 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800/80 shadow-md';
      case 'sap-horizon':
      default:
        return 'h-12 bg-[#354a5f] text-white shadow-md';
    }
  };

  const getLogoStyles = () => {
    switch (themePreset) {
      case 'mainframe-retro':
        return 'bg-black text-green-500 border border-green-500 rounded-none';
      case 'brutalist':
        return 'bg-white text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
      case 'cosmic-slate':
        return 'bg-purple-600 text-white rounded-lg shadow-glow';
      case 'macos-aqua':
        return 'bg-blue-500 text-white rounded-lg';
      case 'fluent-windows':
      case 'sap-horizon':
      default:
        return 'bg-white text-[#354a5f] rounded';
    }
  };

  const getSearchClass = () => {
    if (themePreset === 'mainframe-retro') {
      return 'bg-black border border-green-500 text-green-400 font-mono placeholder:text-green-700/60 rounded-none';
    } else if (themePreset === 'brutalist') {
      return 'bg-white border-2 border-black text-black placeholder:text-slate-500 rounded-none';
    } else if (themePreset === 'cosmic-slate') {
      return 'bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-500 rounded-md';
    } else {
      return 'bg-white/10 text-white placeholder:text-slate-300 rounded hover:bg-white/15 focus:bg-white focus:text-slate-900 transition-all';
    }
  };

  return (
    <div className="flex flex-col z-50 shrink-0">
      <header className={`flex items-center justify-between px-6 ${getHeaderThemeStyles()}`}>
        
        {/* Left Side: System Logo / Traffic Lights / Search */}
        <div className="flex items-center gap-6">
          {/* macOS traffic light circles in header */}
          {themePreset === 'macos-aqua' && (
            <div className="flex gap-1.5 mr-2">
              <span className="w-3 h-3 bg-red-400 rounded-full border border-red-500/20 shadow-xs"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full border border-yellow-500/20 shadow-xs"></span>
              <span className="w-3 h-3 bg-green-400 rounded-full border border-green-500/20 shadow-xs"></span>
            </div>
          )}

          {/* Logo element */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className={`w-7 h-7 flex items-center justify-center p-1.5 ${getLogoStyles()}`}>
              <i className="fa-solid fa-server text-xs"></i>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[12px] font-bold uppercase tracking-widest">
                {themePreset === 'mainframe-retro' ? 'EWA.SYS' : 'EWA Enterprise'}
              </span>
              <span className="text-[8px] opacity-75 font-mono">
                {themePreset === 'mainframe-retro' ? 'V_420' : 'FINANCIAL CORE'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          {/* DYNAMIC TOP NAVIGATION MENU (If selected layout is 'top-menu-hub') */}
          {layoutStructure === 'top-menu-hub' && (
            <nav className="hidden lg:flex items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const items = menuItems.filter(item => item.category === cat);
                
                return (
                  <div 
                    key={cat} 
                    className="relative"
                    onMouseEnter={() => setShowCategoryDropdown(cat)}
                    onMouseLeave={() => setShowCategoryDropdown(null)}
                  >
                    <button
                      onClick={() => {
                        setActiveCategory(cat);
                        // Default to first item in category
                        if (items.length > 0) setActiveTab(items[0].name);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                        isActive 
                          ? (themePreset === 'brutalist' 
                              ? 'bg-black text-yellow-400' 
                              : 'bg-white/15 rounded text-white')
                          : 'opacity-70 hover:opacity-100 hover:bg-white/5 rounded'
                      }`}
                    >
                      <i className="fa-solid fa-folder-closed text-[9px]"></i>
                      <span>{cat}</span>
                      <i className="fa-solid fa-chevron-down text-[7px] opacity-50"></i>
                    </button>

                    {/* Dropdown containing category's submenu buttons */}
                    {showCategoryDropdown === cat && (
                      <div className={`absolute top-full left-0 mt-1 w-48 py-1 shadow-xl z-50 border ${
                        themePreset === 'mainframe-retro' ? 'bg-black border-green-500 text-green-400' :
                        themePreset === 'brutalist' ? 'bg-white border-2 border-black text-black' :
                        themePreset === 'cosmic-slate' ? 'bg-slate-950 border-slate-800 text-slate-300' :
                        'bg-white text-slate-700 rounded-md border-slate-200'
                      }`}>
                        {items.map(item => {
                          const isItemActive = activeTab === item.name;
                          return (
                            <button
                              key={item.name}
                              onClick={() => {
                                setActiveTab(item.name);
                                setActiveCategory(cat);
                                setShowCategoryDropdown(null);
                              }}
                              className={`w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-tight flex items-center gap-2.5 transition-colors ${
                                isItemActive
                                  ? (themePreset === 'mainframe-retro' ? 'bg-green-500/20 text-green-400 font-extrabold' : 'bg-blue-50 text-blue-700')
                                  : 'hover:bg-slate-100/50'
                              }`}
                            >
                              <i className={`fa-solid ${item.icon} text-xs w-4 text-center opacity-70`}></i>
                              <span className="truncate">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Side: Global Settings/Controls & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick-Search Box */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder={themePreset === 'mainframe-retro' ? 'EXEC SEARCH...' : 'Search financial core...'}
              className={`py-1.5 px-8 text-[10px] tracking-wide outline-none w-44 focus:w-56 transition-all ${getSearchClass()}`}
            />
            <i className={`fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[9px] opacity-60`}></i>
          </div>

          {/* Navigation Action Helpers */}
          <div className="flex items-center gap-1.5">
            <button 
              onClick={toggleRightPanel} 
              title="Help & Ledger Intelligence" 
              className={`w-8 h-8 flex items-center justify-center rounded transition-all ${
                isRightPanelOpen 
                  ? 'bg-blue-600 text-white shadow-inner' 
                  : 'hover:bg-white/10 opacity-80 hover:opacity-100'
              }`}
            >
              <i className="fa-solid fa-circle-question text-xs"></i>
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 opacity-80 hover:opacity-100 relative">
              <i className="fa-solid fa-bell text-xs"></i>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-4 w-px bg-white/10 mx-1"></div>

            <button className="flex items-center gap-2 p-1 rounded hover:bg-white/10">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border border-white/20 text-[9px] font-bold text-white uppercase">
                AC
              </div>
              <i className="fa-solid fa-chevron-down text-[7px] opacity-40"></i>
            </button>
          </div>
        </div>

      </header>

      {/* Sub-Header Horizontal Navigation Line (If Layout is 'top-menu-hub' and there's a category clicked) */}
      {layoutStructure === 'top-menu-hub' && (
        <div className={`h-10 px-6 border-b flex items-center overflow-x-auto gap-2 ${
          themePreset === 'mainframe-retro' ? 'bg-black border-green-500/30' :
          themePreset === 'cosmic-slate' ? 'bg-[#0b0f19] border-slate-900' :
          'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mr-2 shrink-0">
            <i className="fa-solid fa-arrow-turn-down-right text-blue-500 mr-1"></i>
            Sub Menu:
          </div>
          {menuItems.filter(item => item.category === activeCategory).map(item => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wide transition-all border shrink-0 ${
                  isActive
                    ? (themePreset === 'mainframe-retro' 
                        ? 'border-green-500 bg-green-500/10 text-green-400 font-extrabold' 
                        : 'bg-blue-600 text-white border-blue-600 shadow-xs')
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                } rounded`}
              >
                <div className="flex items-center gap-1.5">
                  <i className={`fa-solid ${item.icon} text-[9px]`}></i>
                  <span>{item.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
