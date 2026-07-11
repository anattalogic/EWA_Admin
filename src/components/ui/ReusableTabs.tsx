import React from 'react';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ReusableTabs({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <div className="flex border-b border-slate-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
            activeTab === tab
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
