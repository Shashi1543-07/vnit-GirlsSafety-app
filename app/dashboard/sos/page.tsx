"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, ShieldAlert, X, MapPin, Video, Mic } from "lucide-react";
import Link from "next/link";

export default function SOSPage() {
    const [status, setStatus] = useState<"idle" | "countdown" | "active">("idle");
    const [countdown, setCountdown] = useState(5);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isSilent, setIsSilent] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (status === "countdown") {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setStatus("active");
                        triggerEmergency();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status]);

    const triggerEmergency = async () => {
        // Get location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    // Send API request
                    fetch('/api/sos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: isSilent ? 'SILENT_SOS' : 'SOS',
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        })
                    });
                },
                (err) => console.error(err)
            );
        }
    };

    const handleActivate = () => {
        setStatus("countdown");
        setCountdown(5);
    };

    const handleCancel = () => {
        setStatus("idle");
        setCountdown(5);
    };

    return (
        <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 ${status === "active" ? "bg-red-950" : "bg-slate-950"
            }`}>
            {/* Background Pulse for Active State */}
            {status === "active" && !isSilent && (
                <motion.div
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-red-600 z-0"
                />
            )}

            <header className="p-6 z-10 flex justify-between items-center">
                <Link href="/dashboard" className="text-white/80 hover:text-white">
                    <X className="w-8 h-8" />
                </Link>
                <h1 className="text-xl font-bold text-white">
                    {isSilent ? "SILENT MODE" : "EMERGENCY MODE"}
                </h1>
                <button
                    onClick={() => setIsSilent(!isSilent)}
                    className={`p-2 rounded-full transition-colors ${isSilent ? "bg-white text-slate-900" : "bg-slate-800 text-slate-400"}`}
                >
                    {isSilent ? <Mic className="w-6 h-6" /> : <Mic className="w-6 h-6 opacity-50" />}
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center z-10 p-6">
                <AnimatePresence mode="wait">
                    {status === "idle" && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <button
                                onClick={handleActivate}
                                className="w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_50px_rgba(220,38,38,0.5)] flex flex-col items-center justify-center gap-2 border-8 border-red-400/30 hover:scale-105 transition-transform active:scale-95"
                            >
                                <AlertTriangle className="w-24 h-24 text-white" />
                                <span className="text-3xl font-bold text-white tracking-wider">SOS</span>
                            </button>
                            <p className="text-slate-400 text-center max-w-xs">
                                Tap to activate emergency protocols.
                                {isSilent ? " Silent mode is ON." : " This will alert contacts and security."}
                            </p>
                        </motion.div>
                    )}

                    {status === "countdown" && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="128"
                                        cy="128"
                                        r="120"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-slate-800"
                                    />
                                    <motion.circle
                                        cx="128"
                                        cy="128"
                                        r="120"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-red-500"
                                        initial={{ pathLength: 1 }}
                                        animate={{ pathLength: 0 }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </svg>
                                <span className="text-8xl font-bold text-white">{countdown}</span>
                            </div>
                            <button
                                onClick={handleCancel}
                                className="px-8 py-3 bg-slate-800 rounded-full text-white font-bold hover:bg-slate-700"
                            >
                                CANCEL
                            </button>
                        </motion.div>
                    )}

                    {status === "active" && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full max-w-md space-y-6"
                        >
                            <div className={`backdrop-blur-xl p-6 rounded-2xl border shadow-2xl ${isSilent ? "bg-black/90 border-slate-800" : "bg-slate-900/90 border-red-500/50"
                                }`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-3 h-3 rounded-full animate-ping ${isSilent ? "bg-slate-500" : "bg-red-500"}`} />
                                    <h2 className="text-xl font-bold text-white">
                                        {isSilent ? "Silent Alert Active" : "Help is on the way"}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <MapPin className={isSilent ? "text-slate-400" : "text-red-400"} />
                                            <div>
                                                <p className="text-white font-medium">Location Shared</p>
                                                <p className="text-xs text-slate-400">
                                                    {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Locating..."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Video className={isSilent ? "text-slate-400" : "text-red-400"} />
                                            <div>
                                                <p className="text-white font-medium">Recording Video</p>
                                                <p className="text-xs text-slate-400">Evidence collection active</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Mic className={isSilent ? "text-slate-400" : "text-red-400"} />
                                            <div>
                                                <p className="text-white font-medium">Audio Stream</p>
                                                <p className="text-xs text-slate-400">Live to Control Room</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className={`p-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 ${isSilent ? "bg-slate-700" : "bg-red-600"
                                        }`}>
                                        <Phone className="w-5 h-5" /> Call Police
                                    </button>
                                    <button className="p-4 bg-slate-700 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-600">
                                        <ShieldAlert className="w-5 h-5" /> I'm Safe
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
