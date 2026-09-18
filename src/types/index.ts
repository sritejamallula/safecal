export type UserRole = 'consumer' | 'business' | 'inspector' | 'admin';

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'EXPIRED' | 'REJECTED';

export type SourceType = 'OFFICIAL_REFERENCE' | 'DEMO' | 'IMPORTED_DATA';

export type InstrumentCategory = 
  | 'Electronic Weighing Scale'
  | 'Electronic Non-Automatic Weighing Instrument (Counter Scale)'
  | 'Fuel Dispenser Meter'
  | 'Water & Flow Meter'
  | 'Retail Weighing Instrument'
  | 'Heavy Industrial Scale'
  | 'Linear Measurement Tape / Ruler';

export interface Instrument {
  id: string;
  verificationId: string; // e.g. LM-AP-DEMO-000001
  certificateNumber: string; // e.g. CERT-DEMO-2026-000001
  instrumentType: string;
  type?: InstrumentCategory;
  manufacturer: string;
  model: string;
  modelNumber?: string;
  serialNumber: string;
  capacity: string;
  accuracyClass: string;
  ownerName: string;
  businessId?: string;
  businessName: string;
  businessAddress: string;
  district: string;
  state: string;
  installationDate?: string;
  inspectionDate?: string;
  prevCertNo?: string;
  status?: VerificationStatus;
  verificationStatus: VerificationStatus;
  lastVerificationDate?: string;
  verificationDate?: string;
  validUntil?: string;
  inspectorName?: string;
  inspectorId?: string;
  photoUrl?: string;
  documentUrl?: string;
  qrVerificationUrl: string;
  importerName?: string;
  registrationNo?: string;
  issueDateStr?: string;
  validityDateStr?: string;
  itemCategory?: string;
  sourceType: SourceType;
  sourceReference?: string;
  createdDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  passed: boolean;
}

export interface MeasurementTest {
  standardWeight: number;
  observedWeight: number;
  errorValue: number;
  errorPercentage: number;
  maxPermissibleError: number;
  passed: boolean;
  notes?: string;
}

export interface Certificate {
  certificateNumber: string;
  instrumentId: string;
  verificationId?: string;
  instrumentType: string;
  manufacturer: string;
  serialNumber: string;
  businessName: string;
  businessAddress: string;
  district: string;
  state: string;
  issueDate: string;
  validUntil: string;
  inspectorName: string;
  inspectorId: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED';
  qrCodeUrl: string;
  sealId: string;
  sourceType?: SourceType;
  sourceReference?: string;
}

export interface Business {
  id: string;
  name: string;
  ownerName: string;
  tradeLicenseNo: string;
  gstin?: string;
  category: string;
  address: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  registeredDate: string;
  totalInstruments: number;
}

export interface Inspector {
  id: string;
  badgeNumber: string;
  name: string;
  designation: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  assignedCount: number;
  completedCount: number;
  activeSince: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}
