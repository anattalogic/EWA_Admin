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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Automation</span>
            <span>/</span>
            <span className="text-blue-600">Compliance rules</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Visual Rules Engine</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rules Builder form panel left */}
        <div className="bg-white p-5 border rounded-lg shadow-sm lg:col-span-2 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dynamic Policy Parameters</h3>
          <p className="text-[11px] text-slate-400">Configure parameters for automatic instant clearing. EWA requests failing these gates are routed to treasury admin queue.</p>

          <div className="space-y-4">
            
            {/* Rule 1: Tenure gate */}
            <div className="p-4 bg-slate-50 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-slate-800">Rule 1: Minimum Employee Tenure Gate</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded">AUTO_TENURE</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs text-slate-500 font-semibold shrink-0">IF Employee Tenure Months is greater than</span>
                <input 
                  type="number" 
                  value={tenureRule} 
                  onChange={e => setTenureRule(Number(e.target.value))}
                  className="w-16 text-xs font-bold font-mono p-1 border rounded text-center" 
                />
                <span className="text-xs text-slate-500">Months</span>
              </div>
            </div>

            {/* Rule 2: Drawdown Gate */}
            <div className="p-4 bg-slate-50 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-slate-800">Rule 2: Accrued Wages Drawdown Threshold</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded">LIMIT_WAGE</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs text-slate-500 font-semibold shrink-0">IF Drawdown Request represents less than</span>
                <input 
                  type="number" 
                  value={wagePercentage} 
                  onChange={e => setWagePercentage(Number(e.target.value))}
                  className="w-16 text-xs font-bold font-mono p-1 border rounded text-center" 
                />
                <span className="text-xs text-slate-500">% of accrued net earned wage balance</span>
              </div>
            </div>

            {/* Rule 3: Risk matrix limit */}
            <div className="p-4 bg-slate-50 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-slate-800">Rule 3: Algorithmic Fraud Score Threshold</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded">RISK_LIMIT</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs text-slate-500 font-semibold shrink-0">IF Automated Risk Score is below</span>
                <input 
                  type="number" 
                  value={riskLimit} 
                  onChange={e => setRiskLimit(Number(e.target.value))}
                  className="w-16 text-xs font-bold font-mono p-1 border rounded text-center" 
                />
                <span className="text-xs text-slate-500">out of 100</span>
              </div>
            </div>

          </div>
        </div>

        {/* Rule Testing Simulator right */}
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dynamic Rule Simulator</h3>
            <p className="text-[11px] text-slate-400">Run sandbox simulations using real employee profiles against the above active parameters.</p>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Employee</label>
              <select
                value={selectedEmpId}
                onChange={e => setSelectedEmpId(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border rounded-md"
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} (Tenure: {emp.tenureMonths}m | Earned: ${emp.accruedWages})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Simulated Amount ($)</label>
              <input
                type="number"
                value={testAmount}
                onChange={e => setTestAmount(Number(e.target.value))}
                className="w-full text-xs p-2 border rounded-md font-mono"
              />
            </div>

            <button
              onClick={handleRunSimulation}
              className="w-full py-2 bg-slate-900 text-white font-bold rounded-md text-xs transition"
            >
              Execute Sandbox Simulation
            </button>
          </div>

          {/* Test results indicator */}
          <div className="pt-4 border-t border-slate-100">
            {simResult ? (
              <div className={`p-4 rounded-lg text-xs border ${
                simResult.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5 uppercase mb-1">
                  <i className={`fa-solid ${simResult.passed ? 'fa-circle-check text-emerald-600' : 'fa-triangle-exclamation text-rose-600'}`}></i>
                  {simResult.passed ? 'Compliance Passed (PASS)' : 'Compliance Denied (FAIL)'}
                </div>
                <p className="text-[11px] mt-1 leading-relaxed">{simResult.message}</p>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Run sandbox above to compile rule results.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
