"use client";

import { useEffect, useState } from "react";
import {
    Plus,
    Smartphone,
    RefreshCw,
    Trash2,
    QrCode,
    CheckCircle2,
    XCircle,
    Loader2,
    Settings2,
    LogOut,
    Link as LinkIcon
} from "lucide-react";
import { getDevices, deleteDevice, disconnectDevice, getDeviceStatus } from "@/lib/api";
import { WhatsAppDevice } from "@/types";
import DeviceModal from "@/components/whatsapp/DeviceModal";
import QRScanner from "@/components/whatsapp/QRScanner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function DevicesPage() {
    const [devices, setDevices] = useState<WhatsAppDevice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<WhatsAppDevice | null>(null);
    const [showQR, setShowQR] = useState<{ isOpen: boolean; deviceId: number | null }>({
        isOpen: false,
        deviceId: null
    });

    const fetchDevices = async () => {
        try {
            const response = await getDevices();
            setDevices(response.data);
        } catch (error) {
            console.error("Failed to fetch devices:", error);
            toast.error("Failed to fetch devices");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this device?")) return;

        const promise = deleteDevice(id);

        toast.promise(promise, {
            loading: 'Deleting device...',
            success: () => {
                fetchDevices();
                return 'Device deleted successfully';
            },
            error: (err: any) => err.response?.data?.detail || "Failed to delete device",
        });
    };

    const handleDisconnect = async (id: number) => {
        if (!confirm("Are you sure you want to disconnect this device?")) return;
        const promise = disconnectDevice(id);

        toast.promise(promise, {
            loading: 'Disconnecting device...',
            success: () => {
                fetchDevices();
                return 'Device disconnected successfully';
            },
            error: 'Failed to disconnect device',
        });
    };

    return (
        <div className="space-y-6 px-4 pb-12 pt-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">WhatsApp Devices</h1>
                    <p className="text-slate-500 dark:text-slate-400">Connect and manage your WhatsApp accounts via Fonnte</p>
                </div>
                {!loading && (
                    <button
                        onClick={() => {
                            setSelectedDevice(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 w-full md:w-auto"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Device</span>
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Loading devices...</p>
                </div>
            ) : devices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center px-4">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                        <Smartphone className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Devices Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                        You haven't added any WhatsApp devices yet. Add a device to start sending automated messages.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                        Add your first device
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {devices.map((device) => (
                        <div
                            key={device.id}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                                        device.status === "connected"
                                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                    )}>
                                        <Smartphone className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            {device.name}
                                        </h3>
                                        <p className="text-xs text-slate-400 font-mono mt-0.5">{device.device_number}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {device.status === "connected" ? (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    CONNECTED
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                                    <XCircle className="w-3 h-3" />
                                                    DISCONNECTED
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedDevice(device);
                                            setIsModalOpen(true);
                                        }}
                                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                        title="Edit Device"
                                    >
                                        <Settings2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(device.id)}
                                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                        title="Delete Device"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {device.status !== "connected" ? (
                                    <button
                                        onClick={() => setShowQR({ isOpen: true, deviceId: device.id })}
                                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-blue-500/10 active:scale-95"
                                    >
                                        <LinkIcon className="w-5 h-5" />
                                        Connect WhatsApp
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDisconnect(device.id)}
                                        className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-bold py-3 rounded-2xl transition-all border border-red-100 dark:border-red-900/30 active:scale-95"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Disconnect Device
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <DeviceModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedDevice(null);
                }}
                onSuccess={fetchDevices}
                editingDevice={selectedDevice}
            />

            {showQR.isOpen && showQR.deviceId && (
                <QRScanner
                    deviceId={showQR.deviceId}
                    onClose={() => setShowQR({ isOpen: false, deviceId: null })}
                    onConnected={() => {
                        setShowQR({ isOpen: false, deviceId: null });
                        fetchDevices();
                    }}
                />
            )}
        </div>
    );
}
