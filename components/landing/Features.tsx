"use client";

import { motion } from "framer-motion";
import { QrCode, AlertCircle, MapPin, Users, Shield, Activity } from "lucide-react";

const features = [
    {
        icon: QrCode,
        title: "Smart QR Transit",
        description: "Scan-in/out system with automated timers. Missed check-ins trigger instant alerts to wardens.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: AlertCircle,
        title: "SOS Panic Button",
        description: "Single-tap distress signal sharing live location and recording evidence even in low network.",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    },
    {
        icon: MapPin,
        title: "Live Safe Tracking",
        description: "Real-time GPS monitoring with safe route suggestions based on lighting and crowd density.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        icon: Users,
        title: "Emergency Contacts",
        description: "Instant notifications to friends, family, and campus authorities with one click.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        icon: Shield,
        title: "Safe Zones",
        description: "Map integration showing nearby police stations, hospitals, and campus security points.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        icon: Activity,
        title: "Wellness Support",
        description: "Confidential access to campus counselors and medical helplines for mental health support.",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20"
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Features() {
    return (
        <section id="features" className="py-24 bg-slate-950 relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Safety Modules</h2>
                    <p className="text-slate-400">
                        Designed to cover every aspect of campus safety, from daily commutes to emergency situations.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} hover:bg-opacity-20 transition-all cursor-default group`}
                        >
                            <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
