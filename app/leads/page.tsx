"use client";

import { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import LeadTable from "@/components/LeadTable";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { Lead } from "@/types";
import { MapPin, Target, Layers, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { storage } from "@/lib/storage";
import Link from "next/link";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configMissing, setConfigMissing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = storage.get("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        const user = response.data;
        if (!user.search_api_key || !user.fonnte_token) {
          setConfigMissing(true);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [router]);

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
      toast.success(`Success! Found ${response.data.leads.length} leads.`);
    } catch (err: any) {
      const isInsufficientCredits = err.response?.status === 403;
      const errorMessage = err.response?.data?.detail || "Failed to fetch leads.";

      if (isInsufficientCredits) {
        toast.error("Insufficient Credits", {
          description: "Please top up your credits to continue searching for leads.",
        });
        // We set error to null so the red alert box doesn't show for credits, 
        // since the toast is enough and looks better.
        setError(null);
      } else {
        console.error("Search error:", err);
        toast.error(errorMessage);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">



      <div className="px-4 space-y-8">
        {/* Config Missing Warning */}
        {configMissing && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-2xl">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-red-900 dark:text-red-200 font-black text-xl mb-1">Konfigurasi Belum Lengkap!</h3>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Mohon isi <b>SearchAPI Key</b> dan <b>Fonnte Token</b> terlebih dahulu di menu pengaturan untuk dapat melakukan pencarian.
                </p>
              </div>
              <Link 
                href="/settings" 
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/25"
              >
                Ke Pengaturan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

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
    </div>
  );
}
