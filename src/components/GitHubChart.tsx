import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState, useMemo, memo, useRef } from "react";
import "react-github-calendar/tooltips.css";


const GitHubChart = memo(function GitHubChart({ username }: { username: string }) {
  const { theme } = useTheme();
  // Initialize state based on current conditions
  const [isDark, setIsDark] = useState(() => {
    if (theme === 'system') {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return theme === 'dark';
  });

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      // Update immediately
      setIsDark(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme]);

  const themeColors = useMemo(() => ({
    light: ["#ededed", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
    dark: ["#e5e6eb", "#0e4429", "#006d32", "#26a641", "#39d353"],
  }), []);

  const currentColors = isDark ? themeColors.dark : themeColors.light;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let ro: ResizeObserver | null = null;
    const recompute = () => {
      const wrap = wrapperRef.current;
      if (!wrap) return;
      // try to find the calendar element or its svg child for a reliable width
      const calendar = wrap.querySelector('.react-activity-calendar') as HTMLElement | null;
      let calWidth = 0;
      if (calendar) {
        const firstChild = calendar.firstElementChild as HTMLElement | null;
        calWidth = (firstChild && (firstChild.getBoundingClientRect().width || firstChild.scrollWidth)) || (calendar.getBoundingClientRect().width || calendar.scrollWidth);
      }
      // fallback: attempt bounding rect of any descendant
      if (!calWidth) {
        const anyDesc = wrap.querySelector('*') as HTMLElement | null;
        if (anyDesc) calWidth = anyDesc.getBoundingClientRect().width || anyDesc.scrollWidth;
      }

      const wrapperWidth = wrap.clientWidth || wrap.getBoundingClientRect().width || wrap.scrollWidth;
      if (!calWidth || !wrapperWidth) {
        setScale(1);
        return;
      }
      const newScale = Math.min(1, wrapperWidth / calWidth);
      setScale((s) => {
        if (Math.abs(s - newScale) < 0.01) return s;
        return newScale;
      });
    };

    // Recompute after a short delay to allow the calendar to finish rendering
    const t = setTimeout(recompute, 250);

    if (wrapperRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(recompute);
      ro.observe(wrapperRef.current);
      const cal = wrapperRef.current.querySelector('.react-activity-calendar') as HTMLElement | null;
      if (cal) ro.observe(cal);
    }

    window.addEventListener('resize', recompute);
    window.addEventListener('orientationchange', recompute);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', recompute);
      window.removeEventListener('orientationchange', recompute);
      if (ro) ro.disconnect();
    };
  }, [username, currentColors]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 px-2">
          <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative group flex items-center gap-2"
            title="GitHub"
            whileHover="hover"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.003-.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {username}
            <motion.div
              className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-current"
              initial={{ scaleX: 0 }}
              variants={{
                hover: { scaleX: 1 }
              }}
              style={{ originX: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.a>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {currentColors.map((color, index) => (
                <div key={index} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        <div ref={wrapperRef as any} className="w-full flex justify-center github-calendar-wrapper" style={{ overflow: 'hidden' }}>
          {/* CSS Override as a backup to ensure the dark mode background color applies */}
          {isDark && (
            <style>{`
              .github-calendar-wrapper rect[data-level="0"] {
                fill: ${currentColors[0]} !important;
              }
            `}</style>
          )}
          <div style={{ display: 'inline-block', transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <GitHubCalendar
                username={username}
                theme={{
                  light: currentColors,
                  dark: currentColors,
                }}
                blockSize={11.5}
                blockMargin={2}
                blockRadius={0}
                showColorLegend={false}
              />
            </a>
          </div>
        </div>


      </div>
    </motion.section>
  );
});

export default GitHubChart;