import React from 'react';
import { KPICard } from './KPICard';
import { useEwaStore } from '../../app/store';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

export function DashboardModule() {
  const { 
    bankAccounts, 
    transactions, 
    glAccounts, 
    employees, 
    companies,
    disburseTransaction 
  } = useEwaStore();

  // Metrics calculation
  const totalPrefund = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;
  const outstandingAdvance = employees.reduce((sum, e) => sum + e.outstanding, 0);
  const totalReceivable = glAccounts.find(g => g.id === '1400')?.balance || 0;
  const totalRevenue = glAccounts.find(g => g.id === '4100')?.balance || 0;
  
  const pendingRequests = transactions.filter(t => t.status === 'Pending' || t.status === 'Approved');
  const pendingValue = pendingRequests.reduce((sum, t) => sum + t.amount, 0);
  
  // Chart Data preparation
  const disbursementChartData = [
    { name: 'Jan', amount: 145000 },
    { name: 'Feb', amount: 182000 },
    { name: 'Mar', amount: 210000 },
    { name: 'Apr', amount: 195000 },
    { name: 'May', amount: 240000 },
    { name: 'Jun', amount: 285000 },
    { name: 'Jul', amount: 320000 + outstandingAdvance }
  ];

  const bankAccountPieData = bankAccounts.map(ba => ({
    name: ba.name,
    value: ba.balance
  }));

  const COLORS = ['#1e3a8a', '#3b82f6', '#06b6d4', '#10b981'];

  return (
    <div className="space-y-6">
      {/* Dynamic Dashboard Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Platform</span>
            <span>/</span>
            <span className="text-blue-600">Enterprise Dashboard</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Liquidity & Treasury Control</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md text-xs font-bold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>LIVE BANK CORE PARITY</span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Available Prefund Liquidity" 
          value={`$${totalPrefund.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtext="SVB & Chase vaults aggregated"
          iconClass="fa-vault"
          trend={{ value: 'Stable', type: 'neutral' }}
          colorClass="border-blue-100"
        />
        <KPICard 
          title="Outstanding EWA Advance" 
          value={`$${outstandingAdvance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtext="Active wage withdrawal balances"
          iconClass="fa-hand-holding-dollar"
          trend={{ value: '+8.4% MoM', type: 'up' }}
          colorClass="border-orange-100"
        />
        <KPICard 
          title="Total Ledger Receivable" 
          value={`$${totalReceivable.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtext="To be deducted in next cycle"
          iconClass="fa-receipt"
          trend={{ value: '99.8% Match', type: 'up' }}
          colorClass="border-cyan-100"
        />
        <KPICard 
          title="Aggregated EWA Revenue" 
          value={`$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtext="Accumulated platform processing fees"
          iconClass="fa-coins"
          trend={{ value: '1.5% - 2.9% yield', type: 'up' }}
          colorClass="border-emerald-100"
        />
      </div>

      {/* Main Charts & Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recharts Bar Chart: EWA Disbursements */}
        <div className="bg-white p-5 border rounded-lg shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">EWA Monthly Disbursements</h3>
              <p className="text-[11px] text-slate-400">Past 7 fiscal intervals</p>
            </div>
            <div className="text-xs font-mono font-bold text-blue-600">
              Total: ${(1737000 + outstandingAdvance).toLocaleString()}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disbursementChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Disbursed']} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recharts Pie Chart: Treasury Allocation */}
        <div className="bg-white p-5 border rounded-lg shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-1">Aggregate Bank Allocations</h3>
          <p className="text-[11px] text-slate-400 mb-4">Liquidity spread across custodial vaults</p>
          <div className="h-56 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bankAccountPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bankAccountPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">Total Liquidity</span>
              <span className="text-lg font-bold font-mono text-slate-900">
                ${bankAccounts.reduce((sum, b) => sum + b.balance, 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {bankAccounts.map((ba, index) => (
              <div key={ba.id} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="text-slate-600 font-medium truncate max-w-[130px]">{ba.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900">${ba.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action queues & Active queues preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Approved and Ready to Disburse */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50/70 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt-lightning text-amber-500"></i>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Fast Release Queue</h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              {transactions.filter(t => t.status === 'Approved').length} Actionable
            </span>
          </div>
          <div className="divide-y max-h-72 overflow-y-auto">
            {transactions.filter(t => t.status === 'Approved').length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                <i className="fa-regular fa-circle-check text-2xl text-slate-300 block mb-2"></i>
                All approved transactions have been disbursed. No pending queue entries.
              </div>
            ) : (
              transactions.filter(t => t.status === 'Approved').map(t => (
                <div key={t.id} className="p-3 hover:bg-slate-50 transition flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.employeeName}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{t.companyName}</span>
                      <span>•</span>
                      <span className="font-mono text-blue-600">{t.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-slate-950">${t.amount.toFixed(2)}</div>
                      <div className="text-[9px] text-slate-400">Fee: ${t.feeAmount.toFixed(2)}</div>
                    </div>
                    <button 
                      onClick={() => disburseTransaction(t.id, 'Alex Chen')}
                      className="px-2.5 py-1.5 bg-blue-600 text-white font-bold rounded-md text-[10px] hover:bg-blue-700 transition"
                    >
                      <i className="fa-solid fa-paper-plane mr-1"></i>
                      Disburse
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Integration Status / Platform Pulse */}
        <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Enterprise Integration Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs border-b pb-2">
                <span className="text-slate-500 font-medium">Oracle Fusion ERP Ledger Sync</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  <i className="fa-solid fa-link mr-1"></i>CONNECTED
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-b pb-2">
                <span className="text-slate-500 font-medium">ADP Workforce Now API Feed</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  <i className="fa-solid fa-rotate mr-1"></i>10m SYNCED
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-b pb-2">
                <span className="text-slate-500 font-medium">Chase Bank FedNow Real-Time Channel</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  <i className="fa-solid fa-wifi mr-1"></i>OPERATIONAL
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Secured Vault Custodial Vault Encryption</span>
                <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                  <i className="fa-solid fa-shield-halved mr-1"></i>AES-256 GCM
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 text-slate-200 rounded-lg p-3 text-xs font-mono mt-4">
            <div className="text-slate-500 border-b border-slate-800 pb-1 mb-1">Double-Entry Posting Protocol</div>
            <div className="flex justify-between text-slate-300">
              <span>Debit: 1400 Employee Receivable</span>
              <span className="text-cyan-400">+ $Value</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Credit: 1200 Prefund Bank Account</span>
              <span className="text-rose-400">- $Net</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Credit: 4100 Processing Fee Revenue</span>
              <span className="text-emerald-400">- $Fee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
