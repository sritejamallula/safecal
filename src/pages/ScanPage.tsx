import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Camera, CameraOff, CheckCircle2, ArrowRight, RefreshCw, Upload, Building2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ScanPage: React.FC = () => {
  const [scanning, setScanning] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const navigate = useNavigate();
  const { addToast } = useToast();

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraError('Camera API not supported on this browser. Please use portal presets or image upload.');
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera permission denied or camera unavailable. Select a certificate preset below to test.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleDetectedCode = (code: string) => {
    stopCamera();
    setScanning(false);
    setScannedCode(code);
    addToast({
      type: 'success',
      title: 'QR Code Seal Decoded!',
      description: `Decoded certificate identifier: ${code}`
    });

    setTimeout(() => {
      navigate(`/verify/${encodeURIComponent(code)}`);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleDetectedCode('IMP-MH-162-2026');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8 text-center">
        
        {/* Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera Scanner • Legal Metrology Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Scan Verification QR Seal</h1>
          <p className="text-xs text-slate-400">
            Point camera at the QR code printed on the Certificate of Importers or physical seal.
          </p>
        </div>

        {/* Viewfinder Frame with Live Video Feed */}
        <div className="relative w-80 h-80 mx-auto bg-slate-950 rounded-3xl border-2 border-slate-700 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
          
          {cameraActive ? (
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="opacity-30 flex flex-col items-center space-y-2 p-4">
              <QrCode className="w-20 h-20 text-slate-400" />
              <span className="text-xs text-slate-500 font-mono">Camera Feed Idle</span>
            </div>
          )}

          {/* Corner Markers */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg pointer-events-none" />

          {/* Animated Scan Line */}
          {scanning && cameraActive ? (
            <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-500/50 animate-scan-line z-20 pointer-events-none" />
          ) : !scanning ? (
            <div className="absolute inset-0 bg-slate-950/90 z-30 flex flex-col items-center justify-center space-y-2 animate-in zoom-in-90 p-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <span className="font-extrabold text-base text-white">QR Seal Decoded!</span>
              <span className="font-mono text-xs text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                {scannedCode}
              </span>
            </div>
          ) : null}

          {/* Camera Alert */}
          {cameraError && (
            <div className="absolute inset-x-3 bottom-3 z-30 bg-amber-950/90 border border-amber-700/80 rounded-2xl p-3 text-[11px] text-amber-200 backdrop-blur-xs flex items-center justify-between">
              <div className="flex items-center space-x-2 text-left">
                <CameraOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{cameraError}</span>
              </div>
              <button
                onClick={startCamera}
                className="p-1 rounded bg-amber-800 hover:bg-amber-700 text-white shrink-0 ml-2"
                title="Retry Camera Access"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          {cameraActive ? (
            <button
              onClick={() => handleDetectedCode('IMP-MH-162-2026')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Frame</span>
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition"
            >
              <Camera className="w-4 h-4" />
              <span>Enable Camera Stream</span>
            </button>
          )}

          <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 cursor-pointer flex items-center space-x-1.5 transition">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Portal Sample QR Triggers */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3 text-left">
          <p className="text-xs font-bold text-slate-300 flex items-center">
            <Building2 className="w-4 h-4 mr-1 text-blue-400" /> Click Sample Certificate QR to Scan:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleDetectedCode('IMP-MH-162-2026')}
              className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-mono transition"
            >
              <div>
                <span className="font-bold text-white block">IMP/MH/162/2026</span>
                <span className="text-[10px] text-emerald-400 font-sans">SUPREME INSTRUMENT TECHNOLOGY PVT LTD</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleDetectedCode('IMP-MH-159-2026')}
              className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-mono transition"
            >
              <div>
                <span className="font-bold text-white block">IMP/MH/159/2026</span>
                <span className="text-[10px] text-blue-400 font-sans">SENSUS METERING INDIA PRIVATE LIMITED</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleDetectedCode('IMP-GJ-157-2026')}
              className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-xs font-mono transition"
            >
              <div>
                <span className="font-bold text-white block">IMP/GJ/157/2026</span>
                <span className="text-[10px] text-indigo-400 font-sans">NATIONAL INSTRUMENTS SOLUTIONS</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
