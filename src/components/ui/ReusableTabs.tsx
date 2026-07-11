import React from 'react';
import { useEwaStore } from '../../app/store';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ReusableTabs({ tabs, activeTab, onTabChange }: TabProps) {
  const { themePreset, tabStyle } = useEwaStore();

  // Color mappings based on the theme preset
  const getThemeColors = () => {
    switch (themePreset) {
      case 'mainframe-retro':
        return {
          activeBg: 'bg-green-500 text-black border-green-500',
          inactiveBg: 'bg-black text-green-500 border-green-800 hover:bg-green-950/30',
          activeText: 'text-green-400',
          inactiveText: 'text-green-600 hover:text-green-400',
          container: 'bg-black border border-green-500 p-1 font-mono',
          activeLine: 'border-green-500 text-green-400 font-bold',
          inactiveLine: 'border-transparent text-green-600 hover:text-green-400',
          pillActive: 'bg-green-500 text-black font-bold',
          pillInactive: 'text-green-500 hover:bg-green-950/50 hover:text-green-300',
          stepActive: 'bg-green-500 text-black font-mono font-bold',
          stepInactive: 'bg-black text-green-500 border border-green-800'
        };
      case 'brutalist':
        return {
          activeBg: 'bg-yellow-400 text-black border-2 border-black font-black',
          inactiveBg: 'bg-white text-black border-2 border-black hover:bg-slate-100 font-bold',
          activeText: 'text-black font-black underline decoration-2',
          inactiveText: 'text-slate-700 hover:text-black font-bold',
          container: 'bg-white border-4 border-black p-1.5',
          activeLine: 'border-black text-black font-black bg-yellow-400 border-t-2 border-x-2',
          inactiveLine: 'border-transparent text-slate-800 hover:bg-slate-100',
          pillActive: 'bg-black text-yellow-400 font-black',
          pillInactive: 'bg-white text-black hover:bg-yellow-100 border border-black',
          stepActive: 'bg-yellow-400 text-black border-2 border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
          stepInactive: 'bg-white text-slate-700 border-2 border-slate-300 font-bold'
        };
      case 'cosmic-slate':
        return {
          activeBg: 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/15',
          inactiveBg: 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200',
          activeText: 'text-purple-400 font-bold border-purple-500',
          inactiveText: 'text-slate-400 hover:text-slate-200 hover:border-slate-800',
          container: 'bg-slate-950/80 border border-slate-800 p-1',
          activeLine: 'border-purple-500 text-purple-400 font-semibold',
          inactiveLine: 'border-transparent text-slate-400 hover:text-slate-200',
          pillActive: 'bg-purple-600 text-white shadow-lg shadow-purple-500/20',
          pillInactive: 'text-slate-400 hover:text-slate-200 hover:bg-slate-900',
          stepActive: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30',
          stepInactive: 'bg-slate-900 text-slate-500 border border-slate-800'
        };
      case 'macos-aqua':
        return {
          activeBg: 'bg-blue-500 text-white border-blue-600 shadow-sm',
          inactiveBg: 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/60 hover:text-slate-800',
          activeText: 'text-blue-600 font-bold border-blue-500',
          inactiveText: 'text-slate-500 hover:text-slate-800 hover:border-slate-300',
          container: 'bg-slate-100/80 backdrop-blur border border-slate-200/80 p-1.5 rounded-lg',
          activeLine: 'border-blue-500 text-blue-600 font-bold',
          inactiveLine: 'border-transparent text-slate-500 hover:text-slate-800',
          pillActive: 'bg-white text-slate-800 shadow-sm font-semibold',
          pillInactive: 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/40',
          stepActive: 'bg-blue-500 text-white shadow-sm font-bold',
          stepInactive: 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
        };
      case 'fluent-windows':
        return {
          activeBg: 'bg-blue-600 text-white border-blue-700 shadow-sm',
          inactiveBg: 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900',
          activeText: 'text-blue-600 font-bold border-blue-600',
          inactiveText: 'text-slate-500 hover:text-slate-800 hover:border-slate-200',
          container: 'bg-slate-50 border border-slate-200 p-1 rounded-md',
          activeLine: 'border-blue-600 text-blue-600 font-semibold',
          inactiveLine: 'border-transparent text-slate-500 hover:text-slate-800',
          pillActive: 'bg-blue-600/10 text-blue-600 font-semibold border border-blue-500/20',
          pillInactive: 'text-slate-500 hover:text-slate-800 hover:bg-slate-100',
          stepActive: 'bg-blue-600 text-white font-semibold',
          stepInactive: 'bg-slate-100 text-slate-500 border border-slate-200'
        };
      case 'sap-horizon':
      default:
        return {
          activeBg: 'bg-blue-600 text-white border-blue-700',
          inactiveBg: 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800',
          activeText: 'text-blue-700 font-bold border-blue-600',
          inactiveText: 'text-slate-500 hover:text-slate-900 hover:border-slate-300',
          container: 'bg-white border-b border-slate-200',
          activeLine: 'border-blue-600 text-blue-700 font-semibold',
          inactiveLine: 'border-transparent text-slate-500 hover:text-slate-900',
          pillActive: 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold',
          pillInactive: 'text-slate-500 hover:text-slate-800 hover:bg-slate-50',
          stepActive: 'bg-blue-600 text-white font-bold',
          stepInactive: 'bg-white text-slate-400 border border-slate-200 hover:text-slate-700'
        };
    }
  };

  const colors = getThemeColors();

  // 1. CHRONOLOGICAL STEPPER WIZARD TABS
  if (tabStyle === 'stepper-steps') {
    return (
      <div className="flex items-center gap-2 py-4 px-6 overflow-x-auto bg-transparent">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab;
          return (
            <React.Fragment key={tab}>
              {idx > 0 && (
                <div className="flex-1 min-w-[20px] max-w-[60px] h-0.5 bg-slate-300" style={{
                  backgroundColor: themePreset === 'mainframe-retro' ? '#22c55e' : undefined
                }}></div>
              )}
              <button
                onClick={() => onTabChange(tab)}
                className="flex items-center gap-2.5 group cursor-pointer focus:outline-none shrink-0"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isActive ? colors.stepActive : colors.stepInactive
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? (themePreset === 'mainframe-retro' ? 'text-green-400' : 'text-slate-900 font-extrabold') 
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {tab}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // 2. CONNECTED BUTTON GROUP TABS
  if (tabStyle === 'button-group') {
    return (
      <div className="flex p-3 bg-transparent">
        <div className={`inline-flex shadow-sm overflow-hidden ${
          themePreset === 'brutalist' ? 'rounded-none' : 
          themePreset === 'macos-aqua' ? 'rounded-lg' : 
          themePreset === 'fluent-windows' ? 'rounded-md' : 'rounded-sm'
        }`}>
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-5 py-2 text-[10px] font-bold uppercase tracking-widest border-y border-r first:border-l transition-all duration-150 focus:outline-none ${
                  isActive ? colors.activeBg : colors.inactiveBg
                }`}
              >
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-circle-dot text-[8px] opacity-75"></i>
                  <span>{tab}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3. SEGMENTED PILLS TABS
  if (tabStyle === 'segmented-pills') {
    return (
      <div className="p-3 bg-transparent shrink-0">
        <div className={`flex gap-1.5 p-1 ${colors.container} ${
          themePreset === 'brutalist' ? 'rounded-none border-2 border-black' : 
          themePreset === 'macos-aqua' ? 'rounded-full' : 
          themePreset === 'fluent-windows' ? 'rounded-lg' : 'rounded-md'
        } inline-flex min-w-[280px]`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`flex-1 py-1.5 px-4 text-[10px] font-bold uppercase tracking-wider text-center transition-all focus:outline-none ${
                  themePreset === 'brutalist' ? 'rounded-none' : 
                  themePreset === 'macos-aqua' ? 'rounded-full' : 
                  themePreset === 'fluent-windows' ? 'rounded-md' : 'rounded-sm'
                } ${isActive ? colors.pillActive : colors.pillInactive}`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. VERTICAL SUBMENU AS TABS (OR HORIZONTAL DROPDOWN ICON BAR)
  if (tabStyle === 'submenu-vertical') {
    return (
      <div className="flex flex-wrap gap-2 py-3 px-6 bg-transparent shrink-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex items-center gap-2.5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider border transition-all duration-200 focus:outline-none ${
                themePreset === 'brutalist' ? 'rounded-none border-2 border-black' : 
                themePreset === 'macos-aqua' ? 'rounded-lg' : 
                themePreset === 'fluent-windows' ? 'rounded-md' : 'rounded-sm'
              } ${
                isActive 
                  ? colors.activeBg 
                  : colors.inactiveBg
              }`}
            >
              <i className={`fa-solid ${isActive ? 'fa-folder-open' : 'fa-folder'} text-[10px]`}></i>
              <span>{tab}</span>
              <i className="fa-solid fa-chevron-down text-[8px] opacity-40 ml-1"></i>
            </button>
          );
        })}
      </div>
    );
  }

  // 5. DEFAULT UNDERLINED CLASSIC TABS
  return (
    <div className={`flex overflow-x-auto shrink-0 ${
      themePreset === 'mainframe-retro' ? 'bg-black border-b border-green-950' :
      themePreset === 'cosmic-slate' ? 'bg-slate-950 border-b border-slate-900' :
      'bg-white border-b border-slate-200'
    }`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2 font-display focus:outline-none shrink-0 ${
              isActive ? colors.activeLine : colors.inactiveLine
            }`}
          >
            <div className="flex items-center gap-2">
              {isActive && <i className="fa-solid fa-square-caret-right text-[10px] text-blue-500 animate-pulse" style={{
                color: themePreset === 'mainframe-retro' ? '#22c55e' : undefined
              }}></i>}
              <span>{tab}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
