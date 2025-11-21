"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Loader2, Shield, User, Mail, Lock, Phone, Building,
    MapPin, Heart, FileText, IdCard, Camera, CheckCircle
} from "lucide-react";

const steps = [
    { id: 1, title: "Profile", icon: User },
    { id: 2, title: "Academic", icon: Building },
    { id: 3, title: "Identity", icon: IdCard },
    { id: 4, title: "Permissions", icon: Shield },
];

export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "", // Still keeping for fallback/admin
        phone: "",
        role: "STUDENT",
        enrollmentNo: "",
        studentId: "",
        hostelName: "",
        roomNo: "",
        emergencyContact: "",
        bloodGroup: "",
        medicalHistory: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/auth/login?role=STUDENT");
            } else {
                const data = await res.json();
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-slate-950 to-slate-950" />

            <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -z-10" />
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-900 px-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.id ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-500"
                                }`}>
                                <step.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-xs font-medium ${currentStep >= step.id ? "text-blue-400" : "text-slate-500"
                                }`}>{step.title}</span>
                        </div>
                    ))}
                </div>

                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    {steps[currentStep - 1].title} Details
                </h1>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Full Name</label>
                                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="Priya Sharma" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Email</label>
                                        <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="student@vnit.ac.in" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Phone</label>
                                        <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Password</label>
                                        <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="••••••••" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Enrollment No.</label>
                                        <input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="BT20CSE001" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Hostel Name</label>
                                        <select name="hostelName" value={formData.hostelName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white">
                                            <option value="">Select Hostel</option>
                                            <option value="Gargi">Gargi Hostel</option>
                                            <option value="Old Ladies">Old Ladies Hostel</option>
                                            <option value="New Ladies">New Ladies Hostel</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Room No.</label>
                                        <input name="roomNo" value={formData.roomNo} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="101" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Emergency Contact</label>
                                        <input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white" placeholder="Parent's Number" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col items-center justify-center space-y-6 text-center"
                            >
                                <div className="w-full max-w-sm border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-950/50">
                                    <Camera className="w-12 h-12 text-slate-500 mb-4" />
                                    <p className="text-white font-medium">Upload College ID Card</p>
                                    <p className="text-xs text-slate-500 mt-2">Click to capture or upload</p>
                                </div>
                                <p className="text-sm text-slate-400 max-w-xs">
                                    We need to verify your identity to ensure campus safety. Your data is encrypted.
                                </p>
                            </motion.div>
                        )}

                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="space-y-4">
                                    {[
                                        { title: "Location Access", desc: "Required for SOS & Transit tracking", icon: MapPin },
                                        { title: "Camera & Microphone", desc: "Required for Emergency Recording", icon: Camera },
                                        { title: "Notifications", desc: "Receive critical safety alerts", icon: Shield },
                                    ].map((perm, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-slate-900 rounded-lg">
                                                    <perm.icon className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium">{perm.title}</h3>
                                                    <p className="text-xs text-slate-500">{perm.desc}</p>
                                                </div>
                                            </div>
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex justify-between mt-8 pt-8 border-t border-slate-800">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="px-6 py-2 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Back
                    </button>

                    {currentStep < 4 ? (
                        <button
                            onClick={nextStep}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
