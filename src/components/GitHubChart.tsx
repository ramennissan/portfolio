import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme.tsx";
import { useEffect, useState } from "react";
import "react-github-calendar/tooltips.css";

export default function GitHubChart({ username }: { username: string }) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(theme === "dark" || (theme === "system" && systemDark));
  }, [theme]);

  const themeColors = {
    light: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
    dark: ["#2d333b", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };
  
  const currentColors = isDark ? themeColors.dark : themeColors.light;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4 px-2">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative group flex items-center gap-2"
          title="GitHub"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {username}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"></span>
        </a>
        
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
      
      <div>
        <GitHubCalendar
          username={username}
          theme={themeColors}
          colorScheme={isDark ? "dark" : "light"}
          hideColorLegend={true}
        />
      </div>
    </motion.section>
  );
}
