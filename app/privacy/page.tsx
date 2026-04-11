"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-[#191c1e] dark:text-slate-100 antialiased font-sans">
            <Navbar />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 space-y-8">
                    <div className="text-center border-b border-gray-100 dark:border-slate-800 pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-[#0077B6] dark:text-blue-400 tracking-tighter mb-4">Kebijakan Privasi</h1>
                        <p className="text-gray-500 dark:text-slate-400 font-medium">Pembaruan Terakhir: 10 April 2026</p>
                    </div>
                    
                    <div className="space-y-6 text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Pendahuluan</h2>
                            <p>Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menguraikan bagaimana Wamaps mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda secara etis ketika Anda memakai layanan kami.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Pengumpulan Data</h2>
                            <p>Mencakup nama, alamat email yang Anda berikan pada saat registrasi / checkout pembayaran maupun nomor/akun yang direpresentasikan pada alat otomasi. Termasuk riwayat transaksi yang dijaga transparan dan aman antara platform penyedia pihak ketiga.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Tujuan Penggunaan</h2>
                            <p>Informasi dikumpulkan hanya untuk: aktivasi izin software, tagihan pembayaran, menunjang kebutuhan dukungan Anda ke Support, dan pemberitahuan update server utama platform kami.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Keamanan Informasi</h2>
                            <p>Server kami menggunakan standar keamanan SSL terbaru untuk mengenkripsi aliran data, kata sandi, dan data penagihan. Kami juga menjamin untuk menghindari dan tidak pernah menjual atau menukar informasi pribadi / data target yang ditarik klien kepada agen pemasaran lain di luar persetujuan.</p>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Cookies</h2>
                            <p>Layanan kami secara minimalis menaruh "cookie" untuk menyimpan sesi sesi yang aktif dari para Pengguna. Anda dimohon agar tidak menolak fungsi ini di browser agar dashboard bisa menyala secara normal dan responsif.</p>
                        </section>
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
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col lg:grid-cols-2 justify-between items-center gap-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
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
