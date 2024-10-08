import { ReactElement } from 'react';
import ReactJson from 'react-json-view';

interface Props {
    jsonOutput: any;
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
        <div className="json-output-container">
            <button onClick={copyToClipboard} className="copy-button">
                {copyJsonLabel}
            </button>
            <button onClick={collapseHandler} className="collapse-button">
                {collapseLabel}
            </button>
            {error && <p className="error-message">{error}</p>}
            {jsonOutput && (
                <div className="json-output">
                    <h3>Decoded JSON:</h3>
                    <ReactJson
                        name={null}
                        src={jsonOutput}
                        theme="monokai"
                        collapsed={collapse}
                    />
                </div>
            )}
        </div>
    );
}
