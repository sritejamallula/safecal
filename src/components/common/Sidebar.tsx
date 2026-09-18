import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Scale,
  PlusCircle,
  FileCheck,
  Award,
  Search,
  Users,
  FileSpreadsheet,
  LogOut,
  ShieldAlert,
  Building2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, logout, userName, userDistrict } = useAuth();
  const navigate = useNavigate();

  const getLinks = () => {
    switch (role) {
      case 'business':
        return [
          { to: '/business/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/business/instruments', label: 'My Instruments', icon: Scale },
          { to: '/business/instruments/new', label: 'Register Instrument', icon: PlusCircle },
          { to: '/business/requests', label: 'Verification Requests', icon: FileCheck },
          { to: '/business/certificates', label: 'Certificates', icon: Award },
        ];
      case 'inspector':
        return [
          { to: '/inspector/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/inspector/inspections', label: 'Assigned Inspections', icon: ClipboardCheckIcon },
          { to: '/verify', label: 'Verify Instrument', icon: Search },
          { to: '/business/certificates', label: 'Certificates Directory', icon: Award },
        ];
      case 'admin':
        return [
          { to: '/admin/dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
          { to: '/admin/instruments', label: 'All Instruments', icon: Scale },
          { to: '/admin/businesses', label: 'Businesses Registry', icon: Building2 },
          { to: '/admin/inspectors', label: 'Inspectors Roster', icon: Users },
          { to: '/admin/reports', label: 'Reports & Audits', icon: FileSpreadsheet },
        ];
      default:
        return [
          { to: '/verify', label: 'Public Verification', icon: Search },
        ];
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 border-r border-slate-800 shrink-0 hidden md:flex">
      <div>
        {/* Role Badge Card */}
        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
              {role.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                {role} • {userDistrict}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Navigation
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-slate-800 hover:text-slate-100 text-slate-400'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Info & Logout */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="bg-blue-950/40 border border-blue-800/30 rounded-lg p-2.5 text-[11px] text-blue-300">
          <p className="font-semibold flex items-center">
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-blue-400" /> Statutory Metrology
          </p>
          <p className="text-slate-400 text-[10px] mt-0.5">Act 2009 & AP Rules 2011</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-800/50 border border-transparent text-slate-400 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

// Helper icon fallback
function ClipboardCheckIcon(props: any) {
  return <FileCheck {...props} />;
}
