"use client";
import Navbar from "@/components/Navbar";
import { MessageSquare, Mail, Headset } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-[#191c1e] dark:text-slate-100 antialiased font-sans">
            <Navbar />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 text-center space-y-8">
                    <div className="w-20 h-20 bg-[#0077B6]/10 text-[#0077B6] dark:text-blue-400 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 dark:border-blue-900/30">
                        <Headset className="w-10 h-10" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#0077B6] dark:text-blue-400 tracking-tighter">Pusat Bantuan & Kontak</h1>
                    <p className="text-gray-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Punya pertanyaan seputar produk, pembayaran, atau butuh bantuan teknis terkait Wamaps? Tim support kami selalu siap membantu Anda kapan saja!
                    </p>

                    <div className="pt-8 grid md:grid-cols-2 gap-6 text-left items-center justify-center max-w-xs mx-auto md:max-w-none">
                        {/* Kontak WA */}
                        <div className="p-8 border border-blue-50 dark:border-blue-900/10 bg-[#0077B6]/5 dark:bg-blue-950/20 rounded-3xl hover:shadow-lg transition-shadow col-span-2">
                            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 shadow-sm border border-blue-100 dark:border-blue-900/30">
                                <MessageSquare className="w-6 h-6 text-[#0077B6] dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-[#0077B6] dark:text-blue-400">Live Chat WhatsApp</h3>
                            <p className="text-gray-600 dark:text-slate-400 mb-6 text-sm font-medium leading-relaxed">Butuh respons sangat cepat di jam kerja? Segera chat tim admin kami.</p>
                            <a href="https://wa.me/6289678386070" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white bg-[#0077B6] dark:bg-blue-600 px-6 py-3 rounded-xl hover:bg-[#005c8d] dark:hover:bg-blue-700 transition-all active:scale-95 text-sm shadow-md shadow-blue-500/20">
                                Hubungi via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 dark:bg-slate-950 py-20 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        {/* Brand Info */}
                        <div className="space-y-6">
                            <div className="flex items-center text-2xl font-black text-blue-600">
                                <svg className="w-8 h-8 mr-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <rect width="32" height="32" rx="8" fill="#145efc" />
                                    <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="2.5" />
                                    <circle cx="16" cy="16" r="4.5" stroke="white" strokeWidth="2.5" />
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
                                    <li key={i}><Link href="/#features" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors font-medium">{f}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Produk */}
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Produk</h3>
                            <ul className="space-y-4">
                                <li><Link href="/#pricing" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors font-medium">Harga</Link></li>
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
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col lg:grid-2 justify-between items-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <div>© 2026 Wamaps. All rights reserved.</div>
                        <div className="flex space-x-6">
                            <Link className="hover:text-blue-600 transition-colors" href="/privacy">Privacy Policy</Link>
                            <Link className="hover:text-blue-600 transition-colors" href="/terms">Terms of Service</Link>
                            <Link className="hover:text-blue-600 transition-colors" href="/support">Support</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
