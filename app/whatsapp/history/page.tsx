"use client";

import { useState, useEffect, useMemo } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import api from "@/lib/api";
import {
    History,
    Search as SearchIcon,
    CheckCircle2,
    Clock,
    AlertCircle,
    RefreshCcw,
    Send
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

interface MessageHistory {
    id: string;
    target: string;
    message: string;
    status: string;
    state: string | null;
    stateid: string | null;
    created_at: string;
}

export default function MessageHistoryPage() {
    const [history, setHistory] = useState<MessageHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filterText, setFilterText] = useState("");
    const router = useRouter();

    // Refresh status from Fonnte API
    const refreshStatus = async () => {
        setRefreshing(true);
        try {
            await api.post("/whatsapp/refresh-status");
        } catch (err: any) {
            console.warn("Status refresh warning:", err.response?.data?.detail || err.message);
        } finally {
            setRefreshing(false);
        }
    };

    const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/whatsapp/history");
            setHistory(response.data);
        } catch (err: any) {
            console.error("Fetch history error:", err);
            if (err.response?.status === 401) {
                router.push("/login");
            } else {
                setError(err.response?.data?.detail || "Gagal memuat history pesan.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await refreshStatus(); // Refresh status from Fonnte first
            await fetchHistory();  // Then fetch updated history
        };
        loadData();
    }, []);

    const filteredItems = useMemo(() => {
        return history.filter(
            item =>
                item.target.toLowerCase().includes(filterText.toLowerCase()) ||
                item.message.toLowerCase().includes(filterText.toLowerCase()) ||
                item.status.toLowerCase().includes(filterText.toLowerCase())
        );
    }, [history, filterText]);

    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase();
        if (s === "sent") {
            return (
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-200/50 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sent</span>
                </div>
            );
        }
        if (["pending", "waiting", "scheduled"].includes(s)) {
            return (
                <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full border border-amber-200/50 text-amber-700 dark:text-amber-400 font-bold text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{status}</span>
                </div>
            );
        }
        if (["invalid", "expired", "unreachable", "failed"].includes(s)) {
            return (
                <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1 rounded-full border border-rose-200/50 text-rose-700 dark:text-rose-400 font-bold text-xs">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{status}</span>
                </div>
            );
        }
        return (
            <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full border border-blue-200/50 text-blue-700 dark:text-blue-400 font-bold text-xs">
                <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>{status}</span>
            </div>
        );
    };

    const columns = [
        {
            name: 'Recipient',
            selector: (row: MessageHistory) => row.target,
            sortable: true,
            width: '180px',
            cell: (row: MessageHistory) => (
                <div className="font-medium text-slate-900 dark:text-slate-100 py-4">
                    {row.target}
                </div>
            ),
        },
        {
            name: 'Message',
            selector: (row: MessageHistory) => row.message,
            sortable: true,
            grow: 3,
            wrap: true,
            cell: (row: MessageHistory) => (
                <div className="text-sm text-slate-600 dark:text-slate-400 py-4 whitespace-pre-wrap line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                    {row.message}
                </div>
            ),
        },
        {
            name: 'Status',
            selector: (row: MessageHistory) => row.status,
            sortable: true,
            width: '140px',
            cell: (row: MessageHistory) => (
                <div className="py-4">
                    {getStatusBadge(row.status)}
                </div>
            ),
        },
        {
            name: 'Date',
            selector: (row: MessageHistory) => row.created_at,
            sortable: true,
            width: '200px',
            cell: (row: MessageHistory) => (
                <div className="text-xs text-slate-500 py-4">
                    {format(new Date(row.created_at), "dd MMM yyyy, HH:mm", { locale: localeID })}
                </div>
            ),
        },
    ];

    const customStyles: TableStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: 'rgba(226, 232, 240, 1)',
                backgroundColor: 'rgba(248, 250, 252, 0.5)',
            },
        },
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'rgba(71, 85, 105, 1)',
            },
        },
        rows: {
            style: {
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'rgba(241, 245, 249, 1)',
                },
            },
        },
    };

    return (
        <div className="space-y-8 px-4 pb-12 pt-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
                        <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">History Pesan</h1>
                        <p className="text-sm text-slate-500">Lacak status pengiriman pesan WhatsApp Anda</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Cari target atau pesan..."
                            className="pl-9 h-11 border-slate-200 bg-white dark:bg-slate-900 rounded-xl"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={async () => {
                            await refreshStatus();
                            await fetchHistory();
                        }}
                        variant="outline"
                        size="sm"
                        className="h-11 px-4 gap-2 rounded-xl whitespace-nowrap bg-white border-slate-200 hover:bg-slate-50"
                        disabled={refreshing || loading}
                    >
                        <RefreshCcw className={`w-4 h-4 ${(refreshing || loading) ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Updating...' : 'Refresh'}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="max-w-6xl mx-auto p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    {error}
                </div>
            )}

            {/* Results DataTable */}
            {!loading && history.length > 0 && (
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        customStyles={customStyles}
                        noDataComponent={
                            <div className="p-12 text-center text-slate-500">
                                <SearchIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p>Tidak ada data yang cocok dengan pencarian Anda.</p>
                            </div>
                        }
                    />
                </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
                <div className="max-w-6xl mx-auto space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-8 w-48 rounded-lg" />
                        <Skeleton className="h-11 w-32 rounded-xl" />
                    </div>
                    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-5 border-b border-slate-50 dark:border-slate-900 flex gap-4">
                                <Skeleton className="h-12 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && history.length === 0 && !error && (
                <div className="max-w-4xl mx-auto text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum ada history pesan</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">Anda belum pernah mengirim broadcast melalui platform ini. Mulai broadcast sekarang!</p>
                    <Button onClick={() => router.push("/whatsapp/broadcast")} className="rounded-xl px-8 gap-2">
                        <Send className="w-4 h-4" />
                        Mulai Broadcast
                    </Button>
                </div>
            )}
        </div>
    );
}
