import { Shield, Heart, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-6 h-6 text-indigo-500" />
                            <span className="text-xl font-bold text-white">VNIT Safety</span>
                        </div>
                        <p className="text-slate-400 max-w-md">
                            Empowering female students with a discreet, reliable, and tech-enabled safety mechanism.
                            Connected directly to campus security and wardens.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Home</a></li>
                            <li><a href="#features" className="text-slate-400 hover:text-indigo-400 transition-colors">Features</a></li>
                            <li><a href="/dashboard" className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Emergency</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-slate-400">
                                <Phone className="w-4 h-4" />
                                <span>Security: +91 12345 67890</span>
                            </li>
                            <li className="flex items-center gap-2 text-slate-400">
                                <Heart className="w-4 h-4" />
                                <span>Medical: +91 98765 43210</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} VNIT Smart Campus. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Safety
                    </p>
                </div>
            </div>
        </footer>
    );
}
