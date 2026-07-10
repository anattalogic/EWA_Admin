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
      name: `Custom ${type} Step`,
      assignee: type === 'Approval' ? 'Treasury Auditor' : undefined,
      description: `Auto-calibrated EWA ${type.toLowerCase()} threshold logic.`
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <nav className="flex gap-2 text-[11px] text-slate-400 uppercase tracking-wider mb-1 font-bold">
            <span>Automation</span>
            <span>/</span>
            <span className="text-blue-600">Visual Workflows</span>
          </nav>
          <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight">Approval Workflow Builder</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Workflow config compiled & pushed to staging: Version ' + activeWf.version)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold shadow-sm hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-cloud-arrow-up mr-1.5"></i>
            Deploy New Version
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Node toolbox left */}
        <div className="bg-white p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Automation Toolbox</h3>
          <p className="text-[11px] text-slate-400">Drag or click to inject automated decision gates and notification webhooks into the payroll routing logic.</p>
          
          <div className="space-y-2">
            <button 
              onClick={() => handleAddNode('Approval')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-md text-xs transition"
            >
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <i className="fa-solid fa-signature text-blue-600"></i>
                Human Release approval
              </span>
              <span className="text-[10px] text-slate-400 font-mono">DR/CR</span>
            </button>

            <button 
              onClick={() => handleAddNode('Decision')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-md text-xs transition"
            >
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <i className="fa-solid fa-code-fork text-purple-600"></i>
                Logical Gate Rule
              </span>
              <span className="text-[10px] text-slate-400 font-mono">IF/ELSE</span>
            </button>

            <button 
              onClick={() => handleAddNode('Notification')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-md text-xs transition"
            >
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <i className="fa-solid fa-paper-plane text-emerald-600"></i>
                Gateway API Webhook
              </span>
              <span className="text-[10px] text-slate-400 font-mono">POST</span>
            </button>

            <button 
              onClick={() => handleAddNode('Timer')}
              className="w-full flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-md text-xs transition"
            >
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <i className="fa-solid fa-hourglass-half text-amber-600"></i>
                Liquidity Hold Delay
              </span>
              <span className="text-[10px] text-slate-400 font-mono">DELAY</span>
            </button>
          </div>
        </div>

        {/* Visual Canvas central */}
        <div className="bg-slate-50 border rounded-lg p-6 lg:col-span-3 flex flex-col justify-between min-h-[450px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] uppercase font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                Active Graph: {activeWf.name} v{activeWf.version}
              </span>
              <span className="text-[10px] text-slate-400">Parity: Connected to Chase FedNow</span>
            </div>

            {/* Visual step cards */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {nodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  {idx > 0 && (
                    <div className="text-slate-300 font-bold text-lg animate-pulse">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  )}
                  <div 
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 bg-white border rounded-lg shadow-sm w-44 cursor-pointer hover:border-blue-500 transition relative group ${
                      selectedNodeId === node.id ? 'border-2 border-blue-600' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                        node.type === 'Start' ? 'bg-slate-100 text-slate-800' :
                        node.type === 'Decision' ? 'bg-purple-100 text-purple-800' :
                        node.type === 'Approval' ? 'bg-blue-100 text-blue-800' :
                        node.type === 'Notification' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {node.type}
                      </span>
                      {node.type !== 'Start' && node.type !== 'End' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNode(node.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-[10px] text-rose-600 hover:text-rose-800 transition"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">{node.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">{node.description || node.assignee || 'System Step'}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded p-3 text-xs flex justify-between items-center text-slate-600 mt-6">
            <span><i className="fa-solid fa-circle-info text-blue-600 mr-1.5"></i> Click any node to select and edit parameter properties dynamically.</span>
            <span className="font-mono font-bold text-slate-400">Nodes: {nodes.length}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
