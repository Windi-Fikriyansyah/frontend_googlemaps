"use client";
import { CheckCircle2, MessageSquare, Sparkles, Check, HelpCircle, Rocket, Gift, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SocialProof() {
    return (
        <section className="py-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
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
                                <p className="text-lg font-bold mb-6 italic text-slate-800 dark:text-slate-100">"{testimonial.text}"</p>
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

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="rounded-3xl border-4 border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                                <Image src="/scraping_leads.webp" alt="Hasil Scraping" width={651} height={713} sizes="(max-width: 768px) 100vw, 50vw" className="w-full" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-3xl border-4 border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
                                <Image src="/whatsapp_success.webp" alt="Hasil WA Broadcast" width={651} height={570} sizes="(max-width: 768px) 100vw, 50vw" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function FAQ() {
    return (
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
                            <h3 className="font-black text-base md:text-lg mb-3 flex items-start gap-3 text-slate-900 dark:text-white">
                                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-500 shrink-0 mt-0.5" />
                                <span>Q: {faq.q}</span>
                            </h3>
                            <div className="pl-8 md:pl-9">
                                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-bold italic">A: {faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
