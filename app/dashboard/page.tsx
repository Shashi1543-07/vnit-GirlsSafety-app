"use client";

import { motion } from "framer-motion";
import { Shield, Clock, MapPin, Bell } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Priya</h1>
                <p className="text-slate-400">Here is your safety overview for today.</p>
            </header>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Safety Status</h3>
                            <p className="text-emerald-400 text-sm">Secure</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">You are currently in a safe zone (Girls Hostel Block A).</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Last Check-in</h3>
                            <p className="text-blue-400 text-sm">10:30 PM</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">Successfully scanned at Hostel Entrance.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">Active Alerts</h3>
                            <p className="text-purple-400 text-sm">None</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">No active emergency alerts in your vicinity.</p>
                </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-6">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-start gap-4 pb-6 border-b border-slate-800 last:border-0 last:pb-0">
                            <div className="p-2 bg-slate-800 rounded-full text-slate-400 mt-1">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Transit to Library</h4>
                                <p className="text-slate-400 text-sm mb-1">Completed safely • 45 mins ago</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="px-2 py-1 rounded-full bg-slate-800">Route: Hostel A → Main Library</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
