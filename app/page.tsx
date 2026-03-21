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

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto">
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
                            href="/login"
                            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-500 text-white px-10 py-5 rounded-full text-xl font-black transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/30"
                        >
                            Mulai Sekarang Gratis
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
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Kenapa Tools Ini Powerful?</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* The Pain */}
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-red-600">
                                <XCircle className="w-6 h-6" /> Selama ini, cari leads itu:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Manual satu-satu",
                                    "Copy paste capek",
                                    "Nomor tidak tersusun",
                                    "Follow up sangat lama"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* The Gain */}
                        <div className="p-8 md:p-12 rounded-[2.5rem] bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-green-600">
                                <CheckCircle2 className="w-6 h-6" /> Sekarang kamu bisa otomatis:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Scraping leads berdasarkan keyword & lokasi",
                                    "Filter data bisnis sesuai target market",
                                    "Simpan ke database rapi otomatis",
                                    "Kirim WhatsApp massal langsung dari sistem",
                                    "Hemat waktu hingga 90%"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold">
                                        <Check className="w-5 h-5 text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="mt-24 text-center">
                        <div className="inline-block px-4 py-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-12">
                            💡 Cara Kerjanya (Simple Banget)
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                "Masukkan keyword",
                                "Pilih lokasi",
                                "Klik 'Ambil Leads'",
                                "Data masuk otomatis",
                                "Klik 'Broadcast'",
                                "Pesan Terkirim!"
                            ].map((step, i) => (
                                <div key={i} className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="text-2xl font-black text-slate-200 dark:text-slate-800 mb-2">{i + 1}</div>
                                    <div className="text-xs font-bold leading-tight">{step}</div>
                                    {i < 5 && <ChevronRight className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block text-slate-200" />}
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 text-2xl font-black text-blue-600 italic animate-pulse">⚡ Semua otomatis!</p>
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
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Bayangkan Jika Kamu Punya Ini…</h2>
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

                    {/* Social Proof Mini */}
                    <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden text-center md:text-left">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="md:flex-1 space-y-4">
                                <p className="text-xs font-black uppercase tracking-widest text-blue-200">Banyak User Sudah:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 font-black text-xl md:text-3xl">
                                        <CheckCircle2 className="w-8 h-8 text-blue-300" /> Dapat 100+ leads per hari
                                    </li>
                                    <li className="flex items-center gap-4 font-black text-xl md:text-3xl">
                                        <CheckCircle2 className="w-8 h-8 text-blue-300" /> Closing lebih cepat via WA
                                    </li>
                                    <li className="flex items-center gap-4 font-black text-xl md:text-3xl">
                                        <CheckCircle2 className="w-8 h-8 text-blue-300" /> Bikin agency lead gen sendiri
                                    </li>
                                </ul>
                            </div>
                            <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20">
                                <Rocket className="w-24 h-24 text-white animate-bounce-slow" />
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
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Kenapa Harus Pakai Tools Ini?</h2>
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

                    {/* Comparison Table */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                        <div className="p-8 bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between">
                            <h3 className="text-xl font-bold">📊 Perbandingan</h3>
                            <div className="text-xs font-bold uppercase tracking-widest opacity-50">Market Analysis</div>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 dark:border-slate-800">
                                    <th className="px-8 py-6 font-bold text-slate-400 uppercase text-xs tracking-widest w-1/2">Cara Manual</th>
                                    <th className="px-8 py-6 font-black text-blue-600 uppercase text-xs tracking-widest">Wamaps Tools</th>
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
                                        <td className="px-8 py-6 text-slate-500 font-medium">{row.manual}</td>
                                        <td className="px-8 py-6 font-bold flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-amber-500" /> {row.auto}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bonus Section */}
                    <div className="mt-24 text-center">
                        <h3 className="text-2xl font-black mb-8 flex items-center justify-center gap-2">
                            <Gift className="w-8 h-8 text-pink-500" /> BONUS KHUSUS
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                "Template Chat WA Siap Pakai",
                                "Tutorial Lengkap Penggunaan",
                                "Strategi Closing via WhatsApp",
                                "Script Follow-up Otomatis"
                            ].map((bonus, i) => (
                                <div key={i} className="px-6 py-4 bg-gradient-to-r from-pink-50 to-indigo-50 dark:from-pink-950/20 dark:to-indigo-950/20 rounded-2xl border border-pink-100 dark:border-pink-900/30 text-sm font-bold flex items-center gap-3">
                                    <HelpCircle className="w-4 h-4 text-pink-500" /> {bonus}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* [CONVERSION] Final CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 blur-[120px] opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
                    <div className="space-y-2">
                        <div className="text-2xl font-black text-blue-600 uppercase tracking-tighter">🚀 CALL TO ACTION</div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1]">
                            🔥 Mulai Sekarang & Ambil <br />
                            Leads Pertamamu!
                        </h2>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium">
                        Jangan sampai kompetitor kamu <span className="text-red-500 font-bold underline">lebih dulu</span> pakai ini.
                    </p>

                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href="/login"
                            className="group flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-7 rounded-[2.5rem] text-3xl font-black transition-all hover:scale-105 active:scale-95 shadow-3xl hover:shadow-blue-500/50"
                        >
                            DAFTAR & MULAI SEKARANG
                            <Rocket className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                        </Link>

                        {/* Urgency */}
                        <div className="space-y-2">
                            {[
                                "Akses terbatas untuk pendaftar hari ini",
                                "Harga bisa naik sewaktu-waktu",
                                "Bonus hanya berlaku hari ini"
                            ].map((u, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-red-500 text-xs font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" /> {u}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black mb-12 text-center flex items-center justify-center gap-3">
                        <MessageSquare className="w-8 h-8 text-blue-500" /> FAQ
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "Apakah harus bisa coding?", a: "Tidak, tinggal pakai saja. Interface didesain sangat mudah digunakan untuk siapa pun." },
                            { q: "Bisa kirim WhatsApp otomatis?", a: "Ya, sistem kami terintegrasi untuk mengirim pesan massal secara otomatis." },
                            { q: "Data didapat dari mana?", a: "Data diambil secara real-time langsung dari database ter-update Google Maps." },
                            { q: "Apakah ini aman?", a: "Sangat aman. Sudah dirancang khusus untuk memenuhi standar penggunaan bisnis yang stabil." }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-black text-lg mb-2">Q: {faq.q}</h4>
                                <p className="text-slate-500 dark:text-slate-400">A: {faq.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-center text-white space-y-8">
                        <h3 className="text-3xl font-black">🔥 PENUTUP</h3>
                        <div className="space-y-4 text-xl">
                            <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-6 h-6 text-green-500" /> Dapat leads tiap hari</p>
                            <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-6 h-6 text-green-500" /> Hemat waktu 90%</p>
                            <p className="flex justify-center items-center gap-2"><CheckCircle2 className="w-6 h-6 text-green-500" /> Naikkan closing penjualan</p>
                        </div>
                        <p className="text-blue-400 font-bold italic text-2xl">👉 Ini tools yang kamu butuhkan.</p>
                        <Link href="/login" className="inline-block text-white font-black underline text-xl hover:text-blue-300 transition-colors">
                            Klik sekarang sebelum terlambat!
                        </Link>
                    </div>
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
