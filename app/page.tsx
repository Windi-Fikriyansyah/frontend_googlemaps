"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
    Target,
    Search,
    MapPin,
    Download,
    ChevronRight,
    CheckCircle2,
    ArrowRight,
    MousePointer2,
    Layers,
    Sparkles
} from "lucide-react";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/40">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-600/5 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in">
                        <Sparkles className="w-3.5 h-3.5" />
                        Revolutionize your outreach
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        Generate B2B Leads <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                            Straight from Google Maps
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">
                        Stop manually hunting for business info. Extract high-quality leads, contact details,
                        and location data in seconds with our elegant scraping engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="group flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            Start Generating for Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        >
                            Watch Demo
                        </Link>
                    </div>

                    {/* Floating UI Mockup Preview */}
                    <div className="mt-20 relative max-w-5xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4 text-slate-300 dark:text-slate-700">
                                <Layers className="w-16 h-16" />
                                <span className="font-medium text-lg uppercase tracking-widest">Dashboard Preview</span>
                            </div>
                            {/* This is where a real image would go */}
                        </div>

                        {/* Floating stats */}
                        <div className="absolute -top-10 -right-10 md:right-0 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">12k+</p>
                                    <p className="text-xs text-slate-500">Leads Found Today</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
                        <p className="text-slate-500 dark:text-slate-400">Everything you need to scale your sales pipeline.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Search className="w-6 h-6" />,
                                title: "Deep Search",
                                desc: "Search by categories, keywords, and specific locations with adjustable radius."
                            },
                            {
                                icon: <MapPin className="w-6 h-6" />,
                                title: "Location Intel",
                                desc: "Extract addresses, coordinates, and nearby business hotspots automatically."
                            },
                            {
                                icon: <Download className="w-6 h-6" />,
                                title: "One-Click Export",
                                desc: "Download your leads in CSV or Excel format ready for your CRM."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-xl">
                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple CTA */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 dark:bg-blue-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to find your next client?</h2>
                            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                                Join 5,000+ sales teams using LeadFlow to automate their prospecting workflow.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/20"
                            >
                                Get Started Now <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-200 dark:border-slate-900 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Target className="w-6 h-6 text-blue-600" />
                        <span className="text-xl font-bold">LeadFlow</span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 LeadFlow. All rights reserved.</p>
                    <div className="flex gap-8 text-sm font-medium text-slate-500">
                        <Link href="#" className="hover:text-blue-600">Privacy</Link>
                        <Link href="#" className="hover:text-blue-600">Terms</Link>
                        <Link href="#" className="hover:text-blue-600">Twitter</Link>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
        </main>
    );
}
