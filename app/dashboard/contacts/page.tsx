"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Phone, User } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
    const [contacts, setContacts] = useState([
        { id: 1, name: "Mom", phone: "+91 98765 43210", type: "Family" },
        { id: 2, name: "Warden", phone: "+91 99887 76655", type: "Authority" },
    ]);

    const [showAdd, setShowAdd] = useState(false);
    const [newContact, setNewContact] = useState({ name: "", phone: "", type: "Friend" });

    const handleAdd = () => {
        setContacts([...contacts, { id: Date.now(), ...newContact }]);
        setShowAdd(false);
        setNewContact({ name: "", phone: "", type: "Friend" });
    };

    const handleDelete = (id: number) => {
        setContacts(contacts.filter(c => c.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold text-white">Emergency Contacts</h1>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </header>

            <div className="space-y-4">
                {contacts.map((contact) => (
                    <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">{contact.name}</h3>
                                <p className="text-slate-500 text-sm">{contact.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <a href={`tel:${contact.phone}`} className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500 hover:bg-emerald-500/30">
                                <Phone className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => handleDelete(contact.id)}
                                className="p-2 bg-red-500/20 rounded-lg text-red-500 hover:bg-red-500/30"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {showAdd && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm border border-slate-800">
                        <h2 className="text-xl font-bold text-white mb-4">Add New Contact</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                                value={newContact.name}
                                onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                                value={newContact.phone}
                                onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                            />
                            <select
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
                                value={newContact.type}
                                onChange={e => setNewContact({ ...newContact, type: e.target.value })}
                            >
                                <option>Friend</option>
                                <option>Family</option>
                                <option>Authority</option>
                            </select>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowAdd(false)}
                                    className="flex-1 py-3 bg-slate-800 rounded-xl text-white font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="flex-1 py-3 bg-blue-600 rounded-xl text-white font-medium"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
