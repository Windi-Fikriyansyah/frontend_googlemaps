"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import api from "@/lib/api";
import { toast } from "sonner";
import { Save, Key, Smartphone, User, Mail, Lock, Search, Eye, EyeOff } from "lucide-react";
import { SidebarProvider } from "@/context/SidebarContext";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        fonnte_token: "",
        search_api_key: ""
    });
    const [showSearchKey, setShowSearchKey] = useState(false);
    const [showFonnteToken, setShowFonnteToken] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await api.get("/auth/me");
                const user = response.data;
                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    password: "", // Don't show password
                    fonnte_token: user.fonnte_token || "",
                    search_api_key: user.search_api_key || ""
                });
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                toast.error("Failed to load settings.");
            } finally {
                setFetching(false);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Prepare data - only send password if it's not empty
        const updateData: any = { ...formData };
        if (!updateData.password) {
            delete updateData.password;
        }

        try {
            await api.put("/auth/me", updateData);
            toast.success("Pengaturan berhasil disimpan!");
            // Clear password field after success
            setFormData(prev => ({ ...prev, password: "" }));
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.response?.data?.detail || "Gagal menyimpan pengaturan.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex h-screen bg-slate-50 dark:bg-slate-950 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
                <Sidebar />

                <div className="flex-1 lg:ml-64 flex flex-col">
                    <TopBar />

                    <main className="p-4 md:p-8 max-w-4xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Pengaturan</h1>
                            <p className="text-slate-500">Kelola profil dan konfigurasi API Anda secara mandiri.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Section */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold">Profil Pengguna</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                placeholder="Masukkan nama Anda"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-4 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Password Baru (Kosongkan jika tidak ingin mengubah)
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* API Config Section */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-bold">Konfigurasi API</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                                            SearchAPI.io API Key (untuk Google Maps)
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                                                <Search className="w-4 h-4" />
                                            </div>
                                            <input
                                                type={showSearchKey ? "text" : "password"}
                                                value={formData.search_api_key}
                                                onChange={(e) => setFormData({ ...formData, search_api_key: e.target.value })}
                                                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                                placeholder="Masukkan SearchAPI Key Anda"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowSearchKey(!showSearchKey)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-purple-500 transition-colors"
                                            >
                                                {showSearchKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">Dapatkan API Key di <a href="https://www.searchapi.io" target="_blank" className="text-blue-600 hover:underline font-medium">SearchAPI.io</a></p>

                                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                Cara Mendapatkan API Key:
                                            </h3>
                                            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal ml-4">
                                                <li>Kunjungi <a href="https://www.searchapi.io" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">SearchAPI.io</a> dan buat akun (Gratis 100 Search/bulan).</li>
                                                <li>Masuk ke Dashboard akun Anda.</li>
                                                <li>Cari bagian <span className="font-semibold text-slate-700 dark:text-slate-300">API Key</span> dan klik tombol Copy.</li>
                                                <li>Tempel (Paste) kodenya ke kolom input di atas.</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            Fonnte API Token (untuk WhatsApp)
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                                                <Smartphone className="w-4 h-4" />
                                            </div>
                                            <input
                                                type={showFonnteToken ? "text" : "password"}
                                                value={formData.fonnte_token}
                                                onChange={(e) => setFormData({ ...formData, fonnte_token: e.target.value })}
                                                className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                                                placeholder="Masukkan Fonnte Token Anda"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowFonnteToken(!showFonnteToken)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-purple-500 transition-colors"
                                            >
                                                {showFonnteToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">Dapatkan Account Token di <a href="https://fonnte.com" target="_blank" className="text-blue-600 hover:underline font-medium">Fonnte.com</a></p>

                                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                Cara Mendapatkan API Token:
                                            </h3>
                                            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal ml-4">
                                                <li>Masuk ke akun <a href="https://fonnte.com" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Fonnte.com</a> Anda.</li>
                                                <li>Lihat bagian <span className="font-semibold text-slate-700 dark:text-slate-300">Account Token</span> yang ada di halaman Setting.</li>
                                                <li>Salin token tersebut.</li>
                                                <li>Tempel (Paste) kodenya ke kolom input di atas.</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
                                >
                                    <Save className="w-5 h-5" />
                                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
