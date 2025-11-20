import SafeMap from "@/components/dashboard/SafeMap";

export default function MapPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Safe Map</h1>
                <p className="text-slate-400">View safe zones, well-lit routes, and emergency points.</p>
            </header>

            <SafeMap />
        </div>
    );
}
