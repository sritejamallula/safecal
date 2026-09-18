# SafeCal — Statutory Legal Metrology Verification Portal

> **Official Portal Data Source**: [Certificates of Importers of Weights & Measures Portal](https://share.google/apFisFMgU03PV6rgr)

---

## 1. Executive Summary

**SafeCal** is a full-stack statutory legal metrology verification platform built under **The Legal Metrology Act, 2009** and **The Legal Metrology (General) Rules, 2011**. It provides an end-to-end digital infrastructure connecting **Consumers**, **Business Importers**, **Statutory Inspectors**, and **State Metrology Controllers**.

Key capabilities:
- **Tamper-Evident QR Code Verification**: WebRTC camera scanner and QR decoding.
- **Ultra-Flexible Search Engine**: Case-insensitive fuzzy matching supporting slashes, hyphens, registration codes (IEC/PAN), owner names, and serial numbers.
- **Single Source of Truth Database**: 100% data parity between QR code scanning, manual searching, statutory certificate views, and inspector dashboards.
- **Complete Portal Integration**: Ingests all 163 authentic statutory importer certificates across all years.

---

## 2. System Architecture

```
OFFICIAL PORTAL DATASET (163 Importer Records)
                  ↓
       PRISMA ORM & SQLITE DATABASE
                  ↓
  EXPRESS REST API (/api/verification/:id)
     ↙            ↓            ↘
MANUAL SEARCH   QR SCANNER   STATUTORY CERTIFICATE
```

- **Single Source of Truth**: All verification interfaces query the identical backend database record endpoint (`/api/verification/:verificationId`).
- **HashRouter Client Navigation**: Implements client-side hash routing (`/#/verify/...`) for 100% reliable deployment on static hosts like GitHub Pages.

---

## 3. Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, React Router DOM (`HashRouter`).
- **Backend API**: Node.js, Express, Prisma ORM, SQLite Database.
- **QR Engine**: WebRTC MediaStreams API, HTML5 Canvas QR parser.

---

## 4. GitHub Pages Live Deployment

- 🌐 **Live Website**: [https://sritejamallula.github.io/safecal/#/](https://sritejamallula.github.io/safecal/#/)
- 📦 **GitHub Repository**: [https://github.com/sritejamallula/safecal](https://github.com/sritejamallula/safecal)

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js v18+ & npm

### Installation
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Running Local Servers
```bash
# Terminal 1: Start Express Backend API (Port 5000)
node server/src/index.js

# Terminal 2: Start Vite Frontend Dev Server (Port 3000)
npm run dev
```

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/health`

---

## 6. License

Certified under Legal Metrology Regulations © 2026 SafeCal Statutory Verification Portal. All rights reserved.
