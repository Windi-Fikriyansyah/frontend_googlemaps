"use client";

import { Bell, Search, User, ChevronDown } from "lucide-react";

export default function TopBar() {
    return (
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all w-96">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
                <input
                    type="text"
                    placeholder="Global search..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                </button>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

                <button className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                        JD
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-bold leading-tight">John Doe</p>
                        <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
            </div>
        </header>
    );
}
