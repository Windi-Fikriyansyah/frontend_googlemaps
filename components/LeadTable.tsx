"use client";

import { Lead } from "@/types";
import { Button } from "./ui/primitives";
import { ExternalLink, Phone, Download, Globe, Star } from "lucide-react";
import Papa from "papaparse";

interface LeadTableProps {
    leads: Lead[];
}

export default function LeadTable({ leads }: LeadTableProps) {
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

    if (leads.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    Search Results ({leads.length} found)
                </h3>
                <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2 border-green-500/50 hover:bg-green-50 dark:hover:bg-green-950/20 text-green-600 dark:text-green-400">
                    <Download className="w-4 h-4" />
                    Export to CSV
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 capitalize">Business Name</th>
                                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 capitalize">Address</th>
                                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 capitalize">Contact</th>
                                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 capitalize text-center">Rating</th>
                                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-400 capitalize text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {leads.map((lead, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-slate-900 dark:text-slate-100">{lead.name}</div>
                                        {lead.category && (
                                            <span className="text-[10px] uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                                                {lead.category}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                                        {lead.address}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            {lead.phone && (
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                                    <Phone className="w-3 h-3 text-blue-500" />
                                                    {lead.phone}
                                                </div>
                                            )}
                                            {lead.website && (
                                                <div className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline">
                                                    <Globe className="w-3 h-3" />
                                                    <a href={lead.website} target="_blank" rel="noopener noreferrer">Website</a>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        {lead.rating ? (
                                            <div className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full border border-amber-200/50">
                                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{lead.rating}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lead.name + ' ' + lead.address)}`} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
