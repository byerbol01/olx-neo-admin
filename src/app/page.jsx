'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import {
  Users,
  Tag,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Car,
  Building,
  Gamepad,
  MoreVertical,
  Filter,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Download,
  Calendar,
  Layers
} from 'lucide-react';
import { initialStats, weeklyAnalytics, initialRecentListings } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { showToast } = useApp();

  const [timeFilter, setTimeFilter] = useState('Haftalik');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [listings, setListings] = useState(initialRecentListings);
  const [hoveredPoint, setHoveredPoint] = useState(4); // default Friday index (4)
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter listings based on active tab and search query
  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.includes(searchQuery);

    if (!matchesSearch) return false;

    if (activeTab === 'VIP') return item.isVip;
    if (activeTab === 'Kutilayotgan') return item.status === 'Moderatsiyada';
    return true;
  });

  const handleApprove = (id, title) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Faol', statusColor: 'green' } : item
      )
    );
    showToast(`"${title}" muvaffaqiyatli tasdiqlandi!`, 'success');
  };

  const handleReject = (id, title) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Rad etilgan', statusColor: 'red' } : item
      )
    );
    showToast(`"${title}" rad etildi!`, 'error');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Statistika va e\'lonlar yangilandi!', 'success');
    }, 600);
  };

  const getIconComponent = (type) => {
    switch (type) {
      case 'phone':
        return <Smartphone className="w-5 h-5 text-slate-500" />;
      case 'car':
        return <Car className="w-5 h-5 text-slate-500" />;
      case 'building':
        return <Building className="w-5 h-5 text-slate-500" />;
      default:
        return <Gamepad className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f6f9f8] min-h-screen">
      <Header onSearch={setSearchQuery} />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Jami Foydalanuvchilar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 leading-tight">
                  Jami <br /> Foydalanuvchilar
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-3 tracking-tight">
                  {initialStats.users.count}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#00e396]/15 flex items-center justify-center text-[#05372d] group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {initialStats.users.change}
              </span>
              <span className="text-slate-400 font-medium">{initialStats.users.note}</span>
            </div>
          </div>

          {/* Card 2: Faol E'lonlar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 leading-tight">
                  Faol E&apos;lonlar
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-5 tracking-tight">
                  {initialStats.activeListings.count}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#00cbb4]/15 flex items-center justify-center text-[#009688] group-hover:scale-110 transition-transform">
                <Tag className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {initialStats.activeListings.change}
              </span>
              <span className="text-slate-400 font-medium">{initialStats.activeListings.note}</span>
            </div>
          </div>

          {/* Card 3: Kutilayotgan Moderatsiya */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group border-l-4 border-l-red-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 leading-tight">
                  Kutilayotgan
                </p>
                <h3 className="text-2xl font-black text-red-500 mt-5 tracking-tight flex items-center gap-2">
                  {initialStats.pendingModeration.count}
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="text-red-500 flex items-center gap-1 font-semibold text-[11px]">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                {initialStats.pendingModeration.alert}
              </span>
            </div>
          </div>

          {/* Card 4: Daromad */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 leading-tight">
                  Daromad
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-5 tracking-tight">
                  {initialStats.revenue.count}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {initialStats.revenue.change}
              </span>
              <span className="text-slate-400 font-medium">{initialStats.revenue.note}</span>
            </div>
          </div>
        </div>

        {/* Analytics Chart Card: "Tashriflar va yangi e'lonlar dinamikasi" */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-800">
                Tashriflar va yangi e&apos;lonlar dinamikasi
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                So&apos;nggi 7 kunlik statistika
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-4">
              {/* Legend 1 */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00cbb4]" />
                <span>Tashriflar (Visits)</span>
              </div>

              {/* Legend 2 */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5b324]" />
                <span>Yangi e&apos;lonlar (Listings)</span>
              </div>

              {/* Interval selector */}
              <div className="relative">
                <button
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
                >
                  <span>{timeFilter}</span>
                  <ChevronRight className="w-3.5 h-3.5 rotate-90 text-slate-400" />
                </button>

                {showTimeDropdown && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-30 text-xs">
                    {['Kunlik', 'Haftalik', 'Oylik', 'Yillik'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setTimeFilter(option);
                          setShowTimeDropdown(false);
                          showToast(`Grafik intervali: "${option}" ga o'zgartirildi`);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 ${
                          timeFilter === option ? 'text-[#00bfa5] font-bold' : 'text-slate-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SVG Chart Area */}
          <div className="relative pt-6 pb-2">
            <div className="h-64 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                <defs>
                  {/* Cyan / Teal gradient for Visits */}
                  <linearGradient id="cyanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00cbb4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00cbb4" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Yellow gradient for Listings */}
                  <linearGradient id="yellowArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5b324" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#f5b324" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="70" x2="680" y2="70" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="170" x2="680" y2="170" stroke="#f1f5f9" strokeWidth="1" />

                {/* Y-Axis Labels */}
                <text x="30" y="24" fontSize="10" fill="#94a3b8" textAnchor="end">20K</text>
                <text x="30" y="74" fontSize="10" fill="#94a3b8" textAnchor="end">15K</text>
                <text x="30" y="124" fontSize="10" fill="#94a3b8" textAnchor="end">10K</text>
                <text x="30" y="174" fontSize="10" fill="#94a3b8" textAnchor="end">5K</text>
                <text x="30" y="218" fontSize="10" fill="#94a3b8" textAnchor="end">0</text>

                {/* Cyan Visits Path (Area & Stroke) */}
                <path
                  d="M 60 160 C 130 140, 160 145, 230 148 C 300 152, 330 160, 400 155 C 470 148, 490 80, 560 70 C 600 65, 630 110, 670 120 L 670 215 L 60 215 Z"
                  fill="url(#cyanArea)"
                />
                <path
                  d="M 60 160 C 130 140, 160 145, 230 148 C 300 152, 330 160, 400 155 C 470 148, 490 80, 560 70 C 600 65, 630 110, 670 120"
                  fill="none"
                  stroke="#00cbb4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Yellow Listings Path (Area & Stroke) */}
                <path
                  d="M 60 185 C 130 178, 160 174, 230 172 C 300 170, 330 168, 400 165 C 470 160, 490 125, 560 120 C 600 117, 630 140, 670 148 L 670 215 L 60 215 Z"
                  fill="url(#yellowArea)"
                />
                <path
                  d="M 60 185 C 130 178, 160 174, 230 172 C 300 170, 330 168, 400 165 C 470 160, 490 125, 560 120 C 600 117, 630 140, 670 148"
                  fill="none"
                  stroke="#f5b324"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Dashed vertical indicator line on active / hover point (Friday) */}
                <line
                  x1="560"
                  y1="20"
                  x2="560"
                  y2="215"
                  stroke="#00cbb4"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />

                {/* Interactive Points */}
                {[
                  { cx: 60, cyC: 160, cyY: 185 },
                  { cx: 160, cyC: 145, cyY: 174 },
                  { cx: 260, cyC: 148, cyY: 172 },
                  { cx: 370, cyC: 156, cyY: 166 },
                  { cx: 470, cyC: 105, cyY: 140 },
                  { cx: 560, cyC: 70, cyY: 120, active: true },
                  { cx: 660, cyC: 118, cyY: 146 },
                ].map((pt, i) => (
                  <g
                    key={i}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                  >
                    {/* Cyan Point */}
                    <circle
                      cx={pt.cx}
                      cy={pt.cyC}
                      r={pt.active ? "6" : "4.5"}
                      fill="#ffffff"
                      stroke="#00cbb4"
                      strokeWidth={pt.active ? "3.5" : "2.5"}
                      className="transition-all hover:scale-125"
                    />
                    {/* Yellow Point */}
                    <circle
                      cx={pt.cx}
                      cy={pt.cyY}
                      r={pt.active ? "6" : "4.5"}
                      fill="#ffffff"
                      stroke="#f5b324"
                      strokeWidth={pt.active ? "3.5" : "2.5"}
                      className="transition-all hover:scale-125"
                    />
                  </g>
                ))}
              </svg>

              {/* Floating Tooltip matching screenshot exactly */}
              <div
                className="absolute top-4 left-[70%] sm:left-[75%] -translate-x-1/2 bg-[#09221d] text-white p-3 rounded-xl shadow-2xl border border-[#17483e] text-xs pointer-events-none z-20"
              >
                <div className="font-bold text-[#00DF81] text-[11px] mb-1.5 flex items-center justify-between gap-3">
                  <span>Juma, 14:00</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00DF81] animate-ping" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#00cbb4]" />
                    <span className="text-[11px]">Tashriflar:</span>
                    <strong className="text-white font-bold">18,420</strong>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#f5b324]" />
                    <span className="text-[11px]">E&apos;lonlar:</span>
                    <strong className="text-white font-bold">1,840</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* X-Axis Day Labels */}
            <div className="flex justify-between pl-10 pr-2 pt-2 text-xs font-semibold text-slate-500">
              {['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'].map((day, idx) => (
                <span
                  key={day}
                  className={`cursor-pointer transition-colors ${
                    day === 'Jum' ? 'text-slate-900 font-extrabold text-sm' : 'hover:text-slate-800'
                  }`}
                  onClick={() => {
                    setHoveredPoint(idx);
                    showToast(`${day} kuni statistikasi tanlandi`);
                  }}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Listings Table Card: "So'nggi qo'shilgan e'lonlar" */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
          {/* Table Header with Tabs */}
          <div className="p-6 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-extrabold text-slate-800">
                So&apos;nggi qo&apos;shilgan e&apos;lonlar
              </h2>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                Jami 840 ta e&apos;lon
              </span>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Filter Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                {['Barchasi', 'VIP', 'Kutilayotgan'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      showToast(`Filtr: "${tab}" tanlandi`);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* View all link */}
              <button
                onClick={() => showToast('Barcha 840 ta e\'lonlar ro\'yxatiga o\'tilmoqda...')}
                className="text-xs font-bold text-slate-800 hover:text-[#00bfa5] flex items-center gap-1 transition-colors"
              >
                <span>Barchasini ko&apos;rish</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">ID</th>
                  <th className="py-3.5 px-6">SARLAVHA</th>
                  <th className="py-3.5 px-6">FOYDALANUVCHI</th>
                  <th className="py-3.5 px-6">NARX</th>
                  <th className="py-3.5 px-6 text-right">STATUS & AMALLAR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredListings.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-4 px-6 font-semibold text-slate-400">
                      {item.id}
                    </td>

                    {/* Sarlavha & Kategoriya */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00DF81]/15 transition-colors">
                          {getIconComponent(item.type)}
                        </div>
                        <div>
                          <p
                            onClick={() => setSelectedListing(item)}
                            className="font-bold text-slate-800 hover:text-[#00bfa5] cursor-pointer text-sm"
                          >
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Foydalanuvchi */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-800 font-bold text-[10px] flex items-center justify-center">
                          {item.userAvatar}
                        </div>
                        <span className="font-semibold text-slate-700">
                          {item.user}
                        </span>
                      </div>
                    </td>

                    {/* Narx */}
                    <td className="py-4 px-6 font-extrabold text-slate-900 text-sm">
                      {item.price}
                    </td>

                    {/* Status & Amallar */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Status Badge */}
                        {item.status === 'Faol' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Faol
                          </span>
                        )}

                        {item.status === 'Moderatsiyada' && (
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Moderatsiyada
                            </span>
                            <button
                              onClick={() => handleApprove(item.id, item.title)}
                              title="Tasdiqlash"
                              className="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(item.id, item.title)}
                              title="Rad etish"
                              className="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {item.status === 'Rad etilgan' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Rad etilgan
                          </span>
                        )}

                        {/* Quick View Button */}
                        <button
                          onClick={() => setSelectedListing(item)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Batafsil ko'rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 px-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              <span>Jami 840 tadan 1–3 ko&apos;rsatilmoqda</span>
            </div>

            <div className="flex items-center gap-1.5 font-semibold">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  showToast('Oldingi sahifaga o\'tildi');
                }}
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
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 rounded-xl font-bold transition-all ${
                  currentPage === 10
                    ? 'bg-[#0b2620] text-white shadow-sm'
                    : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                10
              </button>

              <button
                onClick={() => {
                  setCurrentPage((p) => p + 1);
                  showToast('Keyingi sahifaga o\'tildi');
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <span>Keyingi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Listing Detail Quick Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 animate-slide-up border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-slate-400">{selectedListing.id}</span>
                <h3 className="text-base font-extrabold text-slate-800">{selectedListing.title}</h3>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-slate-400">Narxi</p>
                  <p className="text-base font-extrabold text-slate-900">{selectedListing.price}</p>
                </div>
                <div>
                  <p className="text-slate-400">Holati</p>
                  <span className="font-bold text-[#00bfa5]">{selectedListing.status}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Kategoriya:</span>
                  <span className="font-bold text-slate-700">{selectedListing.category}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Foydalanuvchi:</span>
                  <span className="font-bold text-slate-700">{selectedListing.user}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Qo&apos;shilgan vaqt:</span>
                  <span className="font-bold text-slate-700">{selectedListing.date}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  handleReject(selectedListing.id, selectedListing.title);
                  setSelectedListing(null);
                }}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl text-xs transition-colors"
              >
                Rad etish
              </button>
              <button
                onClick={() => {
                  handleApprove(selectedListing.id, selectedListing.title);
                  setSelectedListing(null);
                }}
                className="px-5 py-2 bg-[#00e396] hover:bg-[#00c984] text-[#05372d] font-bold rounded-xl text-xs shadow-md transition-all"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
