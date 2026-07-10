import React from 'react';

export function Header() {
  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-10 shrink-0">
      
      {/* Global Search bar */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input 
            type="text" 
            placeholder="Search transactions, organizations, or general ledger codes..." 
            className="w-full bg-slate-50 border-none rounded-md pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* System healthy indicator and User Profile */}
      <div className="flex items-center gap-5">
        
        {/* Live FedNow network hook status */}
        <div className="flex items-center gap-2 text-slate-500 border-r border-slate-200 pr-5">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
            Network: Connected
          </span>
        </div>

        {/* User profile details */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-800">
            AC
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold leading-none text-slate-900">Alex Chen</span>
            <span className="text-[9px] text-slate-400 mt-1 font-mono">Treasury Admin</span>
          </div>
        </div>

      </div>

    </header>
  );
}
