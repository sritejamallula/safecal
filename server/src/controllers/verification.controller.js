import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVerificationById = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const cleanId = verificationId ? verificationId.trim() : '';

    if (!cleanId) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Verification ID parameter is required.' }
      });
    }

    // Convert variations of slashes and hyphens for certificate/ID lookups
    const slashVersion = cleanId.replace(/-/g, '/');
    const hyphenVersion = cleanId.replace(/\//g, '-');

    const instrument = await prisma.instrument.findFirst({
      where: {
        OR: [
          { verificationId: { contains: cleanId } },
          { verificationId: { contains: hyphenVersion } },
          { verificationId: { contains: slashVersion } },
          { certificateNumber: { contains: cleanId } },
          { certificateNumber: { contains: slashVersion } },
          { certificateNumber: { contains: hyphenVersion } },
          { registrationNo: { contains: cleanId } },
          { importerName: { contains: cleanId } },
          { ownerName: { contains: cleanId } },
          { businessName: { contains: cleanId } },
          { serialNumber: { contains: cleanId } },
          { id: { contains: cleanId } }
        ]
      }
    });

    if (!instrument) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: `Verification record not found for query "${cleanId}".`
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: instrument
    });
  } catch (error) {
    console.error('Error fetching verification record:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unable to connect to verification service.' }
    });
  }
};

export const getVerificationByCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.params;
    const cleanCert = certificateNumber ? certificateNumber.trim() : '';
    const slashVersion = cleanCert.replace(/-/g, '/');
    const hyphenVersion = cleanCert.replace(/\//g, '-');

    const instrument = await prisma.instrument.findFirst({
      where: {
        OR: [
          { certificateNumber: { contains: cleanCert } },
          { certificateNumber: { contains: slashVersion } },
          { certificateNumber: { contains: hyphenVersion } },
          { verificationId: { contains: hyphenVersion } },
          { verificationId: { contains: slashVersion } },
          { verificationId: { contains: cleanCert } }
        ]
      }
    });

    if (!instrument) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: `No certificate found matching "${cleanCert}".` }
      });
    }

    return res.status(200).json({
      success: true,
      data: instrument
    });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Server error retrieving certificate.' }
    });
  }
};
