"use client";
import { useState, useEffect } from "react";

import { Lead } from "@/types";
import { Button } from "./ui/primitives";
import { ExternalLink, Phone, Download, Globe, Star, Save, CheckCircle, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";
import DataTable, { TableStyles } from "react-data-table-component";
import Papa from "papaparse";
import * as XLSX from 'xlsx';

interface LeadTableProps {
    leads: Lead[];
}

export default function LeadTable({ leads }: LeadTableProps) {
    const [saving, setSaving] = useState<number | "all" | null>(null);
    const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("General");
    const [leadToSave, setLeadToSave] = useState<number | "all" | null>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const initialSaved = new Set(leads.filter(l => l.is_saved).map(l => l.id));
        setSavedIds(initialSaved);
    }, [leads]);

    const openSaveModal = (leadId: number | "all") => {
        setLeadToSave(leadId);
        setShowModal(true);
    };

    const confirmSave = async () => {
        if (!leadToSave) return;

        setSaving(leadToSave);
        setShowModal(false);

        try {
            if (leadToSave === "all") {
                const leadIds = leads.map(l => l.id);
                await api.post("/leads/save-batch", {
                    lead_ids: leadIds,
                    category: currentCategory
                });
                setSavedIds(new Set([...Array.from(savedIds), ...leadIds]));
                toast.success(`Success! ${leadIds.length} leads saved to ${currentCategory}.`);
            } else {
                await api.post("/leads/save", {
                    lead_id: leadToSave,
                    category: currentCategory
                });
                setSavedIds(prev => {
                    const updated = new Set(prev);
                    updated.add(leadToSave as number);
                    return updated;
                });
                toast.success(`Lead saved to ${currentCategory}.`);
            }
        } catch (err: any) {
            console.error("Failed to save lead:", err);
            toast.error(err.response?.data?.detail || "Gagal menyimpan data.");
        } finally {
            setSaving(null);
            setLeadToSave(null);
        }
    };

    const exportToExcel = () => {
        const data = leads.map((lead) => ({
            "Name": lead.name,
            "Address": lead.address,
            "Google Maps Link": `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + ' ' + (lead.address || ''))}`,
            "Phone": lead.phone || "-",
            "Website": lead.website || "-",
            "Rating": lead.rating || "-",
            "Category": lead.category || "General",
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

        // Generate filename
        const filename = `leads_export_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Export file
        XLSX.writeFile(workbook, filename);
        toast.success(`Success! Data exported to ${filename}.`);
    };

    const columns = [
        {
            name: 'Business Name',
            selector: (row: Lead) => row.name,
            sortable: true,
            grow: 2,
            cell: (row: Lead) => (
                <div className="py-2">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{row.name}</div>
                </div>
            ),
        },
        {
            name: 'Address',
            selector: (row: Lead) => row.address,
            sortable: true,
            grow: 2,
            wrap: true,
            omit: isMobile,
            cell: (row: Lead) => (
                <div className="text-xs text-slate-600 dark:text-slate-400 py-2">
                    {row.address}
                </div>
            ),
        },
        {
            name: 'Contact',
            omit: isMobile,
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
            omit: isMobile,
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
            grow: 1,
            cell: (row: Lead) => (
                <div className="flex items-center justify-end gap-2">
                    {savedIds.has(row.id) ? (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded-md border border-green-200/50">
                            <CheckCircle className="w-3 h-3" />
                            Tersimpan
                        </div>
                    ) : (
                        <Button
                            onClick={() => openSaveModal(row.id)}
                            disabled={saving === row.id}
                            variant="outline"
                            size="sm"
                            className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                            {saving === row.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Save className="w-3 h-3" />
                            )}
                            <span className="ml-1 text-[10px]">Simpan</span>
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.name + ' ' + row.address)}`} target="_blank" rel="noopener noreferrer">
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
                    borderBottomColor: 'rgba(241, 245, 249, 1)',
                },
            },
        },
    };

    if (leads.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Search Results ({leads.length} found)
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {!leads.every(l => savedIds.has(l.id)) && (
                        <Button
                            onClick={() => openSaveModal("all")}
                            disabled={saving === "all"}
                            variant="default"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                        >
                            {saving === "all" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Simpan Semua
                        </Button>
                    )}
                    {leads.length > 0 && (
                        <Button
                            onClick={exportToExcel}
                            variant="outline"
                            className="flex items-center gap-2 border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/20 text-green-600 dark:text-green-400 w-full sm:w-auto font-bold"
                        >
                            <Download className="w-4 h-4" />
                            Export Excel
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <DataTable
                    columns={columns}
                    data={leads}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    customStyles={customStyles}
                />
            </div>

            {/* Save Category Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Save className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Simpan ke Kategori</h3>
                            <p className="text-slate-500 mb-8">Pilih atau buat kategori baru untuk menyimpan data ini agar lebih rapi.</p>

                            <div className="space-y-4 text-left">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={currentCategory}
                                    onChange={(e) => setCurrentCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                                    placeholder="Contoh: Restoran Jakarta, Prospek Hot..."
                                    autoFocus
                                />

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {["General", "Hot Leads", "Follow Up", "Closed"].map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setCurrentCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${currentCategory === cat
                                                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-300"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                            <Button
                                variant="outline"
                                className="flex-1 rounded-xl h-12 font-bold"
                                onClick={() => setShowModal(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="default"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-blue-500/25"
                                onClick={confirmSave}
                            >
                                Simpan Data
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
