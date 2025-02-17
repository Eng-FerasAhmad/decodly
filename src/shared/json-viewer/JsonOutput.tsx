import { useState, ReactElement } from 'react';
import JsonView from '@uiw/react-json-view';
import { vscodeTheme } from '@uiw/react-json-view/vscode';

interface Props {
    jsonOutput: unknown;
    error?: string | null;
}

export default function JsonOutput({ jsonOutput, error }: Props): ReactElement {
    const [collapsed, setCollapsed] = useState<number | boolean>(2);
    const [copyText, setCopyText] = useState<string>('Copy JSON');

    const toggleCollapse = () => {
        setCollapsed((prev) => (prev === false ? 2 : false));
    };

    const copyToClipboard = () => {
        if (jsonOutput) {
            navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
            setCopyText('Copied!'); // Show "Copied!" text
            setTimeout(() => setCopyText('Copy JSON'), 3000); // Reset after 3 seconds
        }
    };

    return (
        <div className="bg-light p-6 rounded-xl shadow-lg border border-secondary">
            <div className="flex justify-between mb-4">
                <button
                    onClick={toggleCollapse}
                    className="px-4 py-2 bg-cyan-700 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition cursor-pointer"
                >
                    {collapsed ? 'Expand all' : 'Collapse all'}
                </button>
                <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-cyan-900 text-dark font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition cursor-pointer"
                >
                    {copyText}
                </button>
            </div>

            {error && (
                <p className="mb-4 p-3 bg-red-400 text-white text-sm rounded-lg">
                    {error}
                </p>
            )}

            {typeof jsonOutput === 'object' && jsonOutput !== null ? (
                <JsonView
                    shortenTextAfterLength={100}
                    enableClipboard={false}
                    displayDataTypes={false}
                    value={jsonOutput as object}
                    style={{
                        ...vscodeTheme,
                        fontSize: '16px',
                        fontFamily: 'monospace',
                    }}
                    collapsed={collapsed}
                    className="font-size-18"
                />
            ) : (
                <p className="text-gray-700">No valid JSON output available.</p>
            )}
        </div>
    );
}
