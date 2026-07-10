import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext: string;
  iconClass: string;
  trend?: {
    value: string;
    type: 'up' | 'down' | 'neutral';
  };
  colorClass?: string;
}

export function KPICard({ title, value, subtext, iconClass, trend, colorClass = 'border-slate-200' }: KPICardProps) {
  return (
    <div className={`bg-white p-4 border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex justify-between items-start ${colorClass}`}>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</div>
        <div className="text-2xl font-bold font-display mt-1 text-slate-900 truncate">{value}</div>
        <div className="flex items-center gap-1.5 mt-1">
          {trend && (
            <span className={`text-[10px] font-bold px-1 py-0.2 rounded ${
              trend.type === 'up' ? 'text-emerald-700 bg-emerald-50' : 
              trend.type === 'down' ? 'text-rose-700 bg-rose-50' : 'text-slate-500 bg-slate-50'
            }`}>
              <i className={`fa-solid ${trend.type === 'up' ? 'fa-arrow-up' : trend.type === 'down' ? 'fa-arrow-down' : 'fa-minus'} mr-0.5`}></i>
              {trend.value}
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-medium truncate">{subtext}</span>
        </div>
      </div>
      <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 border border-slate-100 shrink-0">
        <i className={`fa-solid ${iconClass} text-sm text-slate-600`}></i>
      </div>
    </div>
  );
}
