"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

function AnimatedShield() {
    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <mesh>
                <icosahedronGeometry args={[2.5, 0]} />
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
            <mesh scale={1.2}>
                <sphereGeometry args={[2.2, 32, 32]} />
                <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Smart Campus Safety System</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        Safety Reimagined for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">VNIT Campus</span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                        A discreet, automated, and reliable safety mechanism designed for female students.
                        Instant alerts, real-time tracking, and direct connection to campus security.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/dashboard" className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25">
                            Launch Safety App
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="#features" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all border border-slate-700">
                            Explore Features
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-[500px] w-full relative"
                >
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                        <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={0.5} />
                        <AnimatedShield />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                    </Canvas>
                </motion.div>
            </div>
        </section>
    );
}
