import { Instrument, Certificate } from '../types';
import { getStoredInstruments, saveStoredInstruments, getStoredCertificates, saveStoredCertificates } from './storage';

export { getStoredInstruments, saveStoredInstruments, getStoredCertificates, saveStoredCertificates };

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchVerificationRecord = async (query: string): Promise<Instrument | null> => {
  const cleanQuery = query ? query.trim() : '';
  if (!cleanQuery) return null;
  const result = await apiService.verifyInstrumentOrCertificate(cleanQuery);
  return result.found && result.instrument ? result.instrument : null;
};

// Centralized Backend API Client
export const apiService = {
  // GET /api/verification/:verificationId (Single Source of Truth)
  async verifyInstrumentOrCertificate(query: string): Promise<{
    found: boolean;
    instrument?: Instrument;
    certificate?: Certificate;
    errorType?: 'EXPIRED' | 'REJECTED' | 'NOT_FOUND' | 'PENDING';
    message?: string;
  }> {
    const cleanQuery = query ? query.trim() : '';
    if (!cleanQuery) {
      return { found: false, errorType: 'NOT_FOUND', message: 'Please enter a valid verification ID or certificate number.' };
    }

    try {
      // Primary Backend API Query
      const res = await fetch(`${API_BASE_URL}/verification/${encodeURIComponent(cleanQuery)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const inst: Instrument = json.data;
          const cert: Certificate = {
            certificateNumber: inst.certificateNumber,
            instrumentId: inst.verificationId || inst.id,
            verificationId: inst.verificationId,
            instrumentType: inst.instrumentType,
            manufacturer: `${inst.manufacturer} (${inst.model})`,
            serialNumber: inst.serialNumber,
            businessName: inst.businessName,
            businessAddress: inst.businessAddress,
            district: inst.district,
            state: inst.state,
            issueDate: inst.verificationDate ? new Date(inst.verificationDate).toLocaleDateString('en-GB') : 'N/A',
            validUntil: inst.validUntil ? new Date(inst.validUntil).toLocaleDateString('en-GB') : 'N/A',
            inspectorName: inst.inspectorName || 'Shri R. V. Rao',
            inspectorId: inst.inspectorId || 'INS-AP-04',
            status: inst.verificationStatus === 'VERIFIED' ? 'VALID' : 'EXPIRED',
            qrCodeUrl: inst.qrVerificationUrl,
            sealId: `SEAL-LM-${inst.serialNumber.slice(-5)}`,
            sourceType: inst.sourceType,
            sourceReference: inst.sourceReference
          };

          if (inst.verificationStatus === 'EXPIRED') {
            return { found: true, instrument: inst, certificate: cert, errorType: 'EXPIRED', message: 'Verification certificate for this instrument has EXPIRED.' };
          }
          if (inst.verificationStatus === 'REJECTED') {
            return { found: true, instrument: inst, errorType: 'REJECTED', message: 'Instrument failed legal metrology accuracy standards and has been REJECTED.' };
          }
          if (inst.verificationStatus === 'PENDING') {
            return { found: true, instrument: inst, errorType: 'PENDING', message: 'Instrument inspection is currently PENDING inspector review.' };
          }

          return { found: true, instrument: inst, certificate: cert };
        }
      }
    } catch (err) {
      console.warn('Backend API unreachable, using local storage fallback:', err);
    }

    // Local Storage Fallback if server offline
    const instruments = getStoredInstruments();
    const certs = getStoredCertificates();
    const cleanUpper = cleanQuery.toUpperCase();
    const cleanNorm = cleanQuery.replace(/[\/\s\_]/g, '-').toUpperCase();

    const inst = instruments.find(i => {
      const vid = (i.verificationId || '').toUpperCase();
      const id = (i.id || '').toUpperCase();
      const certNo = (i.certificateNumber || '').toUpperCase();
      const regNo = (i.registrationNo || '').toUpperCase();
      const serialNo = (i.serialNumber || '').toUpperCase();
      const owner = (i.ownerName || i.importerName || i.businessName || '').toUpperCase();

      const vidNorm = vid.replace(/[\/\s\_]/g, '-');
      const certNorm = certNo.replace(/[\/\s\_]/g, '-');
      const regNorm = regNo.replace(/[\/\s\_]/g, '-');

      return (
        vid === cleanUpper ||
        id === cleanUpper ||
        certNo === cleanUpper ||
        regNo === cleanUpper ||
        serialNo === cleanUpper ||
        vidNorm === cleanNorm ||
        certNorm === cleanNorm ||
        regNorm === cleanNorm ||
        (cleanUpper.length >= 3 && owner.includes(cleanUpper))
      );
    });

    if (inst) {
      const cert = certs.find(c => c.certificateNumber === inst.certificateNumber || c.instrumentId === inst.verificationId || c.instrumentId === inst.id);
      return { found: true, instrument: inst, certificate: cert };
    }

    return {
      found: false,
      errorType: 'NOT_FOUND',
      message: `No verification record found for identifier "${query}".`
    };
  },

  // GET /api/instruments
  async getInstruments(filters?: { status?: string; district?: string; type?: string; sourceType?: string }): Promise<Instrument[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.status && filters.status !== 'ALL') queryParams.append('status', filters.status);
      if (filters?.district && filters.district !== 'ALL') queryParams.append('district', filters.district);
      if (filters?.type && filters.type !== 'ALL') queryParams.append('type', filters.type);
      if (filters?.sourceType && filters.sourceType !== 'ALL') queryParams.append('sourceType', filters.sourceType);

      const res = await fetch(`${API_BASE_URL}/instruments?${queryParams.toString()}`);
      const json = await res.json();
      if (res.ok && json.success) return json.data;
    } catch (err) {
      console.warn('Backend API offline, returning stored instruments:', err);
    }
    return getStoredInstruments();
  },

  // POST /api/instruments
  async registerInstrument(data: Partial<Instrument>): Promise<Instrument> {
    try {
      const res = await fetch(`${API_BASE_URL}/instruments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (res.ok && json.success) return json.data;
    } catch (err) {
      console.warn('Backend API offline, storing locally:', err);
    }

    // Local fallback
    const instruments = getStoredInstruments();
    const count = instruments.length + 1;
    const vId = `LM-USER-${String(count).padStart(6, '0')}`;
    const certNo = `IMP/REG/2026/${String(count).padStart(4, '0')}`;

    const newInst: Instrument = {
      id: vId,
      verificationId: vId,
      certificateNumber: certNo,
      instrumentType: data.instrumentType || data.type || 'Electronic Non-Automatic Weighing Instrument',
      type: data.type || 'Electronic Weighing Scale',
      manufacturer: data.manufacturer || 'Standard Manufacturer',
      model: data.model || data.modelNumber || 'MODEL-X',
      modelNumber: data.modelNumber || 'MODEL-X',
      serialNumber: data.serialNumber || `SN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      capacity: data.capacity || '30 kg (e = 1g)',
      accuracyClass: data.accuracyClass || 'Class III (Medium Accuracy)',
      ownerName: data.ownerName || data.businessName || 'Merchant Owner',
      businessName: data.businessName || 'ABC Retail Store',
      businessAddress: data.businessAddress || 'Plot 42, Main Road, Kakinada',
      district: data.district || 'Kakinada',
      state: data.state || 'Andhra Pradesh',
      verificationStatus: 'PENDING',
      inspectorName: 'Shri R. V. Rao',
      inspectorId: 'INS-AP-04',
      qrVerificationUrl: `http://localhost:3000/verify/${vId}`,
      sourceType: 'USER_SUBMISSION',
      sourceReference: 'Portal User Submission',
      createdAt: new Date().toISOString()
    };

    saveStoredInstruments([newInst, ...instruments]);
    return newInst;
  },

  // POST /api/verification/:id/approve
  async approveInspection(id: string, inspectorName: string): Promise<{ instrument: Instrument; certificate: Certificate }> {
    try {
      const res = await fetch(`${API_BASE_URL}/instruments/${encodeURIComponent(id)}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectorName })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const inst: Instrument = json.data;
        const cert: Certificate = {
          certificateNumber: inst.certificateNumber,
          instrumentId: inst.verificationId || inst.id,
          verificationId: inst.verificationId,
          instrumentType: inst.instrumentType,
          manufacturer: `${inst.manufacturer} (${inst.model})`,
          serialNumber: inst.serialNumber,
          businessName: inst.businessName,
          businessAddress: inst.businessAddress,
          district: inst.district,
          state: inst.state,
          issueDate: inst.verificationDate ? new Date(inst.verificationDate).toLocaleDateString('en-GB') : 'N/A',
          validUntil: inst.validUntil ? new Date(inst.validUntil).toLocaleDateString('en-GB') : 'N/A',
          inspectorName: inst.inspectorName || inspectorName,
          inspectorId: 'INS-AP-04',
          status: 'VALID',
          qrCodeUrl: inst.qrVerificationUrl,
          sealId: `SEAL-LM-${inst.serialNumber.slice(-5)}`,
          sourceType: inst.sourceType,
          sourceReference: inst.sourceReference
        };
        return { instrument: inst, certificate: cert };
      }
    } catch (err) {
      console.warn('Backend API offline, approving locally:', err);
    }

    // Local fallback
    const instruments = getStoredInstruments();
    const instIdx = instruments.findIndex(i => i.verificationId === id || i.id === id);
    if (instIdx === -1) throw new Error('Instrument not found');

    const updatedInst: Instrument = {
      ...instruments[instIdx],
      verificationStatus: 'VERIFIED',
      inspectorName: inspectorName || 'Shri R. V. Rao'
    };

    instruments[instIdx] = updatedInst;
    saveStoredInstruments(instruments);

    const cert: Certificate = {
      certificateNumber: updatedInst.certificateNumber,
      instrumentId: updatedInst.verificationId,
      verificationId: updatedInst.verificationId,
      instrumentType: updatedInst.instrumentType,
      manufacturer: `${updatedInst.manufacturer} (${updatedInst.model})`,
      serialNumber: updatedInst.serialNumber,
      businessName: updatedInst.businessName,
      businessAddress: updatedInst.businessAddress,
      district: updatedInst.district,
      state: updatedInst.state,
      issueDate: '15/09/2026',
      validUntil: '14/09/2027',
      inspectorName: inspectorName || 'Shri R. V. Rao',
      inspectorId: 'INS-AP-04',
      status: 'VALID',
      qrCodeUrl: updatedInst.qrVerificationUrl,
      sealId: `SEAL-LM-${updatedInst.serialNumber.slice(-5)}`,
      sourceType: updatedInst.sourceType,
      sourceReference: updatedInst.sourceReference
    };

    return { instrument: updatedInst, certificate: cert };
  },

  // POST /api/verification/:id/reject
  async rejectInspection(id: string, reason: string): Promise<Instrument> {
    try {
      const res = await fetch(`${API_BASE_URL}/instruments/${encodeURIComponent(id)}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason })
      });
      const json = await res.json();
      if (res.ok && json.success) return json.data;
    } catch (err) {
      console.warn('Backend API offline, rejecting locally:', err);
    }

    const instruments = getStoredInstruments();
    const instIdx = instruments.findIndex(i => i.verificationId === id || i.id === id);
    if (instIdx === -1) throw new Error('Instrument not found');

    const updated = { ...instruments[instIdx], verificationStatus: 'REJECTED' as any };
    instruments[instIdx] = updated;
    saveStoredInstruments(instruments);
    return updated;
  }
};
