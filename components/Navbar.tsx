"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Target, ArrowRight, LayoutDashboard } from "lucide-react";
import api from "@/lib/api";
import { storage } from "@/lib/storage";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkLogin = async () => {
            const token = storage.get("token");
            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            try {
                await api.get("/auth/me");
                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
            }
        };
        checkLogin();
    }, []);

    return (
        <nav className="fixed w-full z-[100] bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-transparent">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center text-xl font-bold tracking-tight text-blue-600 dark:text-white">
                        <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <rect width="32" height="32" rx="8" fill="#145efc" />
                            <circle cx="16" cy="16" r="9" stroke="white" stroke-width="2.5" />
                            <circle cx="16" cy="16" r="4.5" stroke="white" stroke-width="2.5" />
                            <circle cx="16" cy="16" r="1.5" fill="white" />
                        </svg>
                        Wamaps
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            How it Works
                        </Link>
                        <Link href="#pricing" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Pricing
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {!mounted ? (
                             <div className="w-24 h-8 bg-slate-100 animate-pulse rounded-xl"></div>
                        ) : !isLoggedIn ? (
                            <Link href="/checkout?plan=premium&amount=149000" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold transition-all hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-500/20">
                                Beli Sekarang
                            </Link>
                        ) : (
                            <Link href="/dashboard" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-xl font-bold transition-all hover:shadow-lg active:scale-95 flex items-center gap-2">
                                Dashboard <LayoutDashboard className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-600 dark:text-slate-400"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl">
                    <Link href="#features" className="block text-base font-semibold text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        Features
                    </Link>
                    <Link href="#how-it-works" className="block text-base font-semibold text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        How it Works
                    </Link>
                    <Link href="#pricing" className="block text-base font-semibold text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        Pricing
                    </Link>
                    {!mounted ? null : !isLoggedIn ? (
                        <Link
                            href="/checkout?plan=premium&amount=149000"
                            className="block w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Beli Sekarang
                        </Link>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl text-center font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

