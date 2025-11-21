"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, AlertTriangle, MapPin, Search, Bell } from "lucide-react";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [users, setUsers] = useState<any[]>([]);
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data when tab changes
    const handleTabChange = async (tab: string) => {
        setActiveTab(tab);
        setIsLoading(true);
        try {
            if (tab === "students") {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                if (data.success) setUsers(data.users);
            } else if (tab === "settings") { // Using Settings tab for Logs for now or create new
                // Actually let's map "Settings" to "System Logs" in UI for this demo
                const res = await fetch("/api/admin/logs");
                const data = await res.json();
                if (data.success) setLogs(data.logs);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-white font-bold">VNIT Admin</h1>
                        <p className="text-xs text-slate-400">Safety Control</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: "overview", label: "Overview", icon: Shield },
                        { id: "students", label: "User Management", icon: Users },
                        { id: "incidents", label: "Incidents", icon: AlertTriangle },
                        { id: "settings", label: "System Logs", icon: Bell }, // Re-purposing Settings for Logs
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleTabChange(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors flex items-center gap-3 ${activeTab === item.id
                                    ? "bg-blue-600 text-white"
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
                    <h2 className="text-2xl font-bold text-white capitalize">
                        {activeTab === "settings" ? "System Logs" : activeTab.replace("-", " ")}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: "Students on Campus", value: "1,245", color: "text-blue-400", bg: "bg-blue-500/10" },
                                { label: "Active SOS", value: "0", color: "text-red-400", bg: "bg-red-500/10" },
                                { label: "Safe Check-ins", value: "892", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                                { label: "Pending Reports", value: "5", color: "text-yellow-400", bg: "bg-yellow-500/10" },
                            ].map((stat, i) => (
                                <div key={i} className={`p-6 rounded-2xl border border-slate-800 ${stat.bg}`}>
                                    <h3 className="text-slate-400 text-sm font-medium mb-2">{stat.label}</h3>
                                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Alerts Table */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800">
                                <h3 className="text-white font-bold">Recent Alerts</h3>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                                    <tr>
                                        <th className="p-4">Student</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4">Time</th>
                                        <th className="p-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <tr className="text-slate-300 hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-medium">Priya Sharma</td>
                                        <td className="p-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">SOS</span></td>
                                        <td className="p-4 flex items-center gap-2"><MapPin className="w-3 h-3" /> Library Block</td>
                                        <td className="p-4">10:42 PM</td>
                                        <td className="p-4"><span className="text-emerald-400">Resolved</span></td>
                                    </tr>
                                    <tr className="text-slate-300 hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-medium">Rahul Verma</td>
                                        <td className="p-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-bold">Late Check-in</span></td>
                                        <td className="p-4 flex items-center gap-2"><MapPin className="w-3 h-3" /> Hostel Gate 2</td>
                                        <td className="p-4">11:15 PM</td>
                                        <td className="p-4"><span className="text-yellow-400">Pending</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "students" && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-white font-bold">Registered Users</h3>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500">
                                Add User
                            </button>
                        </div>
                        {isLoading ? (
                            <div className="p-8 text-center text-slate-500">Loading users...</div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-slate-950 text-slate-400 text-xs uppercase">
                                    <tr>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Hostel</th>
                                        <th className="p-4">Verified</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {users.map((user) => (
                                        <tr key={user.id} className="text-slate-300 hover:bg-slate-800/50 transition-colors">
                                            <td className="p-4 font-medium text-white">{user.name}</td>
                                            <td className="p-4 text-sm">{user.email}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' :
                                                        user.role === 'WARDEN' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            user.role === 'SECURITY' ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm">{user.hostelName || "-"}</td>
                                            <td className="p-4">
                                                {user.isVerified ? (
                                                    <span className="text-emerald-400 text-xs font-bold">Yes</span>
                                                ) : (
                                                    <span className="text-red-400 text-xs font-bold">No</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="p-8 text-center text-slate-500">Loading logs...</div>
                        ) : (
                            logs.map((log) => (
                                <div key={log.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-4">
                                    <div className={`mt-1 w-2 h-2 rounded-full ${log.level === 'ERROR' ? 'bg-red-500' :
                                            log.level === 'WARN' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-white font-medium text-sm">{log.message}</p>
                                            <span className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1 font-mono">{log.level} • {new Date(log.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
