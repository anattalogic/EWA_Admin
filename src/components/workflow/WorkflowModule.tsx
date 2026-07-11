import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function WorkflowModule() {
  const { workflows, updateWorkflow } = useEwaStore();
  const activeWf = workflows[0];
  const [nodes, setNodes] = useState(activeWf?.nodes || []);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleAddNode = (type: 'Approval' | 'Decision' | 'Notification' | 'Timer' | 'Task') => {
    const newId = `node-${Date.now()}`;
    const newNode = {
      id: newId,
      type,
      name: `Custom ${type} Protocol`,
      assignee: type === 'Approval' ? 'Treasury Lead' : undefined,
      description: `Auto-configured EWA ${type.toLowerCase()} gate.`
    };
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    updateWorkflow(updatedNodes, activeWf?.edges || []);
  };

  const handleRemoveNode = (id: string) => {
    const updatedNodes = nodes.filter(n => n.id !== id);
    setNodes(updatedNodes);
    updateWorkflow(updatedNodes, activeWf?.edges || []);
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-4 flex justify-between items-center shrink-0">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Automation</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">Workflow Architect</span>
          </div>
          <h1 className="text-xl font-semibold text-sap-text tracking-tight">Approval Logic Builder</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Workflow deployment initiated: ' + activeWf.version)}
            className="px-4 py-1.5 bg-sap-primary text-white rounded-sm text-[11px] font-bold uppercase tracking-widest shadow-sm hover:bg-sap-primary/90 transition flex items-center gap-2"
          >
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Deploy Logic
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          
          {/* Node toolbox */}
          <div className="sap-card p-6 flex flex-col h-fit sticky top-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-sap-text border-b pb-3 border-sap-border">Logic Toolbox</h3>
            <p className="text-[10px] text-sap-text-secondary font-bold uppercase tracking-tighter italic mt-3 mb-6 leading-relaxed">
              Define sequential decision gates and automated webhooks for protocol routing.
            </p>
            
            <div className="space-y-3">
              {[
                { type: 'Approval', name: 'Human Audit', icon: 'fa-signature', color: 'text-blue-600', meta: 'DR/CR' },
                { type: 'Decision', name: 'Logical Gate', icon: 'fa-code-fork', color: 'text-purple-600', meta: 'IF/ELSE' },
                { type: 'Notification', name: 'API Webhook', icon: 'fa-paper-plane', color: 'text-emerald-600', meta: 'REST' },
                { type: 'Timer', name: 'Protocol Hold', icon: 'fa-hourglass-half', color: 'text-amber-600', meta: 'WAIT' }
              ].map(tool => (
                <button 
                  key={tool.type}
                  onClick={() => handleAddNode(tool.type as any)}
                  className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 border border-sap-border rounded-sm group transition"
                >
                  <span className="flex items-center gap-3 text-sap-text font-bold text-[11px] uppercase tracking-tighter">
                    <i className={`fa-solid ${tool.icon} ${tool.color} group-hover:scale-110 transition`}></i>
                    {tool.name}
                  </span>
                  <span className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest font-mono opacity-50">{tool.meta}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas central */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="sap-card bg-slate-50/50 border-dashed border-2 flex-1 p-8 relative overflow-x-auto min-h-[500px]">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-mono font-bold bg-white text-sap-primary px-2 py-0.5 rounded-sm border border-sap-primary shadow-sm">
                    ACTIVE: {activeWf.name} v{activeWf.version}
                  </span>
                  <div className="flex items-center gap-1.5 ml-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-sap-success animate-pulse"></span>
                    <span className="text-[9px] text-sap-text-secondary font-bold uppercase tracking-widest">CONNECTED TO CORE GATEWAY</span>
                  </div>
                </div>
              </div>

              {/* Visual Graph */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                {nodes.map((node, idx) => (
                  <React.Fragment key={node.id}>
                    {idx > 0 && (
                      <div className="text-sap-border font-bold text-xl py-4">
                        <i className="fa-solid fa-arrow-right-long text-sap-border animate-pulse"></i>
                      </div>
                    )}
                    <div 
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 bg-white border rounded-sm shadow-sm w-48 cursor-pointer hover:border-sap-primary transition-all relative group h-24 flex flex-col justify-between ${
                        selectedNodeId === node.id ? 'border-2 border-sap-primary ring-4 ring-sap-primary/10 -translate-y-1' : 'border-sap-border'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-sm border ${
                          node.type === 'Start' ? 'bg-slate-100 text-slate-800 border-slate-200' :
                          node.type === 'Decision' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          node.type === 'Approval' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          node.type === 'Notification' ? 'bg-emerald-50 text-sap-success border-emerald-200' : 'bg-amber-50 text-sap-warning border-amber-200'
                        }`}>
                          {node.type}
                        </span>
                        {node.type !== 'Start' && node.type !== 'End' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveNode(node.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 hover:text-red-600 transition"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-sap-text truncate uppercase tracking-tight">{node.name}</div>
                        <div className="text-[9px] text-sap-text-secondary mt-1 truncate font-bold uppercase tracking-tighter opacity-70">
                          {node.description || node.assignee || 'SYSTEM STEP'}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="sap-card p-4 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100">
                  <i className="fa-solid fa-circle-info text-sap-primary text-[10px]"></i>
                </div>
                <span className="text-[10px] font-bold text-sap-text-secondary uppercase tracking-tighter">
                  Select logic objects to calibrate dynamic protocol parameters.
                </span>
              </div>
              <div className="font-mono font-bold text-[10px] text-sap-text uppercase bg-slate-50 border border-sap-border px-3 py-1 rounded-sm">
                GRAPH_NODES: {nodes.length}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
