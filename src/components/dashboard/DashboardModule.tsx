import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { WorkflowWizard } from '../workflow/WorkflowWizard';

export function DashboardModule() {
  const { companies, transactions, bankAccounts, glAccounts, tasks } = useEwaStore();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const totalCreditLimit = companies.reduce((sum, c) => sum + c.creditLimit, 0);
  const totalPrefund = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;
  const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);
  const totalOutstanding = transactions.reduce((sum, t) => sum + t.outstanding, 0);
  const employeeReceivable = glAccounts.find(g => g.id === '1400')?.balance || 0;

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
      
      {/* Workflow Overlay */}
      {selectedTaskId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex justify-end">
          <div className="w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-300">
            <WorkflowWizard taskId={selectedTaskId} onClose={() => setSelectedTaskId(null)} />
          </div>
        </div>
      )}

      {/* Page Header (Fiori Style) */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold">
          <span>Treasury Management</span>
          <i className="fa-solid fa-chevron-right text-[8px]"></i>
          <span className="text-sap-primary">Executive Overview</span>
        </div>
        <h1 className="text-2xl font-semibold text-sap-text tracking-tight">Analytical Dashboard</h1>
      </div>

      {/* KPI Tiles Strip (SAP Pattern) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI Tile: Liquidity */}
        <div className="sap-card p-4 flex flex-col justify-between hover:border-sap-primary cursor-pointer transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-sap-text-secondary uppercase tracking-tight">Net Liquidity</span>
            <i className="fa-solid fa-chart-line text-sap-primary/40 group-hover:text-sap-primary transition-colors"></i>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-sap-text font-mono">${totalPrefund.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-sap-success font-bold">+2.4%</span>
              <span className="text-[10px] text-sap-text-secondary">vs. last month</span>
            </div>
          </div>
        </div>

        {/* KPI Tile: Consolidated Outstanding */}
        <div className="sap-card p-4 flex flex-col justify-between hover:border-sap-primary cursor-pointer transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-sap-text-secondary uppercase tracking-tight">Consolidated Outstanding</span>
            <i className="fa-solid fa-receipt text-sap-error/40 group-hover:text-sap-error transition-colors"></i>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-sap-text font-mono">${totalOutstanding.toLocaleString()}</div>
            <div className="text-[10px] text-sap-text-secondary mt-1">
              Unsettled Balances (Net)
            </div>
          </div>
        </div>

        {/* KPI Tile: Pending Volume */}
        <div className="sap-card p-4 flex flex-col justify-between hover:border-sap-primary cursor-pointer transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-sap-text-secondary uppercase tracking-tight">Pending Volume</span>
            <i className="fa-solid fa-clock text-sap-info/40 group-hover:text-sap-info transition-colors"></i>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-sap-text font-mono">${pendingAmount.toLocaleString()}</div>
            <div className="text-[10px] text-sap-text-secondary mt-1">
              Count: <span className="font-bold text-sap-text">{transactions.filter(t => t.status === 'Pending').length} requests</span>
            </div>
          </div>
        </div>

        {/* KPI Tile: System Health */}
        <div className="sap-card p-4 flex flex-col justify-between hover:border-sap-primary cursor-pointer transition-colors group">
          <div className="flex justify-between items-start">
            <span className="text-[12px] font-bold text-sap-text-secondary uppercase tracking-tight">System Status</span>
            <i className="fa-solid fa-server text-sap-success/40 group-hover:text-sap-success transition-colors"></i>
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold text-sap-success flex items-center gap-2">
              <span className="w-2 h-2 bg-sap-success rounded-full animate-pulse"></span>
              Operational
            </div>
            <div className="text-[10px] text-sap-text-secondary mt-1 italic">
              FedNow/RTP: Active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid (Slots) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Slot */}
        <div className="lg:col-span-2 sap-card overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-sap-text uppercase tracking-tight">Disbursement Velocity (14 Days)</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-sap-border text-[10px] font-bold rounded hover:bg-slate-100 transition shadow-sm">Export PDF</button>
              <button className="px-3 py-1 bg-sap-primary text-white text-[10px] font-bold rounded hover:bg-sap-primary/90 transition shadow-sm">View Full Data</button>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] p-6 flex flex-col">
            <div className="flex-1 relative bg-slate-50 rounded border border-dashed border-slate-300 flex items-center justify-center">
              <div className="text-center space-y-2">
                <i className="fa-solid fa-chart-area text-slate-300 text-5xl"></i>
                <p className="text-[11px] text-slate-400 font-medium italic">High-Fidelity Real-time Visualization Slot</p>
              </div>
            </div>
            <div className="mt-4 flex gap-8 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-sap-primary rounded-sm"></span>
                <span className="text-[11px] text-sap-text font-medium uppercase tracking-tighter">Automatic Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-sap-warning rounded-sm"></span>
                <span className="text-[11px] text-sap-text font-medium uppercase tracking-tighter">Manual Approvals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel Slot: Quick Actions & Alerts */}
        <div className="space-y-6">
          <div className="sap-card">
            <div className="p-3 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-xs font-bold text-sap-text uppercase tracking-tight">Actionable Tasks</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-sap-primary text-[9px] font-bold rounded-full">
                {tasks.filter(t => t.status === 'Pending').length}
              </span>
            </div>
            <div className="p-3 space-y-3">
              {tasks.map(task => (
                <button 
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className="w-full text-left flex items-start gap-3 p-2 bg-white border border-sap-border rounded-sm hover:border-sap-primary hover:bg-blue-50 transition group"
                >
                  <div className={`p-2 rounded-sm ${
                    task.priority === 'High' ? 'bg-red-50 text-sap-error' : 'bg-blue-50 text-sap-primary'
                  }`}>
                    <i className={`fa-solid ${task.type === 'BUDGET_REQUEST' ? 'fa-vault' : 'fa-clipboard-check'} text-xs`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-sap-text group-hover:text-sap-primary uppercase tracking-tight">{task.type.replace('_', ' ')}</div>
                    <div className="text-[9px] text-sap-text-secondary font-mono mt-0.5">{task.id} • Assigned to you</div>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`px-1.5 py-0.5 rounded-sm text-[8px] font-bold uppercase ${
                         task.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                       }`}>{task.status}</span>
                       <span className="text-[8px] text-slate-400 italic">2h ago</span>
                    </div>
                  </div>
                </button>
              ))}
              
              <div className="flex items-center gap-3 p-2 bg-red-50 border-l-4 border-sap-error rounded-r shadow-sm">
                <i className="fa-solid fa-triangle-exclamation text-sap-error text-sm"></i>
                <div className="flex-1">
                  <div className="text-[11px] font-bold text-red-900">Low Liquidity Warning</div>
                  <div className="text-[9px] text-red-700">Prefund Account (C-01) below threshold.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sap-card">
            <div className="p-3 border-b bg-slate-50">
              <h3 className="text-xs font-bold text-sap-text uppercase tracking-tight">System Integrations</h3>
            </div>
            <div className="p-3 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                    <i className="fa-solid fa-database text-sap-info text-sm"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-sap-text">Oracle Cloud</span>
                    <span className="text-[9px] text-sap-text-secondary italic">Last Sync: 10m ago</span>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-sap-success uppercase">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                    <i className="fa-brands fa-aws text-orange-500 text-sm"></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-sap-text">AWS Ledger</span>
                    <span className="text-[9px] text-sap-text-secondary italic">Last Sync: 2m ago</span>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-sap-success uppercase">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
