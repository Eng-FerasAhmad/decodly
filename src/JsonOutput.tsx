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
    console.log('collapse', collapse);
    return (
        <div className="json-output-container">
            <button onClick={copyToClipboard} className="copy-button">
                {copyJsonLabel}
            </button>
            <button onClick={collapseHandler} className="collapse-button">
                {collapseLabel}
            </button>
            {error && <p className="error-message">{error}</p>}
            {typeof jsonOutput === 'object' && jsonOutput !== null && (
                <div className="json-output">
                    <JsonView
                        value={jsonOutput as object}
                        style={vscodeTheme}
                        collapsed={collapse} // Collapse boolean for levels
                        onCopy={(copied) => {
                            console.log('Copied:', copied);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
