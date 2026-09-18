import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, QrCode, ShieldCheck, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';

import { SafeCalLogo } from '../common/SafeCalLogo';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden py-16 lg:py-24">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SafeCal • Legal Verification Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              SafeCal Legal <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-200 via-white to-emerald-300 bg-clip-text text-transparent">
                Verification Portal
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Instantly verify authentic statutory registration certificates and registered owner details for weighing and measuring instruments.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/verify"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5 transition duration-200"
              >
                <Search className="w-4 h-4" />
                <span>Verify an Instrument</span>
              </Link>

              <Link
                to="/scan"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm backdrop-blur-xs transform hover:-translate-y-0.5 transition duration-200"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Scan QR Code</span>
              </Link>
            </div>

            {/* Real Search Quick Trigger */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center lg:justify-start space-x-3 text-xs text-slate-400">
              <span className="font-medium text-slate-400 flex items-center">
                <Building2 className="w-3.5 h-3.5 text-blue-400 mr-1" /> Quick Certificate Verification:
              </span>
              <button
                onClick={() => navigate('/verify/IMP-MH-162-2026')}
                className="text-blue-300 hover:text-white underline underline-offset-4 font-mono font-bold"
              >
                IMP/MH/162/2026
              </button>
            </div>

          </div>

          {/* Right Visual Card Column - Authentic Portal Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Glow Accent */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Certified Instrument Card Preview */}
              <div className="relative bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <SafeCalLogo size={32} showText={true} />
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Certificate No</span>
                    <span className="font-mono font-black text-blue-950">IMP/MH/162/2026</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">IEC / Reg Code</span>
                    <span className="font-mono font-black text-slate-900">0316936936</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registered Owner:</span>
                    <span className="font-black text-right text-slate-900 max-w-[200px] truncate">SUPREME INSTRUMENT TECH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scope:</span>
                    <span className="font-bold text-right text-slate-800">Weighing & Measuring Devices</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validity Date:</span>
                    <span className="font-black text-emerald-700">15/09/2031</span>
                  </div>
                </div>

                {/* QR Code preview block */}
                <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">Tamper-Evident QR Badge</span>
                    <p className="text-[11px] text-blue-800 font-medium">Scan QR code seal to verify authentic record.</p>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg border border-blue-200 shrink-0 flex items-center justify-center">
                    <QrCode className="w-full h-full text-blue-900" />
                  </div>
                </div>

                <Link
                  to="/verify/IMP-MH-162-2026"
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition shadow-sm"
                >
                  <span>View Official Portal Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
