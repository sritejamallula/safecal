import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Building2, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { loginAsDemoRole } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: 'ABC Retail Store',
    ownerName: 'P. Venkatachalam',
    tradeLicenseNo: 'TL-KKD-2024-8841',
    category: 'Retail Grocery & Provisions',
    district: 'Kakinada',
    address: 'Plot 42, Main Road, Commercial Complex',
    phone: '+91 98480 12345',
    email: 'business@demo.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemoRole('business');
    addToast({
      type: 'success',
      title: 'Business Account Registered!',
      description: `Welcome ${formData.businessName}. You can now register weighing instruments.`
    });
    navigate('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Register Commercial Business</h2>
          <p className="text-xs text-slate-500">Onboard your shop or commercial establishment for Legal Metrology compliance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Business Establishment Name</label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Owner / Manager Name</label>
              <input
                type="text"
                required
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Trade License Number</label>
              <input
                type="text"
                required
                value={formData.tradeLicenseNo}
                onChange={(e) => setFormData({ ...formData, tradeLicenseNo: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Establishment Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Retail Grocery & Provisions">Retail Grocery & Provisions</option>
                <option value="Petroleum Retail Outlet">Petroleum Retail Outlet</option>
                <option value="Jewelry & Precious Metals">Jewelry & Precious Metals</option>
                <option value="Industrial Weighbridge">Industrial Weighbridge</option>
                <option value="Supermarket / Hypermarket">Supermarket / Hypermarket</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">District (Andhra Pradesh)</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Kakinada">Kakinada</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
                <option value="NTR Vijayawada">NTR Vijayawada</option>
                <option value="Guntur">Guntur</option>
                <option value="Tirupati">Tirupati</option>
                <option value="East Godavari">East Godavari</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Commercial Premises Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition pt-3"
          >
            <span>Complete Registration & Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-blue-700 hover:underline">
            Log in to your account
          </Link>
        </div>

      </div>
    </div>
  );
};
