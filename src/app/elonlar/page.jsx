'use client';

import React, { useMemo, useState } from 'react';
import Header from '@/components/Header';
import {
  Tag,
  Search,
  Download,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  Building,
  Car,
  Smartphone,
  Gamepad,
  X,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { initialRecentListings } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 6;
const STATUSES = ['Barchasi', 'Faol', 'Moderatsiyada', 'Rad etilgan'];
const SORTS = [
  { key: 'new', label: 'Eng yangilari' },
  { key: 'price-desc', label: 'Narx: yuqoridan' },
  { key: 'price-asc', label: 'Narx: pastdan' },
];

const TYPE_ICONS = {
  car: Car,
  phone: Smartphone,
  home: Building,
  game: Gamepad,
};

const STATUS_STYLE = {
  Faol: {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-600',
    dot: 'bg-emerald-500',
    Icon: CheckCircle,
  },
  Moderatsiyada: {
    badge: 'bg-amber-50 text-amber-800 border-amber-600',
    dot: 'bg-amber-500',
    Icon: Clock,
  },
  'Rad etilgan': {
    badge: 'bg-red-50 text-red-700 border-red-500',
    dot: 'bg-red-500',
    Icon: XCircle,
  },
};

/* Button looks: thick borders + hard offset shadow */
const BTN_BASE =
  'inline-flex items-center justify-center gap-2 font-extrabold text-xs rounded-xl border-2 transition-all duration-150 ' +
  'focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00DF81]/40 disabled:opacity-40 disabled:pointer-events-none ' +
  'active:translate-y-[1px]';
const BTN_PRIMARY =
  BTN_BASE +
  ' px-5 py-2.5 bg-[#00e396] border-[#00c984] text-[#05372d] shadow-[0_6px_16px_-4px_rgba(0,223,129,0.6)] hover:bg-[#00f0a0] hover:border-[#00b374]';
const BTN_OUTLINE =
  BTN_BASE +
  ' px-4 py-2.5 bg-white border-slate-300 text-slate-700 hover:border-[#00DF81] hover:text-[#05372d] hover:shadow-[0_6px_16px_-6px_rgba(0,223,129,0.45)]';
const BTN_SMALL =
  BTN_BASE +
  ' px-3 py-1.5 bg-white border-slate-200 text-slate-700 hover:border-[#00DF81] hover:text-[#05372d] hover:bg-[#f2fdf7]';
const BTN_DANGER =
  BTN_BASE +
  ' px-3 py-1.5 bg-white border-red-300 text-red-600 hover:border-red-500 hover:bg-red-50';
const BTN_OK =
  BTN_BASE +
  ' px-3 py-1.5 bg-white border-emerald-300 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const priceToNumber = (p) => Number(String(p).replace(/[^\d]/g, '')) || 0;

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Moderatsiyada'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 text-[11px] font-extrabold ${s.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function StatCard({ label, value, hint, Icon, tone, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left p-4 rounded-2xl border-2 bg-white transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00DF81]/40 ${
        active
          ? 'border-[#00DF81] shadow-[0_8px_24px_-8px_rgba(5,55,45,0.22)]'
          : 'border-slate-200 hover:border-[#00DF81] hover:shadow-[0_8px_24px_-8px_rgba(5,55,45,0.22)]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-500">{label}</span>
        <span className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center ${tone}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-black text-slate-900 tabular-nums">{value}</p>
      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{hint}</p>
    </button>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center cursor-pointer" aria-label={label}>
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center transition-colors
        peer-checked:bg-[#00e396] peer-checked:border-[#00c984] peer-focus-visible:ring-4 peer-focus-visible:ring-[#00DF81]/40"
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M2 6.5l2.5 2.5L10 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </label>
  );
}

function Avatar({ text }) {
  return (
    <span className="w-8 h-8 rounded-lg border-2 border-[#bff3d9] bg-[#e8fbf1] text-[#05372d] text-[10px] font-black flex items-center justify-center shrink-0">
      {text || '??'}
    </span>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="py-16 px-6 text-center">
      <div className="mx-auto w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
        <Search className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="mt-4 text-sm font-extrabold text-slate-800">E&apos;lon topilmadi</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
        Qidiruv yoki filtrni o&apos;zgartirib ko&apos;ring, yoki filtrlarni tozalang.
      </p>
      <button onClick={onReset} className={`${BTN_OUTLINE} mt-5`}>
        <RotateCcw className="w-4 h-4" />
        Filtrlarni tozalash
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ElonlarPage() {
  const { showToast } = useApp();

  const [listings, setListings] = useState([
    ...initialRecentListings,
    {
      id: '#1087',
      title: 'Nexia 3 Avtomat 2021',
      category: 'Transport / Yengil avtomobillar',
      type: 'car',
      user: 'Jaloliddin B.',
      userAvatar: 'JB',
      price: "115 000 000 so'm",
      status: 'Faol',
      date: 'Bugun, 10:15',
      isVip: true,
    },
    {
      id: '#1088',
      title: 'Samsung Galaxy S24 Ultra',
      category: 'Elektronika / Telefonlar',
      type: 'phone',
      user: 'Timur S.',
      userAvatar: 'TS',
      price: "13 800 000 so'm",
      status: 'Faol',
      date: 'Kecha, 20:00',
      isVip: false,
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [searchVal, setSearchVal] = useState('');
  const [sortKey, setSortKey] = useState('new');
  const [onlyVip, setOnlyVip] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);

  /* ---------- derived data ---------- */

  const counts = useMemo(() => {
    const c = { Barchasi: listings.length, Faol: 0, Moderatsiyada: 0, 'Rad etilgan': 0 };
    listings.forEach((l) => {
      if (c[l.status] !== undefined) c[l.status] += 1;
    });
    return c;
  }, [listings]);

  const vipCount = useMemo(() => listings.filter((l) => l.isVip).length, [listings]);

  const filtered = useMemo(() => {
    const q = searchVal.trim().toLowerCase();
    const list = listings.filter((item) => {
      const matches =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.user.toLowerCase().includes(q) ||
        String(item.id).includes(q);
      if (!matches) return false;
      if (statusFilter !== 'Barchasi' && item.status !== statusFilter) return false;
      if (onlyVip && !item.isVip) return false;
      return true;
    });
    if (sortKey === 'price-desc') list.sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    if (sortKey === 'price-asc') list.sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price));
    return list;
  }, [listings, searchVal, statusFilter, onlyVip, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allOnPageSelected = pageItems.length > 0 && pageItems.every((i) => selectedIds.includes(i.id));

  /* ---------- actions ---------- */

  const resetFilters = () => {
    setSearchVal('');
    setStatusFilter('Barchasi');
    setOnlyVip(false);
    setSortKey('new');
    setCurrentPage(1);
  };

  const updateStatus = (ids, status) => {
    setListings((prev) => prev.map((l) => (ids.includes(l.id) ? { ...l, status } : l)));
    setSelectedListing((cur) => (cur && ids.includes(cur.id) ? { ...cur, status } : cur));
    showToast(
      ids.length === 1
        ? `${ids[0]} e'lon statusi: ${status}`
        : `${ids.length} ta e'lon statusi: ${status}`
    );
  };

  const removeListings = (ids) => {
    setListings((prev) => prev.filter((l) => !ids.includes(l.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    setSelectedListing(null);
    showToast(`${ids.length} ta e'lon o'chirildi`);
  };

  const toggleOne = (id) =>
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAllOnPage = () => {
    const ids = pageItems.map((i) => i.id);
    setSelectedIds((prev) =>
      allOnPageSelected ? prev.filter((id) => !ids.includes(id)) : Array.from(new Set([...prev, ...ids]))
    );
  };

  const activeSortLabel = SORTS.find((s) => s.key === sortKey)?.label;

  /* ---------- render ---------- */

  return (
    <div className="flex-1 flex flex-col bg-[#f3f7f5] min-h-screen">
      <Header onSearch={(v) => { setSearchVal(v); setCurrentPage(1); }} />

      <main className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* ---------------- Title & actions ---------------- */}
        <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border-2 border-[#bff3d9] bg-[#e8fbf1]">
              <span className="w-2 h-2 rounded-full bg-[#00DF81]" />
              <span className="text-[11px] font-extrabold text-[#05372d]">E&apos;lonlar boshqaruvi</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Barcha e&apos;lonlar bazasi
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1 max-w-xl">
              Saytda joylashtirilgan tovar va xizmatlar e&apos;lonlarini tekshiring, tasdiqlang yoki rad eting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast("Barcha e'lonlar ro'yxati eksport qilinmoqda...")}
              className={BTN_OUTLINE}
            >
              <Download className="w-4 h-4" />
              <span>Eksport (CSV)</span>
            </button>
            <button
              onClick={() => showToast("Yangi e'lon qo'shish oynasi ochildi")}
              className={BTN_PRIMARY}
            >
              <Plus className="w-4 h-4" />
              <span>E&apos;lon joylashtirish</span>
            </button>
          </div>
        </section>

        {/* ---------------- Stats ---------------- */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Jami e'lonlar"
            value={counts.Barchasi}
            hint="Bazadagi barcha e'lonlar"
            Icon={Layers}
            tone="border-slate-200 bg-slate-100 text-slate-700"
            active={statusFilter === 'Barchasi'}
            onClick={() => { setStatusFilter('Barchasi'); setCurrentPage(1); }}
          />
          <StatCard
            label="Faol"
            value={counts.Faol}
            hint="Saytda ko'rinib turibdi"
            Icon={CheckCircle}
            tone="border-emerald-600 bg-emerald-50 text-emerald-700"
            active={statusFilter === 'Faol'}
            onClick={() => { setStatusFilter('Faol'); setCurrentPage(1); }}
          />
          <StatCard
            label="Moderatsiyada"
            value={counts.Moderatsiyada}
            hint="Tekshiruvni kutmoqda"
            Icon={Clock}
            tone="border-amber-600 bg-amber-50 text-amber-700"
            active={statusFilter === 'Moderatsiyada'}
            onClick={() => { setStatusFilter('Moderatsiyada'); setCurrentPage(1); }}
          />
          <StatCard
            label="Rad etilgan"
            value={counts['Rad etilgan']}
            hint="Qoidalarga mos kelmagan"
            Icon={XCircle}
            tone="border-red-500 bg-red-50 text-red-600"
            active={statusFilter === 'Rad etilgan'}
            onClick={() => { setStatusFilter('Rad etilgan'); setCurrentPage(1); }}
          />
        </section>

        {/* ---------------- Filter bar ---------------- */}
        <section className="bg-white p-4 rounded-2xl border-2 border-slate-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => { setSearchVal(e.target.value); setCurrentPage(1); }}
                placeholder="ID, sarlavha yoki sotuvchi..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00DF81] focus:bg-white focus:ring-4 focus:ring-[#00DF81]/30 transition-all"
              />
              {searchVal && (
                <button
                  onClick={() => setSearchVal('')}
                  aria-label="Qidiruvni tozalash"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border-2 border-slate-200 bg-slate-50">
              {STATUSES.map((st) => (
                <button
                  key={st}
                  onClick={() => { setStatusFilter(st); setCurrentPage(1); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-extrabold transition-all ${
                    statusFilter === st
                      ? 'bg-white border-[#00DF81] text-slate-900 shadow-sm'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st}
                  <span
                    className={`min-w-[18px] px-1 rounded-md text-[10px] font-black tabular-nums ${
                      statusFilter === st ? 'bg-[#00e396] text-[#05372d]' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {counts[st]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setOnlyVip((v) => !v); setCurrentPage(1); }}
              aria-pressed={onlyVip}
              className={`${BTN_BASE} px-3.5 py-2.5 ${
                onlyVip
                  ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#00DF81]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              VIP ({vipCount})
            </button>

            <div className="relative">
              <button onClick={() => setSortOpen((o) => !o)} className={BTN_OUTLINE} aria-expanded={sortOpen}>
                {activeSortLabel}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 z-20 bg-white border-2 border-slate-200 rounded-xl shadow-[0_8px_24px_-8px_rgba(5,55,45,0.22)] overflow-hidden">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => { setSortKey(s.key); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 ${
                        sortKey === s.key ? 'bg-[#d9fbe9] text-[#05372d]' : 'text-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- Bulk bar ---------------- */}
        {selectedIds.length > 0 && (
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3 rounded-2xl border-2 border-[#00DF81] bg-[#e8fbf1] text-[#05372d] shadow-[0_6px_16px_-6px_rgba(0,223,129,0.55)]">
            <p className="text-xs font-bold">
              <span className="text-[#00a86b] font-black">{selectedIds.length} ta</span> e&apos;lon tanlandi
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { updateStatus(selectedIds, 'Faol'); setSelectedIds([]); }}
                className={`${BTN_BASE} px-3 py-1.5 bg-[#00e396] border-[#00e396] text-[#05372d] hover:bg-[#00f0a0]`}
              >
                <CheckCircle className="w-4 h-4" />
                Tasdiqlash
              </button>
              <button
                onClick={() => { updateStatus(selectedIds, 'Rad etilgan'); setSelectedIds([]); }}
                className={`${BTN_BASE} px-3 py-1.5 bg-white border-slate-200 text-slate-700 hover:border-[#00DF81]`}
              >
                <XCircle className="w-4 h-4" />
                Rad etish
              </button>
              <button
                onClick={() => removeListings(selectedIds)}
                className={`${BTN_BASE} px-3 py-1.5 bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-500`}
              >
                <Trash2 className="w-4 h-4" />
                O&apos;chirish
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-2 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                Bekor qilish
              </button>
            </div>
          </section>
        )}

        {/* ---------------- Table ---------------- */}
        <section className="bg-white rounded-2xl border-2 border-slate-200 shadow-[0_8px_24px_-8px_rgba(5,55,45,0.22)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[880px]">
              <thead className="bg-slate-50 border-b-2 border-slate-100 text-[11px] font-bold text-slate-400">
                <tr>
                  <th className="py-3.5 pl-6 pr-2 w-10">
                    <Checkbox checked={allOnPageSelected} onChange={toggleAllOnPage} label="Sahifadagi hammasini tanlash" />
                  </th>
                  <th className="py-3.5 px-4">ID</th>
                  <th className="py-3.5 px-4">Sarlavha va kategoriya</th>
                  <th className="py-3.5 px-4">Foydalanuvchi</th>
                  <th className="py-3.5 px-4">Narx</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {pageItems.map((item) => {
                  const TypeIcon = TYPE_ICONS[item.type] || Tag;
                  const checked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${checked ? 'bg-[#effdf6]' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-4 pl-6 pr-2">
                        <Checkbox checked={checked} onChange={() => toggleOne(item.id)} label={`${item.id} ni tanlash`} />
                      </td>
                      <td className="py-4 px-4 font-black text-slate-400 tabular-nums">{item.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl border-2 border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                            <TypeIcon className="w-4 h-4 text-slate-800" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-extrabold text-slate-900 text-sm truncate">{item.title}</p>
                              {item.isVip && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border-2 border-amber-500 bg-amber-50 text-amber-800 text-[10px] font-black shrink-0">
                                  <Sparkles className="w-3 h-3" />
                                  VIP
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 font-medium truncate">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar text={item.userAvatar} />
                          <div>
                            <p className="font-bold text-slate-800">{item.user}</p>
                            <p className="text-[11px] text-slate-400">{item.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900 text-sm whitespace-nowrap">{item.price}</td>
                      <td className="py-4 px-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          {item.status === 'Moderatsiyada' && (
                            <>
                              <button
                                onClick={() => updateStatus([item.id], 'Faol')}
                                className={BTN_OK}
                                aria-label="Tasdiqlash"
                                title="Tasdiqlash"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus([item.id], 'Rad etilgan')}
                                className={BTN_DANGER}
                                aria-label="Rad etish"
                                title="Rad etish"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button onClick={() => setSelectedListing(item)} className={BTN_SMALL}>
                            <Eye className="w-4 h-4" />
                            Batafsil
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && <EmptyState onReset={resetFilters} />}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t-2 border-slate-100 bg-slate-50/70">
              <p className="text-xs font-semibold text-slate-500">
                <span className="font-black text-slate-900">{filtered.length}</span> ta e&apos;londan{' '}
                <span className="font-black text-slate-900">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
                </span>{' '}
                ko&apos;rsatilmoqda
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`${BTN_SMALL} !px-2.5`}
                  aria-label="Oldingi sahifa"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    aria-current={n === page ? 'page' : undefined}
                    className={`${BTN_BASE} w-9 h-9 ${
                      n === page
                        ? 'bg-[#00e396] border-[#00c984] text-[#05372d] shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-[#00DF81]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`${BTN_SMALL} !px-2.5`}
                  aria-label="Keyingi sahifa"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ---------------- Modal ---------------- */}
      {selectedListing && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedListing(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b-2 border-[#bff3d9] bg-[#e8fbf1]">
              <div className="min-w-0">
                <p className="text-[11px] font-black text-[#05372d]/70">{selectedListing.id}</p>
                <h3 className="font-black text-slate-900 text-lg leading-snug truncate">
                  {selectedListing.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedListing(null)}
                aria-label="Yopish"
                className="p-1.5 rounded-lg border-2 border-slate-200 bg-white text-slate-500 hover:border-[#00DF81] hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedListing.status} />
                {selectedListing.isVip && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border-2 border-amber-500 bg-amber-50 text-amber-800 text-[11px] font-black">
                    <Sparkles className="w-3.5 h-3.5" />
                    VIP e&apos;lon
                  </span>
                )}
              </div>

              <p className="text-3xl font-black text-slate-900">{selectedListing.price}</p>

              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border-2 border-slate-200">
                  <dt className="font-bold text-slate-400">Kategoriya</dt>
                  <dd className="mt-1 font-extrabold text-slate-800">{selectedListing.category}</dd>
                </div>
                <div className="p-3 rounded-xl border-2 border-slate-200">
                  <dt className="font-bold text-slate-400">Joylangan vaqt</dt>
                  <dd className="mt-1 font-extrabold text-slate-800">{selectedListing.date || '—'}</dd>
                </div>
                <div className="p-3 rounded-xl border-2 border-slate-200 col-span-2">
                  <dt className="font-bold text-slate-400">Sotuvchi</dt>
                  <dd className="mt-2 flex items-center gap-2.5">
                    <Avatar text={selectedListing.userAvatar} />
                    <span className="font-extrabold text-slate-800">{selectedListing.user}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t-2 border-slate-100 bg-slate-50">
              <button onClick={() => removeListings([selectedListing.id])} className={BTN_DANGER}>
                <Trash2 className="w-4 h-4" />
                O&apos;chirish
              </button>
              <div className="flex items-center gap-2">
                {selectedListing.status !== 'Rad etilgan' && (
                  <button onClick={() => updateStatus([selectedListing.id], 'Rad etilgan')} className={BTN_OUTLINE}>
                    <XCircle className="w-4 h-4" />
                    Rad etish
                  </button>
                )}
                {selectedListing.status !== 'Faol' && (
                  <button onClick={() => updateStatus([selectedListing.id], 'Faol')} className={BTN_PRIMARY}>
                    <CheckCircle className="w-4 h-4" />
                    Tasdiqlash
                  </button>
                )}
                {selectedListing.status === 'Faol' && (
                  <button onClick={() => setSelectedListing(null)} className={BTN_PRIMARY}>
                    Yopish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}