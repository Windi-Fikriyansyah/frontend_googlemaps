"use client";
import { useState, useEffect } from "react";

import { Lead } from "@/types";
import { Button } from "./ui/primitives";
import { ExternalLink, Phone, Download, Globe, Star, Save, CheckCircle, Loader2 } from "lucide-react";
import api from "@/lib/api";
import DataTable, { TableStyles } from "react-data-table-component";
import Papa from "papaparse";

interface LeadTableProps {
    leads: Lead[];
}

export default function LeadTable({ leads }: LeadTableProps) {
    const [saving, setSaving] = useState<number | "all" | null>(null);
    const [savedIds, setSavedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        const initialSaved = new Set(leads.filter(l => l.is_saved).map(l => l.id));
        setSavedIds(initialSaved);
    }, [leads]);

    const handleSave = async (leadId: number) => {
        setSaving(leadId);
        try {
            await api.post("/leads/save", { lead_id: leadId });
            setSavedIds(prev => {
                const updated = new Set(prev);
                updated.add(leadId);
                return updated;
            });
        } catch (err) {
            console.error("Failed to save lead:", err);
            alert("Failed to save lead");
        } finally {
            setSaving(null);
        }
    };

    const handleSaveAll = async () => {
        setSaving("all");
        try {
            const leadIds = leads.map(l => l.id);
            await api.post("/leads/save-batch", { lead_ids: leadIds });
            setSavedIds(new Set([...Array.from(savedIds), ...leadIds]));
        } catch (err) {
            console.error("Failed to save all leads:", err);
            alert("Failed to save leads");
        } finally {
            setSaving(null);
        }
    };

    const exportToCSV = () => {
        const data = leads.map((lead) => ({
            Name: lead.name,
            Address: lead.address,
            Phone: lead.phone || "N/A",
            Website: lead.website || "N/A",
            Rating: lead.rating || "N/A",
            Category: lead.category || "N/A",
        }));

        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            onClick={() => handleSave(row.id)}
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
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Search Results ({leads.length} found)
                </h3>
                <div className="flex items-center gap-3">
                    {!leads.every(l => savedIds.has(l.id)) && (
                        <Button
                            onClick={handleSaveAll}
                            disabled={saving === "all"}
                            variant="default"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {saving === "all" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Simpan Semua
                        </Button>
                    )}
                    <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/20 text-green-600 dark:text-green-400">
                        <Download className="w-4 h-4" />
                        Export to CSV
                    </Button>
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
        </div>
    );
}
