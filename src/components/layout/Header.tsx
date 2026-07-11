import React from 'react';
import { useEwaStore } from '../../app/store';

export function Header() {
  const { toggleRightPanel } = useEwaStore();
  return (
    <header className="h-12 bg-sap-shell flex items-center justify-between px-4 z-50 shrink-0 text-white shadow-md">
      
      {/* SAP Logo and System Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 group cursor-pointer sap-shell-button p-2 rounded">
          <div className="bg-white p-1 rounded-sm">
            <i className="fa-solid fa-cube text-sap-shell text-xs"></i>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-bold tracking-tight">SAP</span>
            <span className="text-[10px] text-blue-100 font-medium">EWA Cloud</span>
          </div>
        </div>
        
        <div className="h-6 w-px bg-white/20 mx-2 hidden sm:block"></div>
        
        <div className="hidden lg:flex items-center gap-6 text-[12px] font-medium text-slate-200">
          <button className="hover:text-white transition">Home</button>
          <button className="hover:text-white transition">Treasury</button>
          <button className="hover:text-white transition">Operations</button>
          <button className="hover:text-white transition">Audit</button>
        </div>
      </div>

      {/* Global Search and User Profile */}
      <div className="flex items-center gap-2">
        
        {/* Global Search Box (Fiori style) */}
        <div className="relative hidden md:block group">
          <input 
            type="text" 
            placeholder="Search Treasury..."
            className="bg-white/10 border border-transparent hover:bg-white/20 focus:bg-white focus:text-slate-900 focus:outline-none rounded py-1 px-8 text-xs transition-all w-48 focus:w-64"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] group-focus-within:text-slate-500"></i>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggleRightPanel} title="Help & Intelligence" className="w-10 h-10 flex items-center justify-center sap-shell-button rounded text-slate-200 hover:text-white">
            <i className="fa-solid fa-circle-question text-base"></i>
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center sap-shell-button rounded text-slate-200 hover:text-white relative">
            <i className="fa-solid fa-bell text-base"></i>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-sap-shell"></span>
          </button>

          <div className="h-6 w-px bg-white/20 mx-1"></div>

          <button className="flex items-center gap-2 sap-shell-button p-1.5 rounded ml-1">
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border border-white/30 text-[10px] font-bold">
              AC
            </div>
            <i className="fa-solid fa-chevron-down text-[8px] text-slate-400"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
