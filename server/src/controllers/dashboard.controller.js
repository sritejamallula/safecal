import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
  try {
    const total = await prisma.instrument.count();
    const verified = await prisma.instrument.count({ where: { verificationStatus: 'VERIFIED' } });
    const pending = await prisma.instrument.count({ where: { verificationStatus: 'PENDING' } });
    const expired = await prisma.instrument.count({ where: { verificationStatus: 'EXPIRED' } });
    const rejected = await prisma.instrument.count({ where: { verificationStatus: 'REJECTED' } });
    const demoCount = await prisma.instrument.count({ where: { sourceType: 'DEMO' } });
    const officialCount = await prisma.instrument.count({ where: { sourceType: 'OFFICIAL_REFERENCE' } });

    return res.status(200).json({
      success: true,
      data: {
        total,
        verified,
        pending,
        expired,
        rejected,
        demoCount,
        officialCount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to retrieve stats.' }
    });
  }
};
