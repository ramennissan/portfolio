import { useRef, useEffect, useState, memo } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    phase: number;
    connections: number[];
    type: 'standard' | 'marker' | 'anchor';
}

interface Pulse {
    from: number;
    to: number;
    progress: number;
    speed: number;
    color: string;
}

const BackgroundDecor = memo(function BackgroundDecor() {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000 });

    // Track dynamic document height for absolute positioning compatibility
    useEffect(() => {
        const scrollContainer = document.querySelector('.app-scroll') as HTMLElement | null;

        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: (scrollContainer ? scrollContainer.scrollHeight : document.documentElement.scrollHeight)
            });
        };

        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });

        // Observe the scroll container's own size AND its main content so changes in content length update the canvas.
        if (scrollContainer) {
            resizeObserver.observe(scrollContainer);
            const contentEl = scrollContainer.firstElementChild as HTMLElement | null;
            if (contentEl) resizeObserver.observe(contentEl);
        } else {
            resizeObserver.observe(document.body);
        }

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        const handlePointerMove = (e: PointerEvent) => {
            const rect = scrollContainer?.getBoundingClientRect();
            const containerScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
            const containerScrollLeft = scrollContainer ? scrollContainer.scrollLeft : 0;

            const x = (rect ? (e.clientX - rect.left) + containerScrollLeft : ((e as any).pageX ?? e.clientX));
            const y = (rect ? (e.clientY - rect.top) + containerScrollTop : ((e as any).pageY ?? e.clientY));

            mouseRef.current = { x, y };
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('pointermove', handlePointerMove as EventListener);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = dimensions.width * dpr;
        canvas.height = dimensions.height * dpr;
        ctx.scale(dpr, dpr);

        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const primaryColor = isDark ? 'rgba(34, 211, 238,' : 'rgba(2, 115, 213,';
        const accentColor = isDark ? 'rgba(79, 70, 229,' : 'rgba(100, 116, 139,';

        const nodes: Node[] = [];
        const pulses: Pulse[] = [];

        // Global Uniform Distribution using a Jittered Grid
        const spacing = 180;
        const cols = Math.ceil(dimensions.width / spacing) + 1;
        const rows = Math.ceil(dimensions.height / spacing) + 1;

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                // Jitter within the cell to keep it structural but organic
                const ox = (Math.random() - 0.5) * spacing * 0.9;
                const oy = (Math.random() - 0.5) * spacing * 0.9;

                nodes.push({
                    x: (c * spacing) + ox,
                    y: (r * spacing) + oy,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    phase: Math.random() * Math.PI * 2,
                    connections: [],
                    type: Math.random() > 0.9 ? 'marker' : 'standard',
                });
            }
        }

        // Connect nodes globally (restricted by distance)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                // Early exit if y distance is already too great (optimization for long lists)
                if (Math.abs(dy) > spacing * 1.5) continue;

                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < spacing * 0.9) {
                    nodes[i].connections.push(j);
                }
            }
        }

        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);
            const mouse = mouseRef.current;

            // 1. Static Blueprint Grid (Removed)


            // 2. Nodes and Connections
            nodes.forEach((node, i) => {
                // Subtle animation
                node.x += node.vx + Math.sin(time + node.phase) * 0.03;
                node.y += node.vy + Math.cos(time + node.phase) * 0.03;

                const mdx = mouse.x - node.x;
                const mdy = mouse.y - node.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                const influence = Math.max(0, 1 - mDist / 200);

                node.connections.forEach(targetIdx => {
                    const target = nodes[targetIdx];
                    const opacity = 0.08 + influence * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.strokeStyle = `${primaryColor} ${opacity})`;
                    ctx.lineWidth = 0.6 + influence * 0.6;
                    ctx.stroke();

                    // Randomized Bidirectional Data Pulses
                    if (Math.random() < 0.0005) {
                        const reverse = Math.random() > 0.5;
                        pulses.push({
                            from: reverse ? targetIdx : i,
                            to: reverse ? i : targetIdx,
                            progress: 0,
                            speed: 0.01 + Math.random() * 0.02,
                            color: Math.random() > 0.5 ? primaryColor : accentColor
                        });
                    }
                });

                if (node.type === 'marker') {
                    const size = 4 + influence * 4;
                    ctx.strokeStyle = `${accentColor} ${0.3 + influence * 0.5})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath(); ctx.moveTo(node.x - size, node.y); ctx.lineTo(node.x + size, node.y); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(node.x, node.y - size); ctx.lineTo(node.x, node.y + size); ctx.stroke();

                    // Crosshair markers only, no text labels

                }

                const nodeOpacity = 0.4 + influence * 0.4;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.2 + influence, 0, Math.PI * 2);
                ctx.fillStyle = `${primaryColor} ${nodeOpacity})`;
                ctx.fill();
            });

            // 3. Pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                const fromNode = nodes[p.from];
                const toNode = nodes[p.to];

                p.progress += p.speed;
                if (p.progress >= 1) {
                    pulses.splice(i, 1);
                    continue;
                }

                const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
                const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

                ctx.beginPath();
                ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color} 1.0)`;
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(px - (toNode.x - fromNode.x) * 0.2, py - (toNode.y - fromNode.y) * 0.2);
                ctx.strokeStyle = `${p.color} 0.5)`;
                ctx.stroke();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, theme]);

        return (
        <div className="absolute pointer-events-none z-0 overflow-hidden" style={{ top: 0, left: 0, width: '100%', height: dimensions.height }}>
            <canvas
                ref={canvasRef}
                className="absolute"
                style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: dimensions.height,
                    opacity: 0.9
                }}
            />
        </div>
    );
});

export default BackgroundDecor;
