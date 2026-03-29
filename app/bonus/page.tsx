"use client";

import { Download, Facebook, CheckCircle2, Share2 } from "lucide-react";

export default function BonusPage() {
  return (
    <div className="space-y-8">
        <div className="px-4 max-w-5xl mx-auto space-y-8 mt-12 mb-20">
            
            <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 w-fit text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800">
                    <Share2 className="w-4 h-4" />
                    <span>Bonus Eksklusif VIP</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Chrome Extension <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">FB Auto Post</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg mt-2 max-w-3xl">
                    Tingkatkan jangkauan promosi Anda dengan ekstensi browser Auto Post Grup Facebook. Jadwalkan dan kirim postingan promosi ke ratusan grup secara otomatis hanya dengan sekali klik.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-700" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                                <Facebook className="w-8 h-8 fill-current" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">FB Group Auto Poster</h2>
                                <p className="text-slate-500 dark:text-slate-400">Ekstensi Premium • Mendukung Google Chrome & Edge</p>
                            </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            Ekstensi ini adalah tool tambahan yang wajib dimiliki untuk pemasaran digital Anda. Tidak perlu lagi capek copy-paste memposting satu per satu ke grup Facebook. Biarkan sistem yang bekerja menyebarkan konten promosi, tautan, atau penawaran Anda ke ratusan target grup secara otomatis dan efisien.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a 
                                href="/extensions/fb-autopost-extension.zip" 
                                download="fb-autopost-extension.zip"
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
                            >
                                <Download className="w-5 h-5" />
                                Download Ekstensi (.zip)
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mt-12">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    Cara Pemasangan Ekstensi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { 
                            step: 1, 
                            title: "Download File", 
                            desc: "Unduh file ekstensi berbentuk .zip melalui tombol download biru yang tersedia di atas." 
                        },
                        { 
                            step: 2, 
                            title: "Ekstrak Folder", 
                            desc: "Klik kanan pada file .zip yang diunduh, lalu pilih 'Extract Here' atau ekstrak ke sebuah folder." 
                        },
                        { 
                            step: 3, 
                            title: "Developer Mode", 
                            desc: "Buka browser Chrome, akses url chrome://extensions/ pada address bar lalu aktifkan tombol 'Developer Mode' di pojok kanan atas." 
                        },
                        { 
                            step: 4, 
                            title: "Load Unpacked", 
                            desc: "Klik tombol 'Load unpacked' yang muncul, kemudian pilih folder yang sudah Anda ekstrak pada langkah ke-2." 
                        }
                    ].map((item) => (
                        <div key={item.step} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg mb-5 border border-blue-200 dark:border-blue-800/50">
                                {item.step}
                            </div>
                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );
}
