"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QRScannerPage() {
    const router = useRouter();
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(0);
    const [predictedTime, setPredictedTime] = useState<string | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === "success") {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCheckIn = async (locationId: string) => {
        setStatus("processing");
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setScanResult(locationId);
            setStatus("success");
            setMessage(`Successfully checked in at: ${locationId}`);

            // Mock Prediction
            const predictions: any = {
                "Library": "10 mins",
                "Hostel": "5 mins",
                "Main Gate": "15 mins"
            };
            setPredictedTime(predictions[locationId] || "Unknown");

        } catch (error) {
            setStatus("error");
            setMessage("Failed to verify location. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-white">Scan QR Code</h1>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center gap-8">
                {status === "idle" && (
                    <div className="w-full max-w-md bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
                        <div id="reader" className="w-full" />
                        <div className="absolute inset-0 pointer-events-none border-2 border-blue-500/50 rounded-2xl" />
                        <p className="text-center text-slate-500 mt-4 pb-4">Align QR code within the frame</p>
                    </div>
                )}

                {status === "processing" && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                        <p className="text-slate-400">Verifying Location...</p>
                    </div>
                )}

                {status === "success" && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-md bg-slate-900/50 border border-emerald-500/30 rounded-3xl p-8 flex flex-col items-center gap-6 text-center backdrop-blur-xl"
                    >
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Check-in Confirmed</h2>
                            <p className="text-emerald-400 font-medium">{scanResult}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Elapsed Time</p>
                                <p className="text-2xl font-mono text-white">{formatTime(timer)}</p>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Est. Arrival</p>
                                <p className="text-2xl font-mono text-blue-400">{predictedTime || "--"}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-slate-800 rounded-xl text-white font-bold hover:bg-slate-700 transition-colors"
                        >
                            Scan Another
                        </button>
                    </motion.div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Check-in Failed</h2>
                        <p className="text-slate-400">{message}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-3 bg-slate-800 rounded-xl text-white font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
