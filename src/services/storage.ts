import { Instrument, Certificate } from '../types';
import { MOCK_INSTRUMENTS, MOCK_CERTIFICATES } from './mockData';

const STORAGE_KEY_INSTRUMENTS = 'lm_verify_instruments_v3';
const STORAGE_KEY_CERTS = 'lm_verify_certificates_v3';

export const getStoredInstruments = (): Instrument[] => {
  const data = localStorage.getItem(STORAGE_KEY_INSTRUMENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_INSTRUMENTS, JSON.stringify(MOCK_INSTRUMENTS));
    return MOCK_INSTRUMENTS;
  }
  return JSON.parse(data);
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
