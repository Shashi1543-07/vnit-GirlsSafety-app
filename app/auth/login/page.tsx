"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Shield, Mail, Lock, ArrowRight, Phone, KeyRound } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "STUDENT";

    const [step, setStep] = useState("INPUT"); // INPUT, OTP
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        identifier: "", // Email or Phone
        otp: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call to send OTP
        setTimeout(() => {
            setIsLoading(false);
            if (formData.identifier) {
                setStep("OTP");
            } else {
                setError("Please enter a valid email or phone number");
            }
        }, 1500);
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Simulate OTP verification (Mock: 1234)
            if (formData.otp === "1234") {
                // Call actual login API
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.identifier, // Assuming identifier is email for now
                        role: role
                    }),
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.user.role === 'ADMIN') router.push("/admin");
                    else if (data.user.role === 'WARDEN') router.push("/warden");
                    else if (data.user.role === 'SECURITY') router.push("/security");
                    else router.push("/dashboard");
                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-slate-950 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-slate-950 to-slate-950" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">{role} Login</h1>
                    <p className="text-slate-400 text-sm">Enter your details to continue</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {step === "INPUT" ? (
                        <motion.form
                            key="input-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSendOTP}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Email or Mobile</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        name="identifier"
                                        type="text"
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"
                                        placeholder="student@vnit.ac.in"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Send OTP"}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyOTP}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Enter OTP</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        name="otp"
                                        type="text"
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 tracking-widest text-center text-xl"
                                        placeholder="• • • •"
                                        maxLength={4}
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                </div>
                                <p className="text-xs text-center text-slate-500">Mock OTP: 1234</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Login"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep("INPUT")}
                                className="w-full text-slate-400 text-sm hover:text-white"
                            >
                                Change Email/Mobile
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        First time here?{" "}
                        <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
