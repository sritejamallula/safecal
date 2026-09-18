import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getInstruments = async (req, res) => {
  try {
    const { status, district, type, sourceType } = req.query;

    const where = {};
    if (status && status !== 'ALL') where.verificationStatus = status;
    if (district && district !== 'ALL') where.district = { contains: district };
    if (type && type !== 'ALL') where.instrumentType = type;
    if (sourceType && sourceType !== 'ALL') where.sourceType = sourceType;

    const list = await prisma.instrument.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    console.error('Error fetching instruments:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch instruments.' }
    });
  }
};

export const createInstrument = async (req, res) => {
  try {
    const body = req.body;
    const count = await prisma.instrument.count();
    const nextNum = String(count + 1).padStart(6, '0');
    const verificationId = `LM-USER-${nextNum}`;
    const certificateNumber = `IMP/REG/2026/${String(count + 1).padStart(4, '0')}`;

    const newInst = await prisma.instrument.create({
      data: {
        verificationId,
        certificateNumber,
        instrumentType: body.instrumentType || body.type || 'Electronic Weighing Instrument',
        manufacturer: body.manufacturer || 'Standard Manufacturer',
        model: body.model || body.modelNumber || 'MODEL-X',
        serialNumber: body.serialNumber || `SN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        capacity: body.capacity || '30 kg (e = 1g)',
        accuracyClass: body.accuracyClass || 'Class III (Medium Accuracy)',
        ownerName: body.ownerName || body.businessName || 'Merchant Owner',
        businessName: body.businessName || 'ABC Retail Establishment',
        businessAddress: body.businessAddress || 'Commercial Street, Kakinada',
        state: body.state || 'Andhra Pradesh',
        district: body.district || 'Kakinada',
        verificationStatus: 'PENDING',
        inspectorName: body.inspectorName || 'Assigned to Inspector Shri R. V. Rao',
        inspectorId: 'INS-AP-04',
        qrVerificationUrl: `http://localhost:3000/verify/${verificationId}`,
        sourceType: 'USER_SUBMISSION',
        sourceReference: 'Portal Establishment Submission'
      }
    });

    return res.status(201).json({
      success: true,
      data: newInst
    });
  } catch (error) {
    console.error('Error creating instrument:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to register instrument.' }
    });
  }
};

export const approveVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { inspectorName } = req.body;

    const inst = await prisma.instrument.findFirst({
      where: { OR: [{ id }, { verificationId: id }] }
    });

    if (!inst) {
      return res.status(404).json({ success: false, error: { message: 'Instrument not found' } });
    }

    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    const updated = await prisma.instrument.update({
      where: { id: inst.id },
      data: {
        verificationStatus: 'VERIFIED',
        verificationDate: today,
        validUntil: nextYear,
        inspectorName: inspectorName || 'Shri R. V. Rao (Sr. Legal Metrology Inspector)'
      }
    });

    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Error approving verification:', error);
    return res.status(500).json({ success: false, error: { message: 'Approval failed.' } });
  }
};

export const rejectVerification = async (req, res) => {
  try {
    const { id } = req.params;

    const inst = await prisma.instrument.findFirst({
      where: { OR: [{ id }, { verificationId: id }] }
    });

    if (!inst) {
      return res.status(404).json({ success: false, error: { message: 'Instrument not found' } });
    }

    const updated = await prisma.instrument.update({
      where: { id: inst.id },
      data: { verificationStatus: 'REJECTED' }
    });

    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error('Error rejecting verification:', error);
    return res.status(500).json({ success: false, error: { message: 'Rejection failed.' } });
  }
};
