import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                S
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">SafeCal</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              SafeCal Statutory Verification Portal for Weighing and Measuring Instruments certified under Legal Metrology Regulations.
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>Tamper-Proof QR Verification</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Public Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/verify" className="hover:text-blue-400 transition">
                  Verify Instrument Online
                </Link>
              </li>
              <li>
                <Link to="/scan" className="hover:text-blue-400 transition">
                  Scan QR Verification Code
                </Link>
              </li>
              <li>
                <Link to="/#categories" className="hover:text-blue-400 transition">
                  Supported Categories
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-blue-400 transition">
                  Public FAQ & Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Stakeholder Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Importer / Merchant Portal Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition">
                  Register Establishment
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Legal Metrology Inspector Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory Acts */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">Statutory Regulations</h4>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li className="flex items-center">
                <Scale className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>The Legal Metrology Act, 2009</span>
              </li>
              <li className="flex items-center">
                <Scale className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>The Legal Metrology (General) Rules, 2011</span>
              </li>
              <li className="flex items-center">
                <Scale className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span>Model Approval & Packaged Commodities Rules</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px]">
          <p>© 2026 SafeCal Legal Verification Portal. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
