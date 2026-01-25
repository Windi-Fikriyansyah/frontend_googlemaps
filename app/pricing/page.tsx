"use client";

import { Check, Sparkles, Rocket, Crown, Zap } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const pricingPlans = [
    {
        name: "Micro Pack",
        price: "50.000",
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
        name: "Lite Pack",
        price: "150.000",
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
        name: "Growth Pack",
        price: "500.000",
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
        name: "Business Pack",
        price: "1.000.000",
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
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <div className="pl-64">
                <TopBar />
                <main className="p-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            Pilih Paket Terbaik
                        </span>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Harga & Paket Kredit
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Dapatkan kredit untuk menggunakan semua fitur LeadFlow.
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
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                                        🚀 {plan.label}
                                    </div>
                                )}

                                {/* Best Value Badge */}
                                {plan.bestValue && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm font-bold">
                                        💎 {plan.label}
                                    </div>
                                )}

                                <div className={`p-6 ${plan.popular || plan.bestValue ? "pt-14" : ""}`}>
                                    {/* Icon & Name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${plan.color} shadow-lg`}>
                                            <plan.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                {plan.name}
                                            </h3>
                                            {!plan.popular && !plan.bestValue && (
                                                <span className="text-xs text-slate-500 italic">{plan.label}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm text-slate-500">Rp</span>
                                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                                {plan.price}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {plan.credits} Kredit
                                        </p>
                                    </div>

                                    {/* Price per Credit Highlight */}
                                    <div className={`p-3 rounded-xl mb-6 ${plan.bestValue
                                        ? "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40"
                                        : "bg-white/60 dark:bg-slate-900/40"
                                        }`}>
                                        <p className="text-center">
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                Rp {plan.pricePerCredit}
                                            </span>
                                            <span className="text-sm text-slate-500"> / kredit</span>
                                        </p>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${feature.highlight
                                                    ? `bg-gradient-to-br ${plan.color}`
                                                    : "bg-slate-200 dark:bg-slate-700"
                                                    }`}>
                                                    <Check className={`w-3 h-3 ${feature.highlight ? "text-white" : "text-slate-500"
                                                        }`} />
                                                </div>
                                                <span className={`text-sm ${feature.highlight
                                                    ? "font-semibold text-slate-900 dark:text-white"
                                                    : "text-slate-600 dark:text-slate-400"
                                                    }`}>
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
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
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                💡 Cara Kerja Kredit
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Setiap kali Anda melakukan pencarian leads, mengirim pesan WhatsApp,
                                atau menggunakan fitur premium lainnya, kredit akan terpotong sesuai
                                dengan penggunaan. Kredit yang sudah dibeli <strong>tidak ada masa kadaluarsa</strong>,
                                sehingga Anda bisa menggunakannya kapan saja!
                            </p>
                        </div>
                    </div>

                    {/* Contact Section */}
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
        </div>
    );
}
