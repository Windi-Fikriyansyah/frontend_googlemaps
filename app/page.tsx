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
    HelpCircle
} from "lucide-react";

const pricingPlans = [
    {
        name: "Micro Pack",
        price: "50.000",
        credits: "300",
        pricePerCredit: "166",
        label: "Coba-coba",
        icon: Zap,
        color: "from-slate-500 to-slate-600",
        bgColor: "bg-slate-50 dark:bg-slate-800/50",
        borderColor: "border-slate-200 dark:border-slate-700",
        features: ["300 Kredit", "Rp 166 per Kredit", "Masa Aktif Selamanya", "Semua Fitur"],
    },
    {
        name: "Lite Pack",
        price: "150.000",
        credits: "1.000",
        pricePerCredit: "150",
        label: "Best Value",
        icon: Sparkles,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        features: ["1.000 Kredit", "Rp 150 per Kredit", "Masa Aktif Selamanya", "Semua Fitur"],
    },
    {
        name: "Growth Pack",
        price: "500.000",
        credits: "4.500",
        pricePerCredit: "111",
        label: "Paling Populer",
        icon: Rocket,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
        borderColor: "border-purple-300 dark:border-purple-700",
        features: ["4.500 Kredit", "Rp 111 per Kredit", "Masa Aktif Selamanya", "Semua Fitur"],
        popular: true,
    },
    {
        name: "Business Pack",
        price: "1.000.000",
        credits: "10.000",
        pricePerCredit: "100",
        label: "Akurasi Tinggi",
        icon: Crown,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
        borderColor: "border-amber-300 dark:border-amber-700",
        features: ["10.000 Kredit", "Rp 100 per Kredit", "Masa Aktif Selamanya", "Semua Fitur"],
        bestValue: true,
    },
];

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in">
                        <Gift className="w-3.5 h-3.5" />
                        Dapatkan 50 Kredit Gratis Untuk Pendaftaran Pertama
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        Cari Lead di Maps. <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                            Closing di WhatsApp.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                        Mesin outreach B2B terbaik. Ekstrak data bisnis dari Google Maps
                        dan mulai percakapan WhatsApp secara personal dalam hitungan menit.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="group flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/30"
                        >
                            Daftar & Klaim 50 Kredit
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors shadow-sm"
                        >
                            View Demo
                        </Link>
                    </div>

                    {/* Dashboard Preview Section */}
                    <div className="mt-24 relative max-w-6xl mx-auto">
                        <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl -z-10 opacity-50"></div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] flex items-center justify-center p-4">
                            <div className="w-full h-full rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
                                {/* Side A: Maps Search Preview */}
                                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                        <Search className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Local Business Scraper</h3>
                                        <p className="text-sm text-slate-500">Cari berdasarkan kategori & Kota</p>
                                    </div>
                                </div>
                                {/* Side B: WhatsApp Preview */}
                                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                        <MessageSquare className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">WhatsApp Automation</h3>
                                        <p className="text-sm text-slate-500">Broadcast Bulk & CRM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute -top-12 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow hidden lg:block">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold">100%</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Database Terverifikasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section id="features" className="py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Semua yang Anda Butuhkan untuk Berkembang</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Tinggalkan cara manual. Kami menggabungkan ekstraksi data dan outreach dalam satu platform canggih.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Maps Scraper */}
                        <div className="group p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-2xl">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-600 text-white mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Deep Google Scraper</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Ekstrak nama, nomor telepon, website, dan rating dari bisnis apa pun di Google Maps dengan satu klik.
                            </p>
                            <ul className="space-y-3">
                                {["Pencarian Radius", "Filter Kategori", "Export ke CSV/Excel"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* WhatsApp Broadcast */}
                        <div className="group p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-green-500 dark:hover:border-green-400 transition-all hover:shadow-2xl">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-green-600 text-white mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Smart Broadcast</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Hubungkan akun WhatsApp Anda sendiri dan kirim pesan personal ke ratusan lead sekaligus.
                            </p>
                            <ul className="space-y-3">
                                {["Template Personal", "Pengiriman Instan", "Sinkronisasi Perangkat"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CRM & Management */}
                        <div className="group p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-2xl">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-600 text-white mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">CRM Lead</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                Kelola daftar lead, pantau riwayat interaksi, dan kelola follow-up Anda dalam satu dashboard yang bersih.
                            </p>
                            <ul className="space-y-3">
                                {["Pelacakan Status", "Sistem Tagging", "Simpan Pencarian"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                        <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How Credits Work Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full" />
                            <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-blue-600">
                                        <HelpCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-black">Bagaimana Kredit Bekerja?</h2>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { title: "Sistem Pay-as-you-go", desc: "Anda hanya membayar untuk apa yang Anda gunakan. Tidak ada biaya bulanan yang mengikat." },
                                        { title: "Penggunaan Kredit", desc: "Kredit digunakan saat melakukan scraping lead atau mengirim broadcast WhatsApp." },
                                        { title: "Tanpa Kadaluarsa", desc: "Kredit yang Anda beli akan tetap ada selamanya di akun Anda sampai habis digunakan." },
                                        { title: "Pengisian Mudah", desc: "Top-up kapan saja melalui berbagai metode pembayaran otomatis (QRIS, VA, E-Wallet)." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">{item.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Ekosistem Wamaps</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Transparansi Kredit untuk Keefektifan Bisnis</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Kami merancang Wamaps agar fleksibel bagi semua skala bisnis. Baik Anda freelancer
                                maupun agensi besar, sistem kredit kami memastikan investasi Anda tepat sasaran.
                            </p>
                            <div className="p-6 bg-blue-600 rounded-3xl text-white">
                                <p className="text-2xl font-bold mb-2">Bonus Pendaftaran!</p>
                                <p className="opacity-90 leading-relaxed mb-6">
                                    Daftar hari ini dan dapatkan <strong>50 Kredit GRATIS</strong> untuk mencoba semua fitur kami tanpa biaya sepeser pun.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                                >
                                    Dapatkan Sekarang <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-white dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Pilih Paket Kredit Anda</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Dapatkan harga terbaik dengan membeli paket kredit yang lebih besar.
                            Semua paket mendapatkan akses ke semua fitur premium.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingPlans.map((plan, i) => (
                            <div
                                key={i}
                                className={`relative rounded-[2.5rem] border-2 p-8 transition-all hover:scale-[1.03] flex flex-col ${plan.popular
                                    ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 shadow-2xl shadow-purple-500/10"
                                    : plan.bestValue
                                        ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Paling Populer
                                    </div>
                                )}
                                {plan.bestValue && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Value Terbaik
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${plan.color} text-white mb-4`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">{plan.label}</p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-slate-500">Rp</span>
                                        <span className="text-4xl font-black">{plan.price}</span>
                                    </div>
                                    <p className="text-sm font-medium text-blue-600 mt-2">{plan.credits} Kredit</p>
                                    <p className="text-xs text-slate-500 mt-1">Rp {plan.pricePerCredit} / kredit</p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-3 text-sm font-medium">
                                            <Check className="w-4 h-4 text-green-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/pricing"
                                    className={`w-full py-4 rounded-2xl text-center font-bold transition-all ${plan.popular
                                        ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/30"
                                        : plan.bestValue
                                            ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/30"
                                            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                                        }`}
                                >
                                    Pilih Paket
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-left">
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.2]">
                                Dari Pencarian hingga <br />
                                <span className="text-blue-600">Percakapan</span> dalam 3 Langkah
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Cari Bisnis", desc: "Masukkan kategori target dan lokasi Anda (contoh: 'Coffee Shop di Jakarta')." },
                                    { step: "02", title: "Ekstraksi Instan", desc: "Mesin kami akan mengambil semua data yang tersedia termasuk nomor WhatsApp." },
                                    { step: "03", title: "Mulai Outreach", desc: "Gunakan template kami untuk mengirim pesan dan pantau tingkat responnya." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-3xl font-black text-slate-200 dark:text-slate-800">{step.step}</span>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                            <p className="text-slate-500 dark:text-slate-400">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-[2.5rem] shadow-2xl relative z-10">
                                <div className="bg-slate-900 border border-white/10 rounded-[2.3rem] p-8 aspect-square flex items-center justify-center overflow-hidden">
                                    {/* Mobile Mockup Concept */}
                                    <div className="w-[280px] h-[580px] bg-slate-800 rounded-[3rem] border-8 border-slate-950 relative overflow-hidden shadow-inner">
                                        <div className="absolute top-0 w-full h-8 bg-black/20 flex items-center justify-center">
                                            <div className="w-12 h-1 bg-white/20 rounded-full" />
                                        </div>
                                        <div className="p-4 pt-12 space-y-4">
                                            <div className="h-10 bg-blue-500/20 rounded-lg flex items-center px-4 gap-3">
                                                <div className="w-4 h-4 rounded-full bg-blue-500" />
                                                <div className="w-2/3 h-2 bg-blue-500/30 rounded" />
                                            </div>
                                            <div className="h-32 bg-slate-700/50 rounded-2xl flex flex-col justify-end p-4">
                                                <div className="w-full h-2 bg-slate-600 rounded mb-2" />
                                                <div className="w-3/4 h-2 bg-slate-600 rounded" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 h-32 bg-slate-700/50 rounded-2xl" />
                                                <div className="flex-1 h-32 bg-slate-700/50 rounded-2xl" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/20 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 dark:bg-white rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl">
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white dark:text-slate-950 mb-8">
                                Siap untuk menemukan <br />
                                klien <span className="text-blue-500">Potensial</span> berikutnya?
                            </h2>
                            <p className="text-slate-400 dark:text-slate-500 text-xl mb-12 max-w-2xl mx-auto">
                                Bergabunglah dengan tim penjualan cerdas yang menggunakan Wamaps untuk mengotomatiskan pencarian dan outreach mereka.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-12 py-6 rounded-full text-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-blue-500/50"
                                >
                                    Mulai Sekarang <ArrowRight className="w-7 h-7" />
                                </Link>
                            </div>
                            <p className="mt-8 text-slate-500 dark:text-slate-400 font-medium">Tanpa kartu kredit • Akses instan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-slate-200 dark:border-slate-800 px-4 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-blue-600">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">Wamaps</span>
                            </Link>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                                Platform lead terbaik untuk bisnis B2B, tim sales, dan agensi marketing di seluruh dunia.
                            </p>
                            <div className="flex gap-4">
                                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950" />)}
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Product</h5>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                                <li><Link href="#features" className="hover:text-blue-600">Features</Link></li>
                                <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                                <li><Link href="/login" className="hover:text-blue-600">Dashboard</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">Company</h5>
                            <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                                <li><Link href="#" className="hover:text-blue-600">Tentang Kami</Link></li>
                                <li><Link href="#" className="hover:text-blue-600">Kebijakan Privasi</Link></li>
                                <li><Link href="#" className="hover:text-blue-600">Syarat Ketentuan</Link></li>
                                <li><Link href="mailto:support@wamaps.com" className="hover:text-blue-600">Kontak</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
                        <p>© 2026 Wamaps. Dirancang untuk performa.</p>
                        <div className="flex gap-8">
                            <span>Status: Operasional</span>
                            <span>Versi: 2.1.0</span>
                        </div>
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
