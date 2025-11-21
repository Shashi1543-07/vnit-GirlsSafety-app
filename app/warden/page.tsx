"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Bell, Users, Clock, FileText, MapPin,
    CheckCircle, AlertTriangle, Search, Phone, Loader2
} from "lucide-react";

export default function WardenPage() {
    const [activeTab, setActiveTab] = useState("alerts");
    const [alerts, setAlerts] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [alertsRes, tripsRes] = await Promise.all([
                fetch("/api/warden/alerts"),
                fetch("/api/warden/trips")
            ]);

            const alertsData = await alertsRes.json();
            const tripsData = await tripsRes.json();

            if (alertsData.success) setAlerts(alertsData.alerts);
            if (tripsData.success) setTrips(tripsData.trips);
        } catch (error) {
            console.error("Failed to fetch warden data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Poll every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleResolve = async (id: string) => {
        try {
            const res = await fetch(`/api/warden/alerts/${id}/resolve`, {
                method: "POST"
            });
            if (res.ok) {
                fetchData(); // Refresh data
            }
        } catch (error) {
            console.error("Failed to resolve alert", error);
        }
    };

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
                            <span className="text-red-400 text-sm font-medium">{alerts.length} Active SOS</span>
                        </div>
                    </div>
                </header>

                {isLoading && alerts.length === 0 && trips.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                    </div>
                ) : (
                    <>
                        {activeTab === "alerts" && (
                            <div className="space-y-6">
                                {alerts.length === 0 ? (
                                    <div className="text-center text-slate-500 py-12">No active alerts</div>
                                ) : (
                                    <div className="grid gap-4">
                                        {alerts.map((alert) => (
                                            <motion.div
                                                key={alert.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`p-6 rounded-2xl border ${alert.type === "SOS"
                                                    ? "bg-red-500/10 border-red-500/50"
                                                    : "bg-yellow-500/10 border-yellow-500/50"
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-4">
                                                        <div className={`p-3 rounded-full ${alert.type === "SOS" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                                                            }`}>
                                                            <AlertTriangle className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-bold text-lg">{alert.type}</h3>
                                                            <p className="text-slate-300 font-medium">{alert.user?.name || "Unknown Student"}</p>
                                                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                                                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {alert.location || "Unknown Location"}</span>
                                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(alert.timestamp).toLocaleTimeString()}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 mt-1">Room: {alert.user?.roomNo} • {alert.user?.hostelName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleResolve(alert.id)}
                                                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 font-medium flex items-center gap-2"
                                                        >
                                                            <CheckCircle className="w-4 h-4" /> Resolve
                                                        </button>
                                                        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-slate-200 font-medium flex items-center gap-2">
                                                            <Phone className="w-4 h-4" /> Call
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
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
                                        {trips.map((trip) => (
                                            <tr key={trip.id} className="text-slate-300 hover:bg-slate-800/50 transition-colors">
                                                <td className="p-4 font-medium text-white">
                                                    {trip.user?.name}
                                                    <div className="text-xs text-slate-500">{trip.user?.hostelName} • {trip.user?.roomNo}</div>
                                                </td>
                                                <td className="p-4">{trip.destination}</td>
                                                <td className="p-4">{new Date(trip.startTime).toLocaleTimeString()}</td>
                                                <td className="p-4">{new Date(trip.expectedReturn).toLocaleTimeString()}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${trip.status === "DELAYED" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                                                        }`}>
                                                        {trip.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {trips.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-8 text-center text-slate-500">No active trips</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
