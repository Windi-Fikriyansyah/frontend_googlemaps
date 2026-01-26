"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, Rocket, Crown, Zap, X, CreditCard, ChevronRight, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PaymentChannel {
    group: string;
    code: string;
    name: string;
    type: string;
    fee_customer: { flat: number; percent: number };
    total_fee: { flat: number; percent: number };
    icon_url: string;
    active: boolean;
}

const pricingPlans = [
    {
        id: "micro",
        name: "Micro Pack",
        price: 50000,
        displayPrice: "50.000",
        credits: "300",
        pricePerCredit: "166",
        label: "Coba-coba",
        icon: Zap,
        color: "from-slate-500 to-slate-600",
        bgColor: "bg-slate-50 dark:bg-slate-800/50",
        borderColor: "border-slate-200 dark:border-slate-700",
        features: [
            { text: "300 Kredit", highlight: false },
            { text: "Rp 166 per Kredit", highlight: false },
            { text: "Masa Aktif Selamanya", highlight: false },
            { text: "Semua Fitur", highlight: true },
            { text: "Support Email", highlight: false },
        ],
        popular: false,
    },
    {
        id: "lite",
        name: "Lite Pack",
        price: 150000,
        displayPrice: "150.000",
        credits: "1.000",
        pricePerCredit: "150",
        label: "Best Value",
        icon: Sparkles,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        features: [
            { text: "1.000 Kredit", highlight: false },
            { text: "Rp 150 per Kredit", highlight: false },
            { text: "Masa Aktif Selamanya", highlight: false },
            { text: "Semua Fitur", highlight: true },
            { text: "Support Email & WA", highlight: true },
        ],
        popular: false,
    },
    {
        id: "growth",
        name: "Growth Pack",
        price: 500000,
        displayPrice: "500.000",
        credits: "4.500",
        pricePerCredit: "111",
        label: "Paling Populer",
        icon: Rocket,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
        borderColor: "border-purple-300 dark:border-purple-700",
        features: [
            { text: "4.500 Kredit", highlight: true },
            { text: "Rp 111 per Kredit", highlight: true },
            { text: "Masa Aktif Selamanya", highlight: false },
            { text: "Semua Fitur", highlight: true },
            { text: "Prioritas WA Support", highlight: true },
        ],
        popular: true,
    },
    {
        id: "business",
        name: "Business Pack",
        price: 1000000,
        displayPrice: "1.000.000",
        credits: "10.000",
        pricePerCredit: "100",
        label: "Akurasi Tinggi",
        icon: Crown,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
        borderColor: "border-amber-300 dark:border-amber-700",
        features: [
            { text: "10.000 Kredit", highlight: true },
            { text: "Rp 100 per Kredit (Termurah!)", highlight: true },
            { text: "Masa Aktif Selamanya", highlight: false },
            { text: "Semua Fitur", highlight: true },
            { text: "Personal Manager", highlight: true },
        ],
        popular: false,
        bestValue: true,
    },
];

export default function PricingPage() {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [channels, setChannels] = useState<PaymentChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<PaymentChannel | null>(null);
    const [loading, setLoading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [feeInfo, setFeeInfo] = useState<any>(null);
    const [feeLoading, setFeeLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleOpenModal = (plan: any) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
        setSelectedChannel(null); // Reset
    };

    // Fetch channels when modal opens
    useEffect(() => {
        if (isModalOpen) {
            const fetchChannels = async () => {
                setLoading(true);
                try {
                    const response = await api.get("/payments/channels");
                    setChannels(response.data);
                } catch (error) {
                    console.error("Failed to fetch channels:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchChannels();
        }
    }, [isModalOpen]);

    // Calculate fee when channel is selected
    useEffect(() => {
        if (selectedChannel && selectedPlan) {
            const fetchFee = async () => {
                setFeeLoading(true);
                try {
                    const response = await api.get(`/payments/fee-calculator?code=${selectedChannel.code}&amount=${selectedPlan.price}`);
                    setFeeInfo(response.data);
                } catch (error) {
                    console.error("Failed to calculate fee:", error);
                    setFeeInfo(null);
                } finally {
                    setFeeLoading(false);
                }
            };
            fetchFee();
        } else {
            setFeeInfo(null);
        }
    }, [selectedChannel, selectedPlan]);


    const handleCheckout = async () => {
        if (!selectedPlan || !selectedChannel) return;

        setCheckoutLoading(true);
        try {
            const response = await api.post(`/payments/create?plan_key=${selectedPlan.id}&method=${selectedChannel.code}`);
            const paymentData = response.data;

            if (paymentData && paymentData.checkout_url) {
                window.location.href = paymentData.checkout_url;
            } else {
                alert("Gagal membuat pembayaran. Silakan coba lagi.");
            }
        } catch (error: any) {
            console.error("Checkout error:", error);
            alert(error.response?.data?.detail || "Terjadi kesalahan saat memproses pembayaran.");
        } finally {
            setCheckoutLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
                <TopBar />
                <main className="p-4 md:p-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            Pilih Paket Terbaik
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Harga & Paket Kredit
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Dapatkan kredit untuk menggunakan semua fitur Wamaps.
                            Semakin banyak kredit, semakin hemat harga per kreditnya!
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {pricingPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl border-2 ${plan.borderColor} ${plan.bgColor} overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl ${plan.popular ? "ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-slate-950" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                                        🚀 {plan.label}
                                    </div>
                                )}
                                {plan.bestValue && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm font-bold">
                                        💎 {plan.label}
                                    </div>
                                )}

                                <div className={`p-6 ${plan.popular || plan.bestValue ? "pt-14" : ""}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${plan.color} shadow-lg`}>
                                            <plan.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{plan.name}</h3>
                                            {!plan.popular && !plan.bestValue && (
                                                <span className="text-xs text-slate-500 italic">{plan.label}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm text-slate-500">Rp</span>
                                            <span className="text-3xl font-bold text-slate-900 dark:text-white">{plan.displayPrice}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{plan.credits} Kredit</p>
                                    </div>

                                    <div className={`p-3 rounded-xl mb-6 ${plan.bestValue
                                        ? "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40"
                                        : "bg-white/60 dark:bg-slate-900/40"}`}>
                                        <p className="text-center">
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">Rp {plan.pricePerCredit}</span>
                                            <span className="text-sm text-slate-500"> / kredit</span>
                                        </p>
                                    </div>

                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.highlight ? `bg-gradient-to-br ${plan.color}` : "bg-slate-200 dark:bg-slate-700"}`}>
                                                    <Check className={`w-3 h-3 ${feature.highlight ? "text-white" : "text-slate-500"}`} />
                                                </div>
                                                <span className={`text-sm ${feature.highlight ? "font-semibold text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleOpenModal(plan)}
                                        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${plan.popular
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25"
                                            : plan.bestValue
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/25"
                                                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                                            }`}
                                    >
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 max-w-3xl mx-auto text-center">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">💡 Cara Kerja Kredit</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Setiap kali Anda melakukan pencarian leads, mengirim pesan WhatsApp,
                                atau menggunakan fitur premium lainnya, kredit akan terpotong sesuai
                                dengan penggunaan. Kredit yang sudah dibeli <strong>tidak ada masa kadaluarsa</strong>,
                                sehingga Anda bisa menggunakannya kapan saja!
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 dark:text-slate-400">
                            Butuh paket custom? {" "}
                            <a href="https://wa.me/6289622981080" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                                Hubungi kami via WhatsApp
                            </a>
                        </p>
                    </div>
                </main>
            </div>

            {/* Payment Selection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-600">
                                    <CreditCard className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pilih Pembayaran</h2>
                                    <p className="text-sm text-slate-500">Selesaikan transaksi untuk {selectedPlan?.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row min-h-[400px] md:h-[500px] overflow-hidden">
                            {/* Left: Channel List */}
                            <div className="flex-1 overflow-y-auto p-4 border-r border-slate-100 dark:border-slate-800 custom-scrollbar">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-3">
                                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                        <p className="text-sm text-slate-500 font-medium tracking-tight">Memuat metode pembayaran...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Grouping by Type */}
                                        {Array.from(new Set(channels.map(c => c.group))).map(group => (
                                            <div key={group} className="space-y-3">
                                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">{group}</h3>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {channels.filter(c => c.group === group).map(channel => (
                                                        <button
                                                            key={channel.code}
                                                            onClick={() => setSelectedChannel(channel)}
                                                            className={cn(
                                                                "flex items-center justify-between p-3 rounded-2xl border-2 transition-all group",
                                                                selectedChannel?.code === channel.code
                                                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                                                                    : "border-transparent bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                            )}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-12 h-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden">
                                                                    <img src={channel.icon_url} alt={channel.name} className="max-w-full max-h-full object-contain" />
                                                                </div>
                                                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{channel.name}</span>
                                                            </div>
                                                            <ChevronRight className={cn("w-4 h-4 transition-transform", selectedChannel?.code === channel.code ? "text-blue-500 translate-x-1" : "text-slate-300 group-hover:translate-x-1")} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Summary */}
                            <div className="w-full md:w-72 bg-slate-50/50 dark:bg-slate-950/50 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Ringkasan Tagihan</h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">{selectedPlan?.name}</span>
                                            <span className="font-medium">Rp {selectedPlan?.displayPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Biaya Layanan</span>
                                            <span className="font-medium text-blue-600">
                                                {feeLoading ? (
                                                    <span className="animate-pulse">Menghitung...</span>
                                                ) : (
                                                    (() => {
                                                        const fee = Math.max(feeInfo?.total_fee?.customer || 0, feeInfo?.total_fee?.merchant || 0);
                                                        return fee > 0 ? `+ Rp ${fee.toLocaleString()}` : "-";
                                                    })()
                                                )}
                                            </span>
                                        </div>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                                        <div className="flex justify-between">
                                            <span className="text-sm font-bold">Total Bayar</span>
                                            <span className="text-lg font-bold text-blue-600">
                                                {feeLoading ? (
                                                    <span className="animate-pulse">Menghitung...</span>
                                                ) : (
                                                    (() => {
                                                        const fee = Math.max(feeInfo?.total_fee?.customer || 0, feeInfo?.total_fee?.merchant || 0);
                                                        const total = (selectedPlan?.price || 0) + fee;
                                                        return total > 0 ? `Rp ${total.toLocaleString()}` : "-";
                                                    })()
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {selectedChannel && (
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Metode Terpilih</p>
                                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{selectedChannel.name}</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={!selectedChannel || checkoutLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                                >
                                    {checkoutLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Memproses...
                                        </>
                                    ) : (
                                        "Bayar Sekarang"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
