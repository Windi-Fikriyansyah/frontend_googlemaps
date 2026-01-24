"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Target, ArrowRight, LayoutDashboard } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-blue-600">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                            LeadFlow
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Features
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Pricing
                        </Link>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
                                >
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/leads"
                                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-lg active:scale-95"
                            >
                                Dashboard <LayoutDashboard className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-600 dark:text-slate-400"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl">
                    <Link href="#features" className="block text-base font-medium text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        Features
                    </Link>
                    <Link href="#pricing" className="block text-base font-medium text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        Pricing
                    </Link>
                    <hr className="border-slate-100 dark:border-slate-800" />
                    <Link href="/login" className="block text-base font-medium text-slate-600 dark:text-slate-400 px-2" onClick={() => setIsOpen(false)}>
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        className="block w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-semibold"
                        onClick={() => setIsOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </nav>
    );
}
