'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  Radio
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { lang, setLang, showToast } = useApp();

  const [email, setEmail] = useState('admin@olxneo.uz');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    showToast('Tizimga kirilmoqda...');

    setTimeout(() => {
      showToast('Xush kelibsiz, Super Admin! Boshqaruv paneli yuklandi.', 'success');
      router.push('/');
    }, 800);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f8faf9] flex flex-col justify-between items-center p-6 overflow-hidden select-none">
      {/* Ambient Glows from screenshot */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00e396]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#f5b324]/15 blur-[120px] pointer-events-none" />

      {/* Top Header with Language Pill Switcher */}
      <div className="w-full max-w-5xl flex justify-end z-10 pt-2">
        <div className="flex items-center bg-white p-1 rounded-full border border-slate-200/80 shadow-xs text-xs font-bold">
          <button
            onClick={() => {
              setLang('uz');
              showToast('Til: O\'zbekcha');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              lang === 'uz'
                ? 'bg-[#08201a] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'uz' && <span className="w-1.5 h-1.5 rounded-full bg-[#00DF81]" />}
            <span>O&apos;zbekcha</span>
          </button>
          <button
            onClick={() => {
              setLang('ru');
              showToast('Язык: Русский');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              lang === 'ru'
                ? 'bg-[#08201a] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'ru' && <span className="w-1.5 h-1.5 rounded-full bg-[#00DF81]" />}
            <span>Русский</span>
          </button>
        </div>
      </div>

      {/* Center Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] p-8 sm:p-10 z-10 text-center animate-slide-up">
        {/* Brand Logo */}
        <div className="inline-flex items-center gap-2 bg-[#09221d] px-4 py-2 rounded-2xl shadow-md mx-auto">
          <span className="text-xl font-black text-white tracking-tight">olx</span>
          <span className="bg-[#00DF81] text-[#05372d] text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase">
            NEO ADMIN
          </span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-black text-slate-900 mt-6 tracking-tight">
          Admin panelga kirish
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-1.5 max-w-xs mx-auto">
          Boshqaruv tizimiga kirish uchun ma&apos;lumotlaringizni kiriting
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left text-xs">
          {/* Email / Username */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">
                Foydalanuvchi nomi yoki email
              </label>
              <span className="text-[10px] font-bold text-slate-400">
                SSO faol
              </span>
            </div>
            <div className="relative">
              <div className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center font-bold">
                @
              </div>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-xs focus:outline-none focus:border-[#00DF81] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Parol
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 text-xs focus:outline-none focus:border-[#00DF81] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#07241d] focus:ring-[#00DF81] border-slate-300"
              />
              <span className="font-semibold text-slate-600">Eslab qolish</span>
            </label>

            <button
              type="button"
              onClick={() => showToast('Parolni tiklash havolasi yuborildi')}
              className="font-bold text-slate-600 hover:text-slate-900 hover:underline"
            >
              Parolni unutdingizmi?
            </button>
          </div>

          {/* Submit Golden Yellow Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#f5b324] hover:bg-[#e0a11c] active:scale-[0.99] text-[#07241d] font-black rounded-xl text-sm shadow-[0_4px_14px_rgba(245,179,36,0.4)] flex items-center justify-center gap-2 transition-all mt-4"
          >
            {isLoading ? (
              <span className="animate-pulse">Tekshirilmoqda...</span>
            ) : (
              <>
                <span>Kirish</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Status info */}
          <div className="pt-3 text-center">
            <span className="text-[11px] font-semibold text-slate-500 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00cbb4]" />
              Markaziy Toshkent Klasteri (UZ-TAS-01)
            </span>
          </div>
        </form>
      </div>

      {/* Footer from screenshot */}
      <div className="text-center space-y-2 z-10 pb-2 text-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-xs text-[11px] font-bold text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00bfa5]" />
          <span>Xavfsiz 256-bit SSL & 2FA faollashtirilgan</span>
        </div>
        <p className="text-[11px] text-slate-400">
          Tizim qat&apos;iy nazorat ostida • Faqat vakolatli xodimlar uchun
        </p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          © 2026 OLX GROUP UZBEKISTAN
        </p>
      </div>
    </div>
  );
}
