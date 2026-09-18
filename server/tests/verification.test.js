import http from 'http';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function runAcceptanceTest() {
  console.log('🧪 Starting Acceptance Test: Importer Certificate Database Record Match...\n');

  try {
    // 1. Manual Search Test
    const testId = 'IMP-MH-162-2026';
    console.log(`Step 1: Testing Manual Search API -> GET /api/verification/${testId}`);
    const manualRes = await makeRequest(`/api/verification/${testId}`);
    if (manualRes.status !== 200 || !manualRes.body.success) {
      throw new Error(`Manual search failed with status ${manualRes.status}`);
    }
    const recordA = manualRes.body.data;
    console.log(`   ✓ Manual Search returned record: importerName="${recordA.importerName}", certNo=${recordA.certificateNumber}, regNo=${recordA.registrationNo}`);

    // 2. Extract verification URL & ID from record
    const qrUrl = recordA.qrVerificationUrl;
    const extractedId = qrUrl.split('/').pop();
    console.log(`   ✓ Extracted QR Verification ID from URL: ${extractedId}`);

    // 3. QR Scan Test
    console.log(`\nStep 2: Testing QR Scan API -> GET /api/verification/${extractedId}`);
    const qrRes = await makeRequest(`/api/verification/${extractedId}`);
    if (qrRes.status !== 200 || !qrRes.body.success) {
      throw new Error(`QR Scan lookup failed with status ${qrRes.status}`);
    }
    const recordB = qrRes.body.data;
    console.log(`   ✓ QR Scan returned record: importerName="${recordB.importerName}", certNo=${recordB.certificateNumber}, regNo=${recordB.registrationNo}`);

    // 4. Assert 100% Identical Database Record
    console.log('\nStep 3: Comparing Manual Search Record (A) vs QR Scan Record (B)...');
    const isIdMatch = recordA.verificationId === recordB.verificationId;
    const isCertMatch = recordA.certificateNumber === recordB.certificateNumber;
    const isOwnerMatch = recordA.importerName === recordB.importerName;
    const isSourceMatch = recordA.sourceType === recordB.sourceType;

    if (isIdMatch && isCertMatch && isOwnerMatch && isSourceMatch) {
      console.log('✅ ACCEPTANCE TEST PASSED: Manual Search Record === QR Scan Record (100% Authentic Importer Certificate Single Source of Truth)');
      process.exit(0);
    } else {
      console.error('❌ ACCEPTANCE TEST FAILED: Mismatch detected between Manual Search & QR Scan records!');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Acceptance Test Error:', error.message);
    console.log('💡 Note: Ensure backend server is running on http://localhost:5000 before executing test.');
    process.exit(1);
  }
}

runAcceptanceTest();
