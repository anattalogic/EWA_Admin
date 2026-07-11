import { create } from 'zustand';
import { 
  Company, 
  Employee, 
  Budget, 
  FeePolicy, 
  Transaction, 
  GLAccount, 
  BankAccount, 
  BankStatementLine, 
  Workflow, 
  AuditLog, 
  ActivityLog,
  SystemConfiguration,
  JournalEntry,
  JournalDetail,
  ServiceDefinition,
  Invoice,
  WorkflowTask,
  TaskAction
} from '../types';
import {
  INITIAL_COMPANIES,
  INITIAL_EMPLOYEES,
  INITIAL_BUDGETS,
  INITIAL_FEE_POLICIES,
  INITIAL_TRANSACTIONS,
  INITIAL_GL_ACCOUNTS,
  INITIAL_BANK_ACCOUNTS,
  INITIAL_BANK_STATEMENTS,
  INITIAL_WORKFLOWS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ACTIVITY_LOGS,
  SYSTEM_CONFIGS,
  INITIAL_SERVICES,
  INITIAL_INVOICES,
  INITIAL_TASKS
} from '../data/mockData';

interface EwaStore {
  companies: Company[];
  employees: Employee[];
  budgets: Budget[];
  feePolicies: FeePolicy[];
  services: ServiceDefinition[];
  invoices: Invoice[];
  tasks: WorkflowTask[];
  transactions: Transaction[];
  glAccounts: GLAccount[];
  bankAccounts: BankAccount[];
  bankStatements: BankStatementLine[];
  workflows: Workflow[];
  auditLogs: AuditLog[];
  activityLogs: ActivityLog[];
  systemConfigs: SystemConfiguration[];
  journals: JournalEntry[];
  
  // Navigation active tab
  activeTab: string;
  activeSubTabs: Record<string, string>;
  isRightPanelOpen: boolean;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setActiveSubTab: (tab: string, subTab: string) => void;
  toggleRightPanel: () => void;
  
  // Business logic simulation actions
  addCompany: (company: Omit<Company, 'id' | 'createdDate'>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  createEwaRequest: (employeeId: string, amount: number, channel: 'Instant ACH' | 'Same-Day ACH' | 'Real-Time Payment') => void;
  approveTransaction: (id: string, user: string) => void;
  rejectTransaction: (id: string, user: string) => void;
  holdTransaction: (id: string, user: string) => void;
  disburseTransaction: (id: string, user: string) => void;
  reconcileStatement: (statementLineId: string, transactionId?: string) => void;
  importPayrollRepayment: (companyId: string, repayments: { employeeId: string; amountPaid: string | number }[]) => void;
  updateWorkflow: (nodes: any[], edges: any[]) => void;
  addAuditLog: (user: string, action: string, module: string, details: string) => void;
  addActivity: (title: string, description: string, type: 'info' | 'success' | 'warning' | 'error') => void;
  updateTask: (id: string, updates: Partial<WorkflowTask>, action: string, user: string, comment?: string) => void;
}

export const useEwaStore = create<EwaStore>((set, get) => ({
  companies: INITIAL_COMPANIES,
  employees: INITIAL_EMPLOYEES,
  budgets: INITIAL_BUDGETS,
  feePolicies: INITIAL_FEE_POLICIES,
  services: INITIAL_SERVICES,
  invoices: INITIAL_INVOICES,
  tasks: INITIAL_TASKS,
  transactions: INITIAL_TRANSACTIONS,
  glAccounts: INITIAL_GL_ACCOUNTS,
  bankAccounts: INITIAL_BANK_ACCOUNTS,
  bankStatements: INITIAL_BANK_STATEMENTS,
  workflows: INITIAL_WORKFLOWS,
  auditLogs: INITIAL_AUDIT_LOGS,
  activityLogs: INITIAL_ACTIVITY_LOGS,
  systemConfigs: SYSTEM_CONFIGS,
  journals: [
    {
      id: 'JE-001',
      reference: 'EWA-BATCH-014',
      date: '2026-07-09',
      description: 'Disbursement of David Kim EWA advance',
      status: 'Posted',
      details: [
        { accountId: '1400', accountName: 'Employee Advance Receivable', type: 'Debit', amount: 452.99 },
        { accountId: '1200', accountName: 'EWA Prefund Account', type: 'Credit', amount: 450.00 },
        { accountId: '4100', accountName: 'EWA Processing Fee Revenue', type: 'Credit', amount: 2.99 }
      ]
    }
  ],
  
  activeTab: 'Dashboard',
  activeSubTabs: {},
  isRightPanelOpen: true,
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveSubTab: (tab, subTab) => set((state) => ({ 
    activeSubTabs: { ...state.activeSubTabs, [tab]: subTab } 
  })),
  toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
  
  addCompany: (company) => set((state) => {
    const newId = `C-0${state.companies.length + 1}`;
    const newComp: Company = {
      ...company,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    // Auto-create budget
    const newBudget: Budget = {
      id: `B-0${state.budgets.length + 1}`,
      companyId: newId,
      fiscalYear: '2026',
      allocatedAmount: company.creditLimit * 0.2, // 20% limit as prefund pool
      usedAmount: 0,
      remainingAmount: company.creditLimit * 0.2,
      status: 'Active'
    };
    
    return {
      companies: [...state.companies, newComp],
      budgets: [...state.budgets, newBudget],
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Alex Chen',
          action: `Provisioned Company ${company.name}`,
          module: 'Company Setup',
          details: `Provisioned organization under code ${company.code} with $${company.creditLimit.toLocaleString()} credit line.`,
          ipAddress: '192.168.1.104'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Company Provisioned',
          description: `${company.name} successfully integrated with system credit limits.`,
          type: 'success'
        },
        ...state.activityLogs
      ]
    };
  }),

  addEmployee: (employee) => set((state) => {
    const newId = `EMP-${state.employees.length + 101}`;
    const newEmp: Employee = {
      ...employee,
      id: newId,
      ewaAvailable: Math.min(employee.salary * 0.35, employee.accruedWages * 0.5),
      usedAmount: 0,
      outstanding: 0,
      kycStatus: 'Verified'
    };
    
    return {
      employees: [...state.employees, newEmp],
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'HR Portal Sync',
          action: `Synced Employee ${employee.firstName} ${employee.lastName}`,
          module: 'Employee Portal',
          details: `Onboarded employee with accrued wages $${employee.accruedWages} and role ${employee.role}.`,
          ipAddress: '127.0.0.1'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Employee Synced',
          description: `${employee.firstName} ${employee.lastName} synced. EWA Limit calibrated.`,
          type: 'info'
        },
        ...state.activityLogs
      ]
    };
  }),

  createEwaRequest: (employeeId, amount, channel) => set((state) => {
    const emp = state.employees.find(e => e.id === employeeId);
    if (!emp) return {};
    
    const company = state.companies.find(c => c.id === emp.companyId);
    if (!company) return {};
    
    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Enhanced Fee Calculation with Tiers
    const policy = state.feePolicies.find(p => p.id === company.feePolicyId) || state.feePolicies[0];
    let feeAmount = 0;
    
    if (policy.type === 'Flat') {
      feeAmount = policy.value;
    } else if (policy.type === 'Percentage') {
      feeAmount = parseFloat((amount * (policy.value / 100)).toFixed(2));
    } else if (policy.type === 'Tiered' && policy.tiers) {
      const tier = policy.tiers.find(t => amount >= t.minAmount && amount < t.maxAmount);
      if (tier) {
        feeAmount = tier.flatFee + parseFloat((amount * (tier.percentFee / 100)).toFixed(2));
      }
    }
    
    const netDisbursed = parseFloat((amount - feeAmount).toFixed(2));
    
    // Run rule calculations
    const tooYoung = emp.tenureMonths < 6;
    const overLimit = amount > emp.ewaAvailable;
    const riskRating = Math.floor(Math.random() * 40) + (tooYoung ? 40 : 5);
    const riskLvl = riskRating > 70 ? 'High' : riskRating > 30 ? 'Medium' : 'Low';
    
    const duplicateCheck = true;
    const budgetCheck = true;
    const tenureCheck = !tooYoung;
    const kycCheck = emp.kycStatus === 'Verified';
    
    const autoApprove = !tooYoung && !overLimit && riskLvl === 'Low' && kycCheck;
    
    const newTxn: Transaction = {
      id: txnId,
      employeeId,
      employeeName: `${emp.firstName} ${emp.lastName}`,
      companyId: emp.companyId,
      companyName: company.name,
      amount,
      feeAmount,
      netDisbursed,
      riskScore: riskRating,
      riskLevel: riskLvl,
      outstanding: amount,
      status: autoApprove ? 'Approved' : riskLvl === 'High' ? 'Hold' : 'Pending',
      workflowStep: autoApprove ? 'Auto-Posting Engine' : riskLvl === 'High' ? 'Fraud Audit Hook' : 'Treasury Verification',
      timestamp: new Date().toISOString(),
      channel,
      verificationDetails: {
        duplicateCheck,
        budgetCheck,
        tenureCheck,
        kycCheck
      }
    };
    
    // Update employee state if auto-approved
    let updatedEmployees = [...state.employees];
    if (autoApprove) {
      updatedEmployees = state.employees.map(e => {
        if (e.id === employeeId) {
          return {
            ...e,
            usedAmount: e.usedAmount + amount,
            outstanding: e.outstanding + amount,
            ewaAvailable: Math.max(0, e.ewaAvailable - amount)
          };
        }
        return e;
      });
    }

    return {
      transactions: [newTxn, ...state.transactions],
      employees: updatedEmployees,
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'EWA Request Initialized',
          description: `${emp.firstName} requested $${amount}. Status: ${newTxn.status}.`,
          type: autoApprove ? 'success' : 'info'
        },
        ...state.activityLogs
      ]
    };
  }),

  approveTransaction: (id, user) => set((state) => {
    const txn = state.transactions.find(t => t.id === id);
    if (!txn) return {};
    
    return {
      transactions: state.transactions.map(t => {
        if (t.id === id) {
          return { ...t, status: 'Approved', workflowStep: 'Auto-Posting Engine' };
        }
        return t;
      }),
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user,
          action: `Approved Transaction ${id}`,
          module: 'EWA Requests',
          details: `Manual override approval issued for $${txn.amount} EWA advance request.`,
          ipAddress: '192.168.1.104'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'EWA Approved',
          description: `Transaction ${id} approved and routed for posting.`,
          type: 'success'
        },
        ...state.activityLogs
      ]
    };
  }),

  rejectTransaction: (id, user) => set((state) => {
    return {
      transactions: state.transactions.map(t => {
        if (t.id === id) {
          return { ...t, status: 'Rejected', workflowStep: 'Manual Rejection Hook' };
        }
        return t;
      }),
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user,
          action: `Rejected Transaction ${id}`,
          module: 'EWA Requests',
          details: `Fintech manual verification failed. Transaction rejected.`,
          ipAddress: '192.168.1.104'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'EWA Rejected',
          description: `Transaction ${id} was rejected by ${user}.`,
          type: 'error'
        },
        ...state.activityLogs
      ]
    };
  }),

  holdTransaction: (id, user) => set((state) => {
    return {
      transactions: state.transactions.map(t => {
        if (t.id === id) {
          return { ...t, status: 'Hold', workflowStep: 'Fraud Audit Hook' };
        }
        return t;
      }),
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'EWA Held',
          description: `Transaction ${id} put on hold for investigation.`,
          type: 'warning'
        },
        ...state.activityLogs
      ]
    };
  }),

  disburseTransaction: (id, user) => set((state) => {
    const txn = state.transactions.find(t => t.id === id);
    if (!txn || txn.status === 'Disbursed') return {};
    
    // Get related models
    const updatedEmployees = state.employees.map(e => {
      if (e.id === txn.employeeId) {
        return {
          ...e,
          usedAmount: e.usedAmount + txn.amount,
          outstanding: e.outstanding + txn.amount,
          ewaAvailable: Math.max(0, e.ewaAvailable - txn.amount)
        };
      }
      return e;
    });

    // Update Company Prefund balances
    const updatedCompanies = state.companies.map(c => {
      if (c.id === txn.companyId) {
        return {
          ...c,
          prefundBalance: Math.max(0, c.prefundBalance - txn.amount),
          availableLimit: Math.max(0, c.availableLimit - txn.amount)
        };
      }
      return c;
    });

    // Double Entry Posting Engine Simulation
    // Debit Employee Advance Receivable (1400) -> total (amount + fee)
    // Credit Operating Bank / Prefund Bank (1200) -> net amount disbursed
    // Credit Processing Fee Revenue (4100) -> fee
    const updatedGlAccounts = state.glAccounts.map(gl => {
      if (gl.id === '1400') {
        return { ...gl, balance: gl.balance + txn.amount }; // Debited (increase Asset)
      }
      if (gl.id === '1200') {
        return { ...gl, balance: gl.balance - txn.netDisbursed }; // Credited (decrease Asset)
      }
      if (gl.id === '4100') {
        return { ...gl, balance: gl.balance + txn.feeAmount }; // Credited (increase Revenue)
      }
      return gl;
    });

    // Update bank balance
    const updatedBankAccounts = state.bankAccounts.map(ba => {
      if (ba.type === 'Prefund') {
        return { ...ba, balance: ba.balance - txn.netDisbursed };
      }
      return ba;
    });

    // Write Journal entry
    const newJournal: JournalEntry = {
      id: `JE-${Math.floor(100 + Math.random() * 900)}`,
      reference: `EWA-DISB-${txn.id}`,
      date: new Date().toISOString().split('T')[0],
      description: `Disbursement posting for EWA Advance - ${txn.employeeName}`,
      status: 'Posted',
      details: [
        { accountId: '1400', accountName: 'Employee Advance Receivable', type: 'Debit', amount: txn.amount },
        { accountId: '1200', accountName: 'EWA Prefund Account', type: 'Credit', amount: txn.netDisbursed },
        { accountId: '4100', accountName: 'EWA Processing Fee Revenue', type: 'Credit', amount: txn.feeAmount }
      ]
    };

    return {
      employees: updatedEmployees,
      companies: updatedCompanies,
      glAccounts: updatedGlAccounts,
      bankAccounts: updatedBankAccounts,
      journals: [newJournal, ...state.journals],
      transactions: state.transactions.map(t => {
        if (t.id === id) {
          return { ...t, status: 'Disbursed', workflowStep: 'Completed' };
        }
        return t;
      }),
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user,
          action: `Disbursed funds for ${id}`,
          module: 'Fintech Treasury Engine',
          details: `Processed disbursement of $${txn.netDisbursed} (Net after $${txn.feeAmount} fee). Ledger updated synchronously.`,
          ipAddress: '192.168.1.104'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Direct Deposit Complete',
          description: `Disbursed $${txn.netDisbursed} via Direct Gateway to Sarah Jenkins.`,
          type: 'success'
        },
        ...state.activityLogs
      ]
    };
  }),

  reconcileStatement: (statementLineId, transactionId) => set((state) => {
    // Reconcile bank statement with a given matching transaction
    const line = state.bankStatements.find(s => s.id === statementLineId);
    if (!line) return {};

    const updatedStatements = state.bankStatements.map(s => {
      if (s.id === statementLineId) {
        return { ...s, reconciled: true, matchedTransactionId: transactionId };
      }
      return s;
    });

    return {
      bankStatements: updatedStatements,
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Reconciliation Successful',
          description: `Statement item "${line.description}" matched & cleared.`,
          type: 'success'
        },
        ...state.activityLogs
      ]
    };
  }),

  importPayrollRepayment: (companyId, repayments) => set((state) => {
    // When payroll triggers, EWA repayments are deducted from employee wages,
    // and funds are returned from the company payroll account to the EWA Collection Account.
    // Debit Bank Account: EWA Collection Account (1300)
    // Credit Employee Receivable (1400)
    let totalCollected = 0;
    
    const updatedEmployees = state.employees.map(emp => {
      const repay = repayments.find(r => r.employeeId === emp.id);
      if (repay && emp.companyId === companyId) {
        const amt = parseFloat(repay.amountPaid.toString());
        totalCollected += amt;
        return {
          ...emp,
          usedAmount: Math.max(0, emp.usedAmount - amt),
          outstanding: Math.max(0, emp.outstanding - amt),
          ewaAvailable: emp.salary * 0.35 // Recalibrate limit
        };
      }
      return emp;
    });

    const updatedGlAccounts = state.glAccounts.map(gl => {
      if (gl.id === '1300') {
        return { ...gl, balance: gl.balance + totalCollected }; // Debited (increase Collection Bank Asset)
      }
      if (gl.id === '1400') {
        return { ...gl, balance: Math.max(0, gl.balance - totalCollected) }; // Credited (decrease Receivable)
      }
      return gl;
    });

    const updatedBankAccounts = state.bankAccounts.map(ba => {
      if (ba.type === 'Collection') {
        return { ...ba, balance: ba.balance + totalCollected };
      }
      return ba;
    });

    // Log transaction repayments as settled
    const updatedTransactions = state.transactions.map(t => {
      const isEmployeeRepayed = repayments.some(r => r.employeeId === t.employeeId);
      if (isEmployeeRepayed && t.companyId === companyId && t.status === 'Disbursed') {
        return { ...t, status: 'Settled' as const };
      }
      return t;
    });

    const newJournal: JournalEntry = {
      id: `JE-${Math.floor(100 + Math.random() * 900)}`,
      reference: 'PAYROLL-REPAY-COLLECT',
      date: new Date().toISOString().split('T')[0],
      description: `Payroll deduction collection posting - Total: $${totalCollected}`,
      status: 'Posted',
      details: [
        { accountId: '1300', accountName: 'EWA Collection Account', type: 'Debit', amount: totalCollected },
        { accountId: '1400', accountName: 'Employee Advance Receivable', type: 'Credit', amount: totalCollected }
      ]
    };

    return {
      employees: updatedEmployees,
      glAccounts: updatedGlAccounts,
      bankAccounts: updatedBankAccounts,
      transactions: updatedTransactions,
      journals: [newJournal, ...state.journals],
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Payroll Settlement Engine',
          action: `Settled EWA advances for Company ${companyId}`,
          module: 'Repayment Portal',
          details: `Processed batch payroll collections of $${totalCollected}. Dynamic ledger accounting synchronised.`,
          ipAddress: '127.0.0.1'
        },
        ...state.auditLogs
      ],
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Repayment Collection Posted',
          description: `Collected $${totalCollected} from payroll deductions. GL cleared.`,
          type: 'success'
        },
        ...state.activityLogs
      ]
    };
  }),

  updateWorkflow: (nodes, edges) => set((state) => {
    const updatedWorkflows = state.workflows.map(wf => {
      if (wf.id === 'WF-01') {
        return { ...wf, nodes, edges };
      }
      return wf;
    });
    return {
      workflows: updatedWorkflows,
      activityLogs: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Workflow Graph Modified',
          description: 'Recalibrated EWA approval node constraints in builder canvas.',
          type: 'info'
        },
        ...state.activityLogs
      ]
    };
  }),

  addAuditLog: (user, action, module, details) => set((state) => ({
    auditLogs: [
      {
        id: `AUD-${Date.now()}`,
        timestamp: new Date().toISOString(),
        user,
        action,
        module,
        details,
        ipAddress: '192.168.1.104'
      },
      ...state.auditLogs
    ]
  })),

  addActivity: (title, description, type) => set((state) => ({
    activityLogs: [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        title,
        description,
        type
      },
      ...state.activityLogs
    ]
  })),

  updateTask: (id, updates, action, user, comment) => set((state) => {
    const updatedTasks = state.tasks.map(task => {
      if (task.id === id) {
        const newAction: TaskAction = {
          id: `ACT-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action,
          user,
          comment,
          fromState: task.status,
          toState: updates.status || task.status
        };
        return {
          ...task,
          ...updates,
          history: [...task.history, newAction]
        };
      }
      return task;
    });

    return {
      tasks: updatedTasks,
      auditLogs: [
        {
          id: `AUD-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user,
          action: `Workflow Action: ${action}`,
          module: 'Workflow Engine',
          details: `Processed task ${id} with decision: ${action}.`,
          ipAddress: '127.0.0.1'
        },
        ...state.auditLogs
      ]
    };
  })
}));
