"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Smile, Frown, Meh, Phone } from "lucide-react";
import Link from "next/link";

export default function HealthPage() {
    const [activeTab, setActiveTab] = useState<"mood" | "chat">("mood");

    return (
        <div className="min-h-screen bg-slate-950 p-6 flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <Link href="/dashboard" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold text-white">Wellness Center</h1>
            </header>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab("mood")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${activeTab === "mood" ? "bg-pink-600 text-white" : "bg-slate-900 text-slate-400"
                        }`}
                >
                    Mood Tracker
                </button>
                <button
                    onClick={() => setActiveTab("chat")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${activeTab === "chat" ? "bg-purple-600 text-white" : "bg-slate-900 text-slate-400"
                        }`}
                >
                    Anonymous Chat
                </button>
            </div>

            <div className="flex-1">
                {activeTab === "mood" ? (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                            <h2 className="text-white font-bold mb-6">How are you feeling today?</h2>
                            <div className="flex justify-center gap-6">
                                <button className="flex flex-col items-center gap-2 group">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                        <Smile className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-slate-400">Good</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 group">
                                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                                        <Meh className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <span className="text-sm text-slate-400">Okay</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 group">
                                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                                        <Frown className="w-8 h-8 text-red-500" />
                                    </div>
                                    <span className="text-sm text-slate-400">Low</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-pink-500/20 rounded-lg text-pink-500">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Need Immediate Help?</h3>
                                    <p className="text-sm text-slate-400">Professional counselors are available 24/7.</p>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-pink-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:bg-pink-700">
                                <Phone className="w-5 h-5" /> Call Helpline
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-4 overflow-y-auto">
                            <div className="flex gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">AI</div>
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                    <p className="text-slate-300 text-sm">Hi there! I'm your safe space companion. Everything you say here is anonymous. How can I support you today?</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                            />
                            <button className="p-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700">
                                <MessageCircle className="w-6 h-6" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
