"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
    Target,
    Search,
    MapPin,
    Download,
    ChevronRight,
    CheckCircle2,
    ArrowRight,
    MessageSquare,
    Zap,
    Users,
    Smartphone,
    LayoutDashboard,
    Sparkles,
    MousePointer2,
    Layers,
    Gift,
    Rocket,
    Crown,
    Check,
    HelpCircle,
    XCircle,
    Clock,
    ShieldCheck,
    Briefcase,
    Store,
    UserCircle2,
    BarChart3,
    Minus
} from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/40">
            <Navbar />

            {/* [ATTENTION] Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        AOTOMATISASI LEAD GENERATION
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto">
                        🔥 Ambil Leads dari Google Maps + Kirim WhatsApp Otomatis dalam <span className="text-blue-600 dark:text-blue-400">1 Klik!</span>
                    </h1>

                    <div className="max-w-3xl mx-auto space-y-4 mb-12">
                        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium">Bayangkan kamu bisa:</p>
                        <ul className="flex flex-wrap justify-center gap-4">
                            {[
                                "Mengambil ribuan leads bisnis",
                                "Simpan data otomatis (Nama, No, Alamat)",
                                "Kirim broadcast WhatsApp massal"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm border border-slate-100 dark:border-slate-800">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-tighter">
                            Tanpa manual. Tanpa ribet. Tanpa coding.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                        <Link
                            href="/checkout?plan=premium&amount=149000"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-500 text-white px-10 py-5 rounded-full text-xl font-black transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/30"
                        >
                            Ambil Akses Lifetime Sekarang
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Target Audience Badges */}
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Cocok untuk:</p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
                            {[
                                { icon: Smartphone, label: "Digital Marketing" },
                                { icon: Briefcase, label: "Agency Sales" },
                                { icon: Users, label: "Sales B2B" },
                                { icon: UserCircle2, label: "Freelancer" },
                                { icon: Store, label: "Owner Bisnis" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-xs font-bold">
                                    <item.icon className="w-4 h-4" /> {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* [INTEREST] Problem & Solution */}
            <section className="py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            🎯 INTEREST
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black mb-6">Kenapa Tools Ini Powerful?</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* The Pain */}
                        <div className="p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30">
                            <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 flex items-center gap-2 text-red-600 uppercase tracking-tighter">
                                <XCircle className="w-5 h-5 md:w-6 md:h-6" /> Risiko jika kamu tidak pakai tools ini:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Kompetitor kamu sudah duluan ambil leads",
                                    "Leads yang harusnya jadi milikmu diambil orang lain",
                                    "Kamu tetap buang waktu manual yang membosankan",
                                    "Market kamu habis diserbu kompetitor yang lebih cepat",
                                    "Kamu boncos waktu & tenaga tanpa hasil pasti"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm md:text-base">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* The Gain */}
                        <div className="p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30">
                            <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 flex items-center gap-2 text-green-600">
                                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" /> Sekarang kamu bisa otomatis:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Scraping leads berdasarkan keyword & lokasi",
                                    "Filter data bisnis sesuai target market",
                                    "Simpan ke database rapi otomatis",
                                    "Kirim WhatsApp massal langsung dari sistem",
                                    "Hemat waktu hingga 90%"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-bold text-sm md:text-base">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* How it Works Visual */}
                    <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
                        <div className="bg-slate-900 rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 text-white overflow-hidden border border-slate-800 shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-full md:w-[500px] h-full md:h-[500px] bg-blue-500/10 blur-[100px] rounded-full" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                                <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/30 mx-auto md:mx-0">
                                        🎥 LIHAT CARA KERJANYA
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black leading-tight mt-4">Ambil 1.000+ Leads dalam <span className="text-blue-500">Hitungan Menit.</span></h3>
                                    <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
                                        Cukup masukkan kata kunci (misal: "Cafe Jakarta") dan biarkan sistem bekerja. Kamu akan mendapatkan nama bisnis, alamat lengkap, dan yang terpenting: <span className="text-white font-bold italic">Nomor WhatsApp Valid!</span>
                                    </p>
                                    <div className="flex justify-center md:justify-start gap-4">
                                        <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="text-xl md:text-2xl font-black text-blue-500">30s</div>
                                            <div className="text-[8px] md:text-[10px] font-bold uppercase text-slate-500">Waktu Scrape</div>
                                        </div>
                                        <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="text-xl md:text-2xl font-black text-green-500">100%</div>
                                            <div className="text-[8px] md:text-[10px] font-bold uppercase text-slate-500">Real Data</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                    <img
                                        src="/scraping_leads.webp"
                                        alt="Demo Scraping"
                                        className="relative rounded-2xl shadow-2xl border border-white/10 w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* [DESIRE] Benefits & Achievements */}
            <section className="py-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            💰 DESIRE
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black mb-6">Bayangkan Jika Kamu Punya Ini…</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {[
                            "Database leads tanpa batas setiap hari",
                            "Tidak perlu cari nomor manual lagi",
                            "Closing lebih cepat via auto follow up",
                            "Bisa jual jasa lead gen ke client",
                            "Scale bisnis tanpa tambah tim",
                            "Output data super rapi (Excel/CSV)"
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-500">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-sm">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social Proof Section ⭐ */}
                    <div className="mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black mb-4">🔥 Sudah Dipakai 1.000+ User <br /> di Indonesia</h2>
                            <p className="text-slate-500 font-medium">Bukan cuma janji, ini bukti nyata dari mereka yang sudah action.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {[
                                {
                                    name: "Andi",
                                    role: "Agency Owner",
                                    text: "Baru 2 hari pakai, sudah dapat 230 leads & closing 5 deal! Tools ini gila banget buat cari klien baru.",
                                    avatar: "A"
                                },
                                {
                                    name: "Rudi",
                                    role: "Freelancer",
                                    text: "Dulu cari leads manual berjam-jam, sekarang tinggal klik langsung muncul semua. Hemat banget waktu dan tenaga.",
                                    avatar: "R"
                                }
                            ].map((testimonial, i) => (
                                <div key={i} className="p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block">
                                        <MessageSquare className="w-24 h-24" />
                                    </div>
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} className="w-4 h-4 text-amber-500" />)}
                                    </div>
                                    <p className="text-base md:text-lg font-bold mb-6 italic">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm md:text-base">{testimonial.avatar}</div>
                                        <div>
                                            <div className="font-black text-sm md:text-base text-slate-900 dark:text-white">{testimonial.name}</div>
                                            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Screenshot Results */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="rounded-3xl border-4 border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                                    <img src="/scraping_leads.webp" alt="Hasil Scraping" className="w-full" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="rounded-3xl border-4 border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                                    <img src="/whatsapp_success.webp" alt="Hasil WA Broadcast" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features List (Fitur Unggulan) */}
            <section className="py-24 bg-white dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black mb-16 text-center">🔥 Fitur Unggulan</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Auto Scraping Maps", icon: Search },
                            { title: "Data Nama, Alamat, No Whatsapp, DLL", icon: MapPin },
                            { title: "Export CSV / Excel", icon: Download },
                            { title: "WA Broadcast Otomatis", icon: MessageSquare },
                            { title: "Template Pesan", icon: LayoutDashboard },
                            { title: "Anti Ribet & Simpel", icon: Zap },
                            { title: "User Friendly", icon: UserCircle2 },
                            { title: "Tanpa Perlu Coding", icon: Rocket }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-colors group">
                                <feature.icon className="w-6 h-6 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="font-bold">{feature.title}</h4>
                                <div className="flex items-center gap-1 mt-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Verified</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* [CONVICTION] Why Choose Us */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            🧠 CONVICTION
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black mb-6">Kenapa Harus Pakai Tools Ini?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
                        {[
                            { title: "Sudah Teruji", desc: "Digunakan oleh banyak user aktif setiap hari." },
                            { title: "Hemat Biaya", desc: "Jauh lebih murah dibanding hiring tim data." },
                            { title: "Selalu Update", desc: "Support sistem & pembaruan fitur berkala." },
                            { title: "Sangat Aman", desc: "Privasi data terjaga aman & sistem stabil." }
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mx-auto">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h4 className="font-black text-lg">{item.title}</h4>
                                <p className="text-sm text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bonus Section (UPGRADED) */}
                    <div className="mt-24 max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl md:text-4xl font-black mb-4 flex items-center justify-center gap-3">
                                <Gift className="w-10 h-10 text-pink-500" /> 🎁 BONUS EKSKLUSIF (GRATIS)
                            </h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Hanya untuk pembeliaan hari ini!</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* FB Bot Highlight */}
                            <div className="p-6 md:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 border border-white/30">
                                        MOST WANTED BONUS
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-2 leading-tight">
                                        <Zap className="w-5 h-5 text-amber-300 shrink-0" /> 🤖 Auto Post Facebook Group Bot
                                    </h4>
                                    <p className="text-blue-100 font-medium mb-6 md:mb-8 text-sm md:text-base">
                                        Otomatis posting promosi ke grup Facebook tertarget. Generate leads tambahan tanpa effort manual!
                                    </p>
                                    <ul className="space-y-3 mb-6 md:mb-8 text-xs md:text-sm font-bold">
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Auto Posting ke Ribuan Grup</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Schedule Post Teratur</li>
                                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Anti-Spam Protection</li>
                                    </ul>
                                    <div className="rounded-2xl border border-white/20 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                                        <img src="/facebook_bot.png" alt="FB Bot UI" className="w-full h-auto" />
                                    </div>
                                </div>
                            </div>

                            {/* Other Bonuses */}
                            <div className="grid gap-6">
                                {[
                                    {
                                        title: "Template Copywriting High Converting",
                                        desc: "Kumpulan script chat WA yang sudah terbukti menghasilkan closing tinggi.",
                                        icon: MessageSquare,
                                        color: "bg-pink-100 text-pink-600"
                                    },
                                    {
                                        title: "Database Niche Siap Pakai",
                                        desc: "Dapatkan akses ke ribuan data bisnis yang sudah kami filter untuk langsung jualan.",
                                        icon: Layers,
                                        color: "bg-indigo-100 text-indigo-600"
                                    },
                                    {
                                        title: "Video Tutorial + Strategi Scale Leads",
                                        desc: "Panduan lengkap dari nol sampai cara scale leads jadi profit jutaan.",
                                        icon: Rocket,
                                        color: "bg-amber-100 text-amber-600"
                                    }
                                ].map((bonus, i) => (
                                    <div key={i} className="p-5 md:p-6 bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-start gap-4 md:gap-5 hover:border-blue-500 transition-colors">
                                        <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl shrink-0 ${bonus.color}`}>
                                            <bonus.icon className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h5 className="font-black text-base md:text-lg mb-1">{bonus.title}</h5>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium">{bonus.desc}</p>
                                            <div className="mt-3 inline-flex items-center gap-1 text-[9px] md:text-[10px] font-black text-green-500 uppercase tracking-widest">
                                                <Check className="w-3 h-3" /> Included Free
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden mt-24">
                        <div className="p-6 md:p-8 bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between">
                            <h3 className="text-lg md:text-xl font-bold">📊 Perbandingan</h3>
                            <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">Market Analysis</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-slate-50 dark:border-slate-800">
                                        <th className="px-6 md:px-8 py-4 md:py-6 font-bold text-slate-400 uppercase text-[10px] md:text-xs tracking-widest w-1/2">Cara Manual</th>
                                        <th className="px-6 md:px-8 py-4 md:py-6 font-black text-blue-600 uppercase text-[10px] md:text-xs tracking-widest">Wamaps Tools</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {[
                                        { manual: "Cari 1-1 satu per satu", auto: "Auto scraping ribuan data" },
                                        { manual: "Proses Sangat Lama", auto: "Super Cepat (Detik/Menit)" },
                                        { manual: "Capek & Menghabiskan Tenaga", auto: "Tinggal Klik & Santai" },
                                        { manual: "Sulit Skala Bisnis", auto: "Sangat Scalable (Tanpa Batas)" }
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-6 md:px-8 py-4 md:py-6 text-slate-500 font-medium text-xs md:text-sm">{row.manual}</td>
                                            <td className="px-6 md:px-8 py-4 md:py-6 font-bold flex items-center gap-2 text-xs md:text-sm">
                                                <Zap className="w-4 h-4 text-amber-500 shrink-0" /> {row.auto}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* [PRICING] Pricing Section */}
            <section id="pricing" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            💎 PRICING PLANS
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Pilih Paket Penjualanmu</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Dapatkan akses seumur hidup ke semua fitur canggih Wamaps dengan satu kali pembayaran saja.</p>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative w-full max-w-lg p-6 sm:p-8 md:p-10 bg-white dark:bg-slate-900 rounded-3xl md:rounded-[3rem] border-2 border-blue-500 transition-all hover:scale-[1.02] hover:shadow-2xl shadow-blue-500/10 flex flex-col items-center text-center">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                                PRO VERSION - LIFETIME ACCESS
                            </div>

                            <div className="mb-6 md:mb-10 w-full flex flex-col items-center mt-4 md:mt-0">
                                <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4 md:mb-6">
                                    <Crown className="w-10 h-10 md:w-12 md:h-12" />
                                </div>
                                <h3 className="text-base md:text-xl font-black text-slate-400 uppercase tracking-widest mb-2">💎 SEKALI BAYAR = AKSES SEUMUR HIDUP</h3>
                                <div className="flex flex-col items-center mb-6">
                                    <span className="text-4xl md:text-5xl font-black text-blue-600">Rp 149.000</span>
                                    <span className="text-xs md:text-sm font-bold text-slate-400 mt-2 uppercase tracking-tighter">Selamanya. Tanpa biaya tambahan.</span>
                                </div>

                                {/* Comparison Logic */}
                                <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-3 mb-6 md:mb-8">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bayangkan Perbandingannya:</p>
                                    <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                                        <span className="text-slate-500">Tools Lain (Langganan)</span>
                                        <span className="text-red-500">Rp 99rb / bln</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs md:text-sm font-black border-b border-slate-200 dark:border-slate-700 pb-2">
                                        <span className="text-slate-500">Total 1 Tahun</span>
                                        <span className="text-red-500">Rp 1.188.000</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm md:text-md font-black pt-2">
                                        <span className="text-blue-600">Di Wamaps?</span>
                                        <span className="text-blue-600">Cuma Rp 149rb</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 md:mb-10 space-y-4 md:space-y-5 w-full">
                                <p className="text-base md:text-lg text-slate-500 leading-relaxed font-bold">Dapatkan semua fitur tanpa batasan apapun.</p>
                                <div className="grid grid-cols-1 gap-3 md:gap-4 text-left">
                                    {[
                                        "Akses Google Maps Scraper Tanpa Batas",
                                        "WhatsApp Broadcast Massal Otomatis",
                                        "Scraping Nama, No WA, Alamat, Website",
                                        "LIFETIME Update Fitur Selamanya",
                                        "BONUS Group FB Bot + Copywriting",
                                        "Gratis Update Fitur Selamanya",
                                        "Support Prioritas 24/7"
                                    ].map((feature, j) => (
                                        <div key={j} className="flex items-start gap-3 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={`/checkout?plan=premium&amount=149000`}
                                className="w-full group flex items-center justify-center gap-4 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-black transition-all active:scale-95 shadow-xl bg-blue-600 text-white shadow-blue-500/30 hover:scale-[1.05]"
                            >
                                BELI SEKARANG
                                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform" />
                            </Link>

                            <p className="mt-6 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-tight">
                                🔥 Limited Offer: Harga normal Rp 499.000
                            </p>
                        </div>
                    </div>


                    <div className="mt-20 text-center">
                        <p className="text-slate-400 text-sm font-bold flex items-center justify-center gap-4">
                            <ShieldCheck className="w-5 h-5 text-blue-500" /> Pembayaran Aman & Aktivasi Instant via QRIS/Bank Transfer
                        </p>
                    </div>
                </div>
            </section>

            {/* Who is NOT for Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5 hidden md:block">
                            <Users className="w-32 h-32" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative z-10">
                            <div className="flex-1 space-y-6">
                                <h3 className="text-lg md:text-xl font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                                    <XCircle className="w-6 h-6" /> TIDAK Cocok Untuk:
                                </h3>
                                <ul className="space-y-4 font-bold text-sm md:text-base text-slate-600 dark:text-slate-400">
                                    <li className="flex items-center gap-3"><Minus className="w-4 h-4 text-red-500 shrink-0" /> Yang malas action</li>
                                    <li className="flex items-center gap-3"><Minus className="w-4 h-4 text-red-500 shrink-0" /> Yang tidak mau belajar sama sekali</li>
                                    <li className="flex items-center gap-3"><Minus className="w-4 h-4 text-red-500 shrink-0" /> Yang cari hasil instan tanpa usaha</li>
                                </ul>
                            </div>
                            <div className="w-full h-px md:w-px md:h-auto bg-slate-100 dark:bg-slate-800" />
                            <div className="flex-1 space-y-6">
                                <h3 className="text-lg md:text-xl font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6" /> SANGAT Cocok Untuk:
                                </h3>
                                <ul className="space-y-4 font-bold text-sm md:text-base text-slate-600 dark:text-slate-400">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500 shrink-0" /> Yang serius cari leads bisnis</li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500 shrink-0" /> Yang mau scale up penjualan</li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-green-500 shrink-0" /> Marketer & Agency Owner</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section (UPGRADED) */}
            <section className="py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                        <MessageSquare className="w-8 h-8 text-blue-500" /> FAQ
                    </h2>
                    <div className="grid md:grid-cols-1 gap-4">
                        {[
                            {
                                q: "Apakah nomor yang didapat valid?",
                                a: "Sangat valid. Sistem kami hanya mengambil data bisnis aktif yang terdaftar di Google Maps secara real-time."
                            },
                            {
                                q: "Apakah aman untuk akun WhatsApp?",
                                a: "Sangat aman. Kami menggunakan metode pengiriman yang sudah teruji digunakan oleh ribuan user kami tanpa kendala banned selama mengikuti panduan."
                            },
                            {
                                q: "Apakah cocok untuk pemula?",
                                a: "Sangat cocok! Kamu tidak butuh pengalaman digital marketing atau coding. Cukup masukkan keyword, klik, dan dapat data."
                            },
                            {
                                q: "Ada biaya bulanan?",
                                a: "TIDAK ADA. Cukup sekali bayar dan kamu mendapatkan akses penuh seumur hidup beserta semua update di masa depan."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 md:p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-colors">
                                <h4 className="font-black text-base md:text-lg mb-3 flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500 shrink-0 mt-0.5" />
                                    <span>Q: {faq.q}</span>
                                </h4>
                                <div className="pl-8 md:pl-9">
                                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium italic">A: {faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* [CONVERSION] Final CTA Section */}
            <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 blur-[120px] opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
                    <div className="space-y-4">
                        <div className="text-2xl font-black text-blue-600 uppercase tracking-tighter">🔥 LIMITED OFFER</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
                            Ambil Akses Lifetime <br />
                            Sekarang Juga!
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-bold max-w-2xl mx-auto">
                            Klik tombol di bawah & mulai ambil leads pertama kamu dalam <span className="text-blue-600 underline">5 menit.</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                        <Link
                            href="/checkout?plan=premium&amount=149000"
                            className="group flex flex-col items-center gap-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 md:px-12 py-5 md:py-6 rounded-3xl md:rounded-[3rem] transition-all hover:scale-105 active:scale-95 shadow-3xl hover:shadow-blue-500/50 w-full sm:w-auto"
                        >
                            <div className="flex items-center gap-4 text-xl md:text-2xl font-black">
                                AKSES SEKARANG
                                <Rocket className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Sekali Bayar • Akses Selamanya</span>
                        </Link>

                        {/* Urgency */}
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-6 md:p-8 rounded-3xl space-y-3 w-full max-w-2xl">
                            <p className="text-red-600 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                                <Clock className="w-5 h-5" /> PENTING:
                            </p>
                            {[
                                "Harga promo Rp 149.000 bisa ditutup kapan saja",
                                "Bonus FB Group Bot terbatas untuk 50 orang pertama",
                                "Jangan biarkan kompetitor mengambil market kamu"
                            ].map((u, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 text-[10px] md:text-xs font-bold italic text-center">
                                    <Check className="w-3 h-3 text-red-500 shrink-0" /> {u}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing Emosional */}
            <section className="py-24 bg-slate-900 text-center text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h3 className="text-2xl md:text-5xl font-black mb-8 italic">🔥 Ini tools yang kamu butuhkan.</h3>
                    <div className="space-y-4 text-lg md:text-xl mb-12">
                        <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" /> Dapat leads tiap hari</p>
                        <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" /> Hemat waktu 90%</p>
                        <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-500 shrink-0" /> Naikkan closing penjualan</p>
                    </div>
                    <Link href="/checkout?plan=premium&amount=149000" className="inline-block bg-blue-600 text-white font-black px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-2xl hover:bg-blue-700 transition-colors shadow-2xl shadow-blue-500/20 w-full sm:w-auto">
                        Klik Sekarang Sebelum Terlambat!
                    </Link>
                    <p className="mt-8 text-blue-400 font-bold uppercase tracking-widest text-sm">Kesempatan Terbatas Untuk Akses Lifetime</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 border-t border-slate-200 dark:border-slate-800 px-4 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <Link href="/" className="flex items-center justify-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-600">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter">Wamaps</span>
                    </Link>
                    <p className="text-slate-400 text-sm font-medium">© 2026 Wamaps. Platform Scraper & Outreach B2B No. 1</p>
                    <div className="flex justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Link href="#" className="hover:text-blue-600">Privacy</Link>
                        <Link href="#" className="hover:text-blue-600">Terms</Link>
                        <Link href="#" className="hover:text-blue-600">Contact</Link>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 5s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
}
