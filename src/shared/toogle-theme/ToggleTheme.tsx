import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white transition"
        >
            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
}
