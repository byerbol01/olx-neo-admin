'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import {
  CreditCard,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  FileText,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  Filter,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { initialTransactions } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function TolovlarPage() {
  const { showToast } = useApp();

  const [transactions, setTransactions] = useState(initialTransactions);
  const [timeTab, setTimeTab] = useState('Oy'); // 'Kun' | 'Hafta' | 'Oy' | 'Yil'
  const [searchVal, setSearchVal] = useState('');
  const [methodFilter, setMethodFilter] = useState('Barchasi');
  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPoint, setHoveredPoint] = useState(4); // 20-Okt

  const handleExport = () => {
    showToast('Barcha to\'lov operatsiyalari Excel/CSV formatida eksport qilinmoqda...', 'success');
  };

  const handleGenerateReport = () => {
    showToast('Yangi moliyaviy hisobot shakllantirildi va yuklab olishga tayyor!', 'success');
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchVal.toLowerCase()) ||
      t.user.toLowerCase().includes(searchVal.toLowerCase()) ||
      t.phone.includes(searchVal);
    if (!matchesSearch) return false;
    if (methodFilter !== 'Barchasi' && t.method !== methodFilter) return false;
    if (statusFilter !== 'Barchasi' && t.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f6f9f8] min-h-screen">
      <Header onSearch={setSearchVal} />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Title and Top Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00DF81]" />
              <span className="text-[11px] font-bold text-[#00bfa5] uppercase tracking-wider">
                MOLIYA VA HISOBOTLAR • Rejim: Real Vaqt Sinxroni
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              To&apos;lovlar va Tushum Tahlili
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>1 Okt – 31 Okt, 2026</span>
            </div>

            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#09221d] hover:bg-[#123931] text-white text-xs font-bold rounded-xl shadow-md transition-all transform active:scale-95"
            >
              <FileText className="w-4 h-4 text-[#00DF81]" />
              <span>Yangi hisobot shakllantirish</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Oylik tushum</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 className="text-2xl font-black text-slate-900">348,250,000</h3>
                  <span className="text-xs font-bold text-slate-500">UZS</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                +16.4%
              </span>
              <span className="text-slate-400 font-medium">o&apos;tgan oyga nisbatan</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Bugungi tushum</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 className="text-2xl font-black text-slate-900">14,820,000</h3>
                  <span className="text-xs font-bold text-slate-500">UZS</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                +8.2%
              </span>
              <span className="text-slate-400 font-medium">kechagiga nisbatan</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Muvaffaqiyatli to&apos;lovlar</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 className="text-2xl font-black text-slate-900">4,912</h3>
                  <span className="text-xs font-bold text-slate-500">ta</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">Konversiya: 98.7%</span>
              <span className="text-slate-400">• Yuqori samaradorlik</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft border-l-4 border-l-red-400">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">Kutilayotgan / Bekor</p>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 className="text-2xl font-black text-red-500">64</h3>
                  <span className="text-xs font-bold text-slate-500">ta</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="font-bold text-red-600">Muammoli: 1.3%</span>
              <span className="text-slate-400">• qo&apos;lda ko&apos;rib chiqishda</span>
            </div>
          </div>
        </div>

        {/* Charts Grid: Dynamic Curve + Donut Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Chart: Tushum Dinamikasi (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">
                  Tushum dinamikasi (Oktyabr 2026)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Asosiy xizmatlar va reklama paketlari balansi
                </p>
              </div>

              {/* Time Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                {['Kun', 'Hafta', 'Oy', 'Yil'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setTimeTab(tab);
                      showToast(`Grafik davri: "${tab}" ga o'zgartirildi`);
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      timeTab === tab
                        ? 'bg-[#00cbb4] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00cbb4]" />
                <span className="text-slate-700">VIP va TOP xizmatlar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5b324]" />
                <span className="text-slate-700">Oddiy e&apos;lonlar va reklama</span>
              </div>
            </div>

            {/* SVG Dynamic Chart */}
            <div className="relative pt-4">
              <div className="h-64 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 650 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00cbb4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00cbb4" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="adArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f5b324" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f5b324" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="620" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="70" x2="620" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="120" x2="620" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="40" y1="170" x2="620" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis */}
                  <text x="30" y="24" fontSize="10" fill="#94a3b8" textAnchor="end">25M</text>
                  <text x="30" y="74" fontSize="10" fill="#94a3b8" textAnchor="end">18M</text>
                  <text x="30" y="124" fontSize="10" fill="#94a3b8" textAnchor="end">10M</text>
                  <text x="30" y="174" fontSize="10" fill="#94a3b8" textAnchor="end">4M</text>

                  {/* Cyan Curve */}
                  <path
                    d="M 60 160 C 130 140, 160 120, 240 100 C 320 80, 360 100, 430 70 C 490 60, 530 110, 600 65 L 600 195 L 60 195 Z"
                    fill="url(#revArea)"
                  />
                  <path
                    d="M 60 160 C 130 140, 160 120, 240 100 C 320 80, 360 100, 430 70 C 490 60, 530 110, 600 65"
                    fill="none"
                    stroke="#00cbb4"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Yellow Curve */}
                  <path
                    d="M 60 180 C 130 160, 160 140, 240 135 C 320 130, 360 135, 430 115 C 490 105, 530 130, 600 125 L 600 195 L 60 195 Z"
                    fill="url(#adArea)"
                  />
                  <path
                    d="M 60 180 C 130 160, 160 140, 240 135 C 320 130, 360 135, 430 115 C 490 105, 530 130, 600 125"
                    fill="none"
                    stroke="#f5b324"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Vertical dashed line at 20-Okt */}
                  <line
                    x1="430"
                    y1="20"
                    x2="430"
                    y2="195"
                    stroke="#00cbb4"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                  />

                  {/* Points */}
                  <circle cx="60" cy="160" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                  <circle cx="160" cy="120" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                  <circle cx="260" cy="95" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                  <circle cx="360" cy="90" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                  <circle cx="430" cy="70" r="6" fill="#fff" stroke="#00cbb4" strokeWidth="3.5" />
                  <circle cx="530" cy="95" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                  <circle cx="600" cy="65" r="4.5" fill="#fff" stroke="#00cbb4" strokeWidth="2.5" />
                </svg>

                {/* Floating Tooltip at 20-Okt */}
                <div className="absolute top-2 left-[66%] -translate-x-1/2 bg-[#09221d] text-white p-2.5 rounded-xl shadow-2xl border border-[#17483e] text-xs pointer-events-none">
                  <div className="font-bold text-[#00DF81] text-[10px]">20-Okt, 2026</div>
                  <div className="font-extrabold text-white text-xs mt-0.5">
                    18,400,000 UZS
                  </div>
                </div>
              </div>

              {/* X-Axis labels */}
              <div className="flex justify-between pl-10 pr-4 pt-2 text-xs font-semibold text-slate-500">
                {['1-Okt', '5-Okt', '10-Okt', '15-Okt', '20-Okt', '25-Okt', '30-Okt'].map((d) => (
                  <span
                    key={d}
                    className={`cursor-pointer ${
                      d === '20-Okt' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-800'
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Chart: To'lov usullari Donut Chart (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-800">
                To&apos;lov usullari
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Shlyuzlar taqsimoti va oqim hajmi
              </p>
            </div>

            {/* Donut Chart SVG */}
            <div className="relative flex items-center justify-center py-4">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Ring */}
                <circle cx="60" cy="60" r="46" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />

                {/* Payme 52% (cyan) */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#00cbb4"
                  strokeWidth="16"
                  strokeDasharray="289"
                  strokeDashoffset="138"
                  className="transition-all hover:stroke-width-20"
                />

                {/* Click 36% (dark teal) */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#0b2620"
                  strokeWidth="16"
                  strokeDasharray="289"
                  strokeDashoffset="185"
                  transform="rotate(187 60 60)"
                />

                {/* Uzum Bank 12% (yellow) */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="transparent"
                  stroke="#f5b324"
                  strokeWidth="16"
                  strokeDasharray="289"
                  strokeDashoffset="254"
                  transform="rotate(317 60 60)"
                />
              </svg>

              {/* Center Text inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  JAMI HAJM
                </span>
                <span className="text-lg font-black text-slate-900 mt-0.5">
                  348.2M
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  UZS
                </span>
              </div>
            </div>

            {/* Slices Breakdown List */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00cbb4]" />
                  <span className="font-bold text-slate-800">Payme</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-900">52%</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(181.1 mln)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0b2620]" />
                  <span className="font-bold text-slate-800">Click</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-900">36%</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(125.4 mln)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f5b324]" />
                  <span className="font-bold text-slate-800">Uzum Bank</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-900">12%</span>
                  <span className="text-[10px] text-slate-400 ml-1.5">(41.8 mln)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table: "So'nggi to'lov operatsiyalari" */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
          <div className="p-6 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-800">
                  So&apos;nggi to&apos;lov operatsiyalari
                </h3>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold">
                  4,912 ta yozuv
                </span>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Eksport (Excel/CSV)</span>
            </button>
          </div>

          {/* Table Filters */}
          <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex flex-wrap items-center gap-3 text-xs">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Tranzaksiya ID yoki foydalanuvchi qidirish..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00DF81]"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold">To&apos;lov usuli:</span>
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-semibold focus:outline-none"
              >
                <option value="Barchasi">Barchasi</option>
                <option value="Payme">Payme</option>
                <option value="Click">Click</option>
                <option value="Uzum Bank">Uzum Bank</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-semibold">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-semibold focus:outline-none"
              >
                <option value="Barchasi">Barchasi</option>
                <option value="Muvaffaqiyatli">Muvaffaqiyatli</option>
                <option value="Kutilmoqda">Kutilmoqda</option>
                <option value="Bekor qilingan">Bekor qilingan</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Tranzaksiya ID</th>
                  <th className="py-3.5 px-6">Foydalanuvchi</th>
                  <th className="py-3.5 px-6">Xizmat turi</th>
                  <th className="py-3.5 px-6">Summa</th>
                  <th className="py-3.5 px-6">To&apos;lov usuli</th>
                  <th className="py-3.5 px-6">Sana va vaqt</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* ID */}
                    <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                      {tx.id}
                    </td>

                    {/* Foydalanuvchi */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{tx.user}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{tx.phone}</p>
                    </td>

                    {/* Xizmat turi */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-700">{tx.serviceType}</span>
                      {tx.serviceDetail && (
                        <span className="text-[11px] text-slate-400 ml-1">
                          {tx.serviceDetail}
                        </span>
                      )}
                    </td>

                    {/* Summa */}
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                      {tx.amount}
                    </td>

                    {/* To'lov usuli */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px]">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            tx.method === 'Payme'
                              ? 'bg-[#00cbb4]'
                              : tx.method === 'Click'
                              ? 'bg-slate-800'
                              : 'bg-amber-500'
                          }`}
                        />
                        {tx.method}
                      </span>
                    </td>

                    {/* Sana */}
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {tx.date}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-right">
                      {tx.status === 'Muvaffaqiyatli' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Muvaffaqiyatli
                        </span>
                      )}
                      {tx.status === 'Kutilmoqda' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Kutilmoqda
                        </span>
                      )}
                      {tx.status === 'Bekor qilingan' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Bekor qilingan
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 px-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>1 – 10 / 4,912 tranzaksiya</span>

            <div className="flex items-center gap-1.5 font-semibold">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Oldingi</span>
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-xl font-bold transition-all ${
                  currentPage === 1
                    ? 'bg-[#0b2620] text-white shadow-sm'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-xl font-bold transition-all ${
                  currentPage === 2
                    ? 'bg-[#0b2620] text-white shadow-sm'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                2
              </button>

              <button
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-xl font-bold transition-all ${
                  currentPage === 3
                    ? 'bg-[#0b2620] text-white shadow-sm'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                3
              </button>

              <span className="px-1 text-slate-400">...</span>

              <button
                onClick={() => setCurrentPage(492)}
                className="w-12 h-8 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 text-slate-700"
              >
                492
              </button>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <span>Keyingi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
