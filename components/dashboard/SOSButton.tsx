"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, PhoneCall, ShieldAlert } from "lucide-react";

export default function SOSButton() {
    const [isActive, setIsActive] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const handleSOSClick = () => {
        if (isActive) {
            setIsActive(false);
            setCountdown(5);
            return;
        }

        setIsActive(true);
        // Simulate countdown
        let count = 5;
        const timer = setInterval(() => {
            count -= 1;
            setCountdown(count);
            if (count === 0) {
                clearInterval(timer);
                // Trigger alert logic here
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.button
                whileTap={{ scale: 0.95 }}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={isActive ? { repeat: Infinity, duration: 1 } : {}}
                onClick={handleSOSClick}
                className={`relative w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isActive
                        ? "bg-red-600 shadow-red-600/50"
                        : "bg-slate-800 shadow-slate-900/50 hover:bg-red-900/20 border-4 border-slate-700 hover:border-red-500/50"
                    }`}
            >
                <div className="absolute inset-0 rounded-full border-4 border-white/10 animate-ping" />
                <div className="flex flex-col items-center gap-2 z-10">
                    <AlertTriangle className={`w-16 h-16 ${isActive ? "text-white" : "text-red-500"}`} />
                    <span className={`text-xl font-bold ${isActive ? "text-white" : "text-slate-300"}`}>
                        {isActive ? `SENDING IN ${countdown}` : "SOS"}
                    </span>
                </div>
            </motion.button>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                        <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Emergency Contacts</h4>
                        <p className="text-slate-400 text-sm">Notifies 3 contacts instantly</p>
                    </div>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-orange-500/20 text-orange-400 rounded-lg">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Campus Security</h4>
                        <p className="text-slate-400 text-sm">Direct line to Control Room</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
