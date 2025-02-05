import { FC } from 'react';

interface TabItem {
    id: string;
    label: string;
}

interface TabsProps {
    items: TabItem[];
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const Tabs: FC<TabsProps> = ({ items, activeTab, setActiveTab }) => {
    return (
        <div className="flex space-x-2 mt-4">
            {items.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        activeTab === id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
