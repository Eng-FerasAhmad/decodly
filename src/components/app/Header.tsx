import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from 'shared/logo/Logo';
import { GithubSymbol } from 'shared/icons/GitHubIcon';
import { CloseSymbol } from 'shared/icons/CloseIcon';
import { MenuSymbol } from 'shared/icons/MenuIcon';

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
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full dark:bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center z-50">
            <Link
                to="/"
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
                <Logo />
                <p>Decodly</p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
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

            {/* GitHub Icon */}
            <a
                href="https://github.com/Eng-FerasAhmad/decodly"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-4"
            >
                <GithubSymbol size={28} color="#fff" />
            </a>

            {/* Burger Menu Button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white focus:outline-none"
            >
                {menuOpen ? (
                    <CloseSymbol size={28} color="#fff" />
                ) : (
                    <MenuSymbol size={28} color="#fff" />
                )}
            </button>

            {/* Mobile Navigation (Centered) */}
            {menuOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
                    <nav className="flex flex-col space-y-6 text-center">
                        {NAV_ITEMS.map(({ id, label, path }) => {
                            const isActive = pathname === path;
                            return (
                                <Link
                                    key={id}
                                    to={path}
                                    className={`px-6 py-3 text-lg font-semibold rounded-md transition 
                                        ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'} `}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Close Button */}
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-6 right-6 text-white"
                    >
                        <CloseSymbol size={32} color="#fff" />
                    </button>
                </div>
            )}
        </header>
    );
}
