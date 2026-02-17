"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Particles({
    active,
    children,
    count = 12,
}: {
    active: boolean;
    children: React.ReactNode;
    count?: number;
}) {
    return (
        <div className="relative inline-block">
            {children}
            <AnimatePresence>
                {active &&
                    Array.from({ length: count }).map((_, i) => (
                        <Particle key={i} />
                    ))}
            </AnimatePresence>
        </div>
    );
}

function Particle() {
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return (
        <motion.div
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y: y + 20, opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-yellow-400 pointer-events-none"
        />
    );
}
