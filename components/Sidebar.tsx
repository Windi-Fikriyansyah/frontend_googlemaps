"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Target,
    Search,
    History,
    Settings,
    User,
    LogOut,
    ChevronRight,
    TrendingUp,
    CreditCard,
    MessageSquare,
    Send,
    Smartphone
} from "lucide-react";

import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface UserData {
    id: number;
    email: string;
    name: string | null;
    plan_type: string;
    credits: number;
}


const menuItems = [
    { icon: Search, label: "Search Leads", href: "/leads" },
    { icon: Target, label: "Data Leads", href: "/leads/saved" },
    { icon: MessageSquare, label: "Templates Pesan", href: "/whatsapp/templates" },
    { icon: Send, label: "Broadcast", href: "/whatsapp/broadcast" },
    { icon: Smartphone, label: "Devices", href: "/whatsapp/devices" },
    { icon: History, label: "History Pesan", href: "/whatsapp/history" },
    { icon: CreditCard, label: "Harga", href: "/pricing" },
];


export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-blue-600 transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/20">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        Wamaps
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto max-h-[calc(100vh-280px)]">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-600")} />
                                <span className="text-sm">{item.label}</span>
                            </div>
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-4 mb-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Credits</p>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.credits?.toLocaleString() || 0}</span>
                        <Link href="/pricing" className="text-[10px] text-blue-600 hover:underline">TOP UP</Link>
                    </div>

                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Plan</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 capitalize">{user?.plan_type || "Free"}</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                </div>

                <button
                    onClick={async () => {
                        try {
                            await api.post("/auth/logout");
                        } catch (e) {
                            console.error("Logout error:", e);
                        } finally {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Log Out</span>
                </button>

            </div>
        </aside>
    );
}
