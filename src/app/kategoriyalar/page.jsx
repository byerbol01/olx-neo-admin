'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import {
  FolderTree,
  Plus,
  Download,
  History,
  Search,
  Filter,
  Check,
  X,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Car,
  Building,
  Smartphone,
  Briefcase,
  Shirt,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowUpDown,
  Tag,
  Eye,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { initialCategories } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function KategoriyalarPage() {
  const { showToast } = useApp();

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'tree'
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCatId, setSelectedCatId] = useState(2); // #CAT-102 Ko'chmas mulk
  const [searchVal, setSearchVal] = useState('');
  const [statusFilter, setStatusFilter] = useState('Barchasi');
  const [expandedCats, setExpandedCats] = useState({ 1: true, 2: true });

  // Currently editing category for drawer
  const activeEditingCat = categories.find((c) => c.id === selectedCatId) || categories[1];

  const [editForm, setEditForm] = useState({
    name: activeEditingCat.name,
    nameRu: activeEditingCat.nameRu,
    slug: activeEditingCat.slug,
    order: 2,
    active: activeEditingCat.active,
    filters: activeEditingCat.filters || ['Maydoni (m²)', 'Xonalar soni', 'Ta\'mirlash holati', 'Qavat / Qavatlar soni'],
  });

  const [newFilterTag, setNewFilterTag] = useState('');
  const [showAddTagInput, setShowAddTagInput] = useState(false);

  const toggleCategoryStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextActive = !c.active;
          showToast(`"${c.name}" ${nextActive ? 'faollashtirildi' : 'nofaol qilindi'}!`);
          return { ...c, active: nextActive };
        }
        return c;
      })
    );
  };

  const toggleExpand = (id) => {
    setExpandedCats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectForTreeEdit = (cat) => {
    setSelectedCatId(cat.id);
    setEditForm({
      name: cat.name,
      nameRu: cat.nameRu || cat.name,
      slug: cat.slug,
      order: cat.id,
      active: cat.active,
      filters: cat.filters || ['Standart parametrlar', 'Viloyat', 'Tuman'],
    });
    showToast(`"${cat.name}" tahrirlash uchun tanlandi`);
  };

  const handleRemoveFilterTag = (tagToRemove) => {
    setEditForm((prev) => ({
      ...prev,
      filters: prev.filters.filter((f) => f !== tagToRemove),
    }));
    showToast(`Filtr parametri o'chirildi: ${tagToRemove}`);
  };

  const handleAddFilterTag = () => {
    if (!newFilterTag.trim()) return;
    setEditForm((prev) => ({
      ...prev,
      filters: [...prev.filters, newFilterTag.trim()],
    }));
    setNewFilterTag('');
    setShowAddTagInput(false);
    showToast(`Yangi filtr qo'shildi: ${newFilterTag.trim()}`);
  };

  const handleSaveDrawerChanges = (e) => {
    e.preventDefault();
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCatId
          ? {
              ...c,
              name: editForm.name,
              nameRu: editForm.nameRu,
              slug: editForm.slug,
              active: editForm.active,
              filters: editForm.filters,
            }
          : c
      )
    );
    showToast(`Kategoriya o'zgarishlari (#CAT-10${selectedCatId}) saqlandi!`, 'success');
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'car':
        return <Car className="w-5 h-5 text-teal-600" />;
      case 'building':
        return <Building className="w-5 h-5 text-[#00bfa5]" />;
      case 'laptop':
        return <Smartphone className="w-5 h-5 text-cyan-600" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-amber-600" />;
      case 'shirt':
        return <Shirt className="w-5 h-5 text-indigo-600" />;
      default:
        return <Tag className="w-5 h-5 text-slate-500" />;
    }
  };

  const filteredCategories = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchVal.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === 'Faol') return c.active;
    if (statusFilter === 'Nofaol') return !c.active;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f6f9f8] min-h-screen">
      <Header onSearch={setSearchVal} />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Title & Actions Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00DF81]" />
              <span className="text-[11px] font-bold text-[#00bfa5] uppercase tracking-wider">
                TIZIM ARXITEKTURASI • Toshkent Serveri v4.2
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Kategoriyalar boshqaruvi
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Katalog daraxti, hududiy taqsimot va e&apos;lonlar segmentatsiyasini markazlashtirilgan sozlash.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const nextId = categories.length + 1;
                const newCat = {
                  id: nextId,
                  code: `#CAT-10${nextId}`,
                  name: 'Yangi Kategoriya',
                  nameRu: 'Новая категория',
                  desc: 'Katalog toifasi',
                  slug: `/yangi-toifa-${nextId}`,
                  subCount: 4,
                  listingsCount: '0',
                  listingsNum: 0,
                  active: true,
                  icon: 'tag',
                  subCategories: [],
                };
                setCategories([...categories, newCat]);
                setSelectedCatId(nextId);
                setViewMode('tree');
                showToast('Yangi kategoriya qo\'shildi, tahrirlang!');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00e396] hover:bg-[#00c984] text-[#05372d] text-xs font-bold rounded-xl shadow-[0_2px_10px_rgba(0,227,150,0.3)] transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi kategoriya qo&apos;shish</span>
            </button>

            <button
              onClick={() => showToast('Kategoriyalar arxivi yuklab olinmoqda...')}
              className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => showToast('Kategoriyalar o\'zgarish tarixi ochildi')}
              className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
            >
              <History className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Summary Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                KATALOG HAJMI
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-black text-slate-900">18</h3>
                <span className="text-xs font-bold text-slate-500">ta asosiy</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="text-[#00bfa5] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00bfa5]" />
                  142 ta quyi bo&apos;lim
                </span>
                <span>•</span>
                <span className="text-slate-400">100% faol sinxron</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
              <FolderTree className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                FAOL E&apos;LONLAR
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-black text-slate-900">34,210</h3>
                <span className="text-[11px] font-bold text-emerald-600">↗ +8.4%</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                So&apos;nggi 24 soatda +412 ta
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#00e396]/15 flex items-center justify-center text-[#05372d]">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  KATTA BOZOR ULUSHI
                </p>
                <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  42%
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">Avtotransport</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-[#00cbb4] h-full rounded-full" style={{ width: '42%' }} />
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1 text-right">
                12.4k e&apos;lon
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher and Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-soft flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Kategoriya yoki slug bo'yicha saralash..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00DF81]"
              />
            </div>

            {/* Status filter */}
            <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
              {['Barchasi', 'Faol', 'Nofaol'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    statusFilter === st ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle Button Group */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold mr-1">Rejim:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => {
                  setViewMode('table');
                  showToast('Jadval ko\'rinishi faollashdi');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                <span>Jadval</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('tree');
                  showToast('Daraxt va tahrirlash paneli faollashdi');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'tree' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                <span>Daraxt & Tahrir</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Table View (Screenshot 7) */}
        {viewMode === 'table' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6">Belgi</th>
                      <th className="py-3.5 px-6">Kategoriya Nomi</th>
                      <th className="py-3.5 px-6">Slug Manzili</th>
                      <th className="py-3.5 px-6">Ichki Bo&apos;limlar</th>
                      <th className="py-3.5 px-6">E&apos;lonlar Soni</th>
                      <th className="py-3.5 px-6">Holati</th>
                      <th className="py-3.5 px-6 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCategories.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Icon */}
                        <td className="py-4 px-6">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            {getCategoryIcon(c.icon)}
                          </div>
                        </td>

                        {/* Name & Desc */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={() => {
                                handleSelectForTreeEdit(c);
                                setViewMode('tree');
                              }}
                              className="font-extrabold text-slate-800 text-sm hover:text-[#00bfa5] cursor-pointer"
                            >
                              {c.name}
                            </span>
                            {c.isTop && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                                TOP
                              </span>
                            )}
                            {c.badge && (
                              <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 text-[9px] font-bold">
                                {c.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{c.desc}</p>
                        </td>

                        {/* Slug */}
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-mono">
                            {c.slug}
                          </span>
                        </td>

                        {/* Subcategories */}
                        <td className="py-4 px-6 font-bold text-slate-700">
                          {c.subCount} ta bo&apos;lim
                        </td>

                        {/* Listings Count */}
                        <td className="py-4 px-6">
                          <span className="font-extrabold text-slate-900 text-sm">
                            {c.listingsCount}
                          </span>
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="bg-[#00DF81] h-full rounded-full"
                              style={{ width: `${Math.min(100, (c.listingsNum / 13000) * 100)}%` }}
                            />
                          </div>
                        </td>

                        {/* Active Switch Toggle */}
                        <td className="py-4 px-6">
                          <button
                            onClick={() => toggleCategoryStatus(c.id)}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              c.active
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                c.active ? 'bg-emerald-500' : 'bg-slate-400'
                              }`}
                            />
                            <span>{c.active ? 'Faol' : 'Nofaol'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                handleSelectForTreeEdit(c);
                                setViewMode('tree');
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                              title="Tahrirlash"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                showToast(`"${c.name}" o'chirish taqiqlangan! Faol e'lonlar mavjud.`, 'error');
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Widgets from Screenshot 7 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Widget 1: Hududiy e'lonlar taqsimoti */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      VILOYATLAR KESIMI
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Hududiy e&apos;lonlar taqsimoti
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#00e396]/15 text-[#05372d] text-[10px] font-bold rounded-md">
                    Jonli oqim
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[11px] text-slate-400 font-medium">Toshkent sh.</p>
                    <p className="text-base font-black text-slate-900 mt-1">16,840</p>
                    <span className="text-[10px] font-bold text-[#00bfa5]">49.2%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[11px] text-slate-400 font-medium">Samarqand</p>
                    <p className="text-base font-black text-slate-900 mt-1">6,420</p>
                    <span className="text-[10px] font-bold text-slate-600">18.7%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[11px] text-slate-400 font-medium">Farg&apos;ona</p>
                    <p className="text-base font-black text-slate-900 mt-1">4,910</p>
                    <span className="text-[10px] font-bold text-slate-600">14.3%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[11px] text-slate-400 font-medium">Boshqalar</p>
                    <p className="text-base font-black text-slate-900 mt-1">6,040</p>
                    <span className="text-[10px] font-bold text-slate-600">17.8%</span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Kategoriya o'chirish cheklovi qoidalari */}
              <div className="bg-[#0b2620] text-white p-5 rounded-2xl border border-[#164238] shadow-soft flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00DF81]/20 flex items-center justify-center text-[#00DF81] flex-shrink-0 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">
                      Kategoriya o&apos;chirish cheklovi
                    </h3>
                    <span className="text-[10px] font-bold text-[#00DF81] uppercase tracking-wider">
                      Qoida
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Tizimda 0 dan ortiq faol e&apos;lon mavjud bo&apos;lgan asosiy kategoriyani to&apos;g&apos;ridan-to&apos;g&apos;ri o&apos;chirib bo&apos;lmaydi. Avval barcha postlar yangi bo&apos;limga ko&apos;chirilishi yoki to&apos;xtatilishi zarur.
                  </p>
                  <button
                    onClick={() => showToast('Batafsil moderatsiya qo\'llanmasi')}
                    className="text-xs font-bold text-[#00DF81] hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>Batafsil moderatsiya yo&apos;riqnomasi</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Nested Tree & Edit Drawer View (Screenshot 10) */}
        {viewMode === 'tree' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Nested Category Tree */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-[#00bfa5]" />
                  <h3 className="text-xs font-extrabold text-slate-800">
                    Katalog daraxti (Nested Hierarchy)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setExpandedCats({ 1: true, 2: true, 3: true, 4: true });
                      showToast('Barcha toifalar yoyildi');
                    }}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded-lg"
                  >
                    Barchasini yoyish
                  </button>
                  <button
                    onClick={() => showToast('Kategoriyalar tartiblandi')}
                    className="text-[11px] font-bold text-slate-600 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded-lg flex items-center gap-1"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    <span>Tartiblash</span>
                  </button>
                </div>
              </div>

              {/* Tree Items */}
              <div className="space-y-3">
                {categories.map((cat) => {
                  const isSelected = selectedCatId === cat.id;
                  const isExpanded = expandedCats[cat.id];

                  return (
                    <div
                      key={cat.id}
                      className={`rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-[#00DF81] bg-[#00DF81]/5 shadow-sm'
                          : 'border-slate-200/80 bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Parent Category Header */}
                      <div className="p-3.5 flex items-center justify-between">
                        <div
                          onClick={() => handleSelectForTreeEdit(cat)}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(cat.id);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isExpanded ? '' : '-rotate-90'
                              }`}
                            />
                          </div>
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                            {getCategoryIcon(cat.icon)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-800 text-sm">
                                {cat.name}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                                {cat.listingsCount} ta e&apos;lon
                              </span>
                              {isSelected && (
                                <span className="px-2 py-0.5 bg-slate-900 text-[#00DF81] text-[10px] font-bold rounded-md">
                                  Tanlangan
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {cat.subCategories ? `${cat.subCategories.length} ta ichki toifa mavjud` : 'Asosiy toifa'}
                            </p>
                          </div>
                        </div>

                        {/* Status switch */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCategoryStatus(cat.id)}
                            className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                              cat.active ? 'bg-[#00cbb4]' : 'bg-slate-300'
                            }`}
                          >
                            <span
                              className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                                cat.active ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Subcategories (if expanded) */}
                      {isExpanded && cat.subCategories && cat.subCategories.length > 0 && (
                        <div className="px-4 pb-3 pt-1 space-y-2 border-t border-slate-100/80 bg-slate-50/50 rounded-b-2xl">
                          {cat.subCategories.map((sub, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 pl-6 bg-white rounded-xl border border-slate-100 text-xs hover:border-slate-200"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                <span className="font-bold text-slate-700">{sub.name}</span>
                                <span className="text-[10px] text-slate-400">({sub.count})</span>
                              </div>
                              <button
                                onClick={() => showToast(`"${sub.name}" holati o'zgartirildi`)}
                                className={`w-8 h-5 rounded-full transition-colors relative p-0.5 ${
                                  sub.active ? 'bg-[#00cbb4]' : 'bg-slate-200'
                                }`}
                              >
                                <span
                                  className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                                    sub.active ? 'translate-x-3' : 'translate-x-0'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 cols: Category Editor Drawer (Screenshot 10) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-soft p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Kategoriyani tahrirlash
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Parametrlarni yangilash va boshqarish
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#00e396]/20 text-[#05372d] text-xs font-black rounded-lg">
                  #CAT-10{selectedCatId}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveDrawerChanges} className="space-y-4 text-xs">
                {/* SVG Icon Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    TOIFA BELGISI (SVG)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00e396]/20 flex items-center justify-center text-[#05372d]">
                      {getCategoryIcon(activeEditingCat.icon)}
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('SVG ikonalar kutubxonasi ochildi')}
                      className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
                    >
                      Ikonani o&apos;zgartirish
                    </button>
                  </div>
                </div>

                {/* Name UZ & RU */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nomi (O&apos;zbekcha) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-[#00DF81]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Nomi (Ruscha) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.nameRu}
                      onChange={(e) => setEditForm({ ...editForm, nameRu: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-[#00DF81]"
                    />
                  </div>
                </div>

                {/* URL Slug */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    URL Slug (avtomatik generatsiya)
                  </label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden px-3 py-2">
                    <span className="text-slate-400 font-mono text-[11px]">olx.uz/d/</span>
                    <input
                      type="text"
                      value={editForm.slug.replace(/^\//, '')}
                      onChange={(e) => setEditForm({ ...editForm, slug: `/${e.target.value}` })}
                      className="flex-1 bg-transparent border-none text-xs font-mono font-bold text-slate-800 focus:outline-none pl-1"
                    />
                  </div>
                </div>

                {/* Parent & Order */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Asosiy (ota) kategoriya
                    </label>
                    <select
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-[#00DF81]"
                      defaultValue="root"
                    >
                      <option value="root">Asosiy kategoriya (Ota kategoriya)</option>
                      <option value="avto">Avtotransport</option>
                      <option value="estate">Ko&apos;chmas mulk</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Tartib raqami
                    </label>
                    <input
                      type="number"
                      value={editForm.order}
                      onChange={(e) => setEditForm({ ...editForm, order: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-[#00DF81]"
                    />
                  </div>
                </div>

                {/* Status Switch */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">Kategoriya holati</span>
                    <p className="text-[10px] text-slate-400">
                      Saytda qidiruv va filtrlarda ko&apos;rinadi
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, active: !editForm.active })}
                    className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                      editForm.active ? 'bg-[#00cbb4]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        editForm.active ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Custom Parameters / Filters */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">
                      MAXSUS FILTRLAR (PARAMETRLAR)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddTagInput(true)}
                      className="text-[11px] font-bold text-[#00bfa5] hover:underline"
                    >
                      + Filtr qo&apos;shish
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {editForm.filters.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFilterTag(tag)}
                          className="hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {showAddTagInput && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newFilterTag}
                        onChange={(e) => setNewFilterTag(e.target.value)}
                        placeholder="Yangi parametr nomi..."
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddFilterTag}
                        className="px-3 py-1.5 bg-[#00e396] text-[#05372d] font-bold rounded-xl text-xs"
                      >
                        Qo&apos;shish
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions: Delete, Cancel, Save */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Ushbu kategoriyada e\'lonlar mavjud bo\'lgani sababli o\'chirish cheklandi', 'error');
                    }}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Kategoriyani o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('table')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#f5b324] hover:bg-[#e0a11c] text-[#07241d] font-extrabold rounded-xl shadow-md transition-all"
                    >
                      O&apos;zgarishlarni saqlash
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
