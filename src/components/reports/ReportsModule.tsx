import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { ReusableTabs } from '../ui/ReusableTabs';

export function ReportsModule() {
  const { companies, transactions, invoices, activeSubTabs, setActiveSubTab } = useEwaStore();
  const activeSubTab = (activeSubTabs['Reporting Hub'] || 'Analytics') as 'Analytics' | 'Ledger Reports' | 'Invoices';

  const [reportType, setReportType] = useState('Disbursement Detail Audit');

  const reportList = [
    'Disbursement Detail Audit',
    'Collection Variance',
    'Outstanding Advances',
    'Balance Sheet (Summary)',
    'Balance Sheet (Details)',
    'Enterprise Utilization'
  ];

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Decision Intelligence</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Reporting Hub</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Enterprise Analytics</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 border border-sap-border bg-white text-sap-text rounded text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2">
            <i className="fa-solid fa-file-excel text-emerald-600"></i>
            Export Excel
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <ReusableTabs 
          tabs={['Analytics', 'Ledger Reports', 'Invoices']} 
          activeTab={activeSubTab} 
          onTabChange={(tab) => setActiveSubTab('Reporting Hub', tab)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeSubTab === 'Analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="sap-card p-4 space-y-1">
                <h3 className="text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-3">Master Reports</h3>
                {reportList.map(rep => (
                  <button
                    key={rep}
                    onClick={() => setReportType(rep)}
                    className={`w-full text-left px-3 py-2 rounded-sm text-[11px] font-bold transition flex items-center justify-between group ${
                      reportType === rep ? 'bg-blue-50 text-sap-primary border-l-4 border-sap-primary' : 'text-sap-text-secondary hover:bg-slate-50'
                    }`}
                  >
                    <span>{rep}</span>
                    <i className={`fa-solid fa-chevron-right text-[9px] opacity-0 group-hover:opacity-100 transition ${reportType === rep ? 'opacity-100' : ''}`}></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sap-card flex flex-col min-h-[600px] overflow-hidden">
                <div className="p-5 border-b bg-white flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-sap-text uppercase tracking-tight">{reportType}</h3>
                    <p className="text-[10px] text-sap-text-secondary mt-1 font-mono uppercase tracking-tighter font-bold">
                      System Generated: 2026-07-10 07:30 UTC • Parameters: Global Aggregation
                    </p>
                  </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 overflow-x-auto bg-white">
                  {reportType === 'Disbursement Detail Audit' ? (
                    <table className="w-full text-left text-[11px] border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold text-sap-text-secondary uppercase border-b tracking-tight">
                          <th className="p-4">Reference</th>
                          <th className="p-4">Beneficiary</th>
                          <th className="p-4">Entity Unit</th>
                          <th className="p-4 text-right">Gross Amount</th>
                          <th className="p-4 text-right">Fee Yield</th>
                          <th className="p-4 text-right">Net Value</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y font-mono">
                        {transactions.map(txn => (
                          <tr key={txn.id} className="sap-table-row hover:bg-slate-50/50 transition">
                            <td className="p-4 font-bold text-sap-primary uppercase">{txn.id}</td>
                            <td className="p-4">
                              <div className="font-bold text-sap-text font-sans">{txn.employeeName}</div>
                              <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest">{txn.employeeId}</div>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-sap-text font-sans">{txn.companyName}</div>
                              <div className="text-[9px] text-sap-text-secondary uppercase font-bold tracking-widest">GL: 1400-001</div>
                            </td>
                            <td className="p-4 text-right font-bold text-sap-text">${txn.amount.toLocaleString()}</td>
                            <td className="p-4 text-right font-bold text-sap-success">${txn.feeAmount.toLocaleString()}</td>
                            <td className="p-4 text-right font-bold text-sap-primary">${txn.netDisbursed.toLocaleString()}</td>
                            <td className="p-4 text-center">
                              <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase border ${
                                txn.status === 'Disbursed' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                              }`}>
                                {txn.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-20 text-center text-slate-300 italic font-bold uppercase tracking-widest text-xs">
                      Rendering Analytical Model View...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Invoices' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 gap-6">
               {invoices.map(inv => (
                 <div key={inv.id} className="sap-card overflow-hidden bg-white border-l-4 border-l-sap-primary">
                    <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                      <div>
                        <h4 className="text-[12px] font-bold text-sap-text uppercase tracking-tight">{inv.companyName}</h4>
                        <p className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-widest mt-0.5">{inv.billingPeriod} • Invoice #{inv.id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase border ${
                        inv.status === 'Sent' ? 'bg-blue-50 text-sap-primary border-blue-200' : 'bg-emerald-50 text-sap-success border-emerald-200'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest">Service Revenue</div>
                        <div className="text-lg font-mono font-bold text-sap-text">${inv.totalServiceFees.toLocaleString()}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest">Disbursed Volume</div>
                        <div className="text-lg font-mono font-bold text-sap-text">${inv.totalDisbursements.toLocaleString()}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest">Repayment Pool</div>
                        <div className="text-lg font-mono font-bold text-sap-text">${inv.totalRepayments.toLocaleString()}</div>
                      </div>
                      <div className="space-y-1 bg-sap-shell text-white p-3 rounded-sm shadow-xl">
                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Net Payable (MMK)</div>
                        <div className="text-xl font-mono font-bold text-sap-primary tracking-tighter">${inv.netPayable.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="border-t border-sap-border pt-4">
                        <h5 className="text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-3">Line Item Itemization</h5>
                        <div className="space-y-2">
                          {inv.lineItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 rounded-sm hover:bg-blue-50 transition border border-transparent hover:border-blue-100">
                              <span className="font-bold text-sap-text uppercase tracking-tight">{item.serviceName} ({item.count} Actions)</span>
                              <span className="font-mono font-bold text-sap-text">${item.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
