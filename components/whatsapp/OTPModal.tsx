"use client";

import { useState } from "react";
import { X, Loader2, Trash2 } from "lucide-react";

interface OTPModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (otp: string) => Promise<void>;
    deviceName: string;
}

export default function OTPModal({ isOpen, onClose, onConfirm, deviceName }: OTPModalProps) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onConfirm(otp);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-300">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Trash2 className="w-6 h-6 text-red-600" />
                        Verify Deletion
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-4">
                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                        An OTP code has been sent to the WhatsApp number associated with <strong>{deviceName}</strong>.
                        Please enter it below to confirm deletion.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                                OTP Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                required
                                autoFocus
                                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-red-500 transition-all outline-none text-slate-900 dark:text-white font-mono text-center text-2xl tracking-[0.5em]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !otp}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 active:scale-95 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Trash2 className="w-5 h-5" />
                            )}
                            <span>Confirm Permanent Deletion</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full mt-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
