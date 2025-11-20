"use client";

import { MapPin, Navigation } from "lucide-react";

export default function SafeMap() {
    return (
        <div className="relative w-full h-[600px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/79.0882,21.1458,14,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2t5b3R0aG4wMmswMnBwYXA2emF6bmFzIn0.XXX')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Fallback if image fails or for better simulation */}
                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-bounce" />
                        <p className="text-slate-400">Interactive Map Loading...</p>
                    </div>
                </div>
            </div>

            {/* UI Overlays */}
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur p-4 rounded-xl border border-slate-800 max-w-xs">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-emerald-400" />
                    Safe Route Active
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                    Recommended path via Main Avenue. Well-lit and patrolled.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>High Safety Score</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button className="p-3 bg-slate-950/90 backdrop-blur text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors">
                    <MapPin className="w-5 h-5" />
                </button>
                <button className="p-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition-colors">
                    <Navigation className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
