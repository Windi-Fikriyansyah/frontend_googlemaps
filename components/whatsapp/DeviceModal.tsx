"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Save, Smartphone, Key } from "lucide-react";
import { createDevice, updateDevice } from "@/lib/api";
import { WhatsAppDevice } from "@/types";
import { toast } from "sonner";

interface DeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    editingDevice: WhatsAppDevice | null;
}

export default function DeviceModal({ isOpen, onClose, onSuccess, editingDevice }: DeviceModalProps) {
    const [name, setName] = useState("");
    const [device, setDevice] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingDevice) {
            setName(editingDevice.name);
            setDevice(editingDevice.device_number || "");
        } else {
            setName("");
            setDevice("");
        }
    }, [editingDevice, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const promise = editingDevice
            ? updateDevice(editingDevice.id, { name })
            : createDevice({ name, device });

        toast.promise(promise, {
            loading: editingDevice ? 'Updating device...' : 'Adding device...',
            success: () => {
                onSuccess();
                onClose();
                return editingDevice ? 'Device updated successfully' : 'Device added successfully';
            },
            error: (err: any) => err.response?.data?.detail || "Failed to save device",
        });

        promise.finally(() => setLoading(false));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {editingDevice ? "Edit Device" : "Add New Device"}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            {editingDevice ? "Update your device configuration" : "Register a new WhatsApp account via Fonnte"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-blue-600" />
                                Device Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Sales Account - Windi"
                                required
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Key className="w-4 h-4 text-blue-600" />
                                Device Number (Phone)
                            </label>
                            <input
                                type="text"
                                value={device}
                                onChange={(e) => setDevice(e.target.value)}
                                placeholder="e.g. 08123456789"
                                required
                                disabled={!!editingDevice}
                                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-900 dark:text-white font-mono text-sm disabled:opacity-50"
                            />
                            <p className="text-[11px] text-slate-400 italic">
                                {editingDevice
                                    ? "Device number cannot be changed"
                                    : "This will automatically create a device on Fonnte"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            <span>{editingDevice ? "Update Device" : "Add Device"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
