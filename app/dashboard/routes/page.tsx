"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Navigation, Bus, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SafeRoutesPage() {
    const [destination, setDestination] = useState("");
    const [routeFound, setRouteFound] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setRouteFound(true);
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-white">Safe Navigation</h1>
            </header>

            <div className="space-y-6">
                <form onSubmit={handleSearch} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">Where do you want to go?</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Enter destination (e.g., Library)"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="w-full py-3 bg-blue-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700">
                        <Navigation className="w-5 h-5" /> Find Safe Route
                    </button>
                </form>

                {routeFound && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-white font-bold">Recommended Route</h3>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">Via Main Avenue (Well lit, Security Post nearby)</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Distance: 1.2 km</span>
                                <span className="text-emerald-400">Safety Score: 9.8/10</span>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Bus className="w-5 h-5 text-purple-500" />
                                <h3 className="text-white font-bold">Campus Transport</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Next Shuttle</p>
                                        <p className="text-xs text-slate-500">To Hostel Block</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-purple-400 font-bold">5 min</span>
                                        <span className="text-xs text-slate-500">Live Track</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">E-Rickshaw</p>
                                        <p className="text-xs text-slate-500">Available at Gate 1</p>
                                    </div>
                                    <button className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500">
                                        Request Ride
                                    </button>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Night Patrol Escort</p>
                                        <p className="text-xs text-slate-500">Security Team</p>
                                    </div>
                                    <button className="px-3 py-1 bg-slate-700 text-white text-xs font-bold rounded-lg hover:bg-slate-600">
                                        Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
