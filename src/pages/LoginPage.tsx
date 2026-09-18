import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Shield, Lock, Store, ClipboardCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsDemoRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('business');
  const [email, setEmail] = useState('business@demo.com');
  const [password, setPassword] = useState('demo1234');
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    switch (role) {
      case 'business':
        setEmail('business@demo.com');
        break;
      case 'inspector':
        setEmail('inspector@demo.com');
        break;
      case 'admin':
        setEmail('admin@demo.com');
        break;
      case 'consumer':
        setEmail('public@consumer.gov.in');
        break;
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemoRole(selectedRole);
    if (selectedRole === 'business') navigate('/business/dashboard');
    else if (selectedRole === 'inspector') navigate('/inspector/dashboard');
    else if (selectedRole === 'admin') navigate('/admin/dashboard');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Branding Side (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 p-1 flex items-center justify-center">
                <img src="/logo-icon.svg" alt="Logo" className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg leading-none">e-Verify</h3>
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Legal Metrology</span>
              </div>
            </div>

            <h2 className="text-2xl font-black tracking-tight leading-snug mb-3">
              Official Portal Authentication
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Secure digital infrastructure for merchants, statutory inspectors, and state metrology controllers.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Statutory Compliance Act, 2009</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Tamper-Evident QR Seals</span>
            </div>
          </div>
        </div>

        {/* Right Form Side (7 cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 space-y-6">
          
          <div>
            <h3 className="text-xl font-black text-slate-900">Sign In to Your Account</h3>
            <p className="text-xs text-slate-500 mt-1">Select your stakeholder role to populate demo credentials:</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => handleRoleSelect('consumer')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                selectedRole === 'consumer' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Consumer</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('business')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                selectedRole === 'business' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Business</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('inspector')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                selectedRole === 'inspector' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Inspector</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center space-y-1 ${
                selectedRole === 'admin' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Registered Email / Mobile</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Password</label>
                <a href="#forgot" className="text-blue-700 hover:underline font-semibold text-[11px]">Forgot password?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center space-x-2 text-slate-600 font-medium">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition"
            >
              <span>Login as {selectedRole.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Need to onboard a shop or business?{' '}
            <Link to="/register" className="font-bold text-blue-700 hover:underline">
              Register Business Establishment
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
