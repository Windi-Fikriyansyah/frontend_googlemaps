"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Target, User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await api.post("/auth/register", {
                email,
                password,
            });

            // Auto login after registration (optional, but good UX)
            const loginData = new URLSearchParams();
            loginData.append("username", email);
            loginData.append("password", password);

            const response = await api.post("/auth/login", loginData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }

            router.push("/leads");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (response: any) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post("/auth/google", {
                credential: response.credential,
            });
            if (res.data.access_token) {
                localStorage.setItem("token", res.data.access_token);
            }
            router.push("/leads");
        } catch (err: any) {
            setError("Google Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).google) {
            (window as any).google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleGoogleLogin,
            });
            (window as any).google.accounts.id.renderButton(
                document.getElementById("googleBtn"),
                { theme: "outline", size: "large", width: "100%" }
            );
        }
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4">
            <Link href="/" className="mb-8 flex items-center gap-2 group">
                <div className="p-1.5 rounded-lg bg-blue-600 transition-transform group-hover:scale-110">
                    <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold dark:text-white">Wamaps</span>
            </Link>

            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Create your account</h1>
                    <p className="text-slate-500 dark:text-slate-400">Bergabunglah dengan 5.000+ bisnis untuk mencari lead hari ini</p>
                    {error && <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>}
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="john@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? "Creating account..." : "Start Finding Leads"}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-8 mb-6 flex items-center gap-4 text-slate-300 dark:text-slate-700">
                    <div className="h-px w-full bg-current" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">OR</span>
                    <div className="h-px w-full bg-current" />
                </div>

                <div id="googleBtn" className="w-full"></div>

                <p className="mt-10 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                </p>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        Free 7-Day Trial
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        No Credit Card
                    </div>
                </div>
            </div>
        </main>
    );
}
