import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    const defaultTheme: Theme = storedTheme || (prefersDark ? 'dark' : 'light');

    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
