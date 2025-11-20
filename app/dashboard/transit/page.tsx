import QRScanner from "@/components/dashboard/QRScanner";

export default function TransitPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Smart Transit</h1>
                <p className="text-slate-400">Scan QR codes to log your safe travel across campus.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <QRScanner />

                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Active Timer</h3>
                        <div className="text-center py-8">
                            <div className="text-4xl font-mono text-indigo-400 mb-2">00:00:00</div>
                            <p className="text-slate-500">No active trip. Scan to start.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Recent Trips</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-300">Library → Hostel A</span>
                                <span className="text-emerald-400">Safe Arrival</span>
                            </li>
                            <li className="flex justify-between items-center text-sm">
                                <span className="text-slate-300">Dept. of CSE → Canteen</span>
                                <span className="text-emerald-400">Safe Arrival</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
