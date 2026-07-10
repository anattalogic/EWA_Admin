export type Company = {
  id: string;
  name: string;
  code: string;
  industry: string;
  status: 'Active' | 'Pending' | 'Suspended';
  creditLimit: number;
  availableLimit: number;
  prefundBalance: number;
  feePolicyId: string;
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

export type FeePolicy = {
  id: string;
  name: string;
  type: 'Flat' | 'Percentage' | 'Tiered';
  value: number; // e.g. $2.99 or 2.5%
  status: 'Active' | 'Inactive';
};

export type FeeRule = {
  id: string;
  policyId: string;
  minAmount: number;
  maxAmount: number;
  feeValue: number;
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
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Hold' | 'Disbursed' | 'Settled';
  workflowStep: string;
  timestamp: string;
  channel: 'Instant ACH' | 'Same-Day ACH' | 'Real-Time Payment';
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
