"use client";

import { useState, useEffect } from "react";
import { X, Loader2, RefreshCw, QrCode } from "lucide-react";
import { getDeviceQR, getDeviceStatus } from "@/lib/api";
import { toast } from "sonner";

interface QRScannerProps {
    deviceId: number;
    onClose: () => void;
    onConnected: () => void;
}

export default function QRScanner({ deviceId, onClose, onConnected }: QRScannerProps) {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQR = async () => {
        setLoading(true);
        try {
            const response = await getDeviceQR(deviceId);
            if (response.data.url) {
                let qrData = response.data.url;
                // If it's a base64 string (doesn't start with http), prepend the data URI prefix
                if (qrData && !qrData.startsWith('http') && !qrData.startsWith('data:')) {
                    qrData = `data:image/png;base64,${qrData}`;
                }
                setQrCode(qrData);
            } else if (response.data.status === true && (response.data.message === "already connected" || response.data.message === "device already connected")) {
                toast.success("Device connected successfully!");
                onConnected();
            }
        } catch (error) {
            console.error("Failed to fetch QR:", error);
            toast.error("Failed to fetch QR code");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQR();

        const interval = setInterval(async () => {
            try {
                const response = await getDeviceStatus(deviceId);
                // Adjust based on Fonnte's response structure
                if (response.data.status === true && response.data.device_status === "connect") {
                    clearInterval(interval);
                    toast.success("Device connected successfully!");
                    onConnected();
                }
            } catch (error) {
                console.error("Polling error:", error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [deviceId]);

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-300">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <QrCode className="w-6 h-6 text-blue-600" />
                        Scan WhatsApp QR
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <div className="p-8 pt-4 flex flex-col items-center text-center">
                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm max-w-xs">
                        Open WhatsApp on your phone, go to Linked Devices, and scan this QR code to connect.
                    </p>

                    <div className="relative w-64 h-64 bg-slate-50 dark:bg-slate-950 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 overflow-hidden group">
                        {loading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generating QR</span>
                            </div>
                        ) : qrCode ? (
                            <img src={qrCode} alt="WhatsApp QR Code" className="w-full h-full object-contain p-4" />
                        ) : (
                            <div className="text-red-500 text-sm font-bold px-8">
                                Failed to load QR. Make sure your token is correct and device is logged out.
                            </div>
                        )}

                        {!loading && qrCode && (
                            <button
                                onClick={fetchQR}
                                className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 shadow-lg rounded-full text-blue-600 hover:scale-110 transition-transform"
                                title="Refresh QR"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 py-3 rounded-2xl">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Waiting for connection...</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-colors"
                    >
                        Cancel Scanning
                    </button>
                </div>
            </div>
        </div>
    );
}
