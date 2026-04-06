"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, User, Wallet, RefreshCw, CheckCircle, Lock, CreditCard, Copy } from "lucide-react";
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
        "premium": { name: "Wamaps Premium", price: 149000, credits: 999999 },
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
    }, []);

    // Fetch methods
    useEffect(() => {
        async function loadMethods() {
            try {
                const res = await fetch(`${API_URL}/payments/linkbayar/methods`);
                const data = await res.json();
                // Match the documentation response: data.methods is an array
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
    }, [paymentResult, paymentStatus]);

    // Auto scroll to top when payment result or status changed
    useEffect(() => {
        if (paymentResult || paymentStatus === "PAID") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [paymentResult, paymentStatus]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Silakan isi nama lengkap Anda");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            alert("Silakan isi alamat email yang valid");
            return;
        }

        if (!selectedMethod) {
            alert("Silakan pilih metode pembayaran");
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
                alert(result.detail || "Terjadi kesalahan saat membuat pembayaran");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Terjadi kesalahan koneksi");
        } finally {
            setLoading(false);
        }
    };

    const currentMethodObj = methods.find(m => m.payment_method === selectedMethod);
    // LinkBayar Fee: fee_flat + (price * fee_percent)
    const methodFee = currentMethodObj
        ? (currentMethodObj.fee_flat + (selectedPlan.price * currentMethodObj.fee_percent))
        : 0;
    const totalWithFee = selectedPlan.price + methodFee;

    if (paymentStatus === "PAID") {
        return (
            <div className="max-w-2xl mx-auto px-4 py-32 text-center">
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

                    <a
                        href="/login"
                        className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    >
                        Login ke Dashboard <ArrowRight className="w-6 h-6" />
                    </a>
                </div>
            </div>
        )
    }

    if (paymentResult) {
        return (
            <div className="max-w-xl mx-auto px-4 py-32 text-center">
                <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            {paymentResult.payment_url ? "💳 SELESAIKAN PEMBAYARAN" : "💳 SCAN QRIS UNTUK BAYAR"}
                        </div>
                        <h2 className="text-3xl font-black">{paymentResult.plan_name}</h2>
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
                                className="inline-flex w-full items-center justify-center gap-3 bg-blue-600 text-white px-8 py-5 rounded-2xl text-lg font-black"
                            >
                                Bayar Sekarang <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    ) : null}

                    <div className="space-y-6">
                        <p className="text-sm text-slate-500 font-medium">
                            {paymentResult.payment_number
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
                                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{text}</p>
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
                            className="text-slate-400 hover:text-blue-600 text-sm font-bold transition-colors"
                        >
                            Kembali ke Form
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-32">
            <div className="text-center mb-16">
                <p className="text-slate-500 font-medium text-lg">Lengkapi data Anda & pilih metode pembayaran untuk memproses akses.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Left: Form & Methods */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Data Form */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</div>
                            Informasi Kontak
                        </h3>
                        <form className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Nama Lengkap
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Masukkan nama anda"
                                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-bold outline-none"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Alamat Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full px-8 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-bold outline-none"
                                />
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    Akses langsung aktif setelah pembayaran
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    Link login dan akses dikirim ke email yang anda daftarkan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
                        <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">2</div>
                            Pilih Metode Pembayaran
                        </h3>

                        {fetchingMethods ? (
                            <div className="flex flex-col items-center py-10 text-slate-400 font-bold italic">
                                <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                                Memuat metode pembayaran...
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                {methods.map((m) => {
                                    const feeVal = m.fee_flat + (selectedPlan.price * m.fee_percent);
                                    return (
                                        <button
                                            key={m.payment_method}
                                            onClick={() => setSelectedMethod(m.payment_method)}
                                            className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${selectedMethod === m.payment_method
                                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                                                : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl p-2 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700">
                                                    <img src={m.payment_image} alt={m.payment_name} className="max-h-full max-w-full" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm">{m.payment_name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">+ Biaya Layanan Rp {feeVal.toLocaleString("id-ID")}</p>
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-4 transition-all ${selectedMethod === m.payment_method ? 'border-blue-500 bg-white' : 'border-slate-200'
                                                }`} />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Summary & Pay */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-3xl relative overflow-hidden flex flex-col h-fit sticky top-32">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-8 flex items-center gap-3">
                            <Wallet className="w-4 h-4" /> RINGKASAN PESANAN
                        </h3>

                        <div className="mb-8 space-y-3 pb-8 border-b border-white/10">
                            <div className="flex items-start gap-3">
                                <span className="text-sm mt-0.5">✅</span>
                                <p className="text-sm font-bold text-slate-300">Ambil data bisnis dari google maps secara otomatis</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-sm mt-0.5">✅</span>
                                <p className="text-sm font-bold text-slate-300">Kirim WhatsApp ke target</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-sm mt-0.5">✅</span>
                                <p className="text-sm font-bold text-slate-300">Auto posting grup facebook</p>
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10 flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-2xl font-black">{selectedPlan.name}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">🔥Promo Hari Ini</p>
                                </div>
                                <p className="text-xl font-black text-blue-400">Rp {selectedPlan.price.toLocaleString("id-ID")}</p>
                            </div>

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-500 uppercase tracking-widest text-[10px]">Subtotal</span>
                                    <span>Rp {selectedPlan.price.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-slate-500 uppercase tracking-widest text-[10px]">Biaya Layanan</span>
                                    <span>Rp {methodFee.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 mb-8">
                                    <span className="font-black text-sm uppercase tracking-widest">Total Bayar</span>
                                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                                        Rp {totalWithFee.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <button
                                    disabled={loading || fetchingMethods}
                                    onClick={handleCheckout}
                                    className="w-full group flex items-center justify-center gap-4 bg-blue-600 text-white px-8 py-5 rounded-[1.5rem] text-xl font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-3xl shadow-blue-500/30"
                                >
                                    {loading ? "Memproses..." : "Bayar Sekarang"}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>



                    <div className="bg-white dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-xl text-center">
                        <div className="flex items-center justify-center gap-4 text-xs font-black">
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                            <span>Aktivasi Instant & Aman via QRIS/Bank</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><RefreshCw className="animate-spin" /></div>}>
                <CheckoutContent />
            </Suspense>
        </main>
    )
}
