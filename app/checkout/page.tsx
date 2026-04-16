"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, User, Wallet, RefreshCw, CheckCircle, Lock, CreditCard, Copy, Check, MessageSquare, Clock, Download } from "lucide-react";
import { toast } from "sonner";

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

    // Load existing order if present in URL
    useEffect(() => {
        const orderId = searchParams.get("order");
        if (orderId && !paymentResult) {
            setLoading(true);
            fetch(`${API_URL}/payments/linkbayar/status/${orderId}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.order_id) {
                        setPaymentResult(data);
                        setPaymentStatus(data.status);
                        setName(data.customer_name || "");
                        setEmail(data.customer_email || "");
                    }
                })
                .catch(err => console.error("Failed to load order:", err))
                .finally(() => setLoading(false));
        }
    }, [searchParams, paymentResult]);


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

    const isOrderLoading = searchParams.get("order") && !paymentResult;

    // Timer for Batas Pembayaran (5 minutes)
    const [timeLeft, setTimeLeft] = useState(300);
    useEffect(() => {
        if (paymentResult && paymentStatus === "UNPAID") {
            const timer = setInterval(() => {
                setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [paymentResult, paymentStatus]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (paymentStatus === "PAID") {
        return (
            <main className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
                <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,119,182,0.1)] border border-blue-50 text-center relative overflow-hidden">
                        {/* Decorative circle */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full opacity-50"></div>

                        {/* Success Icon */}
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative z-10">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Pembayaran Lunas!</h1>
                        <p className="text-slate-500 mb-10 leading-relaxed text-sm">Selamat! Akses <strong>Wamaps Lifetime Access</strong> Anda telah diaktifkan secara otomatis.</p>

                        {/* Order Details */}
                        <div className="bg-slate-50 rounded-3xl p-6 mb-10 text-left border border-slate-100">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</span>
                                <span className="text-sm font-bold text-slate-700">#{paymentResult?.order_id}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paket</span>
                                <span className="text-sm font-bold text-slate-700">Lifetime Pro Access</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">Berhasil</span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-6 flex items-center justify-center gap-2 font-medium">
                            <Mail className="text-blue-500 w-4 h-4" />
                            Cek email untuk detail login akun Anda.
                        </p>

                        <Link
                            href="/login"
                            className="w-full py-4 px-8 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200 group"
                        >
                            Mulai Gunakan Wamaps
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Terima kasih atas pembelian Anda
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (paymentResult) {
        return (
            <main className="pt-24 pb-12 px-4 md:px-6 min-h-screen bg-white">
                <div className="max-w-4xl mx-auto">
                    {/* Professional Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">Menunggu Pembayaran</h1>
                        <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mx-auto leading-relaxed">
                            {paymentResult.method?.toUpperCase() === "QRIS"
                                ? "Silakan pindai kode QRIS di bawah ini melalui aplikasi e-wallet atau M-Banking Anda untuk aktivasi instan."
                                : "Silakan selesaikan pembayaran ke nomor Virtual Account atau nomor pembayaran di bawah ini untuk aktivasi instan."}
                        </p>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Timer Status */}
                        <div className="lg:col-span-12">
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                        <Clock className="text-red-600 w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">Batas Pembayaran</span>
                                </div>
                                <span className={`text-xl font-black text-red-600 tabular-nums tracking-tighter ${timeLeft === 0 ? 'animate-pulse' : ''}`}>
                                    {timeLeft > 0 ? formatTime(timeLeft) : "00:00 (Kadaluarsa)"}
                                </span>
                            </div>
                        </div>

                        {/* Payment Area - Left */}
                        <div className="lg:col-span-7">
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-blue-500/5 text-center flex flex-col items-center justify-center">
                                {paymentResult.method?.toUpperCase() === "QRIS" ? (
                                    <>
                                        <p className="text-[10px] uppercase font-black text-blue-600 tracking-[0.3em] mb-8">QRIS DIGITAL PAYMENT</p>
                                        <div className="bg-white p-6 rounded-[2.5rem] border-4 border-slate-50 shadow-inner mb-8 relative group">
                                            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors rounded-[2.5rem]"></div>
                                            {paymentResult.payment_number && (
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=4&data=${encodeURIComponent(paymentResult.payment_number)}`}
                                                    alt="QRIS"
                                                    className="w-56 h-56 md:w-64 md:h-64 relative z-10"
                                                />
                                            )}
                                        </div>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=4&data=${encodeURIComponent(paymentResult.payment_number)}`;
                                                    const response = await fetch(qrUrl);
                                                    const blob = await response.blob();
                                                    const url = window.URL.createObjectURL(blob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = `QRIS-Wamaps-${paymentResult.order_id}.png`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    window.URL.revokeObjectURL(url);
                                                    toast.success("QRIS berhasil diunduh");
                                                } catch (error) {
                                                    console.error("Download error:", error);
                                                    toast.error("Gagal mengunduh QRIS. Silakan coba lagi.");
                                                }
                                            }}
                                            className="inline-flex items-center justify-center px-8 py-3.5 mb-8 bg-slate-50 dark:bg-slate-800 text-blue-600 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all text-sm gap-3 shadow-sm border border-blue-100 dark:border-blue-800"
                                        >
                                            <Download className="w-4 h-4" />
                                            Unduh QRIS
                                        </button>
                                        <p className="text-xs font-bold text-slate-400 max-w-[280px] leading-relaxed">
                                            Scan QRIS di atas menggunakan aplikasi e-wallet <strong>(GOPAY, OVO, DANA, dll)</strong> atau <strong>M-Banking Anda</strong>.
                                        </p>
                                    </>
                                ) : (
                                    <div className="py-6 md:py-12 flex flex-col items-center text-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 md:mb-8">
                                            <CreditCard className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                                        </div>
                                        <p className="text-[10px] uppercase font-black text-blue-600 tracking-[0.3em] mb-6">{(paymentResult.method || "").toUpperCase().replace('_', ' ')} TRANSFER</p>

                                        {paymentResult.payment_number ? (
                                            <div className="w-full max-w-sm mx-auto bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 mb-8">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Nomor Virtual Account</p>
                                                <div className="flex flex-col gap-4">
                                                    <p className="text-xl md:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-wider break-all leading-none">
                                                        {paymentResult.payment_number}
                                                    </p>
                                                    <button 
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(paymentResult.payment_number);
                                                            toast.success("Nomor VA berhasil disalin!");
                                                        }}
                                                        className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95"
                                                    >
                                                        <Copy className="w-4 h-4" /> SALIN NOMOR
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="space-y-4 max-w-xs mx-auto">
                                            <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                                                *Aktivasi otomatis setelah pembayaran berhasil
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Details - Right */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.3em] mb-8">DETAIL PESANAN</p>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-4 border-b border-slate-200/50">
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">ID Transaksi</p>
                                        <p className="text-slate-900 font-black text-sm">#{paymentResult.order_id}</p>
                                    </div>
                                    <div className="flex justify-between items-start pt-4">
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Tagihan</p>
                                        <div className="text-right">
                                            <p className="text-blue-600 font-black text-4xl tracking-tighter">
                                                Rp {Number(paymentResult.total_payment || 0).toLocaleString("id-ID")}
                                            </p>
                                            <div className="flex items-center justify-end gap-1.5 mt-2">
                                                <CheckCircle2 className="text-green-600 w-3.5 h-3.5" />
                                                <p className="text-[9px] text-green-600 font-bold uppercase tracking-[0.15em]">Aktivasi Instan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-green-50/50 p-6 rounded-[1.5rem] border border-green-100 flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="text-green-600 w-6 h-6" />
                                </div>
                                <p className="text-[11px] text-green-700/80 font-bold leading-relaxed">
                                    Pembayaran Anda diproses secara aman. Lisensi lifetime akan dikirimkan ke email anda segera setelah transaksi diverifikasi.
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (isOrderLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-bold animate-pulse">Memuat detil pembayaran Anda...</p>
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
                        ) : methods.length === 0 ? (
                            <div className="flex flex-col items-center py-10 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-slate-500 mb-4 font-medium px-6">Gagal memuat metode pembayaran dari server. Silakan coba lagi.</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Muat Ulang
                                </button>
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
                                <span className="font-black text-slate-900 dark:text-white whitespace-nowrap">Rp {selectedPlan.price.toLocaleString("id-ID")}</span>
                            </div>

                            {/* Calculations */}
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Subtotal</span>
                                    <span className="text-slate-900 dark:text-white font-bold text-base whitespace-nowrap">Rp {selectedPlan.price.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium uppercase tracking-wider text-[10px]">Biaya Admin</span>
                                    <span className="text-[#0077B6] font-bold text-base whitespace-nowrap">Rp {methodFee.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800 items-end">
                                    <span className="text-lg font-black text-slate-900 dark:text-white mb-1">Total Harga</span>
                                    <div className="text-right">
                                        <span className="block text-3xl font-black text-[#0077B6] whitespace-nowrap">Rp {totalWithFee.toLocaleString("id-ID")}</span>
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
        <main className="min-h-screen bg-[#f5faff] dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900/40" suppressHydrationWarning>
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
