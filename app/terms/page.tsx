"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-[#191c1e] dark:text-slate-100 antialiased font-sans">
            <Navbar />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 space-y-8">
                    <div className="text-center border-b border-gray-100 dark:border-slate-800 pb-8">
                        <h1 className="text-3xl md:text-5xl font-black text-[#0077B6] dark:text-blue-400 tracking-tighter mb-4">Syarat & Ketentuan</h1>
                        <p className="text-gray-500 dark:text-slate-400 font-medium">Pembaruan Terakhir: 10 April 2026</p>
                    </div>

                    <div className="space-y-6 text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Penerimaan Syarat</h2>
                            <p>Dengan mengakses dan menggunakan sistem layanan Wamaps ("Aplikasi", "Kami"), Anda setuju untuk terikat oleh Syarat dan Ketentuan (Terms of Service) ini. Jika Anda tidak setuju dengan ketentuan yang berlaku, Anda dapat menahan diri untuk menggunakan layanan kami.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Lisensi dan Akses</h2>
                            <p>Wamaps memberikan Anda lisensi terbatas, non-eksklusif, tidak dapat dipindahtangankan untuk mengakses platform sesuai paket Lifetime (sekali bayar) yang Anda beli. Lisensi dilarang keras untuk dijual kembali atau disewakan kepada pihak ketiga tanpa izin resmi.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Penggunaan yang Sah</h2>
                            <p>Anda bertanggung jawab penuh atas segala aktivitas pada platform. Anda setuju untuk menggunakan informasi ekstraksi leads (seperti scraping Google Maps) maupun integrasi pesan WhatsApp secara etis dan sah, dan mematuhi aturan platform pesan lokal maupun regulasi spam/telekomunikasi di negara Anda.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Disclaimer Pemblokiran Nomor</h2>
                            <p>Wamaps memfasilitasi otomasi pengiriman pesan. Namun kami tidak bertanggung jawab atas akun WhatsApp atau Facebook klien yang terblokir atau dibanned akibat pelanggaran ketentuan pihak ketiga. Kami menggunakan sistem "human-like", namun segala risiko tetap ditanggung oleh pengguna sepenuhnya.</p>
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
