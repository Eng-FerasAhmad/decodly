import { ReactElement } from 'react';

export default function Footer(): ReactElement {
    return (
        <footer className="w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6 text-center text-gray-700 dark:text-gray-300 transition-opacity animate-fadeIn">
            &copy; {new Date().getFullYear()}
            <a
                href="https://feras-ahmad.net"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-1 font-bold text-gray-900 dark:text-gray-300`}
            >
                Feras Ahmad
            </a>
        </footer>
    );
}
