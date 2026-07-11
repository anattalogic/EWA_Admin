import React from 'react';
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RightPanel } from "./RightPanel";
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

export function AppShell() {
  const { activeTab, isRightPanelOpen } = useEwaStore();

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardModule />;
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

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Central content container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Header Component */}
        <Header />
        
        {/* Module Content Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50/35">
          {renderActiveModule()}
        </main>
        
        {/* Footer info bar */}
        <footer className="h-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between px-6 shrink-0 text-[10px] font-mono text-slate-500">
          <div className="flex gap-4">
            <span>Region: us-east-1 (Primary AWS Vault)</span>
            <span>Channel: Direct FedNow Cleared</span>
            <span>Database Parity: Synced (OK)</span>
          </div>
          <div>© 2026 EWA Enterprise Platform • Build Stable 4.2.0</div>
        </footer>

      </div>

      {/* Right Intelligence & Auditing Panel */}
      {isRightPanelOpen && <RightPanel />}

    </div>
  );
}
