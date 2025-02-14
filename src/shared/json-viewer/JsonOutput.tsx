import { ReactElement } from 'react';
import JsonView from '@uiw/react-json-view';
import { vscodeTheme } from '@uiw/react-json-view/vscode';

interface Props {
    jsonOutput: unknown;
    error: string | null;
    collapse: number | boolean;
    collapseLabel: string;
    collapseHandler: () => void;
    copyToClipboard: () => void;
    copyJsonLabel: string;
}

export default function JsonOutput({
    jsonOutput,
    error,
    collapse,
    collapseLabel,
    collapseHandler,
    copyToClipboard,
    copyJsonLabel,
}: Props): ReactElement {
    return (
        <div className="bg-light p-6 rounded-xl shadow-lg border border-secondary">
            <div className="flex justify-between mb-4">
                <button
                    onClick={copyToClipboard}
                    className="px-4 bg-green-900 py-2 text-dark font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
                >
                    {copyJsonLabel}
                </button>
                <button
                    onClick={collapseHandler}
                    className="px-4 py-2 bg-green-900 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-80 transition"
                >
                    {collapseLabel}
                </button>
            </div>

            {error && (
                <p className="mb-4 p-3 bg-red-600 text-white text-sm rounded-lg">
                    {error}
                </p>
            )}

            {typeof jsonOutput === 'object' && jsonOutput !== null && (
                <JsonView
                    shortenTextAfterLength={100}
                    enableClipboard={true}
                    displayDataTypes={false}
                    value={jsonOutput as object}
                    style={{
                        ...vscodeTheme,
                        fontSize: '16px',
                        fontFamily: 'monospace',
                    }}
                    collapsed={collapse}
                    className={'font-size-18'}
                />
            )}
        </div>
    );
}
