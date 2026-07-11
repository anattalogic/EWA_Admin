import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';
import { WorkflowTask } from '../../types';

interface WorkflowWizardProps {
  taskId: string;
  onClose: () => void;
}

export function WorkflowWizard({ taskId, onClose }: WorkflowWizardProps) {
  const { tasks, updateTask } = useEwaStore();
  const task = tasks.find(t => t.id === taskId);
  const [comment, setComment] = useState('');

  if (!task) return null;

  const handleAction = (action: string, nextStatus: 'Approved' | 'Rejected' | 'InReview' | 'Pending') => {
    updateTask(taskId, { status: nextStatus }, action, 'Current User', comment);
    setComment('');
    if (nextStatus !== 'InReview') onClose();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-sap-border flex justify-between items-center bg-slate-50">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Protocol Execution</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">{task.type.replace('_', ' ')}</span>
          </div>
          <h2 className="text-lg font-semibold text-sap-text">Request Reference: {task.id}</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-sap-text transition">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center relative mb-12">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
          {['Draft', 'Pending', 'Review', 'Finalized'].map((step, idx) => {
             const isActive = (step === 'Draft' && task.status === 'Pending') || 
                            (step === 'Pending' && task.status === 'Pending') ||
                            (step === 'Review' && task.status === 'InReview') ||
                            (step === 'Finalized' && (task.status === 'Approved' || task.status === 'Rejected'));
             return (
              <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  isActive ? 'bg-sap-primary text-white border-sap-primary shadow-lg shadow-blue-200' : 'bg-white text-slate-300 border-slate-200'
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-sap-text' : 'text-slate-300'}`}>{step}</span>
              </div>
             )
          })}
        </div>

        {/* Payload Details */}
        <div className="sap-card p-5 bg-slate-50/50 border-t-2 border-t-sap-primary">
          <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight mb-4 flex items-center gap-2">
            <i className="fa-solid fa-database text-sap-primary opacity-50"></i>
            Payload Inspection
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(task.payload).map(([key, value]) => (
              <div key={key}>
                <div className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-[12px] font-mono font-bold text-sap-text mt-0.5">
                  {typeof value === 'number' ? `$${value.toLocaleString()}` : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity History */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-sap-text uppercase tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-clock-rotate-left text-sap-primary opacity-50"></i>
            Audit Trail & Discussion
          </h3>
          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
            {task.history.map((act, idx) => (
              <div key={act.id} className="relative pl-8 animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 shadow-sm">
                  <i className={`fa-solid ${act.action === 'Approved' ? 'fa-check text-emerald-500' : act.action === 'Rejected' ? 'fa-xmark text-rose-500' : 'fa-message text-blue-400'} text-[10px]`}></i>
                </div>
                <div className="bg-slate-50 p-3 rounded-sm border border-slate-200/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-sap-text uppercase tracking-tight">{act.user}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{new Date(act.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] font-bold text-sap-primary uppercase tracking-widest mb-1">{act.action}</div>
                  {act.comment && <p className="text-[11px] text-sap-text-secondary italic leading-relaxed">"{act.comment}"</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-6 border-t border-sap-border bg-slate-50 space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-sap-text-secondary uppercase tracking-widest">Decision Justification / Comments</label>
          <textarea 
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full p-3 text-[11px] border border-sap-border rounded-sm focus:ring-1 focus:ring-sap-primary outline-none min-h-[80px]"
            placeholder="Provide context for this protocol action..."
          />
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleAction('Approved', 'Approved')}
            className="flex-1 py-2.5 bg-sap-shell text-white rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-sap-shell/90 transition shadow-sm"
          >
            Authorize Release
          </button>
          <button 
            onClick={() => handleAction('Review Request', 'InReview')}
            className="px-6 py-2.5 bg-white border border-sap-border text-sap-text rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition"
          >
            Request Clarification
          </button>
          <button 
            onClick={() => handleAction('Rejected', 'Rejected')}
            className="px-6 py-2.5 bg-white border border-rose-100 text-rose-600 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-rose-50 transition"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
