"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
    CheckCircle2,
    ArrowRight,
    Play,
    Building2,
    Users,
    Briefcase,
    Store,
    AlertCircle,
    Search,
    Database,
    MessageSquare,
    Facebook,
    FileSpreadsheet,
    FileText,
    Check,
    Clock,
    Zap,
    ShieldCheck
} from "lucide-react";

// The FAQ component from NonCriticalSections seems to be different from the Blade one.
// I'll implement the Blade version in this file for exact matching.

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const totalSeconds = 1 * 3600 + 45 * 60 + 20; // 1h 45m 20s
        setTimeLeft({ hours: 1, minutes: 45, seconds: 20 });

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (!prev) return null;
                const total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
                if (total <= 0) return { hours: 0, minutes: 0, seconds: 0 };
                return {
                    hours: Math.floor(total / 3600),
                    minutes: Math.floor((total % 3600) / 60),
                    seconds: total % 60
                };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;
    const format = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex gap-3 items-center justify-center font-black">
            {[
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl w-14 h-14 flex items-center justify-center text-2xl shadow-xl border border-slate-700 dark:border-slate-200">
                        {format(item.val)}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-white">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default function LandingPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                videoRef.current.controls = true;
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/40 font-sans" suppressHydrationWarning>
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <span className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold tracking-widest uppercase">
                            Ambil Leads Otomatis
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            Dapatkan 100-1000 Leads <span className="text-green-600">WhatsApp Bisnis Aktif Perhari</span> & Hanya Dalam <span className="text-blue-600">1 Klik!</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                            Ambil leads bisnis sesuai target, simpan otomatis, dan kirim broadcast WhatsApp tanpa ribet, tanpa coding, dalam hitungan menit.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/checkout?plan=premium&amount=149000" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                Beli Sekarang
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                            <Link href="#features" className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl text-lg flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                                Lihat Fitur
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-[10px] sm:text-sm font-bold">
                            {[
                                "Mengambil ribuan leads bisnis",
                                "Simpan data otomatis",
                                "Kirim broadcast massal",
                                "Export Excel",
                                "Autopost FB Group",
                                "Template Pesan Broadcast"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/5 text-green-600 dark:text-green-400 rounded-full border border-green-500/10">
                                    <Check className="w-3.5 h-3.5" />
                                    <span className="leading-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/5 rounded-3xl -rotate-2 scale-105"></div>
                        <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group cursor-pointer" onClick={togglePlay}>
                            <video
                                ref={videoRef}
                                className="w-full h-auto block focus:outline-none"
                                poster="/thumnail.webp"
                                preload="metadata"
                                onEnded={() => {
                                    if (videoRef.current) videoRef.current.controls = false;
                                    setIsPlaying(false);
                                }}
                            >
                                <source src="https://ik.imagekit.io/bzq0b2kjq/0401.mp4?updatedAt=1775027577346" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300 border-4 border-white/20">
                                        <Play className="w-10 h-10 md:w-12 md:h-12 fill-current ml-1" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Case Section */}
            <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Siapa yang Cocok Pakai Wamaps?</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { title: "Agency", desc: "Dapatkan supply leads klien baru setiap hari secara otomatis dari Google Maps untuk tawarkan jasa marketing agensi kamu.", icon: Building2, color: "text-blue-500 bg-blue-500/10" },
                            { title: "Freelancer", desc: "Cari ribuan bisnis lokal yang butuh jasa kamu dan kirim pesan penawaran profesional langsung ke WhatsApp owner-nya.", icon: Users, color: "text-green-500 bg-green-500/10" },
                            { title: "Sales B2B", desc: "Hubungi decision maker bisnis di seluruh Indonesia tanpa door-to-door. Dapatkan data alamat dan nomor WA valid dengan cepat.", icon: Briefcase, color: "text-amber-500 bg-amber-500/10" },
                            { title: "Owner Bisnis", desc: "Bangun database pelanggan sendiri tanpa ketergantungan iklan, dan kirim pesan promosi massal untuk tingkatkan omset.", icon: Store, color: "text-red-500 bg-red-500/10" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-300 ${item.color} group-hover:bg-opacity-100 group-hover:text-white`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pain Points Section */}
            <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Kenapa Banyak Orang Gagal Dapat Leads?</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium">Mungkin selama ini kamu melakukan cara yang salah, melelahkan, dan membuang banyak biaya tanpa hasil yang maksimal.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Data Tidak Valid (Data Sampah)", desc: "Sering dapat data nomor telepon kantor atau nomor yang sudah tidak aktif saat mencari manual di internet. Rasio closing pun jadi nol besar.", icon: AlertCircle },
                            { title: "Scraping Manual Sangat Lambat", desc: "Membuang waktu berjam-jam hanya untuk buka-tutup tab Google Maps satu per satu demi mencatat 50 data leads yang belum tentu mau beli.", icon: Clock },
                            { title: "Lelah Save Nomor & Chat Satu-Satu", desc: "Energi habis hanya untuk menyimpan kontak di HP secara manual sebelum bisa chat. Belum kirim pesan, tangan sudah keriting duluan.", icon: MessageSquare }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20 relative group hover:shadow-xl transition-all duration-300">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-red-500/20 underline decoration-white/30 decoration-2">
                                    {i + 1}
                                </div>
                                <div className="space-y-5">
                                    <div className="text-red-500 bg-red-500/10 p-4 rounded-2xl w-fit">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                            Semua Fitur Wamaps untuk Lead Generation & WhatsApp Otomatis
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-4xl mx-auto text-lg leading-relaxed font-medium">
                            Wamaps membantu kamu mengambil leads bisnis dari Google Maps, menyimpannya rapi, dan mengirim WhatsApp massal secara otomatis — tanpa ribet dan tanpa coding. Semua fitur dirancang agar kamu hemat waktu hingga 90% dan bisa scale bisnis lebih cepat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { title: "Auto Scraping Google Maps", desc: "Ambil ribuan leads bisnis sesuai lokasi dan keyword target secara otomatis dalam hitungan detik.", image: "/fitur/searchleads.png" },
                            { title: "Database Leads Rapi & Valid", desc: "Simpan nama, alamat, dan nomor WhatsApp aktif dengan format yang siap pakai.", image: "/fitur/dataleads.png" },
                            { title: "WhatsApp Broadcast Otomatis", desc: "Kirim pesan massal ke semua leads tanpa copy-paste, semua bisa diatur langsung dari sistem.", image: "/fitur/broadcast.png" },
                            { title: "Auto Post ke Banyak Grup Facebook", desc: "Posting ke puluhan hingga ratusan grup Facebook hanya dalam 1 klik secara otomatis.", image: "/fitur/bonus.png" },
                            { title: "Multiple Message Templates", desc: "Buat banyak template pesan sekaligus untuk campaign yang lebih powerful dan variatif.", image: "/fitur/pesan.png" },

                        ].map((feature, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-800 rounded-3xl mb-6 overflow-hidden border border-slate-100 dark:border-slate-700 relative">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white dark:bg-slate-950" id="how-it-works">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Mulai Dalam 3 Langkah Sederhana</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">Proses otomatis yang dirancang untuk memudahkan bisnis kamu berkembang tanpa ribet.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {[
                            { step: 1, title: "Masukkan Keyword & Lokasi", desc: "Tentukan target bisnis dan lokasi yang ingin kamu ambil datanya (Contoh: \"Apotek di Jakarta\").", color: "bg-blue-600", rotate: "rotate-3" },
                            { step: 2, title: "Ambil Leads Otomatis", desc: "Wamaps akan men-scan Google Maps secara real-time dan mengumpulkan ribuan data nomor WhatsApp aktif.", color: "bg-green-600", rotate: "-rotate-3" },
                            { step: 3, title: "Kirim WhatsApp Langsung", desc: "Tanpa perlu save nomor, kirim pesan promosi massal langsung ke target leads yang sudah terkumpul.", color: "bg-slate-900 dark:bg-slate-800", rotate: "rotate-3" }
                        ].map((item, i) => (
                            <div key={i} className="relative space-y-6 text-center group">
                                <div className={`w-20 h-20 ${item.color} text-white rounded-3xl flex items-center justify-center mx-auto text-3xl font-black shadow-xl group-hover:rotate-0 transition-transform duration-300 ${item.rotate}`}>
                                    {item.step}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex flex-col items-center justify-center gap-6 p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-blue-500/5 shadow-xl shadow-blue-500/5 max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 text-green-600 font-bold text-lg">
                            <CheckCircle2 className="w-8 h-8" />
                            100% Otomatis & Tanpa Ribet
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-center leading-relaxed italic font-medium">
                            "Gak perlu pusing mikirin coding atau input data satu-satu. Wamaps mengerjakan semuanya untuk kamu."
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Apa Kata Mereka Yang Sudah Pakai Wamaps?</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Lebih dari 100+ pebisnis dan agensi telah melipatgandakan profit mereka dengan mengotomatisasi pencarian leads tertarget.</p>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                            {[
                                { name: "Andi Pratama", role: "Owner Digital Agency", initial: "A", color: "bg-blue-600", text: "\"Gak perlu lagi bayar jasa cari database jutaan rupiah. Pakai Wamaps, tim saya bisa dapet 500 leads tertarget setiap pagi cuma modal 1 klik. ROI gila-gilaan!\"" },
                                { name: "Maya Sari", role: "Freelance Web Architect", initial: "M", color: "bg-green-600", text: "\"Dulu pusing cari klien lokal. Sekarang tinggal ketik 'Restoran di Bali', dapet ratusan nomor WA owner-nya. Closing rate saya naik 3x lipat sejak pakai Wamaps!\"" },
                                { name: "Rully Sales", role: "Sales Manager B2B", initial: "R", color: "bg-slate-900", text: "\"Fitur Multiple Message Templates-nya penyelamat banget. Saya bisa tes berbagai pesan promosi tanpa perlu save nomor satu-satu. Hemat waktu luar biasa!\"" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl group hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
                                    <p className="italic text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">{item.text}</p>
                                    <div className="flex items-center gap-4 border-t border-slate-50 dark:border-slate-800 pt-6">
                                        <div className={`w-12 h-12 ${item.color} text-white rounded-full flex items-center justify-center font-bold text-xl`}>
                                            {item.initial}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{item.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-white dark:bg-slate-950" id="pricing">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">Harga Transparan,<br />Tanpa Biaya Tersembunyi</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">Bayar sekali, pakai selamanya. Semua fitur langsung aktif</p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <div className="bg-blue-600 rounded-[3rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group border border-white/10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <h3 className="text-xl font-bold text-white/90 uppercase tracking-wider">Wamaps Pro</h3>
                                    <span className="bg-green-500 text-white text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg shadow-black/10">LIFETIME DEAL</span>
                                </div>

                                <div className="space-y-1 mb-8">
                                    <div className="text-4xl md:text-5xl font-black tracking-tighter">Rp 149.000</div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg text-white/40 line-through font-medium">Rp 329.000</span>
                                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">Hemat 64%</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-white/10 uppercase tracking-tight text-[10px] font-bold">
                                    <div className="space-y-1">
                                        <div className="text-amber-400 flex items-center gap-1 text-[11px]">
                                            <span className="animate-pulse">🔥</span> 100 slot lagi
                                        </div>
                                        <div className="text-white/80">di harga ini</div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-white/80">Naik ke Rp 249.000</div>
                                        <div className="text-white/80">setelahnya</div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-10">
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-xs font-bold text-white/80 uppercase tracking-widest">Waktu promo berakhir:</p>
                                        <CountdownTimer />
                                    </div>
                                </div>

                                <ul className="space-y-5 mb-12">
                                    {[
                                        "Auto Scraping Google Maps",
                                        "WhatsApp Broadcast Otomatis",
                                        "Auto Posting Grup Otomatis",
                                        "Export Excel & CSV",
                                        "Multiple Message Templates",
                                        "Free Update Selamanya"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-base font-bold group/item">
                                            <div className="w-6 h-6 bg-white/20 text-white rounded-full flex items-center justify-center border border-white/20 group-hover/item:scale-110 transition-transform">
                                                <Check className="w-3.5 h-3.5" />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/checkout?plan=premium&amount=149000" className="w-full py-6 bg-white hover:bg-slate-100 text-blue-600 rounded-2xl text-xl font-black shadow-2xl shadow-black/20 transition-all hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center">
                                    Beli Sekarang
                                </Link>

                                <p className="text-center mt-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                                    <ShieldCheck className="inline-block w-4 h-4 mr-2" /> Pembayaran Aman & Aktivasi Otomatis
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50" id="faq">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Yang Sering Ditanyakan</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Semua yang perlu kamu ketahui tentang Wamaps ada di sini.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Apakah nomor yang didapat valid?", a: "Sangat valid. Sistem kami hanya mengambil data bisnis aktif yang terdaftar di Google Maps secara real-time, memastikan Anda mendapatkan data segar yang siap dihubungi." },
                            { q: "Apakah aman untuk akun WhatsApp?", a: "Wamaps dirancang dengan teknologi 'Human-Like Sending' yang dilengkapi fitur delay (jeda waktu antar pesan) dan simulasi mengetik, sehingga aktivitas pengiriman kamu terlihat natural dan meminimalisir risiko banned." },
                            { q: "Apakah cocok untuk pemula?", a: "Sangat cocok! Kamu tidak butuh pengalaman digital marketing atau coding sekalipun. Cukup masukkan keyword, klik, dan kamu akan mendapatkan data dalam hitungan detik." },
                            { q: "Apakah ada biaya langganan/bulanan?", a: "TIDAK ADA. Sekali lagi kami tekankan: Cukup SEKALI BAYAR, Anda mendapatkan akses LIFETIME (Seumur Hidup) selamanya tanpa biaya tambahan apapun lagi di kemudian hari." }
                        ].map((item, i) => (
                            <div key={i} className={`bg-white dark:bg-slate-900 p-8 rounded-3xl border ${i === 3 ? 'border-2 border-blue-600' : 'border-slate-200/60 dark:border-slate-800'} shadow-sm hover:shadow-md transition-all group`}>
                                <h3 className={`text-lg font-bold ${i === 3 ? 'text-blue-600' : 'text-slate-900 dark:text-white'} mb-3 flex items-center gap-3`}>
                                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${i === 3 ? 'bg-blue-600 text-white' : 'bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>Q</span>
                                    {item.q}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11 font-medium italic">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / Final CTA */}
            <section className="py-24 bg-blue-600 dark:bg-blue-700 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Siap Melipatgandakan Omset Anda?</h2>
                    <p className="text-xl opacity-90 font-medium">Jangan biarkan kompetitor mengambil leads Anda. Mulai gunakan Wamaps sekarang dan lihat perbedaannya.</p>
                    <Link href="/checkout?plan=premium&amount=149000" className="inline-block bg-white text-blue-600 px-12 py-5 rounded-2xl text-2xl font-black hover:scale-105 transition-transform active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        BELI SEKARANG
                    </Link>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Bergaransi & Support Full 24/7</p>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-950 py-20 border-t border-slate-200 dark:border-slate-800 pb-32 md:pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Info */}
                        <div className="space-y-6">
                            <div className="flex items-center text-2xl font-black text-blue-600">
                                <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <rect width="32" height="32" rx="8" fill="#145efc" />
                                    <circle cx="16" cy="16" r="9" stroke="white" stroke-width="2.5" />
                                    <circle cx="16" cy="16" r="4.5" stroke="white" stroke-width="2.5" />
                                    <circle cx="16" cy="16" r="1.5" fill="white" />
                                </svg>
                                Wamaps
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                Wamaps adalah platform pintar untuk mengambil data dari Google Maps dan memudahkan Anda mengelola komunikasi WhatsApp secara otomatis. Dengan fitur autoscrape, template pesan, dan autoposting ke banyak grup, Wamaps membantu bisnis Anda menemukan calon pelanggan baru dan tetap terhubung dengan mereka secara cepat dan efisien.
                            </p>
                        </div>

                        {/* Fitur */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Fitur Utama</h3>
                            <ul className="space-y-4">
                                {["Auto Scrape Google Maps", "Auto WhatsApp Broadcast", "Auto Posting Group", "Export Data Excel", "Multiple Message Templates"].map((f, i) => (
                                    <li key={i}><Link href="#features" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors font-medium">{f}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Produk */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Produk</h3>
                            <ul className="space-y-4">
                                <li><Link href="#pricing" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors font-medium">Harga</Link></li>
                            </ul>
                        </div>

                        {/* Bantuan */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Bantuan & Kontak</h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="https://wa.me/6289678386070" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors font-medium">
                                        <MessageSquare className="w-4 h-4" />
                                        WhatsApp Admin
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <div>© 2026 Wamaps. All rights reserved.</div>
                        <div className="flex space-x-6">
                            <Link className="hover:text-blue-600 transition-colors" href="/privacy">Privacy Policy</Link>
                            <Link className="hover:text-blue-600 transition-colors" href="/terms">Terms of Service</Link>
                            <Link className="hover:text-blue-600 transition-colors" href="/support">Support</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Sticky Mobile Checkout Bar */}
            <div className="fixed bottom-0 left-0 w-full md:hidden bg-blue-600/95 backdrop-blur-md border-t border-white/20 z-[100] px-4 py-3 shadow-[0_-10px_40px_rgba(30,58,138,0.3)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-bold text-green-400 uppercase tracking-wider leading-none">Lifetime Deal</span>
                        </div>
                        <div className="flex items-baseline gap-2 leading-none">
                            <span className="text-xl font-black text-white">Rp 149.000</span>
                            <span className="text-[10px] text-white/50 line-through">Rp 329.000</span>
                        </div>
                    </div>
                    <Link href="/checkout?plan=premium&amount=149000" className="bg-green-500 hover:bg-green-400 text-white px-5 py-3 rounded-xl font-black text-xs flex items-center gap-2 shadow-xl shadow-green-900/10 active:scale-95 transition-all">
                        Beli Sekarang
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </main>
    );
}

