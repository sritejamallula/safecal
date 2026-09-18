import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Instrument, Certificate, NotificationItem } from '../types';
import { apiService, getStoredInstruments, getStoredCertificates } from '../services/api';
import { MOCK_NOTIFICATIONS } from '../services/mockData';
import { useToast } from './ToastContext';

interface DataContextType {
  instruments: Instrument[];
  certificates: Certificate[];
  notifications: NotificationItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
  registerNewInstrument: (data: Partial<Instrument>) => Promise<Instrument>;
  approveInspection: (instrumentId: string, inspectorName: string) => Promise<{ instrument: Instrument; certificate: Certificate }>;
  rejectInspection: (instrumentId: string, reason: string) => Promise<Instrument>;
  markNotificationRead: (id: string) => void;
  resetToDefaultDemo: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToast } = useToast();

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const instList = await apiService.getInstruments();
      const certList = getStoredCertificates();
      setInstruments(instList);
      setCertificates(certList);
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const registerNewInstrument = async (data: Partial<Instrument>): Promise<Instrument> => {
    const created = await apiService.registerInstrument(data);
    await refreshData();
    addToast({
      type: 'success',
      title: 'Instrument Registered Successfully',
      description: `Instrument ${created.id} has been submitted for Legal Metrology inspection.`
    });
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New Verification Request',
      message: `New instrument ${created.id} registered by ${created.businessName}. Inspection pending.`,
      timestamp: 'Just now',
      read: false,
      type: 'info',
      link: `/inspector/inspections/${created.id}`
    };
    setNotifications(prev => [newNotif, ...prev]);
    return created;
  };

  const approveInspection = async (instrumentId: string, inspectorName: string) => {
    const result = await apiService.approveInspection(instrumentId, inspectorName);
    await refreshData();
    addToast({
      type: 'success',
      title: 'Verification Approved & Certificate Issued!',
      description: `Certificate ${result.certificate.certificateNumber} generated for ${instrumentId}.`
    });

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Verification Approved',
      message: `Instrument ${instrumentId} passed accuracy testing. Certificate ${result.certificate.certificateNumber} is now active.`,
      timestamp: 'Just now',
      read: false,
      type: 'success',
      link: `/certificate/${result.certificate.certificateNumber}`
    };
    setNotifications(prev => [newNotif, ...prev]);
    return result;
  };

  const rejectInspection = async (instrumentId: string, reason: string) => {
    const result = await apiService.rejectInspection(instrumentId, reason);
    await refreshData();
    addToast({
      type: 'error',
      title: 'Instrument Inspection Rejected',
      description: `Instrument ${instrumentId} failed inspection standard checks.`
    });
    return result;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetToDefaultDemo = () => {
    apiService.resetDemoData();
    refreshData();
    addToast({
      type: 'info',
      title: 'Demo Data Reset',
      description: 'Restored all sample instruments and certificates to clean initial state.'
    });
  };

  return (
    <DataContext.Provider value={{
      instruments,
      certificates,
      notifications,
      loading,
      refreshData,
      registerNewInstrument,
      approveInspection,
      rejectInspection,
      markNotificationRead,
      resetToDefaultDemo
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
