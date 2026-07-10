import React, { useState, useRef, useEffect } from 'react';
import { useEwaStore } from '../../app/store';

export function RightPanel() {
  const { aiMessages, sendAiMessage, bankAccounts, glAccounts, activityLogs } = useEwaStore();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendAiMessage(inputText);
    setInputText('');
  };

  const prefundBalance = bankAccounts.find(b => b.type === 'Prefund')?.balance || 0;
  const receivableBalance = glAccounts.find(g => g.id === '1400')?.balance || 0;

  return (
    <aside className="w-64 border-l border-slate-200 bg-slate-50 p-4 shrink-0 flex flex-col justify-between overflow-y-auto space-y-6 h-full">
      
      {/* Top section: double-entry real-time visual monitor */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Double-Entry Preview</h3>
        <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono space-y-2 text-slate-300">
          <div className="border-b border-slate-700 pb-1.5 text-[9px] text-slate-500 uppercase font-bold">Current Platform Totals</div>
          
          <div className="flex justify-between items-center">
            <span>DR Receivables (1400)</span>
            <span className="text-emerald-400 font-bold">${receivableBalance.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pl-4 text-slate-400">
            <span>CR Prefund Vault (1200)</span>
            <span className="text-rose-400 font-bold">(${prefundBalance.toLocaleString()})</span>
          </div>
        </div>
      </section>

      {/* Central section: Live AI assistant feed */}
      <section className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-lg p-3 shadow-sm justify-between">
        <div className="flex items-center gap-2 pb-2 border-b">
          <i className="fa-solid fa-brain-circuit text-blue-600 animate-pulse text-sm"></i>
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Treasury Intelligence AI</span>
        </div>

        {/* Message timeline container */}
        <div className="flex-1 overflow-y-auto space-y-3 my-3 pr-1 max-h-56">
          {aiMessages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-2 rounded-lg text-[11px] leading-relaxed max-w-[90%] ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'
              }`}>
                {msg.text}
              </div>
              <span className="text-[8px] text-slate-400 mt-0.5">{msg.timestamp}</span>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Submit quick questions */}
        <form onSubmit={handleSend} className="flex gap-1.5 border-t pt-2">
          <input 
            type="text" 
            placeholder="Query liquidity impact..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 text-[11px] p-1.5 bg-slate-50 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button 
            type="submit" 
            className="px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center justify-center transition"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </section>

      {/* Bottom section: Active Activities logs */}
      <section className="space-y-3">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Activity Feed</h3>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {activityLogs.slice(0, 3).map((act, index) => (
            <div key={index} className="flex gap-2 text-[10px] items-start border-l-2 pl-2 border-slate-300">
              <div className="flex-1">
                <div className="font-bold text-slate-800">{act.title}</div>
                <div className="text-slate-500 leading-snug">{act.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </aside>
  );
}
