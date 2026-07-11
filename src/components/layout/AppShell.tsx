import React, { useState, useEffect } from 'react';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RightPanel } from "./RightPanel";
import { SystemCustomizer } from "./SystemCustomizer";
import { useEwaStore } from "../../app/store";

// Import modules
import { DashboardModule } from "../dashboard/DashboardModule";
import { CompanyModule } from "../company/CompanyModule";
import { EmployeeModule } from "../employee/EmployeeModule";
import { RequestModule } from "../request/RequestModule";
import { DisbursementModule } from "../disbursement/DisbursementModule";
import { RepaymentModule } from "../repayment/RepaymentModule";
import { LedgerModule } from "../ledger/LedgerModule";
import { BankingModule } from "../banking/BankingModule";
import { WorkflowModule } from "../workflow/WorkflowModule";
import { RulesModule } from "../rules/RulesModule";
import { ConfigModule } from "../configuration/ConfigModule";
import { BudgetModule } from "../budget/BudgetModule";
import { FeeModule } from "../fees/FeeModule";
import { ReportsModule } from "../reports/ReportsModule";
import { AdvancedConfigModule } from "../configuration/AdvancedConfigModule";
import { BlueprintModule } from "../blueprint/BlueprintModule";

export function AppShell() {
  const { 
    activeTab, 
    setActiveTab, 
    isRightPanelOpen, 
    themePreset, 
    layoutStructure,
    tabStyle,
    showTelemetry
  } = useEwaStore();

  // Multi-Document Interface (MDI) Tab state
  const [openTabs, setOpenTabs] = useState<string[]>(['Dashboard']);

  // Sync open tabs with store's activeTab
  useEffect(() => {
    if (!openTabs.includes(activeTab)) {
      setOpenTabs(prev => [...prev, activeTab]);
    }
  }, [activeTab]);

  const closeTab = (tabToClose: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openTabs.length === 1) return; // keep at least one tab
    
    const index = openTabs.indexOf(tabToClose);
    const newTabs = openTabs.filter(t => t !== tabToClose);
    setOpenTabs(newTabs);

    if (activeTab === tabToClose) {
      // Switch active tab to adjacent tab
      const nextActive = newTabs[Math.max(0, index - 1)];
      setActiveTab(nextActive);
    }
  };

  const renderActiveModule = (tabName: string) => {
    switch (tabName) {
      case 'Dashboard':
        return <DashboardModule />;
      case 'System Blueprint':
        return <BlueprintModule />;
      case 'Company Setup':
        return <CompanyModule />;
      case 'Employees Accrual':
        return <EmployeeModule />;
      case 'Budget Control':
        return <BudgetModule />;
      case 'EWA Requests':
        return <RequestModule />;
      case 'Disbursement':
        return <DisbursementModule />;
      case 'Repayments':
        return <RepaymentModule />;
      case 'Fee Management':
        return <FeeModule />;
      case 'General Ledger':
        return <LedgerModule />;
      case 'Banking & Reconcile':
        return <BankingModule />;
      case 'Reporting Hub':
        return <ReportsModule />;
      case 'Workflow Builder':
        return <WorkflowModule />;
      case 'Rules Compliance':
        return <RulesModule />;
      case 'Advanced Config':
        return <AdvancedConfigModule />;
      case 'System Config':
        return <ConfigModule />;
      default:
        return <DashboardModule />;
    }
  };

  // Menu items list for the Launcher Dock
  const dockItems = [
    { name: 'Dashboard', icon: 'fa-chart-line' },
    { name: 'System Blueprint', icon: 'fa-book-open' },
    { name: 'Company Setup', icon: 'fa-building' },
    { name: 'Employees Accrual', icon: 'fa-users' },
    { name: 'EWA Requests', icon: 'fa-envelope-open-text' },
    { name: 'General Ledger', icon: 'fa-scale-balanced' },
    { name: 'Banking & Reconcile', icon: 'fa-building-columns' },
    { name: 'System Config', icon: 'fa-gears' },
  ];

  // Global visual base wrappers per theme preset
  const getThemeBaseClass = () => {
    switch (themePreset) {
      case 'mainframe-retro':
        return 'bg-black text-green-400 font-mono';
      case 'brutalist':
        return 'bg-slate-100 text-black font-sans antialiased selection:bg-yellow-300';
      case 'cosmic-slate':
        return 'bg-[#030712] text-slate-100 font-sans';
      case 'macos-aqua':
        return 'bg-[#ececec] text-slate-800 font-sans antialiased';
      case 'fluent-windows':
        return 'bg-[#f3f3f3] text-[#201f1e] font-sans';
      case 'sap-horizon':
      default:
        return 'bg-[#edeff0] text-[#32363a] font-sans';
    }
  };

  // Generate dynamic CSS rules to force-override container styling globally for each theme preset
  const renderDynamicThemeOverrides = () => {
    switch (themePreset) {
      case 'mainframe-retro':
        return `
          /* Mainframe CRT Phosphor override rules */
          body { background-color: #000000 !important; color: #22c55e !important; }
          .sap-card, .bg-white, .sap-table-row, td, tr, th, thead, tbody {
            background-color: #000000 !important;
            color: #22c55e !important;
            border-color: #22c55e !important;
            border-radius: 0px !important;
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.25) !important;
            font-family: monospace !important;
          }
          input, select, textarea, button {
            background-color: #000000 !important;
            color: #22c55e !important;
            border: 1.5px solid #22c55e !important;
            border-radius: 0px !important;
            font-family: monospace !important;
            box-shadow: none !important;
          }
          input::placeholder { color: rgba(34,197,94,0.4) !important; }
          span, h1, h2, h3, h4, h5, label, p, i {
            color: #22c55e !important;
            font-family: monospace !important;
          }
          .text-sap-primary, .text-blue-600, .text-sap-success, .text-sap-info, .text-emerald-400, .text-blue-400 {
            color: #22c55e !important;
          }
          .bg-sap-primary, .bg-blue-600, .bg-sap-success, .bg-[#354a5f] {
            background-color: #14532d !important;
            color: #22c55e !important;
            border: 1px solid #22c55e !important;
          }
          a { color: #22c55e !important; text-decoration: underline; }
          /* CRT Scanline simulation layer */
          .crt-scanlines {
            pointer-events: none;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
            background-size: 100% 4px;
            z-index: 999;
          }
        `;
      case 'brutalist':
        return `
          /* Industrial Brutalist override rules */
          .sap-card, .bg-white, input, select, textarea {
            background-color: #ffffff !important;
            color: #000000 !important;
            border: 3px solid #000000 !important;
            border-radius: 0px !important;
            box-shadow: 4px 4px 0px 0px #000000 !important;
            transition: all 0.15s ease !important;
          }
          .sap-card:hover {
            transform: translate(-2px, -2px) !important;
            box-shadow: 6px 6px 0px 0px #000000 !important;
          }
          button {
            border: 2px solid #000000 !important;
            border-radius: 0px !important;
            box-shadow: 2px 2px 0px 0px #000000 !important;
            transition: all 0.1s ease !important;
          }
          button:active {
            transform: translate(2px, 2px) !important;
            box-shadow: 0px 0px 0px 0px #000000 !important;
          }
          th, thead {
            background-color: #f1f5f9 !important;
            color: #000000 !important;
            border-bottom: 3px solid #000000 !important;
          }
          span, h1, h2, h3, h4, label, p, td {
            color: #000000 !important;
            font-weight: 700 !important;
          }
          .text-sap-primary, .text-blue-600 {
            color: #000000 !important;
            text-decoration: underline !important;
          }
          .bg-sap-primary, .bg-blue-600 {
            background-color: #fbbf24 !important;
            color: #000000 !important;
          }
          .bg-sap-success {
            background-color: #4ade80 !important;
            color: #000000 !important;
          }
        `;
      case 'cosmic-slate':
        return `
          /* Deep Cosmic Dark Slate override rules */
          body { background-color: #030712 !important; color: #f1f5f9 !important; }
          .sap-card, .bg-white, .sap-table-row {
            background-color: #0b0f19 !important;
            color: #f1f5f9 !important;
            border: 1px solid #1e293b !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45) !important;
          }
          input, select, textarea {
            background-color: #030712 !important;
            color: #f1f5f9 !important;
            border: 1px solid #1e293b !important;
            border-radius: 6px !important;
          }
          span, h1, h2, h3, h4, h5, p, label, td, th {
            color: #e2e8f0 !important;
          }
          .text-sap-text-secondary {
            color: #94a3b8 !important;
          }
          th, thead {
            background-color: #030712 !important;
            border-bottom-color: #1e293b !important;
          }
          .text-sap-primary, .text-blue-600 {
            color: #38bdf8 !important;
          }
          .bg-sap-primary, .bg-blue-600 {
            background-color: #7c3aed !important;
            color: #ffffff !important;
          }
        `;
      case 'macos-aqua':
        return `
          /* macOS Aqua metallic look override rules */
          .sap-card, .bg-white, .sap-table-row {
            background-color: #ffffff !important;
            color: #1c1c1e !important;
            border: 1px solid #d2d2d7 !important;
            border-radius: 12px !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05) !important;
          }
          input, select, textarea {
            background-color: #f5f5f7 !important;
            color: #1c1c1e !important;
            border: 1px solid #d2d2d7 !important;
            border-radius: 8px !important;
          }
          button {
            border-radius: 8px !important;
          }
        `;
      case 'fluent-windows':
        return `
          /* Windows 11 Fluent Acrylic override rules */
          .sap-card, .bg-white, .sap-table-row {
            background-color: rgba(255, 255, 255, 0.85) !important;
            backdrop-filter: blur(12px) !important;
            color: #201f1e !important;
            border: 1px solid #e5e5e5 !important;
            border-radius: 8px !important;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04) !important;
          }
          input, select, textarea {
            background-color: #ffffff !important;
            color: #201f1e !important;
            border: 1px solid #cccccc !important;
            border-radius: 4px !important;
          }
          button {
            border-radius: 4px !important;
          }
        `;
      case 'sap-horizon':
      default:
        return '';
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${getThemeBaseClass()} relative`}>
      
      {/* Dynamic Style Overrides Sheet Injection */}
      <style>{renderDynamicThemeOverrides()}</style>

      {/* CRT screen distortion layer if terminal-retro theme is on */}
      {themePreset === 'mainframe-retro' && (
        <div className="absolute inset-0 crt-scanlines opacity-40" />
      )}

      {/* LEFT COMPONENT: Sidebar / Dock Controller */}
      {layoutStructure === 'sidebar-top-tabs' && <Sidebar />}

      {/* LEFT COMPONENT: Slim Vertical Dock Launcher (If Layout is 'compact-dock' or 'mdi-windowed' without side rail) */}
      {(layoutStructure === 'compact-dock' || layoutStructure === 'mdi-windowed') && (
        <aside className={`w-16 border-r flex flex-col items-center py-4 gap-4 justify-between select-none ${
          themePreset === 'mainframe-retro' ? 'bg-black border-green-500/30' :
          themePreset === 'cosmic-slate' ? 'bg-slate-950 border-slate-900' :
          'bg-slate-900 text-white'
        }`}>
          {/* Top Logo Icon */}
          <button 
            onClick={() => setActiveTab('Dashboard')}
            className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black hover:bg-blue-500 transition-all shadow-md"
            title="Dashboard Overview"
          >
            <i className="fa-solid fa-cube text-base"></i>
          </button>

          {/* Launcher Icons Container */}
          <nav className="flex flex-col gap-2 flex-1 items-center justify-center">
            {dockItems.map(item => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  title={item.name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/35 scale-105' 
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} text-sm`}></i>
                </button>
              );
            })}
          </nav>

          {/* Bottom Help trigger */}
          <button 
            onClick={() => useEwaStore.getState().toggleRightPanel()}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Co-Pilot Help"
          >
            <i className="fa-solid fa-circle-info text-base"></i>
          </button>
        </aside>
      )}

      {/* MAIN CONTAINER WORKSPACE */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Top Header Navigation bar */}
        <Header />

        {/* WINDOWED MULTI-DOCUMENT TABS ROW (If Layout is 'mdi-windowed') */}
        {layoutStructure === 'mdi-windowed' && (
          <div className={`h-11 px-4 flex items-center border-b overflow-x-auto gap-1.5 pt-1.5 ${
            themePreset === 'mainframe-retro' ? 'bg-black border-green-500/30' :
            themePreset === 'cosmic-slate' ? 'bg-slate-950 border-slate-900' :
            'bg-slate-100/60 border-slate-200'
          }`}>
            {openTabs.map((tab) => {
              const isActive = activeTab === tab;
              const menuObj = dockItems.find(d => d.name === tab) || { icon: 'fa-table' };
              
              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`group relative h-9 px-4 flex items-center gap-2.5 rounded-t-lg text-[10px] font-bold uppercase tracking-wide cursor-pointer transition-all border-t border-x ${
                    isActive
                      ? (themePreset === 'mainframe-retro' 
                          ? 'bg-black border-green-500 text-green-400 font-extrabold h-9' 
                          : 'bg-white text-blue-700 border-slate-200 shadow-xs h-9 z-10')
                      : (themePreset === 'mainframe-retro'
                          ? 'bg-black border-transparent text-green-700 hover:text-green-500'
                          : 'bg-slate-200/50 text-slate-500 hover:bg-slate-200/90 hover:text-slate-800 border-transparent')
                  }`}
                >
                  <i className={`fa-solid ${menuObj.icon} text-[9px]`}></i>
                  <span>{tab}</span>
                  
                  {/* Close Tab element */}
                  {openTabs.length > 1 && (
                    <button
                      onClick={(e) => closeTab(tab, e)}
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition"
                      title="Close Tab"
                    >
                      <i className="fa-solid fa-xmark text-[8px]"></i>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        
        {/* Central screen modules loader */}
        <main className={`flex-1 overflow-y-auto ${
          themePreset === 'mainframe-retro' ? 'bg-black p-4' : 
          themePreset === 'cosmic-slate' ? 'bg-[#030712]/95 p-6' : 'bg-slate-50/40 p-6'
        }`}>
          {renderActiveModule(activeTab)}
        </main>
        
        {/* Immense high-fidelity bottom telemetry footer */}
        {showTelemetry && (
          <footer className={`h-6 flex items-center justify-between px-6 shrink-0 text-[9px] font-mono border-t ${
            themePreset === 'mainframe-retro' ? 'bg-black border-green-500/20 text-green-500/70' :
            themePreset === 'cosmic-slate' ? 'bg-slate-950 border-slate-900 text-slate-500' :
            'bg-slate-100 border-slate-200 text-slate-500'
          }`}>
            <div className="flex gap-4 items-center">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-circle-check text-emerald-500 text-[8px]"></i>
                Region: us-east-1 (FedNow Active)
              </span>
              <span className="hidden md:inline">• Channel: Instant RTP Synced</span>
              <span className="hidden lg:inline">• Oracle Parity: 100% OK</span>
            </div>
            <div>© 2026 EWA Enterprise Platform • SOC-2 Secure</div>
          </footer>
        )}

      </div>

      {/* RIGHT SIDEBAR PANEL: Help / Contextual Co-Pilot */}
      {isRightPanelOpen && <RightPanel />}

      {/* PERSISTENT FLOATING ARCHITECT CUSTOMIZER CO-PILOT */}
      <SystemCustomizer />

    </div>
  );
}
