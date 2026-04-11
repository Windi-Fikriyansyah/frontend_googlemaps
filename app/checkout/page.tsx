"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, User, Wallet, RefreshCw, CheckCircle, Lock, CreditCard, Copy, Check, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { event } from "@/components/FacebookPixel";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface PaymentMethod {
    payment_method: string;
    payment_name: string;
    payment_image: string;
    fee_flat: number;
    fee_percent: number;
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "premium";

    const [loading, setLoading] = useState(false);
    const [fetchingMethods, setFetchingMethods] = useState(true);
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentResult, setPaymentResult] = useState<{
        order_id: string,
        method: string,
        payment_number: string,
        total_payment: number,
        fee: number,
        payment_url?: string,
        plan_name: string
    } | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string>("UNPAID");

    const PLANS: Record<string, { name: string, price: number, credits: number }> = {
        "premium": { name: "Wamaps Lifetime Deal", price: 149000, credits: 999999 },
    };

    const selectedPlan = PLANS[plan] || PLANS["premium"];

    // FB Pixel - InitiateCheckout
    useEffect(() => {
        if (!paymentResult) {
            event("InitiateCheckout", {
                content_category: "Subscription",
                content_ids: [plan],
                contents: [{ id: plan, quantity: 1 }],
                currency: "IDR",
                value: selectedPlan.price,
                content_name: selectedPlan.name
            });
        }
    }, [plan, selectedPlan.name, selectedPlan.price, paymentResult]);

    // Fetch methods
    useEffect(() => {
        async function loadMethods() {
            try {
                const res = await fetch(`${API_URL}/payments/linkbayar/methods`);
                const data = await res.json();
                if (data && Array.isArray(data.methods)) {
                    setMethods(data.methods);
                    if (data.methods.length > 0) setSelectedMethod(data.methods[0].payment_method);
                }
            } catch (e) {
                console.error("Failed to load methods", e);
            } finally {
                setFetchingMethods(false);
            }
        }
        loadMethods();
    }, []);

    // Polling for status
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (paymentResult && paymentStatus !== "PAID") {
            interval = setInterval(async () => {
                try {
                    const res = await fetch(`${API_URL}/payments/linkbayar/status/${paymentResult.order_id}`);
                    const data = await res.json();
                    if (data.status === "PAID" && paymentStatus !== "PAID") {
                        setPaymentStatus("PAID");
                        // FB Pixel - Purchase
                        event("Purchase", {
                            content_name: paymentResult.plan_name,
                            content_ids: [plan],
                            content_type: "product",
                            value: paymentResult.total_payment,
                            currency: "IDR",
                            order_id: paymentResult.order_id
                        });
                        clearInterval(interval);
                    }
                } catch (e) {
                    console.error("Status check error", e);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [paymentResult, paymentStatus, plan]);

    // Auto scroll to top when payment result or status changed
    useEffect(() => {
        if (paymentResult || paymentStatus === "PAID") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [paymentResult, paymentStatus]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Silakan isi nama lengkap Anda");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            toast.error("Silakan isi alamat email yang valid");
            return;
        }

        if (!selectedMethod) {
            toast.error("Silakan pilih metode pembayaran");
            return;
        }
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/payments/linkbayar/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    plan_key: plan,
                    customer_name: name,
                    customer_email: email,
                    payment_method: selectedMethod
                }),
            });

            const result = await response.json();

            if (response.ok && (result.payment_number || result.payment_url)) {
                setPaymentResult(result);
                // FB Pixel - AddPaymentInfo
                event("AddPaymentInfo", {
                    content_category: "Subscription",
                    content_ids: [plan],
                    currency: "IDR",
                    value: result.total_payment,
                    payment_method: selectedMethod
                });
            } else {
                toast.error(result.detail || "Terjadi kesalahan saat membuat pembayaran");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false);
        }
    };

    const currentMethodObj = methods.find(m => m.payment_method === selectedMethod);
    const methodFee = currentMethodObj
        ? (currentMethodObj.fee_flat + (selectedPlan.price * currentMethodObj.fee_percent))
        : 0;
    const totalWithFee = selectedPlan.price + methodFee;

    if (paymentStatus === "PAID") {
        return (
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-3xl border border-slate-100 dark:border-slate-800 space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-black">Pembayaran Berhasil!</h1>
                        <p className="text-slate-500 font-medium text-lg">Paket {paymentResult?.plan_name} Anda telah aktif.</p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Akses Login Anda
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm p-3 bg-white dark:bg-slate-800 rounded-xl px-6">
                                <span className="font-bold text-slate-400">Email:</span>
                                <span className="font-black">{email}</span>
                            </div>
                            <p className="text-xs text-slate-500 italic">Password telah dikirimkan ke email Anda. Silakan cek Inbox atau folder Spam.</p>
                        </div>
                    </div>

                    <Link
                        href="/login"
                        className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        Login ke Dashboard <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        );
    }

    if (paymentResult) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-32 text-center">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            {paymentResult.payment_url ? "💳 SELESAIKAN PEMBAYARAN" : "💳 SCAN QRIS UNTUK BAYAR"}
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">{paymentResult.plan_name}</h2>
                        <p className="text-4xl font-black text-blue-600 mt-2">Rp {paymentResult.total_payment.toLocaleString("id-ID")}</p>
                    </div>

                    {paymentResult.method === "qris" ? (
                        <div className="relative mx-auto w-64 h-64 bg-white rounded-3xl p-4 flex items-center justify-center border-4 border-slate-100 dark:border-slate-800 shadow-inner">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(paymentResult.payment_number)}`}
                                alt="QRIS"
                                className="w-full h-full"
                            />
                        </div>
                    ) : paymentResult.payment_number ? (
                        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                                    <CreditCard className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-left space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Nomor Pembayaran / VA</p>
                                <p className="text-3xl font-black text-blue-600 font-mono tracking-wider">
                                    {paymentResult.payment_number}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(paymentResult.payment_number);
                                    toast.success("Nomor pembayaran berhasil disalin!");
                                }}
                                className="flex w-full items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25"
                            >
                                <Copy className="w-4 h-4" /> SALIN NOMOR
                            </button>
                        </div>
                    ) : paymentResult.payment_url ? (
                        <div className="p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600">
                                <CreditCard className="w-10 h-10" />
                            </div>
                            <p className="text-sm font-bold text-slate-500">Klik tombol di bawah untuk membayar melalui portal pembayaran.</p>
                            <a
                                href={paymentResult.payment_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex w-full items-center justify-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-2xl text-lg font-black"
                            >
                                Bayar Sekarang <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    ) : null}

                    <div className="space-y-6">
                        <p className="text-sm text-slate-500 font-medium">
                            {paymentResult.payment_number && paymentResult.method === "qris"
                                ? "Scan QRIS di atas menggunakan aplikasi e-wallet (GOPAY, OVO, DANA, dll) atau M-Banking Anda."
                                : "Ikuti instruksi pada halaman pembayaran untuk menyelesaikan transaksi."}
                        </p>

                        <div className="py-6 border-t border-slate-100 dark:border-slate-800 space-y-3 text-left">
                            {[
                                "Ambil data bisnis dari google maps secara otomatis",
                                "Kirim WhatsApp ke target",
                                "Auto posting grup facebook"
                            ].map((text, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="text-green-500 flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-blue-600 text-[10px] font-black flex items-center gap-3 justify-center">
                            <Mail className="w-4 h-4" /> LINK LOGIN DIKIRIM KE EMAIL SETELAH PEMBAYARAN
                        </div>

                        <div className="space-y-2">
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 text-amber-600 text-xs font-black flex items-center gap-3 justify-center">
                                <RefreshCw className="w-4 h-4 animate-spin" /> MENUNGGU PEMBAYARAN...
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ORDER ID: {paymentResult.order_id}</div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button
                            onClick={() => window.location.reload()}
                            className="text-slate-400 hover:text-blue-600 text-sm font-bold transition-all"
                        >
                            Kembali ke Form
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Checkout Form */}
                <div className="lg:col-span-7 space-y-12">
                    {/* Information Section */}
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#0077B6] tracking-tight">Informasi Kontak</h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Lengkapi data diri untuk aktivasi akun Anda.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900 dark:text-white" htmlFor="full_name">Nama Lengkap</label>
                                <input
                                    required
                                    id="full_name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900 dark:text-white" htmlFor="email">Email Address</label>
                                <input
                                    required
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none font-bold"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Payment Methods Section */}
                    <section>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#0077B6] tracking-tight">Pilih Metode Pembayaran</h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Semua transaksi dienkripsi secara aman.</p>
                        </div>

                        {fetchingMethods ? (
                            <div className="flex flex-col items-center py-10 text-slate-400 font-bold italic">
                                <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                                Memuat metode pembayaran...
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3">
                                {methods.map((m) => {
                                    const calculatedFee = m.fee_flat + (selectedPlan.price * m.fee_percent);
                                    const isSelected = selectedMethod === m.payment_method;
                                    return (
                                        <button
                                            key={m.payment_method}
                                            onClick={() => setSelectedMethod(m.payment_method)}
                                            className={`relative group flex items-center justify-between p-4 rounded-xl transition-all border-2 ${isSelected
                                                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10'
                                                : 'border-transparent bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                                                    <img src={m.payment_image} alt={m.payment_name} className="max-w-full max-h-full object-contain p-1" />
                                                </div>
                                                <div className="text-left">
                                                    <span className="block font-bold text-slate-900 dark:text-white uppercase tracking-tight text-sm">{m.payment_name}</span>
                                                    <span className="text-xs text-slate-500 italic font-medium">Biaya Admin: Rp {calculatedFee.toLocaleString("id-ID")}</span>
                                                </div>
                                            </div>
                                            {isSelected && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Security Badges */}
                    <div className="flex flex-wrap items-center gap-8 pt-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">SSL SECURE</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">TRUSTED SELLER</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary Card */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,119,182,0.06)] border border-slate-100 dark:border-slate-800 space-y-8">
                        <h3 className="text-xl font-black text-[#0077B6] tracking-tight">Ringkasan Pesanan</h3>

                        <div className="space-y-6">
                            {/* Product Item */}
                            <div className="flex items-start justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="space-y-2">
                                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{selectedPlan.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">Marketing Automation Suite Access</p>
                                    <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-lg">Sekali Bayar</span>
                                </div>
                                <span className="font-black text-slate-900 dark:text-white">Rp {selectedPlan.price.toLocaleString("id-ID")}</span>
                            </div>

                            {/* Calculations */}
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Subtotal</span>
                                    <span className="text-slate-900 dark:text-white font-bold text-base">Rp {selectedPlan.price.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Biaya Admin</span>
                                    <span className="text-[#0077B6] font-bold text-base">Rp {methodFee.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800 items-end">
                                    <span className="text-lg font-black text-slate-900 dark:text-white mb-1">Total Harga</span>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-[#0077B6]">Rp {totalWithFee.toLocaleString("id-ID")}</span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Sekali Bayar</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleCheckout}
                                disabled={loading || fetchingMethods}
                                className="w-full py-5 bg-[#145efc] text-white font-bold rounded-2xl text-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                            >
                                <span>{loading ? "Memproses..." : "Bayar Sekarang"}</span>
                                <ArrowRight className="w-6 h-6" />
                            </button>

                            <p className="text-center text-[10px] text-slate-500 font-medium px-4 leading-relaxed uppercase tracking-wider">
                                Dengan menekan tombol di atas, Anda menyetujui <Link className="underline text-[#0077B6]" href="/terms">Syarat & Ketentuan</Link> serta <Link className="underline text-[#0077B6]" href="/privacy">Kebijakan Privasi</Link> Wamaps.
                            </p>
                        </div>
                    </div>

                    {/* Testimonial Mini Card */}
                    <div className="mt-8 bg-[#145efc] text-white p-8 rounded-[2.5rem] flex items-center space-x-6 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="w-14 h-14 bg-white text-[#145efc] rounded-full flex items-center justify-center font-black text-2xl flex-shrink-0 shadow-lg">
                            A
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs italic font-medium leading-relaxed opacity-90">"Gak perlu lagi bayar jasa cari database jutaan rupiah. Pakai Wamaps, tim saya bisa dapet 500 leads tertarget setiap pagi cuma modal 1 klik. ROI gila-gilaan!"</p>
                            <p className="text-[10px] font-black mt-2 text-blue-200 tracking-wider uppercase">— Andi Pratama, Owner Digital Agency</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-[#f5faff] dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900/40">
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><RefreshCw className="animate-spin text-blue-600" /></div>}>
                <CheckoutContent />
            </Suspense>

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
        </main>
    );
}
