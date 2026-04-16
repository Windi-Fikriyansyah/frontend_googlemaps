"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import {
    LayoutDashboard,
    Users,
    Send,
    Zap,
    Globe,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    MessageSquare,
    Target,
    Monitor,
    Download
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/primitives";
import api from "@/lib/api";

interface UserData {
    id: number;
    email: string;
    name: string | null;
    plan_type: string;
    credits: number;
}

export default function Dashboard() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);



    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />

            <main className="flex-1 lg:ml-64 p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <LayoutDashboard className="w-8 h-8 text-blue-600" />
                                Dashboard
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Selamat datang kembali, <span className="text-blue-600 font-bold">{user?.name || user?.email || "User"}</span>! Siap untuk mencari leads hari ini?
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-4 h-4" />
                            Status: {user?.plan_type || "Pro Account"}
                        </div>
                    </div>



                    {/* Desktop App Announcement */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-500"></div>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="p-5 bg-white/10 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                <Monitor className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight mb-1">Wamaps Desktop Tersedia!</h2>
                                <p className="text-blue-100/80 text-sm font-medium max-w-md">Nikmati pengalaman scrapping yang lebih stabil, Unlimited, tanpa batas browser, dan performa maksimal langsung dari perangkat Anda.</p>
                            </div>
                        </div>
                        <Link href="/desktop" className="whitespace-nowrap bg-white text-blue-600 px-10 py-4 rounded-[1.5rem] font-black text-sm hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300 flex items-center gap-3 relative z-10">
                            <Monitor className="w-5 h-5 font-black" />
                            Lihat Tutorial
                        </Link>
                    </div>

                    {/* Wamaps Info Section */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <section className="md:col-span-2 space-y-6">
                            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="p-8 border-b border-slate-50 dark:border-slate-800">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Target className="w-5 h-5 text-blue-600" />
                                        Apa itu Wamaps?
                                    </h2>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        Wamaps adalah platform **Lead Generation & WhatsApp Automation** yang dirancang khusus untuk membantu bisnis mencari, mengelola, dan menghubungi calon pelanggan potensial secara otomatis.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-lg shrink-0">
                                                <Target className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm mb-1">Target Berbasis Lokasi</h4>
                                                <p className="text-[10px] text-slate-500 italic">Cari bisnis di sekitar Anda atau di kota manapun di dunia.</p>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-start gap-3 border border-slate-100 dark:border-slate-800">
                                            <div className="p-2 bg-green-100 dark:bg-green-900/40 text-green-600 rounded-lg shrink-0">
                                                <MessageSquare className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm mb-1">Automation Chat</h4>
                                                <p className="text-[10px] text-slate-500 italic">Kirim pesan WhatsApp massal tanpa perlu simpan nomor satu-satu.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Fitur Utama Anda:</h4>
                                        <ul className="space-y-3">
                                            {[
                                                "Auto-Scrapping data dari Google Maps secara Real-time.",
                                                "Sistem Manajemen Leads yang terorganisir.",
                                                "Broadcast WhatsApp Batch dengan delay human-like.",
                                                "Template pesan yang dinamis dan personal.",
                                                "Integrasi Extension untuk workflow yang lebih cepat.",
                                                "Install Versi Desktop untuk fitur yang lebih canggih dan performa maksimal."
                                            ].map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <aside className="space-y-6">
                            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2.5rem] overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full -mr-16 -mt-16"></div>
                                <CardContent className="p-8 space-y-6 relative z-10">
                                    <h3 className="text-xl font-black mb-2 leading-tight">Siap Untuk Action?</h3>
                                    <p className="text-sm opacity-80 font-bold italic border-l-2 border-white/30 pl-4 py-1">
                                        "Kunci sukses prospecting adalah konsistensi. Cari 100 leads hari ini!"
                                    </p>
                                    <Link href="/leads" className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group inline-flex">
                                        Cari Leads Sekarang
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </CardContent>
                            </Card>


                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}
