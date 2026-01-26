"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Target, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);


        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
            }

            router.push("/leads");
        } catch (err: any) {
            toast.error(err.response?.data?.detail || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (response: any) => {
        setLoading(true);

        try {
            const res = await api.post("/auth/google", {
                credential: response.credential,
            });
            if (res.data.access_token) {
                localStorage.setItem("token", res.data.access_token);
            }
            router.push("/leads");
        } catch (err: any) {
            toast.error("Google Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        /* global google */
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


            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 md:p-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400">Sign in to continue your prospecting</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1">
                            <label className="text-sm font-semibold">Password</label>
                            <Link href="#" className="text-xs text-blue-600 font-medium hover:underline">Forgot password?</Link>
                        </div>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                    >
                        {loading ? "Signing in..." : "Sign In"}
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
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link>
                </p>
            </div>
        </main>
    );
}
