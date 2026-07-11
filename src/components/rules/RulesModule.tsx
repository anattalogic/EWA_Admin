import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function RulesModule() {
  const { employees } = useEwaStore();
  const [tenureRule, setTenureRule] = useState(6);
  const [riskLimit, setRiskLimit] = useState(70);
  const [wagePercentage, setWagePercentage] = useState(50);
  
  // Test simulation
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [testAmount, setTestAmount] = useState(150);
  const [simResult, setSimResult] = useState<{ passed: boolean; message: string } | null>(null);

  const handleRunSimulation = () => {
    const emp = employees.find(e => e.id === selectedEmpId);
    if (!emp) return;

    const tenureCheck = emp.tenureMonths >= tenureRule;
    const limitCheck = testAmount <= (emp.accruedWages * (wagePercentage / 100));
    
    let passed = true;
    let message = 'All compliance rules cleared successfully. Auto-Approved.';

    if (!tenureCheck) {
      passed = false;
      message = `Auto-Approval Failed: Tenure of ${emp.firstName} is ${emp.tenureMonths} months (Rule expects >= ${tenureRule} months). Manual Treasury verification forced.`;
    } else if (!limitCheck) {
      passed = false;
      message = `Auto-Approval Failed: Requested amount of $${testAmount} exceeds available drawdown bracket of ${wagePercentage}% of accrued wages ($${(emp.accruedWages * (wagePercentage / 100)).toFixed(2)}).`;
    }

    setSimResult({ passed, message });
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Automation</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Business Logic</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Rules Engine</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Rules Builder */}
          <div className="sap-card p-6 lg:col-span-2 space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Dynamic Policy Definitions</h3>
            
            <div className="space-y-4">
              
              {/* Rule 1: Tenure gate */}
              <div className="p-5 bg-slate-50 border border-sap-border rounded-sm space-y-4 group hover:border-sap-primary transition">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[11px] text-sap-text uppercase tracking-tight">Rule 1: Personnel Tenure Gate</span>
                  <span className="text-[9px] bg-blue-50 text-sap-primary font-mono font-bold px-2 py-0.5 border border-blue-100 rounded-sm">AUTO_TENURE</span>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                  <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">IF Tenure Duration (Months) is greater than or equal to</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={tenureRule} 
                      onChange={e => setTenureRule(Number(e.target.value))}
                      className="w-16 text-xs font-bold font-mono p-2 border border-sap-border rounded-sm text-center bg-white focus:ring-1 focus:ring-sap-primary outline-none" 
                    />
                    <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">Months</span>
                  </div>
                </div>
              </div>

              {/* Rule 2: Drawdown Gate */}
              <div className="p-5 bg-slate-50 border border-sap-border rounded-sm space-y-4 group hover:border-sap-primary transition">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[11px] text-sap-text uppercase tracking-tight">Rule 2: Accrual Yield Threshold</span>
                  <span className="text-[9px] bg-blue-50 text-sap-primary font-mono font-bold px-2 py-0.5 border border-blue-100 rounded-sm">LIMIT_ACCRUAL</span>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                  <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">IF Advance Request represents less than or equal to</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={wagePercentage} 
                      onChange={e => setWagePercentage(Number(e.target.value))}
                      className="w-16 text-xs font-bold font-mono p-2 border border-sap-border rounded-sm text-center bg-white focus:ring-1 focus:ring-sap-primary outline-none" 
                    />
                    <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">% of Net Earned Wage</span>
                  </div>
                </div>
              </div>

              {/* Rule 3: Risk matrix limit */}
              <div className="p-5 bg-slate-50 border border-sap-border rounded-sm space-y-4 group hover:border-sap-primary transition">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[11px] text-sap-text uppercase tracking-tight">Rule 3: Algorithmic Scoping Threshold</span>
                  <span className="text-[9px] bg-blue-50 text-sap-primary font-mono font-bold px-2 py-0.5 border border-blue-100 rounded-sm">RISK_PROTOCOL</span>
                </div>
                <div className="flex gap-4 items-center flex-wrap">
                  <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">IF Automated Audit Score is below</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={riskLimit} 
                      onChange={e => setRiskLimit(Number(e.target.value))}
                      className="w-16 text-xs font-bold font-mono p-2 border border-sap-border rounded-sm text-center bg-white focus:ring-1 focus:ring-sap-primary outline-none" 
                    />
                    <span className="text-[11px] text-sap-text-secondary font-bold uppercase tracking-tighter">Units (0-100)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Rule Testing Simulator */}
          <div className="sap-card p-6 flex flex-col justify-between h-fit sticky top-6 bg-white border-l-4 border-l-sap-primary">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Audit Simulator</h3>
              <p className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter italic">Execute policy validation against production-mirrored personnel data.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Personnel Object</label>
                  <select
                    value={selectedEmpId}
                    onChange={e => setSelectedEmpId(e.target.value)}
                    className="w-full text-[11px] p-2.5 bg-slate-50 border border-sap-border rounded-sm font-bold text-sap-text outline-none focus:ring-1 focus:ring-sap-primary"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} (Tenure: {emp.tenureMonths}m)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest mb-1.5">Test Principal ($)</label>
                  <input
                    type="number"
                    value={testAmount}
                    onChange={e => setTestAmount(Number(e.target.value))}
                    className="w-full text-[11px] p-2.5 border border-sap-border rounded-sm font-mono font-bold text-sap-text outline-none focus:ring-1 focus:ring-sap-primary"
                  />
                </div>

                <button
                  onClick={handleRunSimulation}
                  className="w-full py-2.5 bg-sap-shell text-white font-bold rounded-sm text-[11px] uppercase tracking-widest transition shadow-sm hover:bg-sap-shell/90"
                >
                  <i className="fa-solid fa-microchip mr-2"></i>
                  Execute Protocol
                </button>
              </div>
            </div>

            {/* Test results */}
            <div className="mt-6 pt-6 border-t border-sap-border min-h-[120px]">
              {simResult ? (
                <div className={`p-4 rounded-sm border animate-in fade-in zoom-in-95 duration-200 ${
                  simResult.passed ? 'bg-emerald-50 border-emerald-200 text-sap-success' : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <div className="font-bold flex items-center gap-2 uppercase tracking-widest text-[10px] mb-2">
                    <i className={`fa-solid ${simResult.passed ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                    {simResult.passed ? 'Protocol Passed' : 'Compliance Denied'}
                  </div>
                  <p className="text-[11px] font-bold tracking-tight leading-relaxed">{simResult.message}</p>
                </div>
              ) : (
                <div className="p-8 text-center text-sap-text-secondary italic">
                  <i className="fa-solid fa-vial-circle-check text-4xl text-slate-100 block mb-3"></i>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting Simulation</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
