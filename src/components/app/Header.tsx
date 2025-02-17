import { Link, useLocation } from 'react-router-dom';

import Logo from 'shared/logo/Logo';

const NAV_ITEMS = [
    { id: 'decoder', label: 'Decoder', path: '/decoder' },
    { id: 'extractor', label: 'Extractor', path: '/extractor' },
    { id: 'viewer', label: 'JSON Viewer', path: '/viewer' },
    {
        id: 'class-extractor',
        label: 'Class Extractor',
        path: '/class-extractor',
    },
    {
        id: 'style-extractor',
        label: 'Style Extractor',
        path: '/style-extractor',
    },
    { id: 'dom-creator', label: 'DOM Creator', path: '/dom-creator' },
];

export default function Header() {
    const { pathname } = useLocation();

    return (
        <header className="fixed top-0 left-0 w-full dark:bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center z-50">
            <Link
                to="/"
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
                <Logo />
                <p>Decodly</p>
            </Link>

            <nav className="flex space-x-4">
                {NAV_ITEMS.map(({ id, label, path }) => {
                    const isActive = pathname === path;
                    return (
                        <Link
                            key={id}
                            to={path}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition 
                                ${isActive ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'} 
                                text-gray-900 dark:text-gray-300`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center space-x-4">
                <a
                    href="https://github.com/yourgithubrepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white transition hover:text-blue-500"
                >
                    GitHub
                </a>
            </div>
        </header>
    );
}
