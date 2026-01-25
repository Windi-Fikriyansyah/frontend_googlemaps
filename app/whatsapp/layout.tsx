"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function WhatsAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar - Fixed Width */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-64">
                {/* Top Header */}
                <TopBar />

                {/* Dynamic Page Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <footer className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-xs text-slate-400 font-medium">
                        © 2026 LeadFlow Control Panel. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
}
