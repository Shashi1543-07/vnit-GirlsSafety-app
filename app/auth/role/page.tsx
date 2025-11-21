"use client";

import { motion } from "framer-motion";
import { User, Shield, Lock, GraduationCap } from "lucide-react";
import Link from "next/link";

const roles = [
    {
        id: "STUDENT",
        title: "Student",
        icon: GraduationCap,
        color: "bg-blue-500",
        desc: "Access safety features & transit"
    },
    {
        id: "WARDEN",
        title: "Warden",
        icon: User,
        color: "bg-emerald-500",
        desc: "Monitor hostel & students"
    },
    {
        id: "SECURITY",
        title: "Security Staff",
        icon: Shield,
        color: "bg-orange-500",
        desc: "Patrol & Emergency Response"
    },
    {
        id: "ADMIN",
        title: "Admin",
        icon: Lock,
        color: "bg-purple-500",
        desc: "System Management"
    }
];

export default function RolePage() {
    return (
        <div className="min-h-screen bg-slate-950 p-6 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Select Your Role</h1>
                    <p className="text-slate-400">Choose how you want to access the app</p>
                </div>

                <div className="grid gap-4">
                    {roles.map((role, i) => (
                        <Link key={role.id} href={`/auth/login?role=${role.id}`}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all flex items-center gap-4 group"
                            >
                                <div className={`p-3 rounded-xl ${role.color} bg-opacity-20 text-white group-hover:scale-110 transition-transform`}>
                                    <role.icon className={`w-6 h-6 ${role.color.replace('bg-', 'text-')}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg">{role.title}</h3>
                                    <p className="text-slate-500 text-sm">{role.desc}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
