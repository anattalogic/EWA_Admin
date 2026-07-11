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
  ServiceDefinition,
  Invoice,
  WorkflowTask
} from '../types';

export const INITIAL_SERVICES: ServiceDefinition[] = [
  { 
    id: 'SVC-01', 
    name: 'Employment Verification', 
    code: 'EMP_VERIFY', 
    type: 'Non-Transactional', 
    description: 'Automated verification of employment status via HRIS integration.',
    requiresFee: true 
  },
  { 
    id: 'SVC-02', 
    name: 'Company Onboarding', 
    code: 'COMP_ONBOARD', 
    type: 'Non-Transactional', 
    description: 'Initial enterprise setup, KYC, and system integration protocol.',
    requiresFee: true 
  },
  { 
    id: 'SVC-03', 
    name: 'EWA Disbursement', 
    code: 'EWA_DISBURSE', 
    type: 'Transactional', 
    description: 'Real-time or standard clearing of earned wage advances.',
    glPostingRule: { debitAccountId: '1400', creditAccountId: '1200' },
    requiresFee: true 
  },
  { 
    id: 'SVC-04', 
    name: 'Employee Registration', 
    code: 'EMP_REG', 
    type: 'Non-Transactional', 
    description: 'Digital identity creation and banking payload verification.',
    requiresFee: false 
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'C-001',
    name: 'Amazon Logistics North',
    code: 'AMZN-LN',
    industry: 'Logistics',
    category: 'Enterprise',
    region: 'Yangon',
    status: 'Active',
    creditLimit: 500000,
    availableLimit: 485000,
    budgetUtilized: 24500,
    prefundBalance: 120000,
    feePolicyId: 'FP-001',
    payrollPolicy: {
      id: 'PP-001',
      cycle: 'Monthly',
      startDay: 1,
      endDay: 30,
      payDay: 5,
      ewaWindowStart: 1,
      ewaWindowEnd: 25,
      repaymentDay: 5,
      lateGraceDays: 3
    },
    limits: [
      { id: 'L-01', scope: 'Company', frequency: 'Monthly', type: 'Amount', min: 0, max: 100000, effectiveFrom: '2024-01-01' },
      { id: 'L-02', scope: 'Employee', frequency: 'PerTransaction', type: 'Amount', min: 10, max: 1000, effectiveFrom: '2024-01-01' }
    ],
    bankAccount: 'KBZ-OPER-9821',
    contactEmail: 'logistics-ops@amazon-north.com',
    createdDate: '2024-01-15'
  },
  {
    id: 'C-002',
    name: 'Global Tech Solutions',
    code: 'GBL-TECH',
    industry: 'Technology',
    category: 'Strategic',
    region: 'Mandalay',
    status: 'Active',
    creditLimit: 1000000,
    availableLimit: 950000,
    budgetUtilized: 48900,
    prefundBalance: 250000,
    feePolicyId: 'FP-002',
    payrollPolicy: {
      id: 'PP-002',
      cycle: 'Monthly',
      startDay: 15,
      endDay: 14,
      payDay: 20,
      ewaWindowStart: 15,
      ewaWindowEnd: 10,
      repaymentDay: 20,
      lateGraceDays: 2
    },
    bankAccount: 'YOMA-OPER-5541',
    contactEmail: 'payroll-ops@globaltech.io',
    createdDate: '2023-06-10'
  }
];

export const INITIAL_TASKS: WorkflowTask[] = [
  {
    id: 'TSK-1001',
    type: 'BUDGET_REQUEST',
    status: 'Pending',
    creator: 'Sarah Jenkins',
    assignedTo: 'Finance Team',
    createdAt: '2026-07-09T10:00:00Z',
    updatedAt: '2026-07-09T14:30:00Z',
    priority: 'High',
    payload: { amount: 50000, companyId: 'C-001', reason: 'High demand for July festival season' },
    history: [
      { id: 'ACT-1', action: 'Created', user: 'Sarah Jenkins', timestamp: '2026-07-09T10:00:00Z', comment: 'Requesting increase for seasonal peak', fromState: 'None', toState: 'Pending' },
      { id: 'ACT-2', action: 'Assigned', user: 'System', timestamp: '2026-07-09T10:00:05Z', fromState: 'Pending', toState: 'Pending' }
    ]
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'EMP-101',
    companyId: 'C-001',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.j@amazon-north.com',
    role: 'Warehouse Supervisor',
    group: 'Staff',
    riskCategory: 'Low',
    salary: 5800,
    hourlyRate: 28,
    tenureMonths: 14,
    ewaAvailable: 1250,
    usedAmount: 185,
    outstanding: 185,
    bankName: 'KBZ Bank',
    bankAccount: '•••• 4920',
    kycStatus: 'Verified',
    accruedWages: 2100
  },
  {
    id: 'EMP-102',
    companyId: 'C-002',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    email: 'm.rodriguez@globaltech.io',
    role: 'Senior QA Engineer',
    group: 'Management',
    riskCategory: 'Low',
    salary: 8200,
    hourlyRate: 48,
    tenureMonths: 8,
    ewaAvailable: 2450,
    usedAmount: 312.45,
    outstanding: 312.45,
    bankName: 'CB Bank',
    bankAccount: '•••• 1102',
    kycStatus: 'Verified',
    accruedWages: 3400
  }
];

export const INITIAL_BUDGETS: Budget[] = [
  {
    id: 'B-001',
    companyId: 'C-001',
    fiscalYear: '2026',
    allocatedAmount: 100000,
    usedAmount: 24500,
    remainingAmount: 75500,
    status: 'Active'
  },
  {
    id: 'B-002',
    companyId: 'C-002',
    fiscalYear: '2026',
    allocatedAmount: 250000,
    usedAmount: 48900,
    remainingAmount: 201100,
    status: 'Active'
  },
  {
    id: 'B-003',
    companyId: 'C-003',
    fiscalYear: '2026',
    allocatedAmount: 150000,
    usedAmount: 12000,
    remainingAmount: 138000,
    status: 'Active'
  }
];

export const INITIAL_FEE_POLICIES: FeePolicy[] = [
  { 
    id: 'FP-001', 
    name: 'Enterprise Tiered Protocol', 
    serviceId: 'SVC-03',
    type: 'Tiered', 
    value: 0,
    hierarchyLevel: 1,
    status: 'Active',
    tiers: [
      { id: 'T1', minAmount: 0, maxAmount: 100, flatFee: 1.99, percentFee: 0 },
      { id: 'T2', minAmount: 100, maxAmount: 500, flatFee: 2.99, percentFee: 0 },
      { id: 'T3', minAmount: 500, maxAmount: 10000, flatFee: 0, percentFee: 1.5 }
    ]
  },
  { 
    id: 'FP-002', 
    name: 'Strategic Onboarding Fee', 
    serviceId: 'SVC-02',
    type: 'Flat', 
    value: 500.00,
    hierarchyLevel: 2,
    status: 'Active'
  },
  {
    id: 'FP-003',
    name: 'Conditional Late Settlement',
    type: 'Conditional',
    value: 2.0,
    hierarchyLevel: 1,
    status: 'Active',
    conditions: {
      lateDays: 3,
      employeeGroup: 'Contractor'
    }
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-492021',
    employeeId: 'EMP-101',
    employeeName: 'Sarah Jenkins',
    companyId: 'C-001',
    companyName: 'Amazon Logistics North',
    amount: 185.00,
    feeAmount: 2.99,
    netDisbursed: 182.01,
    riskScore: 12,
    riskLevel: 'Low',
    outstanding: 185.00,
    status: 'Pending',
    workflowStep: 'Treasury Verification',
    timestamp: '2026-07-10T09:14:00-07:00',
    channel: 'Instant ACH',
    verificationDetails: {
      duplicateCheck: true,
      budgetCheck: true,
      tenureCheck: true,
      kycCheck: true
    }
  },
  {
    id: 'TXN-492022',
    employeeId: 'EMP-102',
    employeeName: 'Michael Rodriguez',
    companyId: 'C-002',
    companyName: 'Global Tech Solutions',
    amount: 312.45,
    feeAmount: 4.69,
    netDisbursed: 307.76,
    riskScore: 82,
    riskLevel: 'High',
    outstanding: 312.45,
    status: 'Hold',
    workflowStep: 'Fraud Audit Hook',
    timestamp: '2026-07-10T08:35:00-07:00',
    channel: 'Real-Time Payment',
    verificationDetails: {
      duplicateCheck: true,
      budgetCheck: true,
      tenureCheck: true,
      kycCheck: true
    }
  },
  {
    id: 'TXN-492023',
    employeeId: 'EMP-103',
    employeeName: 'Emma Watson',
    companyId: 'C-001',
    companyName: 'Amazon Logistics North',
    amount: 50.00,
    feeAmount: 2.99,
    netDisbursed: 47.01,
    riskScore: 5,
    riskLevel: 'Low',
    outstanding: 50.00,
    status: 'Approved',
    workflowStep: 'Auto-Posting Engine',
    timestamp: '2026-07-10T10:02:00-07:00',
    channel: 'Same-Day ACH',
    verificationDetails: {
      duplicateCheck: true,
      budgetCheck: true,
      tenureCheck: true,
      kycCheck: true
    }
  },
  {
    id: 'TXN-492019',
    employeeId: 'EMP-104',
    employeeName: 'David Kim',
    companyId: 'C-003',
    companyName: 'Apex Healthcare Services',
    amount: 450.00,
    feeAmount: 2.99,
    netDisbursed: 447.01,
    riskScore: 8,
    riskLevel: 'Low',
    outstanding: 450.00,
    status: 'Disbursed',
    workflowStep: 'Completed',
    timestamp: '2026-07-09T14:22:00-07:00',
    channel: 'Instant ACH',
    verificationDetails: {
      duplicateCheck: true,
      budgetCheck: true,
      tenureCheck: true,
      kycCheck: true
    }
  },
  {
    id: 'TXN-492018',
    employeeId: 'EMP-105',
    employeeName: 'Jessica Taylor',
    companyId: 'C-002',
    companyName: 'Global Tech Solutions',
    amount: 150.00,
    feeAmount: 2.25,
    netDisbursed: 147.75,
    riskScore: 48,
    riskLevel: 'Medium',
    outstanding: 0,
    status: 'Rejected',
    workflowStep: 'KYC Failure Auto-Reject',
    timestamp: '2026-07-09T11:05:00-07:00',
    channel: 'Same-Day ACH',
    verificationDetails: {
      duplicateCheck: true,
      budgetCheck: true,
      tenureCheck: false,
      kycCheck: false
    }
  }
];

export const INITIAL_GL_ACCOUNTS: GLAccount[] = [
  { id: '1100', name: 'Operating Bank Cash', category: 'Asset', balance: 1429042.88 },
  { id: '1200', name: 'EWA Prefund Account', category: 'Asset', balance: 1220000.00 },
  { id: '1300', name: 'EWA Collection Account', category: 'Asset', balance: 350000.00 },
  { id: '1400', name: 'Employee Advance Receivable', category: 'Asset', balance: 154500.22 },
  { id: '2100', name: 'EWA Platform Liability', category: 'Liability', balance: 85000.00 },
  { id: '3100', name: 'Common Equity / Capital', category: 'Equity', balance: 2500000.00 },
  { id: '4100', name: 'EWA Processing Fee Revenue', category: 'Revenue', balance: 48942.10 },
  { id: '5100', name: 'Bank ACH Transfer Expense', category: 'Expense', balance: 1450.00 }
];

export const INITIAL_BANK_ACCOUNTS: BankAccount[] = [
  { id: 'BA-01', name: 'KBZ Operating Account', accountNumber: 'KBZ-OPER-9821', type: 'Operating', balance: 1429042.88, currency: 'MMK' },
  { id: 'BA-02', name: 'YOMA Prefund Vault', accountNumber: 'YOMA-PREF-4411', type: 'Prefund', balance: 1220000.00, currency: 'MMK' },
  { id: 'BA-03', name: 'CB Clearing Account', accountNumber: 'CB-COLL-5051', type: 'Collection', balance: 350000.00, currency: 'MMK' },
  { id: 'BA-04', name: 'MoMoney Digital Wallet', accountNumber: 'MO-WALT-1122', type: 'Collection', balance: 85000.00, currency: 'MMK' }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-001',
    companyId: 'C-001',
    companyName: 'Amazon Logistics North',
    billingPeriod: 'June 2026',
    issueDate: '2026-07-01',
    dueDate: '2026-07-15',
    totalServiceFees: 1245.50,
    totalDisbursements: 24500.00,
    totalRepayments: 22000.00,
    netPayable: 3745.50,
    status: 'Sent',
    lineItems: [
      { id: 'LI-1', serviceName: 'EWA Disbursement Fees', count: 412, amount: 1231.88 },
      { id: 'LI-2', serviceName: 'Employment Verification', count: 12, amount: 13.62 }
    ]
  }
];

export const INITIAL_BANK_STATEMENTS: BankStatementLine[] = [
  { id: 'BS-01', bankAccountId: 'BA-01', date: '2026-07-10', description: 'Amazon Log EWA Prefund Top-up', amount: 25000, type: 'CR', reconciled: false },
  { id: 'BS-02', bankAccountId: 'BA-01', date: '2026-07-10', description: 'FedWire Batch Transfer #128', amount: 15400, type: 'DR', reconciled: true },
  { id: 'BS-03', bankAccountId: 'BA-02', date: '2026-07-09', description: 'ACH Instant Disb TXN-492019', amount: 447.01, type: 'DR', reconciled: true, matchedTransactionId: 'TXN-492019' },
  { id: 'BS-04', bankAccountId: 'BA-03', date: '2026-07-09', description: 'Collection Payroll Match #882', amount: 1850, type: 'CR', reconciled: false }
];

export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'WF-01',
    name: 'Standard Auto-Approve Matrix',
    version: '2.1.0',
    status: 'Active',
    nodes: [
      { id: 'start', type: 'Start', name: 'EWA Request Initialized' },
      { id: 'rule', type: 'Decision', name: 'Rule Engine Evaluation', description: 'Check budget & employee KYC/tenure' },
      { id: 'approval', type: 'Approval', name: 'Treasury Human Release', assignee: 'Alex Chen', description: 'Over $200 requires manual treasury auth' },
      { id: 'disburse', type: 'Notification', name: 'Direct Deposit Gateway API' },
      { id: 'end', type: 'End', name: 'Transaction Posted & Complete' }
    ],
    edges: [
      { id: 'e1', source: 'start', target: 'rule' },
      { id: 'e2', source: 'rule', target: 'approval' },
      { id: 'e3', source: 'approval', target: 'disburse' },
      { id: 'e4', source: 'disburse', target: 'end' }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-07-10T07:11:00-07:00',
    user: 'Alex Chen',
    action: 'Approved EWA Request TXN-492023',
    module: 'EWA Requests',
    details: 'Auto-approved via rule engine based on tenure (>6 months) and low risk score (5)',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-07-10T06:45:00-07:00',
    user: 'System Bot',
    action: 'Flagged Request TXN-492022',
    module: 'Validation Engine',
    details: 'Placed transaction on Hold due to anomalous Risk Score of 82 (Fraud Audit Hook triggered)',
    ipAddress: '10.0.4.15'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-07-09T16:30:00-07:00',
    user: 'Alex Chen',
    action: 'Modified Fee Policy FP-001',
    module: 'Configuration',
    details: 'Updated Standard Flat Rate description and calibrated parameters to $2.99',
    ipAddress: '192.168.1.104'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'act-1', timestamp: '10 mins ago', title: 'New Request Received', description: 'Sarah Jenkins requested $185.00 via Same-Day ACH', type: 'info' },
  { id: 'act-2', timestamp: '42 mins ago', title: 'Risk Flag Triggered', description: 'TXN-492022 risk rating is High (82). Verification on Hold.', type: 'warning' },
  { id: 'act-3', timestamp: '1 hour ago', title: 'Daily Settlement Posted', description: 'Double-entry journal posted for Batch #14 ($21,490.50)', type: 'success' },
  { id: 'act-4', timestamp: '2 hours ago', title: 'Prefund Top-up', description: 'Apex Healthcare deposited $150,000 to Prefund account', type: 'success' }
];

export const SYSTEM_CONFIGS: SystemConfiguration[] = [
  { id: 'SC-01', key: 'MAX_EWA_PCT', value: '50%', category: 'Limits', description: 'Maximum percentage of accrued net wages available for EWA withdraw.', },
  { id: 'SC-02', key: 'RISK_THRESHOLD', value: '70', category: 'Risk', description: 'Risk score threshold above which manual audit is hard-enforced.', },
  { id: 'SC-03', key: 'AUTO_POST_GL', value: 'TRUE', category: 'Accounting', description: 'Whether approved disbursements trigger real-time double-entry posting.', },
];
