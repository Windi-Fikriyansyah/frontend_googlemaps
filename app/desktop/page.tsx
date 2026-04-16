"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
    Monitor,
    Download,
    Play,
    CheckCircle2,
    Zap,
    Shield,
    Chrome,
    Globe2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/primitives";

export default function DesktopPage() {
    const downloadLink = "https://www.dropbox.com/scl/fi/maw0b2klxozv9lqyjcc2s/wamaps.zip?rlkey=gq4h7ll574pbw87d9e9yvymvf&st=rhxaw8i7&dl=0";

    const features = [
        { icon: Zap, title: "Lebih Cepat & Stabil", desc: "Performa maksimal tanpa batasan memori browser Chrome." },
        { icon: Globe2, title: "Tanpa Batas IP", desc: "Scraping lebih leluasa karena dijalankan langsung dari local machine." },
        { icon: Shield, title: "Anti-Ban Protection", desc: "Sistem delay dan human-like behavior yang lebih canggih." },
        { icon: Chrome, title: "Portable Chrome", desc: "Otomatis mengelola browser session secara mandiri." }
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />

            <main className="flex-1 lg:ml-64 p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                            <Monitor className="w-8 h-8 text-blue-600" />
                            Wamaps Desktop Version
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                            Tingkatkan efisiensi lead generation Anda dengan aplikasi native desktop Wamaps. Lebih ngebut, lebih aman.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Download Action Section */}
                            <Card className="border-none shadow-2xl shadow-blue-500/10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] overflow-hidden text-white relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 blur-2xl rounded-full -ml-10 -mb-10"></div>

                                <CardContent className="p-10 relative z-10 flex flex-col items-center text-center space-y-6">
                                    <div className="p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
                                        <Monitor className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="space-y-2 max-w-md">
                                        <h2 className="text-3xl font-black tracking-tight">Wamaps App v1.1.0</h2>
                                        <p className="text-blue-100 font-medium">Download dan jalankan ekstrak filenya di Windows Anda. Tidak perlu instalasi rumit.</p>
                                    </div>
                                    <a
                                        href={downloadLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto mt-4 px-10 py-5 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <Download className="w-6 h-6" />
                                        Download Wamaps Desktop
                                    </a>
                                </CardContent>
                            </Card>

                            {/* Tutorial Video Section */}
                            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Video Tutorial</h3>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                                        Tonton panduan singkat ini untuk melihat cara instalasi dan penggunaan versi Desktop.
                                    </p>

                                    {/* Video Container (Placeholder or YouTube iframe) */}
                                    <div className="relative w-full aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden group shadow-inner">
                                        {/* Ganti src iframe di bawah ini jika ada link video YouTube yang asli */}
                                        <iframe
                                            className="w-full h-full z-10 relative"
                                            src="" // URL Placeholder
                                            title="Wamaps Tutorial Desktop"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    {/* <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded-xl text-sm font-medium border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
                                        <Shield className="w-5 h-5 shrink-0" />
                                        <p>Jika ketika dalam penginstalan Pastikan matikan sementara Antivirus jika file dicurigai.</p>
                                    </div> */}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Features */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 space-y-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Kenapa Versi Desktop?</h3>
                                    <div className="space-y-5">
                                        {features.map((item, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl h-fit">
                                                    <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[2.5rem] overflow-hidden">
                                <CardContent className="p-8 space-y-5">
                                    <h3 className="font-bold text-lg text-slate-100">Step Instalasi</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Download file .zip dari link di atas",
                                            "Ekstrak file ke folder di PC Anda (Contoh: D:/Wamaps)",
                                            "Buka folder Wamaps dan jalankan Wamaps.exe",
                                        ].map((step, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-slate-300">
                                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
