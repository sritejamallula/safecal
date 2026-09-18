import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { QrCode, Search, Bell, Menu, X, LogOut, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';

import { IndianGovernmentEmblem } from './IndianGovernmentEmblem';

export const Navbar: React.FC = () => {
  const { role, userName, logout, isAuthenticated } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand & State Emblem */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <IndianGovernmentEmblem size={38} showText={false} />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-blue-700 transition font-serif">
                    Legal Metrology
                  </span>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-300">
                    Government of India
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Department of Consumer Affairs • Verification Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/verify"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Verify Instrument</span>
            </Link>

            <Link
              to="/scan"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition"
            >
              <QrCode className="w-4 h-4 text-blue-600" />
              <span>Scan QR Code</span>
            </Link>

            {role === 'business' && (
              <Link
                to="/business/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
              >
                Business Portal
              </Link>
            )}

            {role === 'inspector' && (
              <Link
                to="/inspector/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition"
              >
                Inspector Portal
              </Link>
            )}

            {role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="px-3 py-2 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition"
              >
                Admin Panel
              </Link>
            )}

            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg relative transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Notifications</span>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{notifications.length} Total</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 p-4 text-center">No notifications right now.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.link) navigate(n.link);
                            setNotifOpen(false);
                          }}
                          className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition flex items-start space-x-2.5 ${!n.read ? 'bg-blue-50/50' : ''}`}
                        >
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                          {n.type === 'info' && <UserCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                          {n.type === 'warning' && <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-semibold text-slate-800">{n.title}</p>
                            <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile / Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <div className="text-right hidden xl:block">
                  <p className="text-xs font-semibold text-slate-800 truncate max-w-[140px]">{userName}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition"
              >
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Verify Instrument</span>
          </Link>

          <Link
            to="/scan"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Scan QR Code</span>
          </Link>

          {role === 'business' && (
            <Link
              to="/business/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50"
            >
              Business Dashboard
            </Link>
          )}

          {role === 'inspector' && (
            <Link
              to="/inspector/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50"
            >
              Inspector Dashboard
            </Link>
          )}

          {role === 'admin' && (
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50"
            >
              Admin Dashboard
            </Link>
          )}

          <div className="pt-2 border-t border-slate-100">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left flex items-center space-x-2 px-3 py-2 text-sm text-rose-600 font-medium hover:bg-rose-50 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({userName})</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-blue-900 text-white font-medium py-2 rounded-lg text-sm"
              >
                Portal Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
