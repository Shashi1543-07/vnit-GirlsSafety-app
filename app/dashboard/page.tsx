"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Shield, Clock, MapPin, Bell, Loader2,
    QrCode, Navigation, Heart, Phone, AlertTriangle,
    Menu, User
} from "lucide-react";

interface User {
    id: string;
    name: string;
    hostelName: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-950">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    const modules = [
        {
            title: "QR Transit",
            icon: QrCode,
            color: "bg-blue-500",
            href: "/dashboard/qr",
            desc: "Scan In/Out"
        },
        {
            title: "SOS Alert",
            icon: AlertTriangle,
            color: "bg-red-600",
            href: "/dashboard/sos",
            desc: "Emergency Panic"
        },
        {
            title: "Live Map",
            icon: MapPin,
            color: "bg-emerald-500",
            href: "/dashboard/map",
            desc: "Track Location"
        },
        {
            title: "Safe Routes",
            icon: Navigation,
            color: "bg-purple-500",
            href: "/dashboard/routes",
            desc: "Navigation"
        },
        {
            title: "Health",
            icon: Heart,
            color: "bg-pink-500",
            href: "/dashboard/health",
            desc: "Medical Support"
        },
        {
            title: "Contacts",
            icon: Phone,
            color: "bg-orange-500",
            href: "/dashboard/contacts",
            desc: "Emergency List"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <header className="p-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
                <div>
                    <h1 className="text-xl font-bold text-white">VNIT Safety</h1>
                    <p className="text-slate-400 text-xs">Welcome, {user?.name || 'Student'}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <User className="w-5 h-5 text-slate-300" />
                </div>
            </header>

            <main className="p-6 space-y-8">
                {/* Safety Status Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900/50 to-slate-900 border border-emerald-500/30 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Shield className="w-32 h-32 text-emerald-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-400 text-sm font-medium">YOU ARE SAFE</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">{user?.hostelName || 'Campus Zone'}</h2>
                        <p className="text-slate-400 text-sm">Last update: Just now</p>
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Menu className="w-4 h-4 text-blue-500" /> Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {modules.map((mod, i) => (
                            <Link key={i} href={mod.href}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col items-center text-center gap-3 group"
                                >
                                    <div className={`p-3 rounded-xl ${mod.color} bg-opacity-20 text-white group-hover:scale-110 transition-transform`}>
                                        <mod.icon className={`w-6 h-6 ${mod.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{mod.title}</h4>
                                        <p className="text-slate-500 text-xs">{mod.desc}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Alerts */}
                <div className="bg-slate-900/30 rounded-2xl p-5 border border-slate-800/50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-sm">Recent Activity</h3>
                        <Bell className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                            <div className="mt-1 p-1.5 bg-blue-500/10 rounded-full text-blue-500">
                                <Clock className="w-3 h-3" />
                            </div>
                            <div>
                                <p className="text-slate-300 text-sm">Checked in at Hostel</p>
                                <p className="text-slate-500 text-xs">Today, 8:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
