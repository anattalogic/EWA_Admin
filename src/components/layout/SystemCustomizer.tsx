import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function SystemCustomizer() {
  const { 
    themePreset, setThemePreset,
    layoutStructure, setLayoutStructure,
    tabStyle, setTabStyle,
    isRightPanelOpen, toggleRightPanel,
    showTelemetry, setShowTelemetry
  } = useEwaStore();

  const [isOpen, setIsOpen] = useState(false);
  const [density, setDensity] = useState<'compact' | 'standard' | 'spacious'>('standard');

  // Theme metadata
  const themes = [
    { id: 'sap-horizon', name: 'SAP Horizon Classic', icon: 'fa-cubes', color: 'bg-blue-600', desc: 'Classic enterprise slate design' },
    { id: 'fluent-windows', name: 'Windows 11 Fluent', icon: 'fa-windows', color: 'bg-indigo-600', desc: 'Semi-translucent rounded grid aesthetic' },
    { id: 'macos-aqua', name: 'macOS Sonoma Aqua', icon: 'fa-apple', color: 'bg-sky-500', desc: 'Smooth premium metallic panels with soft shadows' },
    { id: 'mainframe-retro', name: 'Mainframe CRT Retro', icon: 'fa-terminal', color: 'bg-green-500', desc: 'Monospace amber/green phosphor terminal screen' },
    { id: 'brutalist', name: 'Industrial Brutalist', icon: 'fa-signature', color: 'bg-yellow-400', desc: 'Bold flat fills with thick black ink boundaries' },
    { id: 'cosmic-slate', name: 'Cosmic Dark Slate', icon: 'fa-user-astronaut', color: 'bg-violet-600', desc: 'Luminous purple & cyan accents on obsidian canvas' },
  ];

  // Layout metadata
  const layouts = [
    { id: 'sidebar-top-tabs', name: 'Sidebar Navigation', icon: 'fa-sidebar', desc: 'Standard Left Rail with nested categories' },
    { id: 'top-menu-hub', name: 'Top Category Hub', icon: 'fa-folder-tree', desc: 'Spacious header menus with dynamic sub-button lists' },
    { id: 'compact-dock', name: 'Floating Dock', icon: 'fa-grip', desc: 'Minimal bottom launching dock for high-density workspaces' },
    { id: 'mdi-windowed', name: 'Multi-Tab IDE', icon: 'fa-folder-minus', desc: 'Tabs for open screens, allowing concurrent views' },
  ];

  // Tab style metadata
  const tabStyles = [
    { id: 'underlined', name: 'Underlined line', icon: 'fa-underline' },
    { id: 'button-group', name: 'Button Groups', icon: 'fa-square' },
    { id: 'segmented-pills', name: 'Segmented Pills', icon: 'fa-capsules' },
    { id: 'stepper-steps', name: 'Stepper Steps', icon: 'fa-list-ol' },
  ];

  const handleApplyConfig = (theme: string) => {
    // Apply density helper to document element
    const root = document.documentElement;
    root.setAttribute('data-theme-preset', theme);
  };

  return (
    <>
      {/* Floating Gear Activation Orb */}
      <div className="fixed bottom-10 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none ${
            isOpen ? 'bg-rose-500 rotate-90' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 animate-bounce'
          }`}
          title="System Layout & Theme Configurator"
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-sliders'} text-lg`}></i>
        </button>
      </div>

      {/* Slide-out Customizer Control Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[80vh] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
          
          {/* Header Panel */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-blue-400"></i>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider">Workspace Architect</span>
                <span className="text-[9px] text-slate-400">Configure layout & theme presets</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition"
            >
              <i className="fa-solid fa-circle-chevron-down"></i>
            </button>
          </div>

          {/* Configurator Scrollable Body */}
          <div className="p-4 overflow-y-auto space-y-5 flex-1 text-slate-800">
            
            {/* Section 1: Themes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-palette text-blue-500"></i>
                  System Theme Presets
                </span>
                <span className="text-[8px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono font-bold">Dynamic</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {themes.map(t => {
                  const isSelected = themePreset === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setThemePreset(t.id as any);
                        handleApplyConfig(t.id);
                      }}
                      className={`text-left p-2 rounded-md border transition-all flex flex-col gap-1 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                          : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full ${t.color}`}></div>
                        <span className="text-[10px] font-bold text-slate-800 truncate">{t.name.split(' ')[0]}</span>
                      </div>
                      <span className="text-[8px] text-slate-400 line-clamp-1">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Main Layout Structures */}
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-columns-line text-emerald-500"></i>
                  Main Layout Structure
                </span>
                <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-mono font-bold">Reactive</span>
              </div>
              <div className="space-y-1">
                {layouts.map(l => {
                  const isSelected = layoutStructure === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLayoutStructure(l.id as any)}
                      className={`w-full text-left p-2 rounded border transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-50/20 shadow-sm' 
                          : 'border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <i className={`fa-solid ${l.icon} text-xs`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-slate-800">{l.name}</div>
                        <div className="text-[8px] text-slate-400 truncate">{l.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Sub-Layout Tab Style */}
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-window-restore text-purple-500"></i>
                  Sub Layout Tab Style
                </span>
                <span className="text-[8px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-mono font-bold">Modular</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {tabStyles.map(ts => {
                  const isSelected = tabStyle === ts.id;
                  return (
                    <button
                      key={ts.id}
                      onClick={() => setTabStyle(ts.id as any)}
                      className={`p-2 rounded border text-center transition-all flex flex-col items-center gap-1 ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50/20' 
                          : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <i className={`fa-solid ${ts.icon} text-xs ${isSelected ? 'text-purple-600' : 'text-slate-400'}`}></i>
                      <span className="text-[9px] font-bold text-slate-700">{ts.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Live Config Parameters */}
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <i className="fa-solid fa-sliders text-amber-500"></i>
                  Interactive Metrics
                </span>
              </div>
              
              {/* Density selector */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[9px] font-bold text-slate-600">Density spacing</span>
                <div className="flex bg-slate-100 p-0.5 rounded text-[8px] font-bold uppercase">
                  {['compact', 'standard', 'spacious'].map(d => (
                    <button
                      key={d}
                      onClick={() => setDensity(d as any)}
                      className={`px-2 py-0.5 rounded transition ${
                        density === d ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {d.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Telemetry switch */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[9px] font-bold text-slate-600">System Telemetry Logs</span>
                <button
                  onClick={() => setShowTelemetry(!showTelemetry)}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${
                    showTelemetry ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform transform ${
                    showTelemetry ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Co-Pilot panel quick-toggle */}
              <div className="flex items-center justify-between py-1">
                <span className="text-[9px] font-bold text-slate-600">Treasury Co-Pilot Side panel</span>
                <button
                  onClick={toggleRightPanel}
                  className={`w-8 h-4 rounded-full p-0.5 transition-colors focus:outline-none ${
                    isRightPanelOpen ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform transform ${
                    isRightPanelOpen ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

          </div>

          {/* Footer of Customizer */}
          <div className="bg-slate-50 border-t border-slate-100 p-3 text-center">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
              Live CSS Injection Protocol Verified
            </span>
          </div>

        </div>
      )}
    </>
  );
}
