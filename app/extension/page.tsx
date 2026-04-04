import { Puzzle, Download, CheckCircle, ArrowRight, Chrome, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/primitives";

export default function ExtensionPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                        <Puzzle className="w-3.5 h-3.5" />
                        Pusat Ekstensi Wamaps
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        Lengkapi <span className="text-blue-600">Alat Anda</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Unduh ekstensi Chrome resmi kami untuk mengotomatiskan alur kerja Anda. Install versi ZIP terbaru untuk fungsionalitas penuh.
                    </p>
                </div>
            </div>

            {/* Extension Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scrape Maps Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-500/20 flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute -top-12 -right-12 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <MapPin className="w-64 h-64 rotate-12" />
                    </div>

                    <div className="z-10 mb-8">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                            <Chrome className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black mb-3">Maps Scraper</h2>
                        <p className="text-blue-100/80 mb-8 leading-relaxed max-w-md">
                            Ekstrak data bisnis dari Google Maps secara otomatis dan ekspor langsung ke sistem lead Anda.
                        </p>

                        <div className="space-y-4">
                            {['Auto-Scrape Data', 'Export to Excel/Leads', 'Bypass Limitations'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-blue-50">
                                    <div className="w-6 h-6 rounded-full bg-blue-400/20 flex items-center justify-center border border-blue-400/30">
                                        <CheckCircle className="w-3.5 h-3.5 text-blue-300" />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="z-10 mt-6 mt-auto">
                        <Button
                            asChild
                            size="lg"
                            className="w-full bg-white text-blue-700 hover:bg-blue-50 rounded-2xl h-16 px-8 font-black shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <a href="/extensions/scrapemaps.zip" download="extension-scraper-maps.zip">
                                <Download className="w-5 h-5 mr-3" />
                                Download Scraper Maps
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Broadcast / WhatsApp Card */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-emerald-500/20 flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute -top-12 -right-12 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <MessageSquare className="w-64 h-64 -rotate-12" />
                    </div>

                    <div className="z-10 mb-8">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-black mb-3">Broadcast Sender</h2>
                        <p className="text-emerald-50/80 mb-8 leading-relaxed max-w-md">
                            Kirim pesan WhatsApp massal secara otomatis dengan aman dan efisien langsung dari browser Anda.
                        </p>

                        <div className="space-y-4">
                            {['Anti-Ban Automation', 'Kirim Gambar', 'Bulk Processing'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-emerald-50">
                                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center border border-emerald-400/30">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="z-10 mt-6 mt-auto">
                        <Button
                            asChild
                            size="lg"
                            className="w-full bg-white text-emerald-700 hover:bg-emerald-50 rounded-2xl h-16 px-8 font-black shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                        >
                            <a href="/extensions/extensionwhatsapp.zip" download="extension-broadcast-wa.zip">
                                <Download className="w-5 h-5 mr-3" />
                                Download Broadcast Extension
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Installation Guide Section */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 mt-12">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3 space-y-4">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            Panduan Instalasi <ArrowRight className="w-6 h-6 text-blue-600" />
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Ikuti langkah-langkah sederhana di samping untuk mengaktifkan ekstensi di Google Chrome Anda.
                        </p>
                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl">
                            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
                                <b>Note:</b> Pastikan untuk mengekstrak file ZIP terlebih dahulu sebelum dimuat ke dalam Chrome.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { step: "1", title: "Ekstrak ZIP", desc: "Klik kanan file ZIP yang didownload dan pilih 'Extract All' ke folder tujuan." },
                            { step: "2", title: "Buka chrome://extensions", desc: "Ketik URL tersebut di address bar Chrome Anda dan tekan Enter." },
                            { step: "3", title: "Aktifkan Developer Mode", desc: "Cari switch 'Developer mode' di pojok kanan atas dan nyalakan." },
                            { step: "4", title: "Load Unpacked", desc: "Klik tombol 'Load unpacked' dan pilih folder hasil ekstrak tadi." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black flex items-center justify-center shrink-0 shadow-sm">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
