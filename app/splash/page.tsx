"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function SplashPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/auth/role");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotateY: [0, 360]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] mb-8"
                >
                    <Shield className="w-16 h-16 text-white" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-white mb-2 tracking-tight"
                >
                    VNIT Safety
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-slate-400 text-sm tracking-widest uppercase"
                >
                    Smart Campus Security
                </motion.p>
            </motion.div>
        </div>
    );
}
