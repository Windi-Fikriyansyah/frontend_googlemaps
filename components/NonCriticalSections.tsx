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
                        <h2 className="text-3xl md:text-5xl font-black mb-4">🔥 Mereka Sudah Membuktikan, Kini Giliran Anda Merasakan Hasilnya.</h2>
                        <p className="text-slate-500 font-medium">Bukan cuma janji, ini bukti nyata dari mereka yang sudah action.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            "https://ik.imagekit.io/bzq0b2kjq/WhatsApp%20Image%202026-04-05%20at%2010.39.32%20(1).jpeg",
                            "https://ik.imagekit.io/bzq0b2kjq/WhatsApp%20Image%202026-04-05%20at%2010.39.32%20(2).jpeg",
                            "https://ik.imagekit.io/bzq0b2kjq/WhatsApp%20Image%202026-04-05%20at%2010.39.32.jpeg"
                        ].map((url, i) => (
                            <div key={i} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                                    <Image
                                        src={url}
                                        alt={`Testimoni ${i + 1}`}
                                        width={400}
                                        height={800}
                                        className="w-full h-auto object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        ))}
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
                            a: "Sangat aman. Wamaps dirancang dengan teknologi 'Human-Like Sending' yang dilengkapi fitur delay (jeda waktu antar pesan) dan simulasi mengetik, sehingga aktivitas pengiriman kamu terlihat natural dan meminimalisir risiko banned."
                        },
                        {
                            q: "Apakah cocok untuk pemula?",
                            a: "Sangat cocok! Kamu tidak butuh pengalaman digital marketing atau coding. Cukup masukkan keyword, klik, dan dapat data."
                        },
                        {
                            q: "Apakah ada biaya langganan/bulanan?",
                            a: "TIDAK ADA. Sekali lagi kami tekankan: Cukup SEKALI BAYAR, Anda mendapatkan akses LIFETIME (Seumur Hidup) selamanya tanpa biaya tambahan apapun lagi di kemudian hari."
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
