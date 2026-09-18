import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheck, User, Store, ClipboardCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DemoBar: React.FC = () => {
  const { role, loginAsDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (targetRole: UserRole) => {
    loginAsDemoRole(targetRole);
    if (targetRole === 'business') navigate('/business/dashboard');
    else if (targetRole === 'inspector') navigate('/inspector/dashboard');
    else if (targetRole === 'admin') navigate('/admin/dashboard');
    else navigate('/');
  };

  return (
    <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-xs relative z-50">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-900/60 text-blue-200 border border-blue-700/50">
          <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
          GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS • LEGAL METROLOGY PORTAL
        </span>
      </div>

      <div className="flex items-center space-x-1.5 flex-wrap">
        <span className="hidden lg:inline text-slate-400 text-[11px] mr-1">Portal View:</span>

        <button
          onClick={() => handleRoleSelect('consumer')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition ${
            role === 'consumer'
              ? 'bg-blue-600 text-white font-medium shadow-xs'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Public Citizen Verification View"
        >
          <User className="w-3.5 h-3.5" />
          <span>Public / Citizen</span>
        </button>

        <button
          onClick={() => handleRoleSelect('business')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition ${
            role === 'business'
              ? 'bg-blue-600 text-white font-medium shadow-xs'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Business Establishment Portal"
        >
          <Store className="w-3.5 h-3.5" />
          <span>Importer / Merchant</span>
        </button>

        <button
          onClick={() => handleRoleSelect('inspector')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition ${
            role === 'inspector'
              ? 'bg-blue-600 text-white font-medium shadow-xs'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Legal Metrology Inspector Portal"
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>Inspector</span>
        </button>

        <button
          onClick={() => handleRoleSelect('admin')}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition ${
            role === 'admin'
              ? 'bg-blue-600 text-white font-medium shadow-xs'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
          title="Controller Admin Portal"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Controller Admin</span>
        </button>
      </div>
    </div>
  );
};
