import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/common/Toast';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { VerifyPage } from './pages/VerifyPage';
import { ScanPage } from './pages/ScanPage';
import { CertificatePage } from './pages/CertificatePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Business Portal
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessInstrumentsPage } from './pages/business/BusinessInstrumentsPage';
import { RegisterInstrumentPage } from './pages/business/RegisterInstrumentPage';
import { BusinessRequestsPage } from './pages/business/BusinessRequestsPage';
import { BusinessCertificatesPage } from './pages/business/BusinessCertificatesPage';

// Inspector Portal
import { InspectorDashboard } from './pages/inspector/InspectorDashboard';
import { InspectorInspectionsPage } from './pages/inspector/InspectorInspectionsPage';
import { InspectionWorkflowPage } from './pages/inspector/InspectionWorkflowPage';

// Admin Portal
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminInstrumentsPage } from './pages/admin/AdminInstrumentsPage';
import { AdminBusinessesPage } from './pages/admin/AdminBusinessesPage';
import { AdminInspectorsPage } from './pages/admin/AdminInspectorsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/business') ||
                           location.pathname.startsWith('/inspector') ||
                           location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {isDashboardRoute && <Sidebar />}
        <main className={`flex-1 ${isDashboardRoute ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
          {children}
        </main>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <DataProvider>
          <BrowserRouter>
            <AppLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/verify/:verificationId" element={<VerifyPage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/certificate/:id" element={<CertificatePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Business Owner Routes */}
                <Route path="/business/dashboard" element={<BusinessDashboard />} />
                <Route path="/business/instruments" element={<BusinessInstrumentsPage />} />
                <Route path="/business/instruments/new" element={<RegisterInstrumentPage />} />
                <Route path="/business/requests" element={<BusinessRequestsPage />} />
                <Route path="/business/certificates" element={<BusinessCertificatesPage />} />

                {/* Inspector Routes */}
                <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
                <Route path="/inspector/inspections" element={<InspectorInspectionsPage />} />
                <Route path="/inspector/inspections/:id" element={<InspectionWorkflowPage />} />

                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/instruments" element={<AdminInstrumentsPage />} />
                <Route path="/admin/businesses" element={<AdminBusinessesPage />} />
                <Route path="/admin/inspectors" element={<AdminInspectorsPage />} />
                <Route path="/admin/reports" element={<AdminReportsPage />} />

                {/* Fallback */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </DataProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
