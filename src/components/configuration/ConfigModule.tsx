import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function ConfigModule() {
  const { systemConfigs, auditLogs, addAuditLog } = useEwaStore();
  const [configs, setConfigs] = useState(systemConfigs);

  const handleUpdateConfig = (id: string, newVal: string) => {
    const updated = configs.map(c => {
      if (c.id === id) {
        addAuditLog('Alex Chen', `Modified System Key: ${c.key}`, 'System Configuration', `Val changed to ${newVal}`);
        return { ...c, value: newVal };
      }
      return c;
    });
    setConfigs(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Administration</span>
            <span>/</span>
            <span className="text-blue-600">Console Settings</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">System Configuration & Audits</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Settings options */}
        <div className="bg-white border rounded-lg shadow-sm p-5 lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-2 mb-4">Core Platform Limits</h3>
          
          <div className="space-y-4">
            {configs.map(c => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">{c.key}</label>
                  <span className="text-[9px] font-semibold text-slate-400 font-mono">{c.category}</span>
                </div>
                <input 
                  type="text" 
                  value={c.value} 
                  onChange={e => handleUpdateConfig(c.id, e.target.value)}
                  className="w-full text-xs font-mono font-bold p-2 bg-slate-50 border rounded-md focus:ring-1 focus:ring-blue-600 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log timeline right */}
        <div className="bg-white border rounded-lg shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Fintech System Audit Log Trail</h3>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded">
              Immutable Ledger Logs
            </span>
          </div>

          <div className="divide-y overflow-y-auto max-h-[480px]">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 hover:bg-slate-50/50 transition space-y-1 text-xs">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-blue-600">{log.module}</span>
                  <span className="text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="font-bold text-slate-800">{log.action}</div>
                <p className="text-slate-500 leading-relaxed text-[11px]">{log.details}</p>
                <div className="flex justify-between text-[9px] text-slate-400 pt-1">
                  <span>Authorized User: {log.user}</span>
                  <span>Terminal IP: {log.ipAddress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
