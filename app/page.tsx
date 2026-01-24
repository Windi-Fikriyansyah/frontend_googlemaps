"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import LeadTable from "@/components/LeadTable";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { Lead } from "@/types";
import { MapPin, Target, Layers } from "lucide-react";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keyword: string, location_name: string, radius: number, max_results: number) => {
    setLoading(true);
    setError(null);
    setLeads([]);

    try {
      const response = await api.post("/leads/search", {
        keyword,
        location_name,
        radius,
        max_results,
      });
      setLeads(response.data.leads);
    } catch (err: any) {
      console.error("Search error:", err);
      setError(
        err.response?.data?.detail ||
        "Failed to fetch leads. Verify backend is running and API keys are set."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-12 pb-8 mb-8 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800">
            <Target className="w-3 h-3" />
            Lead Generation System
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
            Google Maps Lead Finder
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Find high-quality B2B leads automatically. Just type what you're looking for and where,
            and we'll extract business info directly from Google Maps.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">1</div>
              Locate Area
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">2</div>
              Scrape Places
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">3</div>
              Export Leads
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-8">
        {/* Search Component */}
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            {error}
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
              <div className="bg-slate-100 dark:bg-slate-900/50 p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 border-b border-slate-100 dark:border-slate-900 flex gap-4">
                  <Skeleton className="h-12 w-1/4" />
                  <Skeleton className="h-12 w-1/4" />
                  <Skeleton className="h-12 w-1/4" />
                  <Skeleton className="h-12 w-1/4" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Table */}
        {!loading && <LeadTable leads={leads} />}

        {/* Empty State */}
        {!loading && leads.length === 0 && !error && (
          <div className="max-w-4xl mx-auto text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-medium italic">No leads found yet. Start by searching above.</p>
          </div>
        )}
      </div>
    </main>
  );
}
