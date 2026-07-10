import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function ReportsModule() {
  const { transactions, companies } = useEwaStore();
  const [reportType, setReportType] = useState('Disbursement Summary');

  const reportList = [
    'Disbursement Summary',
    'Collection Variance',
    'Outstanding Advances',
    'P&L Statement (YTD)',
    'Enterprise Utilization',
    'Audit Trail Export'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Operations</span>
            <span>/</span>
            <span className="text-blue-600">Reporting Engine</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Financial Intelligence Center</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition">
            <i className="fa-solid fa-calendar-days mr-2"></i> Custom Date Range
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Report Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 border rounded-lg shadow-sm space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Available Reports</h3>
            {reportList.map(rep => (
              <button
                key={rep}
                onClick={() => setReportType(rep)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-semibold transition ${
                  reportType === rep ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {rep}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-4 border rounded-lg space-y-3">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase">Export Templates</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 bg-white border rounded hover:border-blue-400 transition text-[11px]">
                <span className="flex items-center gap-2"><i className="fa-solid fa-file-excel text-emerald-600"></i> XLSX Ledger</span>
                <i className="fa-solid fa-download text-slate-300"></i>
              </button>
              <button className="w-full flex items-center justify-between p-2 bg-white border rounded hover:border-blue-400 transition text-[11px]">
                <span className="flex items-center gap-2"><i className="fa-solid fa-file-pdf text-rose-600"></i> PDF Statement</span>
                <i className="fa-solid fa-download text-slate-300"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border rounded-lg shadow-sm flex flex-col min-h-[600px]">
            <div className="p-5 border-b flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{reportType}</h3>
                <p className="text-[11px] text-slate-400 mt-1">Generated: 2026-07-10 07:30 UTC • Parameters: Global Aggregation</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition"><i className="fa-solid fa-print"></i></button>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition"><i className="fa-solid fa-share-nodes"></i></button>
              </div>
            </div>

            {/* Mock Report Data Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase border-b">
                    <th className="p-4">Entity</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4 text-right">Net Value ($)</th>
                    <th className="p-4 text-right">Yield ($)</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Variance (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {companies.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[9px] text-slate-400">{c.code}</div>
                      </td>
                      <td className="p-4 font-mono">142 Txns</td>
                      <td className="p-4 text-right font-mono font-bold">${(c.budgetUtilized * 1.2).toLocaleString()}</td>
                      <td className="p-4 text-right font-mono text-emerald-700">${(c.budgetUtilized * 0.05).toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-bold uppercase tracking-tight">Cleared</span>
                      </td>
                      <td className="p-4 text-right font-mono text-slate-400">+0.12%</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-bold border-t-2">
                    <td className="p-4 text-slate-900 uppercase tracking-tighter">Aggregated Totals</td>
                    <td className="p-4 font-mono">284 Txns</td>
                    <td className="p-4 text-right font-mono text-slate-950">${companies.reduce((sum, c) => sum + c.budgetUtilized * 1.2, 0).toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-emerald-800">${companies.reduce((sum, c) => sum + c.budgetUtilized * 0.05, 0).toLocaleString()}</td>
                    <td className="p-4"></td>
                    <td className="p-4 text-right text-emerald-600">0.00% Variance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t flex justify-center">
              <nav className="flex gap-1">
                <button className="px-3 py-1 bg-white border rounded text-[10px] hover:bg-slate-50 transition">Previous</button>
                <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded text-[10px]">1</button>
                <button className="px-3 py-1 bg-white border rounded text-[10px] hover:bg-slate-50 transition">Next</button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
