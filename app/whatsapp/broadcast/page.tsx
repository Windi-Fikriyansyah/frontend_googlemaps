"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Lead, MessageTemplate } from "@/types";
import {
    Send,
    Users,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Search as SearchIcon,
    Smartphone,
    RefreshCw
} from "lucide-react";
import { Button, Input } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function BroadcastPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [devices, setDevices] = useState<{ id: number; name: string; status: string }[]>([]);
    const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<number | "">("");
    const [selectedDevice, setSelectedDevice] = useState<number | "">("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [leadsRes, templatesRes, devicesRes] = await Promise.all([
                    api.get("/leads/saved"),
                    api.get("/whatsapp/templates"),
                    api.get("/whatsapp/devices")
                ]);
                setLeads(leadsRes.data);
                setTemplates(templatesRes.data);
                setDevices(devicesRes.data);

                // Set default connected device if available
                const connectedDevice = devicesRes.data.find((d: any) => d.status === "connected");
                if (connectedDevice) {
                    setSelectedDevice(connectedDevice.id);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSelectAll = () => {
        if (selectedLeads.length === filteredLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(filteredLeads.map(l => l.id));
        }
    };

    const handleToggleLead = (id: number) => {
        setSelectedLeads(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        );
    };

    const handleSend = async () => {
        if (selectedLeads.length === 0 || !selectedTemplate || !selectedDevice) return;

        setSending(true);
        setStatus(null);
        try {
            const res = await api.post("/whatsapp/broadcast", {
                lead_ids: selectedLeads,
                template_id: selectedTemplate,
                device_id: selectedDevice,
            });

            if (res.data.fonnte_response?.status) {
                toast.success(`Broadcasting...`, {
                    description: `Successfully queued ${res.data.targets_count} messages!`
                });
                setSelectedLeads([]);
            } else {
                const reason = res.data.fonnte_response?.reason || "Failed to send messages. Check your device connection.";
                toast.error("Bridge Error", { description: reason });
                setStatus({ type: 'error', message: reason });
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.detail || "An unexpected error occurred.";
            if (err.response?.status === 403) {
                toast.error("Insufficient Credits", {
                    description: "Please top up your credits to send WhatsApp messages.",
                });
            } else {
                toast.error(errorMessage);
            }
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setSending(false);
        }
    };

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 px-4 pb-12 pt-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit">
                        <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">WhatsApp Broadcast</h1>
                        <p className="text-sm text-slate-500">Send mass messages to your saved leads</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side: Lead Selection */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h2 className="font-bold flex items-center gap-2">
                                    <Users className="w-5 h-5 text-slate-400" />
                                    Select Leads ({selectedLeads.length})
                                </h2>
                                <div className="relative w-full md:w-64">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        placeholder="Filter leads..."
                                        className="pl-9 h-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="max-h-[500px] overflow-y-auto">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-slate-50 dark:bg-slate-950 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 w-10">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-slate-300"
                                                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                                                    onChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-4 py-4">Name</th>
                                            <th className="px-4 py-4">Phone</th>
                                            <th className="px-4 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                        {loading ? (
                                            [1, 2, 3, 4, 5].map(i => (
                                                <tr key={i}><td colSpan={4} className="px-6 py-4"><Skeleton className="h-6 w-full" /></td></tr>
                                            ))
                                        ) : filteredLeads.length > 0 ? (
                                            filteredLeads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-slate-300"
                                                            checked={selectedLeads.includes(lead.id)}
                                                            onChange={() => handleToggleLead(lead.id)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{lead.name}</div>
                                                        <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{lead.address}</div>
                                                    </td>
                                                    <td className="px-4 py-4 text-xs font-mono text-slate-500">
                                                        {lead.phone || <span className="text-red-400 italic">No number</span>}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        {lead.phone ? (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-950/30 text-green-600 border border-green-100 dark:border-green-900/30">READY</span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-100 dark:border-red-900/30">SKIPPED</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">
                                                    No saved leads found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Configuration & Send */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none">
                            <h2 className="font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-slate-400" />
                                Message Config
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                                        <Smartphone className="w-4 h-4 text-slate-400" />
                                        Select Device
                                    </label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        value={selectedDevice}
                                        onChange={(e) => setSelectedDevice(e.target.value ? Number(e.target.value) : "")}
                                    >
                                        <option value="">Select a device...</option>
                                        {devices.map(d => (
                                            <option key={d.id} value={d.id}>
                                                {d.name} ({d.status})
                                            </option>
                                        ))}
                                    </select>
                                    {devices.length === 0 && (
                                        <p className="text-[10px] text-red-500 mt-1 italic">No devices found. Please add a device first.</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2">Pick a Template</label>
                                    <select
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        value={selectedTemplate}
                                        onChange={(e) => setSelectedTemplate(e.target.value ? Number(e.target.value) : "")}
                                    >
                                        <option value="">Select a template...</option>
                                        {templates.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedTemplate && (
                                    <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Preview</div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                                            {templates.find(t => t.id === selectedTemplate)?.content}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-8">
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl shadow-lg shadow-green-500/25 flex items-center justify-center gap-3 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
                                        disabled={selectedLeads.length === 0 || !selectedTemplate || !selectedDevice || sending}
                                        onClick={handleSend}
                                    >
                                        {sending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send to {selectedLeads.length} Leads
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {status && (
                            <div className={`p-4 rounded-2xl border flex gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                                <div className="text-sm font-medium">{status.message}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
