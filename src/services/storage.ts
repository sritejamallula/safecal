import { Instrument, Certificate } from '../types';
import { MOCK_INSTRUMENTS, MOCK_CERTIFICATES } from './mockData';

const STORAGE_KEY_INSTRUMENTS = 'lm_verify_instruments_v4';
const STORAGE_KEY_CERTS = 'lm_verify_certificates_v4';

export const getStoredInstruments = (): Instrument[] => {
  const data = localStorage.getItem(STORAGE_KEY_INSTRUMENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_INSTRUMENTS, JSON.stringify(MOCK_INSTRUMENTS));
    return MOCK_INSTRUMENTS;
  }
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      const existingIds = new Set(parsed.map((i: Instrument) => (i.verificationId || i.id || '').toUpperCase()));
      const missingMocks = MOCK_INSTRUMENTS.filter(m => !existingIds.has((m.verificationId || m.id || '').toUpperCase()));
      if (missingMocks.length > 0) {
        const merged = [...parsed, ...missingMocks];
        localStorage.setItem(STORAGE_KEY_INSTRUMENTS, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored instruments, resetting to latest data:', e);
  }
  localStorage.setItem(STORAGE_KEY_INSTRUMENTS, JSON.stringify(MOCK_INSTRUMENTS));
  return MOCK_INSTRUMENTS;
};

export const saveStoredInstruments = (instruments: Instrument[]) => {
  localStorage.setItem(STORAGE_KEY_INSTRUMENTS, JSON.stringify(instruments));
};

export const getStoredCertificates = (): Certificate[] => {
  const data = localStorage.getItem(STORAGE_KEY_CERTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(MOCK_CERTIFICATES));
    return MOCK_CERTIFICATES;
  }
  return JSON.parse(data);
};

export const saveStoredCertificates = (certs: Certificate[]) => {
  localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(certs));
};
