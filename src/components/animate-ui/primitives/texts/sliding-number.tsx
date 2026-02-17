"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function SlidingNumber({
    number,
    className,
}: {
    number: number;
    className?: string;
}) {
    const digits = useMemo(() => number.toString().split(""), [number]);

    return (
        <div className={cn("flex overflow-hidden", className)}>
            {digits.map((digit, i) => (
                <Digit key={i} digit={digit} />
            ))}
        </div>
    );
}

function Digit({ digit }: { digit: string }) {
    const isNumber = !isNaN(parseInt(digit));

    if (!isNumber) return <span>{digit}</span>;

    const target = parseInt(digit);
    const animatedValue = useSpring(target, {
        stiffness: 100,
        damping: 30,
    });

    useEffect(() => {
        animatedValue.set(target);
    }, [target, animatedValue]);

    return (
        <div className="relative h-[1.2em] w-[0.6em]">
            <motion.div
                style={{
                    y: useTransform(animatedValue, (v) => `${-v * 10}%`),
                }}
                className="absolute inset-0 flex flex-col"
            >
                {DIGITS.map((d) => (
                    <div key={d} className="flex h-full items-center justify-center">
                        {d}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
