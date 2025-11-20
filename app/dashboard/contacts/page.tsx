"use client";

import { Plus, Trash2, User, Phone } from "lucide-react";

export default function ContactsPage() {
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Emergency Contacts</h1>
                    <p className="text-slate-400">Manage the people who will be notified in case of an emergency.</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Contact
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: "Rajesh Kumar (Father)", phone: "+91 98765 43210", type: "Family" },
                    { name: "Hostel Warden", phone: "+91 11223 34455", type: "Authority" },
                    { name: "Sneha (Roommate)", phone: "+91 99887 76655", type: "Friend" },
                ].map((contact, i) => (
                    <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{contact.name}</h3>
                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                    <Phone className="w-3 h-3" />
                                    <span>{contact.phone}</span>
                                </div>
                                <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                                    {contact.type}
                                </span>
                            </div>
                        </div>
                        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
