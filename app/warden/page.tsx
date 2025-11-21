"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bell, Users, Clock, FileText, MapPin,
    CheckCircle, AlertTriangle, Search, Phone
} from "lucide-react";

export default function WardenPage() {
    const [activeTab, setActiveTab] = useState("alerts");

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold">Warden Panel</h1>
                        <p className="text-xs text-slate-400">Gargi Hostel</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: "alerts", label: "Live Alerts", icon: Bell },
                        { id: "trips", label: "Active Trips", icon: Clock },
                        { id: "students", label: "Student Logs", icon: Users },
                        { id: "incidents", label: "Incidents", icon: FileText },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === item.id
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search student..."
                                className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-red-400 text-sm font-medium">2 Active SOS</span>
                        </div>
                    </div>
                </header>

                {activeTab === "alerts" && (
                    <div className="space-y-6">
                        {/* Critical Alerts */}
                        <div className="grid gap-4">
                            {[
                                { name: "Priya Sharma", type: "SOS ALERT", loc: "Library Road", time: "2 mins ago", status: "Critical" },
                                { name: "Anjali Gupta", type: "MISSED CHECK-IN", loc: "Main Gate", time: "15 mins ago", status: "Warning" },
                            ].map((alert, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-6 rounded-2xl border ${alert.status === "Critical"
                                            ? "bg-red-500/10 border-red-500/50"
                                            : "bg-yellow-500/10 border-yellow-500/50"
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className={`p-3 rounded-full ${alert.status === "Critical" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                                                }`}>
                                                <AlertTriangle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg">{alert.type}</h3>
                                                <p className="text-slate-300 font-medium">{alert.name}</p>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {alert.loc}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {alert.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium">
                                                View Location
                                            </button>
                                            <button className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-200 font-medium flex items-center gap-2">
                                                <Phone className="w-4 h-4" /> Call
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "trips" && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                                <tr>
                                    <th className="p-4">Student</th>
                                    <th className="p-4">Destination</th>
                                    <th className="p-4">Time Out</th>
                                    <th className="p-4">Expected In</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {[
                                    { name: "Neha Singh", dest: "Market", out: "6:30 PM", in: "8:30 PM", status: "On Time" },
                                    { name: "Riya Patel", dest: "Library", out: "7:00 PM", in: "9:00 PM", status: "On Time" },
                                    { name: "Sara Khan", dest: "Hospital", out: "5:00 PM", in: "8:00 PM", status: "Delayed" },
                                ].map((trip, i) => (
                                    <tr key={i} className="text-slate-300 hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-medium text-white">{trip.name}</td>
                                        <td className="p-4">{trip.dest}</td>
                                        <td className="p-4">{trip.out}</td>
                                        <td className="p-4">{trip.in}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${trip.status === "Delayed" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                                                }`}>
                                                {trip.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
