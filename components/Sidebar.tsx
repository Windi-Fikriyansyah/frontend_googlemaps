"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Target,
    Search,
    History,
    Settings,
    User,
    LogOut,
    ChevronRight,
    TrendingUp,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Search, label: "Search Leads", href: "/leads" },
    { icon: Target, label: "Data Leads", href: "/leads/saved" },
    { icon: TrendingUp, label: "Analytics", href: "#" },
    { icon: CreditCard, label: "Subscription", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-blue-600 transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/20">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        LeadFlow
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4">
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
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Plan</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Pro Version</span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
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
