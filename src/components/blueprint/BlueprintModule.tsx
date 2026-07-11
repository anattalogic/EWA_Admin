import React, { useState } from 'react';
import { useEwaStore } from '../../app/store';

export function BlueprintModule() {
  const [activeSection, setActiveSection] = useState<'overview' | 'structure' | 'ghpages' | 'specs' | 'simulator'>('overview');
  
  // States for Simulator
  const [hourlyRate, setHourlyRate] = useState<number>(15);
  const [hoursWorked, setHoursWorked] = useState<number>(120);
  const [requestAmount, setRequestAmount] = useState<number>(300);
  const [feeFlat, setFeeFlat] = useState<number>(2.5);
  const [feePercent, setFeePercent] = useState<number>(1.5);
  const [maxEwaPercentage, setMaxEwaPercentage] = useState<number>(50);

  // Math calculations for simulator
  const grossAccrued = hourlyRate * hoursWorked;
  const maxEwaAllowed = (grossAccrued * maxEwaPercentage) / 100;
  const isOverLimit = requestAmount > maxEwaAllowed;
  const calculatedFee = feeFlat + (requestAmount * feePercent) / 100;
  const netDisburse = requestAmount - calculatedFee;

  // Next.js structural files mockup data
  const [selectedFile, setSelectedFile] = useState<string>('next-config');

  const fileContents: Record<string, { title: string; lang: string; code: string }> = {
    'next-config': {
      title: 'next.config.js (Static Export Configuration)',
      lang: 'javascript',
      code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export for GitHub Pages
  images: {
    unoptimized: true, // Required for static exports
  },
  basePath: '/ewa-enterprise-docs', // Replace with your repository name
  assetPrefix: '/ewa-enterprise-docs/',
};

module.exports = nextConfig;`
    },
    'gh-action': {
      title: '.github/workflows/deploy.yml (GitHub Actions CI/CD)',
      lang: 'yaml',
      code: `name: Deploy Next.js to GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install Dependencies
        run: npm ci

      - name: Build and Export
        run: npm run build

      - name: Upload Static Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out # Next.js export outputs to 'out' directory

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`
    },
    'layout': {
      title: 'app/layout.tsx (Main Next.js Core Layout)',
      lang: 'typescript',
      code: `import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'EWA Enterprise Platform Blueprint',
  description: 'Enterprise Grade Earned Wage Access Specifications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="my">
      <head>
        {/* FontAwesome & Google Fonts Integration */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}`
    },
    'store-slice': {
      title: 'lib/store.ts (Zustand State & Math Logic)',
      lang: 'typescript',
      code: `import { create } from 'zustand';

interface CalculationState {
  grossAccrued: number;
  maxEwaAllowed: number;
  calculateProRataRepayment: (amountPaid: number, totalOutstanding: number) => number;
}

export const useStore = create<CalculationState>((set) => ({
  grossAccrued: 0,
  maxEwaAllowed: 0,
  calculateProRataRepayment: (amountPaid, totalOutstanding) => {
    if (totalOutstanding === 0) return 0;
    // Equal percentage pro-rata allocation calculation
    const proRataRatio = amountPaid / totalOutstanding;
    return proRataRatio;
  }
}));`
    }
  };

  return (
    <div className="flex flex-col h-full bg-sap-background">
      {/* Header */}
      <div className="bg-white border-b border-sap-border px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-sap-text-secondary uppercase tracking-widest font-bold mb-1">
            <span>Enterprise Core</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
            <span className="text-sap-primary">System Blueprint</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <i className="fa-solid fa-book-open text-blue-600"></i>
            EWA Enterprise Blueprint & Technical Specifications
          </h1>
          <p className="text-[11px] text-slate-500 mt-1 font-semibold uppercase tracking-tight">
            လုပ်ခလစာ ကြိုတင်ထုတ်ယူနိုင်ခွင့် စနစ် (Earned Wage Access) ၏ တစ်ခုလုံးဆိုင်ရာ နည်းပညာဒီဇိုင်းနှင့် ပရောဂျက်ဗိသုကာ စာတမ်း
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 shrink-0 self-start md:self-center">
          <span className="text-[10px] font-bold text-slate-700 px-3 py-1 bg-white rounded shadow-sm flex items-center gap-1.5">
            <i className="fa-solid fa-language text-blue-500"></i>
            မြန်မာဘာသာ (Myanmar Edition)
          </span>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex gap-1 overflow-x-auto shrink-0 scrollbar-none">
        {[
          { id: 'overview', label: 'စနစ်တစ်ခုလုံး တည်ဆောက်ပုံ', icon: 'fa-sitemap' },
          { id: 'specs', label: 'အသေးစိတ် လုပ်ငန်းသတ်မှတ်ချက်များ', icon: 'fa-sliders' },
          { id: 'structure', label: 'Next.js Folder Structure', icon: 'fa-folder-tree' },
          { id: 'ghpages', label: 'GitHub Pages Deployment', icon: 'fa-cloud-arrow-up' },
          { id: 'simulator', label: 'Live Math Simulator', icon: 'fa-calculator' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-2.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 shrink-0 ${
              activeSection === tab.id
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-sm`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Visual Flow diagram rendered purely with beautiful Tailwind card structures */}
            <div className="sap-card bg-white p-6 border-t-4 border-blue-600">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-gears text-blue-600"></i>
                EWA Enterprise ပလက်ဖောင်း၏ အဓိက အလုပ်လုပ်ပုံစီးဆင်းမှုပုံရိပ် (Core Architectural Pipeline)
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch relative">
                {/* Step 1 */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-md flex flex-col justify-between hover:border-blue-500 transition shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-blue-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">STEP 1</div>
                  <div className="space-y-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <i className="fa-solid fa-users"></i>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Accrual & Attendance</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      ဝန်ထမ်းများ၏ အလုပ်လုပ်ချိန်နှင့် နာရီအလိုက်လုပ်ခပေါ်မူတည်၍ နေ့စဉ် လုပ်ခလစာများကို စုဆောင်းတွက်ချက်ပေးခြင်း။
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dashed text-[10px] font-mono font-bold text-blue-600">
                    Wages Accrued Daily
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden lg:flex items-center justify-center text-slate-300">
                  <i className="fa-solid fa-arrow-right-long text-xl animate-pulse"></i>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-md flex flex-col justify-between hover:border-amber-500 transition shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-amber-500 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">STEP 2</div>
                  <div className="space-y-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Risk & Limits Policy</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      ကုမ္ပဏီအလိုက် ကန့်သတ်ချက်များ (EWA limit %၊ အမြင့်ဆုံးထုတ်ယူနိုင်မှု၊ Risk Factor) များကို စစ်ဆေးတွက်ချက်ခြင်း။
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dashed text-[10px] font-mono font-bold text-amber-600">
                    Policy Compliance Check
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="hidden lg:flex items-center justify-center text-slate-300">
                  <i className="fa-solid fa-arrow-right-long text-xl animate-pulse"></i>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-md flex flex-col justify-between hover:border-indigo-500 transition shadow-sm relative">
                  <div className="absolute -top-3 left-4 bg-indigo-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">STEP 3</div>
                  <div className="space-y-2 mt-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Disbursement Engine</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      ဘဏ္ဍာရေးဌာနမှ အတည်ပြုပြီးသည်နှင့် တိုက်ရိုက် Instant ACH သို့မဟုတ် Real-Time Payment ဖြင့် ငွေထုတ်ပေးခြင်း။
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-dashed text-[10px] font-mono font-bold text-indigo-600">
                    Fund Release Approved
                  </div>
                </div>
              </div>

              {/* Pro-rata flowchart explanation */}
              <div className="mt-8 bg-blue-50/50 rounded-sm border border-blue-100 p-5 space-y-3">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                  <i className="fa-solid fa-rotate-left"></i>
                  မျှဝေအချိုးကျ ပြန်လည်ကောက်ခံမှုစနစ် (Equally % Base Repayment Workflow)
                </h4>
                <p className="text-[12px] text-slate-700 leading-relaxed">
                  လုပ်ငန်း၏ ငွေကြေးစီးဆင်းမှု မျှတစေရန်နှင့် စာရင်းများ ကိုက်ညီစေရန်အတွက် ဝန်ထမ်းတစ်ဦးချင်းစီမှ ပြန်လည်ပေးဆပ်သော ပမာဏကို လက်ကျန် EWA တောင်းဆိုမှု မှတ်တမ်းအားလုံးသို့ <strong>Equally Percentage Base (မျှဝေအချိုးကျရာခိုင်နှုန်း)</strong> စနစ်ဖြင့် ပိုင်းခြားသတ်မှတ်တွက်ချက်ပါသည်။ ၎င်းသည် ကြွေးကျန်မှတ်တမ်းတစ်ခုတည်းတွင် အလုံးအရင်း သွားရောက်ခုနှိမ်ခြင်း မပြုဘဲ ခရက်ဒစ်ပမာဏအားလုံးကို အချိုးကျ ပြေလည်စေပါသည်။
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Core System Goals */}
              <div className="sap-card bg-white p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-bullseye text-blue-600"></i>
                  EWA စနစ်၏ ရည်ရွယ်ချက် (Platform Purpose)
                </h3>
                <ul className="space-y-3 text-[11px] text-slate-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i>
                    <span><strong>ဝန်ထမ်းများအတွက် ငွေကြေးဖိစီးမှု လျှော့ချခြင်း:</strong> လစဉ်လစာရက်ကို စောင့်ဆိုင်းစရာမလိုဘဲ မိမိအမှန်တကယ် လုပ်ကိုင်ပြီးစီးသည့် ရက်အလိုက် စုဆောင်းမိသော လစာငွေကို လိုအပ်သလို ထုတ်ယူသုံးစွဲနိုင်ခြင်း။</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i>
                    <span><strong>လုပ်ငန်းရှင်များအတွက် စာရင်းအင်းလွယ်ကူခြင်း:</strong> General Ledger (GL) ပေါင်းစပ်မှုစနစ်ကြောင့် Automated Journal entry တင်ပေးခြင်းဖြင့် ငွေစာရင်းရှင်းတမ်းများကို လျင်မြန်စွာ ကိုက်ညီစစ်ဆေးနိုင်ခြင်း။</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5"></i>
                    <span><strong>လုံခြုံသော ဘဏ္ဍာရေးစည်းမျဉ်းများ:</strong> ဘတ်ဂျက်ထိန်းချုပ်မှုဆိုင်ရာ Matrix များနှင့် Limit Configurations များကြောင့် ငွေကြေးဆုံးရှုံးနိုင်ခြေ (Risk Score) အနည်းဆုံးဖြစ်အောင် စနစ်တကျ ကန့်သတ်ပေးခြင်း။</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: Tech Specs */}
              <div className="sap-card bg-white p-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-microchip text-blue-600"></i>
                  နည်းပညာဆိုင်ရာ တည်ဆောက်မှုပုံစံ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[11px] border-b pb-2 border-slate-100">
                    <span className="text-slate-500 uppercase tracking-tighter">Frontend Framework</span>
                    <span className="font-bold text-slate-800">React 18+ with Vite Engine</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] border-b pb-2 border-slate-100">
                    <span className="text-slate-500 uppercase tracking-tighter">Styling Platform</span>
                    <span className="font-bold text-slate-800">Tailwind CSS 4.0</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] border-b pb-2 border-slate-100">
                    <span className="text-slate-500 uppercase tracking-tighter">State Management</span>
                    <span className="font-bold text-slate-800">Zustand Dynamic Store</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 uppercase tracking-tighter">Type Safety</span>
                    <span className="font-bold text-slate-800">Strict TypeScript Verification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: NEXT.JS FOLDER STRUCTURE */}
        {activeSection === 'structure' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {/* Interactive Tree View */}
            <div className="sap-card bg-white p-5 lg:col-span-1 flex flex-col">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-3 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-folder-open text-amber-500"></i>
                Next.js Project Directory Tree
              </h3>
              
              <div className="flex-1 space-y-1 font-mono text-xs text-slate-700 select-none overflow-y-auto">
                <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer text-slate-900 font-bold">
                  <i className="fa-solid fa-folder text-amber-500"></i>
                  <span>ewa-enterprise-docs/</span>
                </div>
                <div className="pl-4 border-l border-slate-200 space-y-1">
                  <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <i className="fa-solid fa-folder text-amber-500"></i>
                    <span>.github/workflows/</span>
                  </div>
                  <div onClick={() => setSelectedFile('gh-action')} className={`pl-4 p-1 rounded flex items-center gap-2 cursor-pointer transition ${selectedFile === 'gh-action' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100'}`}>
                    <i className="fa-regular fa-file-code text-indigo-500"></i>
                    <span>deploy.yml</span>
                  </div>
                  <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <i className="fa-solid fa-folder text-amber-500"></i>
                    <span>app/</span>
                  </div>
                  <div className="pl-4 border-l border-slate-200 space-y-1">
                    <div onClick={() => setSelectedFile('layout')} className={`p-1 rounded flex items-center gap-2 cursor-pointer transition ${selectedFile === 'layout' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100'}`}>
                      <i className="fa-regular fa-file-code text-indigo-500"></i>
                      <span>layout.tsx</span>
                    </div>
                    <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
                      <i className="fa-regular fa-file-code text-indigo-500"></i>
                      <span>page.tsx (Docs Hub)</span>
                    </div>
                  </div>
                  <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <i className="fa-solid fa-folder text-amber-500"></i>
                    <span>components/</span>
                  </div>
                  <div className="pl-4 border-l border-slate-200 space-y-1">
                    <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
                      <i className="fa-solid fa-folder text-amber-500"></i>
                      <span>blueprint/</span>
                    </div>
                    <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
                      <i className="fa-solid fa-folder text-amber-500"></i>
                      <span>ui/</span>
                    </div>
                  </div>
                  <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <i className="fa-solid fa-folder text-amber-500"></i>
                    <span>lib/</span>
                  </div>
                  <div className="pl-4 border-l border-slate-200 space-y-1">
                    <div onClick={() => setSelectedFile('store-slice')} className={`p-1 rounded flex items-center gap-2 cursor-pointer transition ${selectedFile === 'store-slice' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100'}`}>
                      <i className="fa-regular fa-file-code text-indigo-500"></i>
                      <span>store.ts</span>
                    </div>
                  </div>
                  <div onClick={() => setSelectedFile('next-config')} className={`p-1 rounded flex items-center gap-2 cursor-pointer transition ${selectedFile === 'next-config' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100'}`}>
                    <i className="fa-solid fa-gears text-slate-500"></i>
                    <span>next.config.js</span>
                  </div>
                  <div className="p-1 rounded hover:bg-slate-100 flex items-center gap-2 cursor-pointer">
                    <i className="fa-solid fa-file-signature text-slate-500"></i>
                    <span>package.json</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Content & Myanmar Descriptions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="sap-card bg-white p-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-file-code text-blue-600"></i>
                  {fileContents[selectedFile]?.title || 'Code Viewer'}
                </h3>
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-sm text-[11px] font-mono overflow-x-auto leading-relaxed max-h-[350px]">
                  <code>{fileContents[selectedFile]?.code}</code>
                </pre>
              </div>

              <div className="sap-card bg-white p-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                  <i className="fa-solid fa-circle-question text-amber-500"></i>
                  ဖိုင်တွဲတစ်ခုချင်းစီ၏ ရည်ရွယ်ချက်နှင့် အကျိုးကျေးဇူး
                </h4>
                <div className="space-y-3 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <div>
                    <span className="font-bold text-slate-900 font-mono">1. app/ layout.tsx & page.tsx:</span> Next.js 14 App Router စနစ်ကို အသုံးပြု၍ စာမျက်နှာအသစ်များ တည်ဆောက်ခြင်း။ SEO နှင့် Static Rendering ကို ကောင်းမွန်စေရန် လုပ်ဆောင်ပေးသည်။
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 font-mono">2. components/ blueprint/:</span> စနစ်၏ လုပ်ဆောင်ချက်အသေးစိတ် ဇယားများနှင့် ပုံရိပ်ယောင်များကို ဖော်ပြပေးသော နေရာ။ modularity ကောင်းမွန်ပြီး ထိန်းသိမ်းရလွယ်ကူသည်။
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 font-mono">3. lib/ store.ts:</span> EWA သတ်မှတ်ချက်များနှင့် တွက်ချက်မှုဆိုင်ရာ Algorithms အားလုံးကို ထိန်းချုပ်ထားသော global state-manager ဖြစ်သည်။
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: GITHUB PAGES DEPLOYMENT */}
        {activeSection === 'ghpages' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="sap-card bg-white p-6 border-t-4 border-emerald-500">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-cloud-arrow-up text-emerald-500"></i>
                GitHub Pages ပေါ်သို့ Static Site အဖြစ် တင်ဆက်ခြင်း လမ်းညွှန် (GitHub Pages Export Guide)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">အဓိက လုပ်ဆောင်ရန် အဆင့်များ (Deployment Steps)</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <div className="text-[12px] text-slate-700 leading-relaxed">
                        <strong>Repository သတ်မှတ်ခြင်း:</strong> GitHub တွင် Repository အသစ်တစ်ခု ဆောက်လုပ်ပြီး သင်၏ Next.js code များကို Push လုပ်ပါ။
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <div className="text-[12px] text-slate-700 leading-relaxed">
                        <strong>Next-Config ပြင်ဆင်ခြင်း:</strong> static output ထွက်ရှိရန်အတွက် <code>next.config.js</code> ဖိုင်တွင် <code>output: 'export'</code> ကို ထည့်သွင်းသတ်မှတ်ပါ။
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <div className="text-[12px] text-slate-700 leading-relaxed">
                        <strong>GitHub Pages Settings:</strong> Repository Setup - Settings &gt; Pages သို့သွားပြီး Source ကို <code>GitHub Actions</code> သို့ ပြောင်းလဲသတ်မှတ်ပါ။
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <div className="text-[12px] text-slate-700 leading-relaxed">
                        <strong>Auto Deployment:</strong> Workflow file ဖန်တီးပြီးသည်နှင့် ကုတ်များပြောင်းလဲတိုင်း စနစ်မှ အလိုအလျောက် GitHub Pages ပေါ်တွင် ဖြန့်ချိပေးမည်ဖြစ်ပါသည်။
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-200 p-5 rounded-md font-mono space-y-4">
                  <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Build Commands Checklist</span>
                    <i className="fa-solid fa-check-double text-emerald-400"></i>
                  </div>
                  <div className="space-y-3 text-[11px] leading-relaxed">
                    <div>
                      <span className="text-slate-500"># Install packages</span>
                      <div className="text-white font-bold">npm install</div>
                    </div>
                    <div>
                      <span className="text-slate-500"># Verify build and export static output</span>
                      <div className="text-white font-bold">npm run build</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">Creates output files inside the '/out' directory.</div>
                    </div>
                    <div>
                      <span className="text-slate-500"># Local testing for static site export</span>
                      <div className="text-white font-bold">npx serve out</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: MODULE SPECIFICATIONS & LOGIC */}
        {activeSection === 'specs' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Modular Spec Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Budget Control */}
              <div className="sap-card bg-white p-5 border-l-4 border-l-blue-600 space-y-4">
                <div className="flex items-center gap-2.5 border-b pb-2">
                  <div className="w-7 h-7 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-vault"></i>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                    ဘတ်ဂျက်ထိန်းချုပ်မှု မော်ဂျူး (Budget & Treasury Control Module)
                  </h3>
                </div>
                <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <p>
                    <strong>လုပ်ဆောင်ပုံ:</strong> လုပ်ငန်းတစ်ခုချင်းစီအတွက် ကြိုတင်သတ်မှတ်ထားသော Credit Limit (ခရက်ဒစ်ကန့်သတ်ချက်) နှင့် လက်ရှိအသုံးပြုပြီးသော Budget Utilized ကို တွက်ချက်ထိန်းချုပ်ပေးသော မော်ဂျူးဖြစ်ပါသည်။
                  </p>
                  <p>
                    <strong>Treasury Bridge:</strong> နေ့စဉ် EWA ထုတ်ယူမှုများအတွက် ရန်ပုံငွေလိုအပ်ချက်ကို ကာမိစေရန် Prefund Accounts များ၏ Balance ကို တိုက်ရိုက်ချိတ်ဆက်စောင့်ကြည့်ပေးပါသည်။ Prefund Balance သည် Threshold (အနိမ့်ဆုံးသတ်မှတ်ပမာဏ) အောက် ကျဆင်းသွားပါက Alert (သတိပေးချက်) ချက်ချင်းထုတ်ပြန်ပေးသည်။
                  </p>
                </div>
              </div>

              {/* Card 2: Dynamic Limits */}
              <div className="sap-card bg-white p-5 border-l-4 border-l-amber-500 space-y-4">
                <div className="flex items-center gap-2.5 border-b pb-2">
                  <div className="w-7 h-7 rounded bg-amber-100 flex items-center justify-center text-amber-600">
                    <i className="fa-solid fa-sliders"></i>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                    သတ်မှတ်ချက်ဆိုင်ရာ စည်းမျဉ်းများ (Dynamic Limits & Governance Rules)
                  </h3>
                </div>
                <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <p>
                    <strong>လုပ်ဆောင်ပုံ:</strong> ကုမ္ပဏီများနှင့် ဝန်ထမ်းများ၏ လုံခြုံရေးအတွက် တစ်နေ့တာအများဆုံးထုတ်ယူနိုင်မှု၊ တစ်ကြိမ်အများဆုံးထုတ်ယူနိုင်မှု၊ နှင့် လစာသတ်မှတ်ရက်အလိုက် (Weekly, Bi-Weekly, Monthly) EWA Limits များကို တက်ကြွစွာ ထိန်းချုပ်ပေးသည်။
                  </p>
                  <p>
                    <strong>Effective Windows:</strong> Dynamic Limits ဇယားတွင် ကန့်သတ်ချက်တစ်ခုချင်းစီအတွက် Validity Dates (အကျုံးဝင်မည့် သတ်မှတ်ရက်များ) သတ်မှတ်နိုင်ပြီး သက်တမ်းကုန်ဆုံးပါက စနစ်မှ Global Policy သို့ အလိုအလျောက် လွှဲပြောင်းပေးသည်။
                  </p>
                </div>
              </div>

              {/* Card 3: Fee Engine */}
              <div className="sap-card bg-white p-5 border-l-4 border-l-emerald-500 space-y-4">
                <div className="flex items-center gap-2.5 border-b pb-2">
                  <div className="w-7 h-7 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                    ဝန်ဆောင်ခသတ်မှတ်ချက်အင်ဂျင် (Fee Engine Configuration)
                  </h3>
                </div>
                <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <p>
                    <strong>လုပ်ဆောင်ပုံ:</strong> ဝန်ဆောင်ခ တွက်ချက်မှုတွင် Flat Fee (ပုံသေဝန်ဆောင်ခ) နှင့် Variable Percentage Fee (ထုတ်ယူငွေ ရာခိုင်နှုန်းအလိုက် ဝန်ဆောင်ခ) နှစ်မျိုးလုံးကို ပေါင်းစပ်အသုံးပြုနိုင်သည်။
                  </p>
                  <p>
                    <strong>Late Fees & Graces:</strong> သတ်မှတ်ထားသော လစာပြန်ဆပ်ရက် နောက်ကျသွားပါက Late Grace Days ကိုကျော်လွန်ပြီးနောက် အလိုအလျောက် Late Fee protocol စတင်အသက်ဝင်သည်။ ယင်းတို့ကို GL profit ledger သို့ သီးသန့် posting တင်ပေးပါသည်။
                  </p>
                </div>
              </div>

              {/* Card 4: Timing & Accrual */}
              <div className="sap-card bg-white p-5 border-l-4 border-l-indigo-500 space-y-4">
                <div className="flex items-center gap-2.5 border-b pb-2">
                  <div className="w-7 h-7 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">
                    လစာစုဆောင်းမှုနှင့် လုပ်ငန်းအချိန် (Accrual & Operational Timing Protocol)
                  </h3>
                </div>
                <div className="space-y-2 text-[11px] text-slate-700 leading-relaxed font-medium">
                  <p>
                    <strong>လစာတွက်ချက်မှု ပေါ်လစီ (Payroll Cycle):</strong> ကုမ္ပဏီတစ်ခုချင်းစီတွင် သီးသန့် payroll cycle (ဥပမာ - လစဉ်၊ ၂ ပတ်တစ်ကြိမ်) ရှိပြီး Start Day၊ End Day နှင့် Standard Payday တို့ကို သတ်မှတ်ထားသည်။
                  </p>
                  <p>
                    <strong>EWA Withdrawal Window:</strong> လစာမထုတ်မီ EWA Window End Day (ဥပမာ - လစဉ် ၂၅ ရက်) အထိသာ EWA ထုတ်ယူခွင့် ပြုထားသည်။ ၎င်းနောက်ပိုင်းရက်များတွင် လစာစာရင်းပိတ်သိမ်းခြင်း (Operational calculation) အတွက် EWA ထုတ်ယူမှုများကို ခေတ္တပိတ်ထားသည်။
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 5: LIVE MATH SIMULATOR */}
        {activeSection === 'simulator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="sap-card bg-white p-6 border-t-4 border-blue-600">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-calculator text-blue-600"></i>
                EWA တွက်ချက်မှုဆိုင်ရာ စမ်းသပ်ခြင်း ပုံရိပ်ယောင်စနစ် (Interactive Math Playground)
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inputs */}
                <div className="bg-slate-50 p-5 rounded border border-slate-200 space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2 mb-2">ဝန်ထမ်း အချက်အလက်များ</h3>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">နာရီအလိုက် လုပ်ခလစာ ($/Hour)</label>
                    <input 
                      type="number" 
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">စုစုပေါင်း အလုပ်လုပ်ချိန် (Hours Worked)</label>
                    <input 
                      type="number" 
                      value={hoursWorked}
                      onChange={(e) => setHoursWorked(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">EWA Limit Percentage (%)</label>
                    <input 
                      type="number" 
                      value={maxEwaPercentage}
                      onChange={(e) => setMaxEwaPercentage(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2 pt-2 mb-2">EWA တောင်းဆိုမှုနှင့် ဝန်ဆောင်ခ</h3>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">ထုတ်ယူလိုသော EWA ပမာဏ ($)</label>
                    <input 
                      type="number" 
                      value={requestAmount}
                      onChange={(e) => setRequestAmount(Number(e.target.value))}
                      className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Flat Fee ($)</label>
                      <input 
                        type="number" 
                        value={feeFlat}
                        onChange={(e) => setFeeFlat(Number(e.target.value))}
                        className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Variable Fee (%)</label>
                      <input 
                        type="number" 
                        value={feePercent}
                        onChange={(e) => setFeePercent(Number(e.target.value))}
                        className="w-full text-xs p-2 border border-slate-200 bg-white font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculations Visual Output */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Results Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/65 border border-blue-100 p-4 rounded flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Gross Accrued Wages</span>
                      <div className="text-2xl font-mono font-bold text-blue-900 mt-2">${grossAccrued.toLocaleString()}</div>
                      <span className="text-[9px] text-slate-500 italic mt-1">အမှန်တကယ် လုပ်ကိုင်ပြီးစီးသဖြင့် ရရှိသော စုစုပေါင်းလစာ</span>
                    </div>

                    <div className="bg-emerald-50/65 border border-emerald-100 p-4 rounded flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Max EWA Allowed</span>
                      <div className="text-2xl font-mono font-bold text-emerald-950 mt-2">${maxEwaAllowed.toLocaleString()}</div>
                      <span className="text-[9px] text-slate-500 italic mt-1">မူဝါဒအရ ထုတ်ယူခွင့်ပြုထားသော အမြင့်ဆုံးလစာ ပမာဏ</span>
                    </div>
                  </div>

                  {/* Fee & Net Disburse Breakdown */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded space-y-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b pb-2">တွက်ချက်မှု အဖြေလွှာ (Calculation Analysis)</h3>
                    
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="text-slate-600 font-medium">တောင်းဆိုသော ပမာဏ (EWA Principal Requested):</span>
                        <span className="font-mono font-bold text-slate-900">${requestAmount.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center text-[12px] border-b pb-2 border-slate-200/50">
                        <span className="text-slate-600 font-medium">တွက်ချက်ပြီး ဝန်ဆောင်ခ (Service Fee Accrued):</span>
                        <span className="font-mono font-bold text-amber-600">${calculatedFee.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center text-[13px] pt-1 font-bold">
                        <span className="text-slate-800">ဝန်ထမ်းရရှိမည့် လက်ငင်းငွေ (Net Disbursed to Bank Account):</span>
                        <span className="font-mono text-emerald-600 text-base">${netDisburse.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Limit Verification Status Warning */}
                    <div className="mt-4">
                      {isOverLimit ? (
                        <div className="p-3 bg-red-50 text-red-700 rounded border border-red-100 text-[11px] font-bold flex items-center gap-2">
                          <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
                          တောင်းဆိုထားသော ပမာဏသည် အမြင့်ဆုံးထုတ်ယူခွင့် ကန့်သတ်ချက်ထက် သာလွန်နေသဖြင့် အတည်ပြုနိုင်မည် မဟုတ်ပါ။
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded border border-emerald-100 text-[11px] font-bold flex items-center gap-2">
                          <i className="fa-solid fa-circle-check text-emerald-500"></i>
                          ထုတ်ယူမှု ပမာဏ ကိုက်ညီမှုရှိပါသည်။ စနစ်မှ Direct Outflow အဖြစ် အလိုအလျောက် ပေးချေနိုင်ပါသည်။
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
