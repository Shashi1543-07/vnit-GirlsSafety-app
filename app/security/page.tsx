"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Shield, Map, Radio, AlertOctagon,
    Navigation, Users, Search
} from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Map to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

export default function SecurityPage() {
    const [activeTab, setActiveTab] = useState("dispatch");

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold">Security Ops</h1>
                        <p className="text-xs text-slate-400">Main Control</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: "dispatch", label: "Dispatch & Map", icon: Map },
                        { id: "sos", label: "Active SOS", icon: AlertOctagon },
                        { id: "patrol", label: "Patrol Status", icon: Radio },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === item.id
                                    ? "bg-orange-600 text-white"
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
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950 z-10">
                    <h2 className="text-2xl font-bold text-white capitalize">{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            <span className="text-orange-400 text-sm font-medium">System Online</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 relative">
                    {/* Map Background (Mock) */}
                    <div className="absolute inset-0 bg-slate-900 z-0">
                        {/* In real app, this would be the Leaflet Map covering the whole area */}
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                            [Live Campus Map Visualization]
                        </div>
                    </div>

                    {/* Overlay Panels */}
                    <div className="absolute top-4 left-4 z-10 w-96 space-y-4">
                        {/* Active SOS Card */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-slate-900/90 backdrop-blur-md border border-red-500/50 p-4 rounded-xl shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2 text-red-500 font-bold">
                                    <AlertOctagon className="w-5 h-5" />
                                    <h3>EMERGENCY ALERT</h3>
                                </div>
                                <span className="text-xs text-slate-400">00:42</span>
                            </div>
                            <p className="text-white font-medium text-lg">Priya Sharma</p>
                            <p className="text-slate-400 text-sm mb-4">Near Library Block, Sector 4</p>

                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700">
                                    Dispatch Team
                                </button>
                                <button className="bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-700">
                                    View Cam
                                </button>
                            </div>
                        </motion.div>

                        {/* Patrol Units */}
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
                            <h3 className="text-slate-400 text-xs font-bold uppercase mb-3">Available Units</h3>
                            <div className="space-y-2">
                                {[
                                    { id: "P-01", loc: "Main Gate", status: "Idle" },
                                    { id: "P-02", loc: "Hostel Area", status: "Patrolling" },
                                    { id: "QRT-1", loc: "Admin Block", status: "Busy" },
                                ].map((unit, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${unit.status === "Idle" ? "bg-emerald-500" :
                                                    unit.status === "Busy" ? "bg-red-500" : "bg-blue-500"
                                                }`} />
                                            <span className="text-white font-medium">{unit.id}</span>
                                        </div>
                                        <span className="text-slate-500">{unit.loc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
