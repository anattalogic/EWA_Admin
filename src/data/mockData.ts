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
  SystemConfiguration
} from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'C-001',
    name: 'Amazon Logistics North',
    code: 'AMZN-LN',
    industry: 'Logistics',
    status: 'Active',
    creditLimit: 500000,
    availableLimit: 485000,
    budgetUtilized: 24500,
    prefundBalance: 120000,
    feePolicyId: 'FP-001',
    bankAccount: 'US-OPER-9821',
    contactEmail: 'logistics-ops@amazon-north.com',
    createdDate: '2024-01-15'
  },
  {
    id: 'C-002',
    name: 'Global Tech Solutions',
    code: 'GBL-TECH',
    industry: 'Technology',
    status: 'Active',
    creditLimit: 1000000,
    availableLimit: 950000,
    budgetUtilized: 48900,
    prefundBalance: 250000,
    feePolicyId: 'FP-002',
    bankAccount: 'US-OPER-5541',
    contactEmail: 'payroll-ops@globaltech.io',
    createdDate: '2023-06-10'
  },
  {
    id: 'C-003',
    name: 'Apex Healthcare Services',
    code: 'APX-MED',
    industry: 'Healthcare',
    status: 'Active',
    creditLimit: 750000,
    availableLimit: 720000,
    budgetUtilized: 12000,
    prefundBalance: 850000,
    feePolicyId: 'FP-001',
    bankAccount: 'US-OPER-1122',
    contactEmail: 'finance@apex-med.org',
    createdDate: '2023-11-20'
  },
  {
    id: 'C-004',
    name: 'Horizon Retail Corp',
    code: 'HRZ-RET',
    industry: 'Retail',
    status: 'Pending',
    creditLimit: 250000,
    availableLimit: 250000,
    budgetUtilized: 0,
    prefundBalance: 0,
    feePolicyId: 'FP-003',
    bankAccount: 'US-OPER-8844',
    contactEmail: 'onboarding@horizonretail.com',
    createdDate: '2026-06-01'
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
    salary: 5800,
    hourlyRate: 28,
    tenureMonths: 14,
    ewaAvailable: 1250,
    usedAmount: 185,
    outstanding: 185,
    bankName: 'Chase Bank',
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
    salary: 8200,
    hourlyRate: 48,
    tenureMonths: 8,
    ewaAvailable: 2450,
    usedAmount: 312.45,
    outstanding: 312.45,
    bankName: 'Wells Fargo',
    bankAccount: '•••• 1102',
    kycStatus: 'Verified',
    accruedWages: 3400
  },
  {
    id: 'EMP-103',
    companyId: 'C-001',
    firstName: 'Emma',
    lastName: 'Watson',
    email: 'e.watson@amazon-north.com',
    role: 'Delivery Associate',
    salary: 3400,
    hourlyRate: 18,
    tenureMonths: 3,
    ewaAvailable: 600,
    usedAmount: 50,
    outstanding: 50,
    bankName: 'Bank of America',
    bankAccount: '•••• 9921',
    kycStatus: 'Verified',
    accruedWages: 950
  },
  {
    id: 'EMP-104',
    companyId: 'C-003',
    firstName: 'David',
    lastName: 'Kim',
    email: 'd.kim@apex-med.org',
    role: 'Critical Care Nurse',
    salary: 7600,
    hourlyRate: 44,
    tenureMonths: 24,
    ewaAvailable: 2800,
    usedAmount: 0,
    outstanding: 0,
    bankName: 'CitiBank',
    bankAccount: '•••• 3381',
    kycStatus: 'Verified',
    accruedWages: 4200
  },
  {
    id: 'EMP-105',
    companyId: 'C-002',
    firstName: 'Jessica',
    lastName: 'Taylor',
    email: 'j.taylor@globaltech.io',
    role: 'Technical Support',
    salary: 4900,
    hourlyRate: 24,
    tenureMonths: 5,
    ewaAvailable: 980,
    usedAmount: 150,
    outstanding: 150,
    bankName: 'Wells Fargo',
    bankAccount: '•••• 4410',
    kycStatus: 'Pending',
    accruedWages: 1200
  },
  {
    id: 'EMP-106',
    companyId: 'C-004',
    firstName: 'Carlos',
    lastName: 'Mendoza',
    email: 'carlos.m@horizonretail.com',
    role: 'Store Associate',
    salary: 2800,
    hourlyRate: 15,
    tenureMonths: 1,
    ewaAvailable: 200,
    usedAmount: 0,
    outstanding: 0,
    bankName: 'PNC Bank',
    bankAccount: '•••• 0077',
    kycStatus: 'Failed',
    accruedWages: 300
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
  { id: 'FP-001', name: 'Standard Flat Rate ($2.99)', type: 'Flat', value: 2.99, status: 'Active' },
  { id: 'FP-002', name: 'Premium Tech Percentage (1.5%)', type: 'Percentage', value: 1.5, status: 'Active' },
  { id: 'FP-003', name: 'Retail Dynamic Tiered Rate', type: 'Tiered', value: 3.50, status: 'Active' }
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
  { id: 'BA-01', name: 'Chase Operating Account', accountNumber: 'US-OPER-9821', type: 'Operating', balance: 1429042.88, currency: 'USD' },
  { id: 'BA-02', name: 'SVB Prefund Vault', accountNumber: 'US-PREF-4411', type: 'Prefund', balance: 1220000.00, currency: 'USD' },
  { id: 'BA-03', name: 'BNY Mellon EWA Clearing', accountNumber: 'US-COLL-5051', type: 'Collection', balance: 350000.00, currency: 'USD' }
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
