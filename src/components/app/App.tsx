import { ReactElement, useState } from 'react';

import DataIdExtractor from '../extractor/Extractor';
import JsonViewer from '../json-viewer/JsonViewer';
import ClassExtractor from '../class-extractor/CalssExtractor';
import ExtractStyles from '../style-extractor/StyleExtractor';
import HtmlDomTree from '../dom-creator/DomCreator';
import Base64Decoder from '../decoder/Base64Deocder';
import Footer from '../footer/Footer';
import ThemeToggle from '../../shared/toogle-theme/ToggleTheme';

import Tabs from './Tabs';

const tabItems = [
    { id: 'decoder', label: 'Decoder', component: <Base64Decoder /> },
    { id: 'extractor', label: 'Extractor', component: <DataIdExtractor /> },
    { id: 'viewer', label: 'JSON Viewer', component: <JsonViewer /> },
    {
        id: 'class-extractor',
        label: 'Class Extractor',
        component: <ClassExtractor />,
    },
    {
        id: 'style-extractor',
        label: 'Style Extractor',
        component: <ExtractStyles />,
    },
    { id: 'dom-creator', label: 'DOM Creator', component: <HtmlDomTree /> },
];

export default function App(): ReactElement {
    const [activeTab, setActiveTab] = useState(tabItems[0].id);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-6">
            <ThemeToggle />
            <div className="w-full max-w-4xl p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                <Tabs
                    items={tabItems}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div className="mt-6 w-full">
                    {tabItems.find((tab) => tab.id === activeTab)?.component}
                </div>
            </div>
            <Footer />
        </div>
    );
}
