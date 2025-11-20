"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scan, CheckCircle, XCircle } from "lucide-react";

export default function QRScanner() {
    const [scanning, setScanning] = useState(false);
    const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");

    const handleScan = () => {
        setStatus("scanning");
        setScanning(true);

        // Simulate scanning process
        setTimeout(() => {
            setScanning(false);
            setStatus("success");
        }, 2000);
    };

    const reset = () => {
        setStatus("idle");
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px]">
            {status === "idle" && (
                <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-600/20 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Scan className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Scan QR Code</h3>
                    <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                        Scan the QR code at your location to check-in or check-out safely.
                    </p>
                    <button
                        onClick={handleScan}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/25"
                    >
                        Start Scanning
                    </button>
                </div>
            )}

            {status === "scanning" && (
                <div className="relative w-64 h-64 bg-black rounded-2xl overflow-hidden border-2 border-indigo-500/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-slate-500 text-sm">Simulating Camera Feed...</p>
                    </div>
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    />
                </div>
            )}

            {status === "success" && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Check-in Successful</h3>
                    <p className="text-slate-400 mb-8">
                        Your location has been logged safely. Timer stopped.
                    </p>
                    <button
                        onClick={reset}
                        className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all"
                    >
                        Scan Again
                    </button>
                </motion.div>
            )}
        </div>
    );
}
