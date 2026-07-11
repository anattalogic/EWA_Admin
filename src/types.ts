export type PayrollPolicy = {
  id: string;
  cycle: 'Monthly' | 'Bi-Weekly' | 'Weekly';
  startDay: number; // Day of month or week
  endDay: number;
  payDay: number;
  ewaWindowStart: number;
  ewaWindowEnd: number;
  repaymentDay: number;
  lateGraceDays: number;
};

export type LimitConfig = {
  id: string;
  scope: 'Company' | 'Employee' | 'Global';
  targetId?: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'PerPeriod' | 'PerTransaction';
  type: 'Amount' | 'Count';
  min: number;
  max: number;
  effectiveFrom: string;
  effectiveTo?: string;
};

export type TaskAction = {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  comment?: string;
  fromState: string;
  toState: string;
};

export type WorkflowTask = {
  id: string;
  type: 'EWA_REQUEST' | 'ONBOARDING' | 'LIMIT_ADJUST' | 'BUDGET_INCREASE' | 'BUDGET_REQUEST';
  status: 'Pending' | 'Approved' | 'Rejected' | 'InReview';
  creator: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  payload: any; 
  history: TaskAction[];
};

export type Company = {
  id: string;
  name: string;
  code: string;
  industry: string;
  category: 'Enterprise' | 'SME' | 'Strategic'; // Added category
  region: string; // Added region
  status: 'Active' | 'Pending' | 'Suspended';
  creditLimit: number;
  availableLimit: number;
  budgetUtilized: number;
  prefundBalance: number;
  feePolicyId: string;
  payrollPolicy?: PayrollPolicy;
  limits?: LimitConfig[];
  bankAccount: string;
  contactEmail: string;
  createdDate: string;
};

export type Employee = {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  group: 'Management' | 'Staff' | 'Contractor'; // Added group
  riskCategory: 'Low' | 'Medium' | 'High'; // Added riskCategory
  salary: number;
  hourlyRate: number;
  tenureMonths: number;
  ewaAvailable: number;
  usedAmount: number;
  outstanding: number;
  bankName: string;
  bankAccount: string;
  kycStatus: 'Verified' | 'Pending' | 'Failed';
  accruedWages: number;
};

export type Budget = {
  id: string;
  companyId: string;
  fiscalYear: string;
  allocatedAmount: number;
  usedAmount: number;
  remainingAmount: number;
  status: 'Active' | 'Depleted' | 'Closed';
};

export type BudgetAdjustment = {
  id: string;
  budgetId: string;
  adjustmentType: 'Increase' | 'Decrease';
  amount: number;
  reason: string;
  approvedBy: string;
  timestamp: string;
};

export type FeeTier = {
  id: string;
  minAmount: number;
  maxAmount: number;
  flatFee: number;
  percentFee: number;
};

export type FeePolicy = {
  id: string;
  name: string;
  serviceId?: string; // Mapped to service
  type: 'Flat' | 'Percentage' | 'Tiered' | 'Conditional';
  value: number; 
  tiers?: FeeTier[];
  conditions?: {
    lateDays?: number;
    minTenure?: number;
    employeeGroup?: string;
  };
  hierarchyLevel: number; // 1: Platform, 2: Company, 3: Custom
  status: 'Active' | 'Inactive';
};

export type ServiceDefinition = {
  id: string;
  name: string;
  code: string; // e.g. ONBOARDING, EWA_REQUEST
  type: 'Transactional' | 'Non-Transactional';
  description: string;
  glPostingRule?: {
    debitAccountId: string;
    creditAccountId: string;
  };
  requiresFee: boolean;
};

export type Invoice = {
  id: string;
  companyId: string;
  companyName: string;
  billingPeriod: string;
  issueDate: string;
  dueDate: string;
  totalServiceFees: number;
  totalDisbursements: number;
  totalRepayments: number;
  netPayable: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  lineItems: InvoiceLineItem[];
};

export type InvoiceLineItem = {
  id: string;
  serviceName: string;
  count: number;
  amount: number;
};

export type Transaction = {
  id: string;
  employeeId: string;
  employeeName: string;
  companyId: string;
  companyName: string;
  amount: number;
  feeAmount: number;
  netDisbursed: number;
  outstanding: number; 
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Hold' | 'Disbursed' | 'Settled' | 'PartialRepay';
  workflowStep: string;
  timestamp: string;
  channel: 'Instant ACH' | 'Same-Day ACH' | 'Real-Time Payment' | 'KBZ' | 'YOMA' | 'CB' | 'MoMoney';
  periodId?: string;
  verificationDetails: {
    duplicateCheck: boolean;
    budgetCheck: boolean;
    tenureCheck: boolean;
    kycCheck: boolean;
  };
};

export type JournalEntry = {
  id: string;
  reference: string;
  date: string;
  description: string;
  details: JournalDetail[];
  status: 'Draft' | 'Posted';
};

export type JournalDetail = {
  accountId: string;
  accountName: string;
  type: 'Debit' | 'Credit';
  amount: number;
};

export type GLAccount = {
  id: string; // e.g., "1100", "2100"
  name: string;
  category: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
};

export type BankAccount = {
  id: string;
  name: string;
  accountNumber: string;
  type: 'Operating' | 'Prefund' | 'Collection';
  balance: number;
  currency: string;
};

export type BankStatementLine = {
  id: string;
  bankAccountId: string;
  date: string;
  description: string;
  amount: number;
  type: 'CR' | 'DR';
  reconciled: boolean;
  matchedTransactionId?: string;
};

export type RuleCondition = {
  field: string; // e.g. "Employee Tenure", "Requested Amount", "Risk Score"
  operator: 'greater_than' | 'less_than' | 'equals' | 'and' | 'or';
  value: string | number;
};

export type WorkflowNode = {
  id: string;
  type: 'Start' | 'Approval' | 'Decision' | 'Notification' | 'Timer' | 'End';
  name: string;
  assignee?: string;
  description?: string;
};

export type WorkflowEdge = {
  id: string;
  source: string;
  target: string;
};

export type Workflow = {
  id: string;
  name: string;
  version: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: 'Active' | 'Draft' | 'Archived';
};

export type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
};

export type ActivityLog = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
};

export type SystemConfiguration = {
  id: string;
  key: string;
  value: string;
  category: string;
  description: string;
};
