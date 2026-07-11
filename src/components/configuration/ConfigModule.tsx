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
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Administration</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Console Settings</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Configuration & Audit</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Settings options */}
          <div className="sap-card p-6 lg:col-span-1 space-y-6 flex flex-col h-fit sticky top-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Core Platform Parameters</h3>
            
            <div className="space-y-6">
              {configs.map(c => (
                <div key={c.id} className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-sap-text uppercase tracking-widest">{c.key}</label>
                    <span className="text-[9px] font-bold text-sap-primary bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-100 uppercase tracking-tighter">{c.category}</span>
                  </div>
                  <input 
                    type="text" 
                    value={c.value} 
                    onChange={e => handleUpdateConfig(c.id, e.target.value)}
                    className="w-full text-[11px] font-mono font-bold p-2.5 bg-slate-50 border border-sap-border rounded-sm focus:ring-1 focus:ring-sap-primary focus:bg-white focus:outline-none transition-all"
                  />
                  <p className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter italic opacity-70 group-hover:opacity-100 transition-opacity">{c.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-sap-border">
              <button className="w-full py-2.5 bg-sap-shell text-white rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-sap-shell/90 transition shadow-sm">
                Commit Protocol Changes
              </button>
            </div>
          </div>

          {/* Audit Log timeline right */}
          <div className="sap-card lg:col-span-2 overflow-hidden flex flex-col bg-white">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 className="text-[11px] font-bold uppercase tracking-tight text-sap-text">Platform Audit Protocol Ledger</h3>
              <span className="text-[10px] bg-blue-50 text-sap-primary border border-blue-200 font-bold px-2 py-0.5 rounded-sm">
                IMMUTABLE LOGS
              </span>
            </div>

            <div className="divide-y divide-sap-border overflow-y-auto flex-1">
              {auditLogs.map(log => (
                <div key={log.id} className="p-5 hover:bg-blue-50/20 transition group space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sap-primary"></span>
                      <span className="text-[10px] font-bold text-sap-primary uppercase tracking-widest">{log.module}</span>
                    </div>
                    <span className="text-[9px] font-bold text-sap-text-secondary uppercase tracking-widest font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="font-bold text-[12px] text-sap-text uppercase tracking-tight group-hover:text-sap-primary transition-colors">{log.action}</div>
                  <p className="text-sap-text-secondary font-bold uppercase tracking-tighter text-[10px] leading-relaxed italic">{log.details}</p>
                  <div className="flex justify-between text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest pt-2 border-t border-sap-border/10">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-user text-[8px] opacity-50"></i>
                      Auth: {log.user}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-network-wired text-[8px] opacity-50"></i>
                      IP: {log.ipAddress}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
