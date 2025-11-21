import Link from "next/link";
import { Shield } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        VNIT Safety
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm text-slate-300 hover:text-white transition-colors">
                        How it Works
                    </Link>
                    <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20">
                        Login / Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}
