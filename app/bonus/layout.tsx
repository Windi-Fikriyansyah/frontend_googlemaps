"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { storage } from "@/lib/storage";
import { SidebarProvider } from "@/context/SidebarContext";

export default function BonusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = storage.get("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);
    
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
                {/* Sidebar - Fixed Width */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
                    {/* Top Header */}
                    <TopBar />

                    {/* Dynamic Page Content */}
                    <main className="flex-1 p-4 md:p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>

                    <footer className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-xs text-slate-400 font-medium">
                            © 2026 Wamaps Control Panel. All rights reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </SidebarProvider>
    );
}
