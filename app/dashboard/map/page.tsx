"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Share2, Users, Shield } from "lucide-react";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function MapPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [location, setLocation] = useState<[number, number]>([21.123, 79.056]); // Default VNIT

    useEffect(() => {
        setIsMounted(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation([pos.coords.latitude, pos.coords.longitude]);
            });
        }
    }, []);

    if (!isMounted) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Map...</div>;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <header className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-lg font-bold text-white">Live Tracking</h1>
                </div>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm font-medium flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share Live
                </button>
            </header>

            <div className="flex-1 relative z-0">
                <MapContainer
                    center={location}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={location}>
                        <Popup>
                            You are here. <br /> Safe Zone.
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* Overlay Controls */}
                <div className="absolute bottom-8 left-4 right-4 flex flex-col gap-4 z-[400]">
                    <div className="bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-medium flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" /> Nearby Friends
                            </h3>
                            <span className="text-xs text-slate-400">2 Active</span>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">A</div>
                            <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">S</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-800 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Current Zone: Safe</p>
                                <p className="text-xs text-slate-400">Campus Security Patrol Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
