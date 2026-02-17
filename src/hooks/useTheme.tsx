import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = 'theme-preference';

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // This now runs only on the client, so window is safe to access
        return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
    });

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (themeToApply: Theme) => {
            if (themeToApply === 'dark') {
                root.classList.add('dark');
            } else if (themeToApply === 'light') {
                root.classList.remove('dark');
            } else {
                // 'system'
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemDark) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        applyTheme(theme);

        // Persist the user's choice
        if (theme !== 'system') {
            localStorage.setItem(STORAGE_KEY, theme);
        } else {
            // If they select 'system', remove the stored preference
            localStorage.removeItem(STORAGE_KEY);
        }


        // Listen for system changes only when the theme is 'system'
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemChange = () => {
                applyTheme('system');
            };
            mediaQuery.addEventListener('change', handleSystemChange);
            return () => mediaQuery.removeEventListener('change', handleSystemChange);
        }
    }, [theme]);

    const value = { theme, setTheme };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
