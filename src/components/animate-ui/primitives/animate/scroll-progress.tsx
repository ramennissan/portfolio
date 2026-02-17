"use client";

import React, {
    createContext,
    useContext,
    useRef,
    useMemo,
} from "react";
import {
    motion,
    useScroll,
    useSpring,
    SpringOptions,
    MotionValue,
    HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type ScrollProgressDirection = "horizontal" | "vertical";

interface ScrollProgressContextType {
    progress: MotionValue<number>;
    direction: ScrollProgressDirection;
    global: boolean;
}

const ScrollProgressContext = createContext<ScrollProgressContextType | undefined>(
    undefined
);

export function ScrollProgressProvider({
    children,
    global = false,
    direction = "vertical",
    transition = { stiffness: 250, damping: 40, bounce: 0 },
}: {
    children: React.ReactNode;
    global?: boolean;
    direction?: ScrollProgressDirection;
    transition?: SpringOptions;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Global scroll uses window, local scroll uses the containerRef
    const { scrollYProgress, scrollXProgress } = useScroll(
        global ? undefined : { container: containerRef }
    );

    const progressVelocity = useSpring(
        direction === "vertical" ? scrollYProgress : scrollXProgress,
        transition
    );

    const value = useMemo(
        () => ({ progress: progressVelocity, direction, global }),
        [progressVelocity, direction, global]
    );

    return (
        <ScrollProgressContext.Provider value={value}>
            <div
                ref={global ? undefined : containerRef}
                className={cn(
                    global ? "" : "relative h-full w-full overflow-hidden"
                )}
            >
                {children}
            </div>
        </ScrollProgressContext.Provider>
    );
}

export function ScrollProgress({
    className,
    mode = "width",
    style,
    ...props
}: {
    className?: string;
    mode?: "width" | "height" | "scaleY" | "scaleX";
} & HTMLMotionProps<"div">) {
    const context = useContext(ScrollProgressContext);
    if (!context) {
        throw new Error(
            "ScrollProgress must be used within a ScrollProgressProvider"
        );
    }

    const { progress, global } = context;

    // Simplified version: Use scaleX/scaleY for better performance and easier mapping
    const finalMode = mode === "width" || mode === "scaleX" ? "scaleX" : "scaleY";
    const motionStyle =
        finalMode === "scaleX"
            ? { scaleX: progress, originX: 0 }
            : { scaleY: progress, originY: 0 };

    return (
        <motion.div
            style={{ ...motionStyle, ...((style as any) || {}) }}
            className={cn(
                "bg-primary",
                finalMode === "scaleX" ? "h-full w-full" : "w-full h-full",
                className
            )}
            data-global={global}
            {...props}
        />
    );
}

export function ScrollProgressContainer({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
} & HTMLMotionProps<"div">) {
    const context = useContext(ScrollProgressContext);
    if (!context) {
        throw new Error(
            "ScrollProgressContainer must be used within a ScrollProgressProvider"
        );
    }

    return (
        <motion.div
            className={cn(
                "h-full w-full",
                context.direction === "vertical" ? "overflow-y-auto" : "overflow-x-auto",
                className
            )}
            data-direction={context.direction}
            {...props}
        >
            {children}
        </motion.div>
    );
}
