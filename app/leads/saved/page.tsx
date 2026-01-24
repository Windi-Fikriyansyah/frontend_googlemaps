"use client";

import { useState, useEffect, useMemo } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import api from "@/lib/api";
import { Lead } from "@/types";
import {
    Target,
    Layers,
    FileText,
    Search as SearchIcon,
    ExternalLink,
    Phone,
    Globe,
    Star,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterText, setFilterText] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchSavedLeads = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await api.get("/leads/saved");
                setLeads(response.data);
            } catch (err: any) {
                console.error("Fetch saved leads error:", err);
                setError(
                    err.response?.data?.detail ||
                    "Gagal memuat data leads. Pastikan Anda sudah login."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSavedLeads();
    }, [router]);

    const filteredItems = useMemo(() => {
        return leads.filter(
            item =>
                item.name.toLowerCase().includes(filterText.toLowerCase()) ||
                item.address.toLowerCase().includes(filterText.toLowerCase()) ||
                (item.category && item.category.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [leads, filterText]);

    const columns = [
        {
            name: 'Business Name',
            selector: (row: Lead) => row.name,
            sortable: true,
            grow: 2,
            cell: (row: Lead) => (
                <div className="py-2">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{row.name}</div>
                    {row.category && (
                        <span className="text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                            {row.category}
                        </span>
                    )}
                </div>
            ),
        },
        {
            name: 'Address',
            selector: (row: Lead) => row.address,
            sortable: true,
            grow: 2,
            wrap: true,
            cell: (row: Lead) => (
                <div className="text-xs text-slate-600 dark:text-slate-400 py-2">
                    {row.address}
                </div>
            ),
        },
        {
            name: 'Contact',
            cell: (row: Lead) => (
                <div className="flex flex-col gap-1 py-2">
                    {row.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                            <Phone className="w-3 h-3 text-blue-500" />
                            {row.phone}
                        </div>
                    )}
                    {row.website && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
                            <Globe className="w-3 h-3" />
                            <a href={row.website} target="_blank" rel="noopener noreferrer">Website</a>
                        </div>
                    )}
                </div>
            ),
        },
        {
            name: 'Rating',
            selector: (row: Lead) => row.rating || 0,
            sortable: true,
            width: '100px',
            cell: (row: Lead) => (
                row.rating ? (
                    <div className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full border border-amber-200/50">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{row.rating}</span>
                    </div>
                ) : <span className="text-slate-400">-</span>
            ),
        },
        {
            name: 'Aksi',
            grow: 0,
            cell: (row: Lead) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.name + ' ' + row.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </Button>
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
                borderTopColor: 'rgba(226, 232, 240, 1)', // slate-200
                backgroundColor: 'rgba(248, 250, 252, 0.5)', // slate-50
            },
        },
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: 'rgba(71, 85, 105, 1)', // slate-600
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
        rows: {
            style: {
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'rgba(241, 245, 249, 1)', // slate-100
                },
            },
        },
    };

    return (
        <div className="space-y-8 px-4 pb-12">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Data Leads</h1>
                        <p className="text-sm text-slate-500">Daftar leads yang tersimpan di akun Anda</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Cari data leads..."
                            className="pl-9 h-10 border-slate-200 bg-white"
                            value={filterText}
                            onChange={e => setFilterText(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="max-w-4xl mx-auto p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    {error}
                </div>
            )}

            {/* Results DataTable */}
            {!loading && leads.length > 0 && (
                <div className="max-w-6xl mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        customStyles={customStyles}
                        noDataComponent={
                            <div className="p-8 text-center text-slate-500">Tidak ada data yang cocok dengan pencarian Anda.</div>
                        }
                    />
                </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
                <div className="max-w-6xl mx-auto space-y-4">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="p-4 border-b border-slate-100 dark:border-slate-900 flex gap-4">
                                <Skeleton className="h-12 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State (Global) */}
            {!loading && leads.length === 0 && !error && (
                <div className="max-w-4xl mx-auto text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium italic">Belum ada data leads yang tersimpan.</p>
                    <button
                        onClick={() => router.push("/leads")}
                        className="mt-4 text-blue-600 hover:underline font-medium"
                    >
                        Cari Leads Sekarang
                    </button>
                </div>
            )}
        </div>
    );
}
